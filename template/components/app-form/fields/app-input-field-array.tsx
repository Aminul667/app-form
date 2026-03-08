import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { FieldValues, useFieldArray, ArrayPath } from "react-hook-form";
import { InputFieldArrayProps } from "../app-form.types";
import { Plus, Trash2 } from "lucide-react";
import { useEffect } from "react";

const AppInputFieldArray = <T extends FieldValues>({
  name,
  control,
  label,
  placeholder,
  type = "text",
  errors,
  containerClass,
  inputClass,
  labelClass,
  addButtonText = "Add",
  addButtonClass,
  minFields = 1,
}: InputFieldArrayProps<T>) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: name as ArrayPath<T>,
  });

  // Initialize with minFields if empty
  useEffect(() => {
    if (fields.length < minFields) {
      const fieldsToAdd = minFields - fields.length;
      for (let i = 0; i < fieldsToAdd; i++) {
        append("" as never);
      }
    }
  }, []);

  const defaultInputClass =
    "flex w-full items-center self-stretch px-3 py-1.5 rounded-md border border-gray-400 bg-white";

  // Get array-level errors
  const fieldErrors = errors?.[name];
  const errorMessage =
    typeof fieldErrors?.message === "string"
      ? fieldErrors.message
      : (fieldErrors as { root?: { message?: string } })?.root?.message;

  return (
    <div className={containerClass}>
      {label && <Label className={cn("mb-2", labelClass)}>{label}</Label>}
      <div className="space-y-3">
        {fields.map((field, index) => {
          // Get individual field error
          const itemError = (
            errors?.[name] as unknown as { [key: number]: { message?: string } }
          )?.[index];

          return (
            <div key={field.id}>
              <div className="flex items-center gap-2">
                <Input
                  {...control.register(`${name}.${index}` as never, {
                    valueAsNumber: type === "number",
                  })}
                  type={type}
                  placeholder={placeholder}
                  className={inputClass || defaultInputClass}
                />
                {fields.length > minFields && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => remove(index)}
                    className="shrink-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {itemError?.message && (
                <p className="text-red-500 text-sm mt-1">{itemError.message}</p>
              )}
            </div>
          );
        })}
      </div>
      {errorMessage && (
        <p className="text-red-500 text-sm mt-1">{errorMessage}</p>
      )}
      <Button
        type="button"
        variant="outline"
        onClick={() => append("" as never)}
        className={cn("mt-3", addButtonClass)}
      >
        <Plus className="h-4 w-4 mr-2" />
        {addButtonText}
      </Button>
    </div>
  );
};

export default AppInputFieldArray;
