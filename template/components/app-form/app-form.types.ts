import React from "react";
import {
  FieldErrors,
  UseFormRegister,
  FieldValues,
  Path,
  Control,
} from "react-hook-form";

// input field props
export interface InputFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  type?: string;
  containerClass?: string;
  inputClass?: string;
  labelClass?: string;
  isDisabled?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

// Option type
export interface Option<T = string> {
  label: string;
  value: T;
}

// select props
export interface FormSelectProps<T extends FieldValues, TValue = string> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  options: Option<TValue>[];
  errors?: FieldErrors<T>;
  parseValue?: (val: string) => TValue;
  containerClass?: string;
  labelClass?: string;
  triggerClass?: string;
  contentClass?: string;
  itemClass?: string;
  isDisabled?: boolean;
}

// textarea props
export interface TextareaFieldProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  label?: string;
  placeholder?: string;
  rows?: number;
  containerClass?: string;
  textareaClass?: string;
  labelClass?: string;
  isDisabled?: boolean;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
}

// radio group props
export interface FormRadioGroupProps<T extends FieldValues, TValue = string> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: Option<TValue>[];
  errors?: FieldErrors<T>;
  parseValue?: (val: string) => TValue;
  orientation?: "vertical" | "horizontal";
  containerClass?: string;
  groupClass?: string;
  labelClass?: string;
  itemClass?: string;
  optionLabelClass?: string;
  isDisabled?: boolean;
}

// switch props
export interface FormSwitchProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  description?: string;
  errors?: FieldErrors<T>;
  labelClass?: string;
  descriptionClass?: string;
  containerClass?: string;
  switchClass?: string;
  isDisabled?: boolean;
}

// checkbox group props
export interface FormCheckboxGroupProps<T extends FieldValues, TValue = string> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  options: Option<TValue>[];
  errors?: FieldErrors<T>;
  orientation?: "vertical" | "horizontal";
  containerClass?: string;
  groupClass?: string;
  labelClass?: string;
  itemClass?: string;
  optionLabelClass?: string;
  checkboxClass?: string;
  isDisabled?: boolean;
}

// combobox (searchable single-select) props
export interface FormComboboxProps<T extends FieldValues, TValue = string> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  options: Option<TValue>[];
  errors?: FieldErrors<T>;
  parseValue?: (val: string) => TValue;
  /** Allow clearing the current selection by re-selecting it. */
  clearable?: boolean;
  containerClass?: string;
  labelClass?: string;
  triggerClass?: string;
  contentClass?: string;
  itemClass?: string;
  isDisabled?: boolean;
}

// multi-select (searchable combobox) props
export interface FormMultiSelectProps<T extends FieldValues, TValue = string> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  searchPlaceholder?: string;
  emptyText?: string;
  options: Option<TValue>[];
  errors?: FieldErrors<T>;
  parseValue?: (val: string) => TValue;
  /** Cap how many options can be selected. */
  maxSelected?: number;
  containerClass?: string;
  labelClass?: string;
  triggerClass?: string;
  contentClass?: string;
  itemClass?: string;
  chipClass?: string;
  isDisabled?: boolean;
}

// checkbox props
export interface FormCheckboxProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  icon?: React.ReactNode;
  errors?: FieldErrors<T>;
  labelClass?: string;
  containerClass?: string;
  checkboxClass?: string;
  isDisabled?: boolean;
}

// input field array props
export interface InputFieldArrayProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  /**
   * Input element type ("text", "number", etc.).
   * When set to "number" the field will register with
   * `valueAsNumber` so that RHF treats the value as a number.
   */
  type?: string;
  errors?: FieldErrors<T>;
  containerClass?: string;
  inputClass?: string;
  labelClass?: string;
  addButtonText?: string;
  addButtonClass?: string;
  minFields?: number;
}

// file upload

export type UploadZoneCtx = {
  maxFileSizeMB: number;
};

export interface FormImageUploadProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  errors?: FieldErrors<T>;
  maxImages?: number;
  maxFileSizeMB?: number;
  label?: string;
  labelClass?: string;
  containerClass?: string;
  uploadZoneInner?: React.ReactNode | ((ctx: UploadZoneCtx) => React.ReactNode);
}
