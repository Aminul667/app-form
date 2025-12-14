#!/usr/bin/env node
import fs from "fs";
import path from "path";
import chalk from "chalk";
import { componentRegistry } from "./component-registry";

const PROJECT_ROOT = process.cwd();
const TEMPLATE_ROOT = path.join(__dirname, "../template/components");

/* ---------------------------------- */
/* Utilities                           */
/* ---------------------------------- */

function ensureDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function getComponentsDir() {
  const srcComponents = path.join(PROJECT_ROOT, "src", "components");
  const rootComponents = path.join(PROJECT_ROOT, "components");

  if (fs.existsSync(srcComponents)) return srcComponents;

  if (fs.existsSync(path.join(PROJECT_ROOT, "src"))) {
    ensureDir(srcComponents);
    return srcComponents;
  }

  ensureDir(rootComponents);
  return rootComponents;
}

function copyFileSafe(src: string, dest: string) {
  ensureDir(path.dirname(dest));

  if (fs.existsSync(dest)) {
    console.log(
      chalk.yellow(`⚠️ Skipped (exists): ${path.relative(PROJECT_ROOT, dest)}`)
    );
    return;
  }

  fs.copyFileSync(src, dest);
  console.log(
    chalk.green(`✅ Installed: ${path.relative(PROJECT_ROOT, dest)}`)
  );
}

/* ---------------------------------- */
/* Dependency-aware installer          */
/* ---------------------------------- */

const installed = new Set<string>();

function installComponent(name: string) {
  const meta = componentRegistry[name];

  if (!meta) {
    console.log(chalk.red(`❌ Unknown component: ${name}`));
    console.log(chalk.blue("👉 Run: app-form list"));
    process.exit(1);
  }

  if (installed.has(name)) return;
  installed.add(name);

  // Install internal dependencies first
  meta.dependsOn?.forEach(installComponent);

  // Copy template files
  const targetRoot = path.join(getComponentsDir(), "app-form");

  meta.files.forEach((relativeFile) => {
    const src = path.join(TEMPLATE_ROOT, relativeFile);
    const dest = path.join(targetRoot, relativeFile.replace(/^app-form\//, ""));
    copyFileSafe(src, dest);
  });

  // Warnings (after install)
  if (meta.shadcn?.length) {
    console.log(
      chalk.yellow(
        `⚠️ Requires shadcn/ui components: ${meta.shadcn.join(", ")}`
      )
    );
    console.log(
      chalk.blue(
        `👉 Run (If you don't have the required components already): npx shadcn-ui@latest add ${meta.shadcn.join(
          " "
        )}`
      )
    );
  }

  if (meta.external?.length) {
    console.log(
      chalk.yellow(
        `⚠️ Requires external dependencies: ${meta.external.join(", ")}`
      )
    );
    console.log(chalk.blue(`👉 Run: npm install ${meta.external.join(" ")}`));
  }

  if (meta.requires?.length) {
    meta.requires.forEach((req) => {
      const exists = fs.existsSync(path.join(PROJECT_ROOT, req));
      if (!exists) {
        console.log(chalk.yellow(`⚠️ Missing required file: ${req}`));
      }
    });
  }
}

/* ---------------------------------- */
/* Commands                            */
/* ---------------------------------- */

function listComponents() {
  console.log(chalk.cyan("\n📦 Available app-form components:\n"));

  Object.entries(componentRegistry).forEach(([name, meta]) => {
    console.log(
      `  - ${chalk.green(name)}${
        meta.description ? ` — ${meta.description}` : ""
      }`
    );
  });

  console.log("");
}

function initAll() {
  console.log(chalk.cyan("\n⚙️ Installing all app-form components...\n"));
  Object.keys(componentRegistry).forEach(installComponent);
}

/* ---------------------------------- */
/* CLI Router                          */
/* ---------------------------------- */

function run() {
  const [, , command, arg] = process.argv;

  switch (command) {
    case "list":
      listComponents();
      break;

    case "add":
      if (!arg) {
        console.log(chalk.red("❌ Missing component name."));
        console.log(chalk.blue("👉 Usage: app-form add app-input-field"));
        return;
      }
      installComponent(arg);
      break;

    case "init":
      initAll();
      break;

    default:
      console.log(`
${chalk.cyan("Usage:")}
  app-form list
  app-form add <component>
  app-form init
`);
  }
}

run();
