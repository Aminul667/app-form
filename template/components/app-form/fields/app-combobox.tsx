"use client";

import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";

import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { FormComboboxProps } from "../app-form.types";

const AppCombobox = <T extends FieldValues, TValue = string>({
  name,
  control,
  label,
  placeholder = "Select an option",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  options,
  errors,
  parseValue = (val) => val as unknown as TValue,
  clearable = false,
  containerClass = "space-y-2",
  labelClass,
  triggerClass,
  contentClass,
  itemClass,
  isDisabled = false,
}: FormComboboxProps<T, TValue>) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selectedOption = options.find((o) => o.value === field.value);

        const select = (value: TValue) => {
          if (clearable && value === field.value) {
            field.onChange(undefined);
          } else {
            field.onChange(value);
          }
          setOpen(false);
        };

        return (
          <div className={containerClass}>
            {label && <Label className={labelClass}>{label}</Label>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                type="button"
                disabled={isDisabled}
                className={cn(
                  "flex h-9 w-full items-center justify-between gap-2 rounded-md border border-gray-400 bg-white px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50",
                  triggerClass
                )}
              >
                <span
                  className={cn(!selectedOption && "text-muted-foreground")}
                >
                  {selectedOption ? selectedOption.label : placeholder}
                </span>
                <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
              </PopoverTrigger>
              <PopoverContent
                className={cn(
                  "w-(--radix-popover-trigger-width) p-0",
                  contentClass
                )}
                align="start"
              >
                <Command>
                  <CommandInput placeholder={searchPlaceholder} />
                  <CommandList>
                    <CommandEmpty>{emptyText}</CommandEmpty>
                    <CommandGroup>
                      {options.map((opt) => {
                        const active = opt.value === field.value;
                        return (
                          <CommandItem
                            key={String(opt.value)}
                            value={opt.label}
                            onSelect={() => select(parseValue(String(opt.value)))}
                            className={cn("cursor-pointer", itemClass)}
                          >
                            <Check
                              className={cn(
                                "mr-2 h-4 w-4",
                                active ? "opacity-100" : "opacity-0"
                              )}
                            />
                            {opt.label}
                          </CommandItem>
                        );
                      })}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>
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

export default AppCombobox;