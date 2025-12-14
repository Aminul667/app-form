// src/component-registry.ts

export type ComponentMeta = {
  /**
   * Files to copy relative to template/components
   */
  files: string[];

  /**
   * Internal app-form components that must be installed first
   */
  dependsOn?: string[];

  /**
   * Required shadcn/ui components (warn only)
   */
  shadcn?: string[];

  /**
   * External packages expected in the consumer project (warn only)
   */
  external?: string[];

  /**
   * Other expected project files (warn only)
   */
  requires?: string[];

  /**
   * Description (used by CLI list/help)
   */
  description?: string;
};

export const componentRegistry: Record<string, ComponentMeta> = {
  /**
   * -----------------------------
   * Core App Form
   * -----------------------------
   */
  "app-form": {
    files: [
      "app-form/app-form.tsx",
      "app-form/app-form.types.ts",
      "app-form/index.ts",
    ],
    description: "Core form wrapper using react-hook-form and zod",
  },

  /**
   * -----------------------------
   * Input Field
   * -----------------------------
   */
  "app-input-field": {
    files: ["app-form/fields/app-input-field.tsx"],
    dependsOn: ["app-form"],
    shadcn: ["input", "label"],
    requires: ["lib/utils.ts"],
    description: "Text input field integrated with AppForm",
  },

  /**
   * -----------------------------
   * Checkbox Field
   * -----------------------------
   */
  "app-checkbox": {
    files: ["app-form/fields/app-checkbox.tsx"],
    dependsOn: ["app-form"],
    shadcn: ["checkbox", "label"],
    description: "Checkbox field integrated with AppForm",
  },

  /**
   * -----------------------------
   * Select Field
   * -----------------------------
   */
  "app-select-item": {
    files: ["app-form/fields/app-select-item.tsx"],
    dependsOn: ["app-form"],
    shadcn: ["select", "label"],
    description: "Select dropdown field integrated with AppForm",
  },

  /**
   * -----------------------------
   * File / Image Uploader
   * -----------------------------
   */
  "app-file-uploader": {
    files: ["app-form/fields/app-file-uploader.tsx"],
    dependsOn: ["app-form"],
    shadcn: ["label"],
    external: ["lucide-react"],
    description:
      "Image/file uploader with preview, drag-and-drop reordering, and size limits",
  },
};
