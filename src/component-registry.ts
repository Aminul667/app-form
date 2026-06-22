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
    files: ["app-form/app-form.tsx", "app-form/app-form.types.ts"],
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
   * Textarea Field
   * -----------------------------
   */
  "app-textarea": {
    files: ["app-form/fields/app-textarea.tsx"],
    dependsOn: ["app-form"],
    shadcn: ["textarea", "label"],
    requires: ["lib/utils.ts"],
    description: "Multi-line textarea field integrated with AppForm",
  },

  /**
   * -----------------------------
   * Switch Field
   * -----------------------------
   */
  "app-switch": {
    files: ["app-form/fields/app-switch.tsx"],
    dependsOn: ["app-form"],
    shadcn: ["switch", "label"],
    description: "Toggle switch field integrated with AppForm",
  },

  /**
   * -----------------------------
   * Radio Group Field
   * -----------------------------
   */
  "app-radio-group": {
    files: ["app-form/fields/app-radio-group.tsx"],
    dependsOn: ["app-form"],
    shadcn: ["radio-group", "label"],
    requires: ["lib/utils.ts"],
    description: "Single-choice radio group field integrated with AppForm",
  },

  /**
   * -----------------------------
   * Checkbox Group Field
   * -----------------------------
   */
  "app-checkbox-group": {
    files: ["app-form/fields/app-checkbox-group.tsx"],
    dependsOn: ["app-form"],
    shadcn: ["checkbox", "label"],
    requires: ["lib/utils.ts"],
    description: "Multiple-choice checkbox group field integrated with AppForm",
  },

  /**
   * -----------------------------
   * Combobox Field (searchable single-select)
   * -----------------------------
   */
  "app-combobox": {
    files: ["app-form/fields/app-combobox.tsx"],
    dependsOn: ["app-form"],
    shadcn: ["popover", "command", "label"],
    external: ["lucide-react"],
    requires: ["lib/utils.ts"],
    description: "Searchable single-select combobox integrated with AppForm",
  },

  /**
   * -----------------------------
   * Multi-Select Field (searchable multi-select)
   * -----------------------------
   */
  "app-multi-select": {
    files: ["app-form/fields/app-multi-select.tsx"],
    dependsOn: ["app-form"],
    shadcn: ["popover", "command", "label"],
    external: ["lucide-react"],
    requires: ["lib/utils.ts"],
    description:
      "Searchable multi-select with chips and optional selection limit",
  },

  /**
   * -----------------------------
   * Input Field Array
   * -----------------------------
   */
  "app-input-field-array": {
    files: ["app-form/fields/app-input-field-array.tsx"],
    dependsOn: ["app-form"],
    shadcn: ["input", "label", "button"],
    external: ["lucide-react"],
    requires: ["lib/utils.ts"],
    description: "Dynamic array of input fields with add/remove functionality",
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
