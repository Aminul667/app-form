#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const chalk = require("chalk");

// Define paths
const PROJECT_ROOT = process.cwd();
const TEMPLATE_DIR = path.join(__dirname, "../template/app-form");
const REQUIRED_UI_COMPONENTS = ["input", "label", "checkbox", "select"];

/**
 * Create directory recursively if it doesn't exist
 */
function ensureDirectory(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(chalk.green(`✅ Created: ${dir}`));
  }
}

/**
 * Determine the component folder path to scaffold into
 */
function findTargetComponentDir(manualDirArg) {
  if (manualDirArg) {
    const resolvedDir = path.join(PROJECT_ROOT, manualDirArg);
    ensureDirectory(resolvedDir);
    return resolvedDir;
  }

  const src = path.join(PROJECT_ROOT, "src");
  const componentsInSrc = path.join(src, "components");
  const componentsInRoot = path.join(PROJECT_ROOT, "components");

  if (fs.existsSync(componentsInSrc)) {
    return componentsInSrc;
  } else if (fs.existsSync(src)) {
    ensureDirectory(componentsInSrc);
    return componentsInSrc;
  } else {
    ensureDirectory(componentsInRoot);
    return componentsInRoot;
  }
}

/**
 * Copy all files from template into destination folder
 */
function copyTemplates(targetDir) {
  const targetLivanaDir = path.join(targetDir, "app-form");
  ensureDirectory(targetLivanaDir);

  fs.readdirSync(TEMPLATE_DIR).forEach((file) => {
    const src = path.join(TEMPLATE_DIR, file);
    const dest = path.join(targetLivanaDir, file);

    if (!fs.existsSync(dest)) {
      fs.copyFileSync(src, dest);
      console.log(chalk.green(`📦 Copied: ${file}`));
    } else {
      console.log(chalk.yellow(`ℹ️ Skipped (already exists): ${file}`));
    }
  });

  return targetLivanaDir;
}

/**
 * Check whether Shadcn components exist in user's project
 */
function checkShadcnComponents(baseComponentsDir) {
  const uiDir = path.join(baseComponentsDir, "ui");

  const missing = REQUIRED_UI_COMPONENTS.filter((comp) => {
    return !fs.existsSync(path.join(uiDir, `${comp}.tsx`));
  });

  if (missing.length > 0) {
    console.log(chalk.red(`\n❌ Missing Shadcn UI components:`));
    missing.forEach((comp) => console.log(`- ${comp}`));
    console.log(
      chalk.blue(`\n👉 Run: npx shadcn-ui@latest add ${missing.join(" ")}`)
    );
  } else {
    console.log(
      chalk.green("✅ All required Shadcn UI components are present.")
    );
  }
}

/**
 * Main function
 */
function init() {
  console.log(chalk.cyan("\n🛠 Setting up Livana Form components..."));

  // Grab optional CLI args (e.g., --dir=custom/path)
  const arg = process.argv.find((arg) => arg.startsWith("--dir="));
  const manualDir = arg?.split("--dir=")[1];

  const targetComponentsDir = findTargetComponentDir(manualDir);
  const livanaFormDir = copyTemplates(targetComponentsDir);
  checkShadcnComponents(targetComponentsDir);

  console.log(
    chalk.cyan(`\n✨ Setup complete! Components are at:\n  ${livanaFormDir}\n`)
  );
}

// Run it
init();
