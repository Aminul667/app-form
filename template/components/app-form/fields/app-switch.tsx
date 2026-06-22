"use client";

import { Controller, FieldValues } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { FormSwitchProps } from "../app-form.types";

const AppSwitch = <T extends FieldValues>({
  name,
  control,
  label,
  description,
  errors,
  isDisabled = false,
  containerClass = "",
  labelClass = "",
  descriptionClass = "",
  switchClass = "",
}: FormSwitchProps<T>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          <div
            className={`flex items-center justify-between gap-4 ${containerClass}`}
          >
            <div className="space-y-0.5">
              <Label htmlFor={name} className={labelClass}>
                {label}
              </Label>
              {description && (
                <p className={descriptionClass || "text-sm text-gray-500"}>
                  {description}
                </p>
              )}
            </div>
            <Switch
              id={name}
              checked={field.value ?? false}
              onCheckedChange={field.onChange}
              className={switchClass}
              disabled={isDisabled}
            />
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

export default AppSwitch;
