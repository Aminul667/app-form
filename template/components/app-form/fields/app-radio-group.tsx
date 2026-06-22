"use client";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Controller, FieldValues } from "react-hook-form";
import { FormRadioGroupProps } from "../app-form.types";

const AppRadioGroup = <T extends FieldValues, TValue = string>({
  name,
  control,
  label,
  options,
  errors,
  parseValue = (val) => val as unknown as TValue,
  orientation = "vertical",
  containerClass = "space-y-2",
  groupClass,
  labelClass,
  itemClass,
  optionLabelClass,
  isDisabled = false,
}: FormRadioGroupProps<T, TValue>) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={containerClass}>
          {label && <Label className={labelClass}>{label}</Label>}
          <RadioGroup
            disabled={isDisabled}
            value={field.value !== undefined ? String(field.value) : ""}
            onValueChange={(val) => field.onChange(parseValue(val))}
            className={cn(
              orientation === "horizontal" ? "flex flex-wrap gap-4" : "grid gap-3",
              groupClass
            )}
          >
            {options.map((item, index) => {
              const id = `${name}-${index}`;
              return (
                <div key={index} className="flex items-center space-x-2">
                  <RadioGroupItem
                    id={id}
                    value={String(item.value)}
                    className={itemClass}
                  />
                  <Label htmlFor={id} className={optionLabelClass}>
                    {item.label}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
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

export default AppRadioGroup;
