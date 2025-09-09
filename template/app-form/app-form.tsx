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
  console.log("AppForm re-rendered");

  const methods = useForm<T>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    onMethods?.(methods);
  }, [onMethods, methods]);

  return (
    <form onSubmit={methods.handleSubmit(onSubmit)} className={className}>
      {children(methods)}
    </form>
  );
};
