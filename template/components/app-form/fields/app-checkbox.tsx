"use client";

import { Controller, FieldValues } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { FormCheckboxProps } from "./app-form.types";

const AppCheckbox = <T extends FieldValues>({
  name,
  control,
  label,
  icon,
  errors,
  isDisabled = false,
  containerClass = "",
  labelClass = "",
  checkboxClass = "",
}: FormCheckboxProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          <div className={`flex items-center space-x-2 ${containerClass}`}>
            <Checkbox
              id={name}
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
              className={checkboxClass}
              disabled={isDisabled}
            />
            <Label htmlFor={name} className={labelClass}>
              {icon && <span className="mr-2">{icon}</span>}
              {label}
            </Label>
          </div>
          {errors?.[name] && (
            <p className="text-red-500 text-sm mt-1">
              {String(errors[name]?.message)}
            </p>
          )}
        </div>
      )}
    />
  );
};

export default AppCheckbox;
