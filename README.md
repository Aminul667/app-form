# 🧩 app-form

**Reusable form components for React using React Hook Form, Zod, Tailwind CSS, and Shadcn UI — with CLI scaffolding.**

![npm](https://img.shields.io/npm/v/app-form)
![license](https://img.shields.io/npm/l/app-form)
![downloads](https://img.shields.io/npm/dm/app-form)

---

## ✨ Features

- ✅ Built with `react-hook-form` and `zod`
- ✅ Uses `Tailwind CSS` + `shadcn/ui` components
- ✅ Reusable form fields: Input, Select, Checkbox, Image Upload, etc.
- ✅ Simple CLI scaffolding: `npx app-form init`
- ✅ Smart path resolution (auto-detects `src/components/`, etc.)
- ✅ Checks for required `shadcn` UI components

---

## 📦 Installation

```bash
npm install app-form
```

## ⚙️ Scaffold Components

After installation, run the CLI:

```bash
npx app-form init
```

This will:

- Detect or create your `components/ folder`
- Scaffold form components into `components/app-form/`
- Check for required `shadcn/ui` components like `input.tsx`, `label.tsx`, etc.

**Optional Custom Path:**

```bash
npx app-form init --dir=src/shared/ui
```

## 🔌 Peer Dependencies

You must have the following packages installed in your project:

```bash
npm install react react-dom react-hook-form zod @hookform/resolvers tailwindcss class-variance-authority
```

And make sure shadcn/ui components (like `input`, `label`, etc.) are generated.

```bash
npx shadcn-ui@latest add input label checkbox select
```

## 📁 Scaffolded Components

Once initialized, you'll get:

<pre> 
components/ 
└── app-form/
    ├── app-input-field.tsx 
    ├── app-select.tsx 
    ├── app-checkbox.tsx 
    ├── app-image-upload.tsx 
    └── app-form.tsx
</pre>

These are modular, reusable, typed form components ready for integration.

---

## 🧠 Usage Example

Create a `zod` schema

```js
// example.schema.ts
import z from "zod";

const genderValues = ["male", "female", "other"] as const;

const imageSchema = z.custom<File>(
  (file) => {
    return (
      file instanceof File &&
      file.size <= 10 * 1024 * 1024 &&
      file.type.startsWith("image/")
    );
  },
  {
    message: "Each file must be an image under 10MB",
  }
);

export const exampleSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  age: z.preprocess((val) => {
    const number = Number(val);
    return isNaN(number) ? undefined : number;
  }, z.number().int().positive("Age must be a positive integer")),
  gender: z.preprocess(
    (val) => (typeof val === "string" && val.trim() === "" ? undefined : val),
    z
      .string()
      .optional()
      .refine(
        (val): val is string => !!val && genderValues.includes(val as any),
        {
          message: "Gender is required",
        }
      )
  ),
  images: z
    .any() // <- accept anything first to prevent early error
    .transform((val) => (Array.isArray(val) ? val : [])) // <- coerce undefined/null to []
    .pipe(
      z
        .array(imageSchema)
        .min(1, "At least one image is required")
        .max(10, "You can upload up to 10 images")
    ),
  termsAndCondition: z.boolean().refine((val) => val === true, {
    message: "You must agree to the terms and conditions",
  }),
});

export type TExample = z.infer<typeof exampleSchema>;
```

Pass the schema into the app-form

```js
import { exampleSchema, TExample } from "@/schema/example.schema";
import { AppForm } from "../app-form/app-form";
import AppInputField from "../app-form/app-input-field";
import { Button } from "../ui/button";
import AppSelectItem from "../app-form/app-selectItem";
import AppCheckbox from "../app-form/app-checkbox";
import { Handshake } from "lucide-react";
import AppFileUploader from "../app-form/app-file-uploader";

const Example = () => {
  const listingTypeConstants = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const onSubmit = (data: TExample) => {
    console.log(data);
  };

  return (
    <div>
      <h2>Example</h2>
      <AppForm<TExample>
        schema={exampleSchema}
        defaultValues={{
          termsAndCondition: false,
        }}
        onSubmit={onSubmit}
        className="space-y-4"
      >
        {({ register, control, formState: { errors } }) => {
          return (
            <>
              <AppInputField
                name="firstName"
                type="text"
                label="First Name *"
                placeholder="First"
                register={register}
                errors={errors}
                containerClass="space-y-2"
                inputClass="bg-white border-gray-500/30 focus:border-gray-700 focus:ring-gray-900/20"
                labelClass="text-sm font-medium flex items-center"
              />
              <AppInputField
                name="lastName"
                type="text"
                label="Last Name *"
                placeholder="Doe"
                register={register}
                errors={errors}
                containerClass="space-y-2"
                inputClass="bg-white border-gray-500/30 focus:border-gray-700 focus:ring-gray-900/20"
                labelClass="text-sm font-medium flex items-center"
              />
              <AppInputField
                name="age"
                type="number"
                label="Age *"
                placeholder="Age"
                register={register}
                errors={errors}
                containerClass="space-y-2"
                inputClass="bg-white border-gray-500/30 focus:border-gray-700 focus:ring-gray-900/20"
                labelClass="text-sm font-medium flex items-center"
              />
              <AppSelectItem
                name="gender"
                control={control}
                label="Gender *"
                placeholder="Select your gender"
                options={listingTypeConstants}
                errors={errors}
                containerClass="space-y-2"
                labelClass="text-sm font-medium mb-2"
                triggerClass="w-full border-gray-500/30 focus:border-gray-700 focus:ring-gray-900/20"
                contentClass="bg-white border-gray-500/30"
                itemClass="hover:bg-[#B1AB86]/10"
              />
              <AppCheckbox
                name="termsAndCondition"
                control={control}
                label="Terms and condition"
                icon={<Handshake className="w-4 h-4" />}
                errors={errors}
                checkboxClass="border border-gray-800 data-[state=checked]:bg-gray-800 data-[state=checked]:border-gray-900"
                labelClass="text-sm flex items-center cursor-pointer"
              />
              <AppFileUploader
                name="images"
                control={control}
                label="Upload images"
                maxImages={10}
                maxFileSizeMB={10}
                errors={errors}
              />
              <Button type="submit" className="w-full">Save</Button>
            </>
          );
        }}
      </AppForm>
    </div>
  );
};

export default Example;
```

It is also possible to use any form filed.

```js
// login.schema.ts
import z from "zod";

export const loginSchema = z.object({
  email: z.string().refine((val) => val.includes("@"), {
    message: "Invalid email address",
  }),

  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type TLoginFormValues = z.infer<typeof loginSchema>;
```

```js
import { AppForm } from "../app-form/app-form";
import { loginSchema, TLoginFormValues } from "@/schema/login.schema";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import { useState } from "react";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (data: TLoginFormValues) => {
    console.log(data);
  };

  return (
    <div>
      <AppForm<TLoginFormValues>
        schema={loginSchema}
        onSubmit={onSubmit}
        className="space-y-4"
      >
        {({ register, formState: { errors } }) => (
          <>
            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-[#0A400C] block"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                <Input
                  {...register("email")}
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20 text-[#0A400C] placeholder:text-[#819067]/60"
                />
              </div>
              {errors?.email && (
                <p className="text-red-500 mt-1">
                  {(errors.email as { message?: string })?.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[#0A400C] block"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#819067] w-4 h-4" />
                <Input
                  {...register("password")}
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="pl-10 pr-10 bg-white border-[#B1AB86]/30 focus:border-[#819067] focus:ring-[#819067]/20 text-[#0A400C] placeholder:text-[#819067]/60"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#819067] hover:text-[#0A400C] transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
              {errors?.password && (
                <p className="text-red-500 mt-1">
                  {(errors.password as { message?: string })?.message}
                </p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-[#819067] border-[#B1AB86] rounded focus:ring-[#819067]/20"
                />
                <span className="text-[#819067]">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-[#819067] hover:text-[#0A400C] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              type="submit"
              className="w-full bg-[#819067] hover:bg-[#0A400C] text-white font-semibold py-3 transition-all duration-300 transform cursor-pointer"
            >
              Login
            </Button>
          </>
        )}
      </AppForm>
    </div>
  );
};

export default Login;
```

## 🛠 Development

To work on this package locally:

```bash

```

## 🚀 Publishing

To release a new version:

```bash

```

## 📄 License

MIT

Built with ❤️ by Md Aminul Islam (Rahat)
