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

```js
import { AppForm } from "@/components/app-form/app-form";
import { InputField } from "@/components/app-form/app-input-field";
import { z } from "zod";

const schema = z.object({
  email: z.string().email(),
});

export default function ExampleForm() {
  return (
    <AppForm schema={schema} onSubmit={(data) => console.log(data)}>
      {({ register, formState: { errors } }) => (
        <>
          <InputField
            register={register}
            name="email"
            label="Email Address"
            errors={errors}
          />
        </>
      )}
    </AppForm>
  );
}
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
