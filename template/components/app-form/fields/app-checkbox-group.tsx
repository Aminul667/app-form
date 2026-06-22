"use client";

import { Controller, FieldValues } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FormCheckboxGroupProps } from "../app-form.types";

const AppCheckboxGroup = <T extends FieldValues, TValue = string>({
  name,
  control,
  label,
  options,
  errors,
  orientation = "vertical",
  containerClass = "space-y-2",
  groupClass,
  labelClass,
  itemClass,
  optionLabelClass,
  checkboxClass,
  isDisabled = false,
}: FormCheckboxGroupProps<T, TValue>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected: TValue[] = Array.isArray(field.value)
          ? field.value
          : [];

        const toggle = (value: TValue, checked: boolean) => {
          if (checked) {
            field.onChange([...selected, value]);
          } else {
            field.onChange(selected.filter((v) => v !== value));
          }
        };

        return (
          <div className={containerClass}>
            {label && <Label className={labelClass}>{label}</Label>}
            <div
              className={cn(
                orientation === "horizontal"
                  ? "flex flex-wrap gap-4"
                  : "grid gap-3",
                groupClass
              )}
            >
              {options.map((item, index) => {
                const id = `${name}-${index}`;
                return (
                  <div
                    key={index}
                    className={cn("flex items-center space-x-2", itemClass)}
                  >
                    <Checkbox
                      id={id}
                      checked={selected.includes(item.value)}
                      onCheckedChange={(checked) =>
                        toggle(item.value, checked === true)
                      }
                      className={checkboxClass}
                      disabled={isDisabled}
                    />
                    <Label htmlFor={id} className={optionLabelClass}>
                      {item.label}
                    </Label>
                  </div>
                );
              })}
            </div>
            {errors?.[name] && (
              <p className="text-red-500 text-sm mt-1">
                {String(errors[name]?.message)}
              </p>
            )}
          </div>
        );
      }}
    />
  );
};

export default AppCheckboxGroup;
