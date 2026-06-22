# 🧩 app-form

**A CLI for generating reusable, type-safe form components using React Hook Form, Zod, Tailwind CSS, and shadcn/ui.**

![npm](https://img.shields.io/npm/v/app-form)
![license](https://img.shields.io/npm/l/app-form)
![downloads](https://img.shields.io/npm/dm/app-form)

---

## ✨ Features

- ✅ Built with `react-hook-form` and `zod`
- ✅ Uses `Tailwind CSS` + `shadcn/ui` components
- ✅ Reusable form fields: Input, Textarea, Select, Checkbox, Radio, Switch, Combobox, Multi-Select, Image Upload, and more
- ✅ One-by-one component installation (shadcn-style)
- ✅ Dependency-aware CLI (auto-installs internal deps)
- ✅ Clear warnings for required shadcn & external packages
- ✅ Works with Next.js App Router ("use client")

---

## 📖 Documentation, Setup & Examples

Full setup instructions and live, copy-paste examples for every field are on the website:

### 👉 **[app-form-client.vercel.app](https://app-form-client.vercel.app)**

Visit the site for the complete setup guide (peer dependencies, shadcn/ui configuration, schema setup) and runnable examples — basic forms, login forms, and advanced programmatic control with `setValue`, `watch`, `getValues`, and `reset`.

---

## 📦 Installation

```bash
npm install app-form
```

## ⚙️ CLI Usage

List available components

```bash
npx app-form list
```

Example output:

```bash
app-form
app-input-field
app-textarea
app-checkbox
app-checkbox-group
app-switch
app-radio-group
app-select-item
app-combobox
app-multi-select
app-file-uploader
app-input-field-array
```

**Install a single component (recommended):**

```bash
npx app-form add app-input-field
```

What this does:

- Installs app-form automatically if required
- Copies files into `components/app-form/`
- Lists the required `shadcn/ui` components for each field
- Warns about external dependencies (e.g. `lucide-react`)

**Install all components:**

```bash
npx app-form init
```

## 📁 Generated File Structure

Once initialized, you'll get:

<pre> 
components/
└── app-form/
    ├── app-form.tsx
    ├── app-form.types.ts
    └── fields/
        ├── app-input-field.tsx
        ├── app-input-field-array.tsx
        ├── app-textarea.tsx
        ├── app-checkbox.tsx
        ├── app-checkbox-group.tsx
        ├── app-switch.tsx
        ├── app-radio-group.tsx
        ├── app-select-item.tsx
        ├── app-combobox.tsx
        ├── app-multi-select.tsx
        └── app-file-uploader.tsx
</pre>

All files are owned by your project and fully editable.

---

## 🔌 Peer Dependencies

You must already have these installed in your app:

```bash
npm install react react-dom react-hook-form zod @hookform/resolvers tailwindcss class-variance-authority
```

And make sure the required shadcn/ui components are generated. The CLI prints exactly which ones each field needs when you install it — see the [setup guide](https://app-form-client.vercel.app) for full details.

```bash
npx shadcn@latest add input label checkbox select
```

---

## 📄 License

ISC

Built by Md Aminul Islam (Rahat)
