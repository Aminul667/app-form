/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";

import React, { useEffect } from "react";
import {
  useForm,
  SubmitHandler,
  FieldValues,
  UseFormReturn,
  DefaultValues,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ZodType } from "zod";

type AppFormProps<T extends FieldValues> = {
  schema: ZodType<T, any, any>;
  onSubmit: SubmitHandler<T>;
  children: (methods: UseFormReturn<T>) => React.ReactNode;
  defaultValues?: DefaultValues<T>;
  className?: string;
  onMethods?: (methods: UseFormReturn<T>) => void;
};

export const AppForm = <T extends FieldValues>({
  schema,
  onSubmit,
  children,
  defaultValues,
  className,
  onMethods,
}: AppFormProps<T>) => {
  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  // `methods` is ref-stable across renders, so lift it to the parent once on
  // mount. Depending on `onMethods` here would re-fire whenever the parent
  // passes an inline callback.
  useEffect(() => {
    onMethods?.(methods);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
      {children(methods)}
    </form>
  );
};
