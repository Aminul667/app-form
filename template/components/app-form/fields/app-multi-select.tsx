"use client";

import { useState } from "react";
import { Controller, FieldValues } from "react-hook-form";
import { Check, ChevronsUpDown, X } from "lucide-react";

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
import { FormMultiSelectProps } from "../app-form.types";

const AppMultiSelect = <T extends FieldValues, TValue = string>({
  name,
  control,
  label,
  placeholder = "Select options",
  searchPlaceholder = "Search...",
  emptyText = "No results found.",
  options,
  errors,
  maxSelected,
  containerClass = "space-y-2",
  labelClass,
  triggerClass,
  contentClass,
  itemClass,
  chipClass,
  isDisabled = false,
}: FormMultiSelectProps<T, TValue>) => {
  const [open, setOpen] = useState(false);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        const selected: TValue[] = Array.isArray(field.value)
          ? field.value
          : [];

        const isSelected = (value: TValue) => selected.includes(value);

        const toggle = (value: TValue) => {
          if (isSelected(value)) {
            field.onChange(selected.filter((v) => v !== value));
            return;
          }
          if (maxSelected && selected.length >= maxSelected) return;
          field.onChange([...selected, value]);
        };

        const remove = (value: TValue) => {
          field.onChange(selected.filter((v) => v !== value));
        };

        const selectedOptions = options.filter((o) => isSelected(o.value));

        return (
          <div className={containerClass}>
            {label && <Label className={labelClass}>{label}</Label>}
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger
                type="button"
                disabled={isDisabled}
                className={cn(
                  "flex min-h-9 w-full items-center justify-between gap-2 rounded-md border border-gray-400 bg-white px-3 py-1.5 text-sm disabled:cursor-not-allowed disabled:opacity-50",
                  triggerClass
                )}
              >
                <div className="flex flex-1 flex-wrap items-center gap-1">
                  {selectedOptions.length === 0 ? (
                    <span className="text-muted-foreground">{placeholder}</span>
                  ) : (
                    selectedOptions.map((opt) => (
                      <span
                        key={String(opt.value)}
                        className={cn(
                          "inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-0.5 text-xs",
                          chipClass
                        )}
                      >
                        {opt.label}
                        <span
                          role="button"
                          tabIndex={-1}
                          aria-label={`Remove ${opt.label}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            remove(opt.value);
                          }}
                          className="cursor-pointer rounded-full hover:bg-slate-300"
                        >
                          <X className="h-3 w-3" />
                        </span>
                      </span>
                    ))
                  )}
                </div>
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
                        const active = isSelected(opt.value);
                        const atLimit =
                          !!maxSelected &&
                          selected.length >= maxSelected &&
                          !active;
                        return (
                          <CommandItem
                            key={String(opt.value)}
                            value={opt.label}
                            disabled={atLimit}
                            onSelect={() => toggle(opt.value)}
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

export default AppMultiSelect;