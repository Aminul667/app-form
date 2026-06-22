import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { FieldValues } from "react-hook-form";
import { TextareaFieldProps } from "../app-form.types";

const AppTextarea = <T extends FieldValues>({
  name,
  label,
  placeholder,
  rows = 4,
  register,
  errors,
  isDisabled = false,
  containerClass,
  textareaClass,
  labelClass,
}: TextareaFieldProps<T>) => {
  const defaultTextareaClass =
    "flex w-full self-stretch px-3 py-1.5 rounded-md border border-gray-400 bg-white";

  return (
    <div className={containerClass}>
      {label && (
        <Label htmlFor={name} className={cn("mb-2", labelClass)}>
          {label}
        </Label>
      )}
      <Textarea
        className={textareaClass || defaultTextareaClass}
        id={name}
        rows={rows}
        placeholder={placeholder}
        {...register(name)}
        disabled={isDisabled}
      />
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">
          {(errors[name] as { message?: string })?.message}
        </p>
      )}
    </div>
  );
};

export default AppTextarea;
