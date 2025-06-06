# Task Management App

A modern, full-stack task management application built with **Next.js 14**, **Supabase**, **Tailwind CSS**, and **Lucide React**. This app demonstrates best practices in authentication, CRUD operations, responsive UI, and deployment.

---

## 🚀 Features

- **User Authentication**: Secure sign up, log in, and log out with Supabase Auth
- **Task Management**: Create, read, update, and delete tasks
- **Task Status**: Mark tasks as completed or pending
- **(Optional) Task Categories**: Organize tasks by category (can be disabled)
- **Responsive Design**: Mobile-first, works on all devices
- **Modern UI**: Tailwind CSS, glassmorphism, gradients, and Lucide icons
- **Error Handling**: User-friendly error messages and loading states

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Backend/DB**: Supabase (Postgres, Auth, API)
- **Styling**: Tailwind CSS, Lucide React icons

---

## 📦 Installation & Setup

### Prerequisites

- Node.js 18+
- Supabase project (free tier is fine)
- Git

### 1. Clone the Repository

```bash
git clone <your-repository-url>
cd task-management-app
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env.local` file in the root:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Get these values from your Supabase project settings.

### 4. Start the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🗂️ Project Structure

<<<<<<< HEAD
```
=======
```bash

>>>>>>> 22d4a74 (your commit message)
task-management-app/
├── app/
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── signup/page.tsx
│   ├── dashboard/page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   └── (your UI components)
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── types.ts
├── public/
│   └── (static assets)
├── tailwind.config.js
├── package.json
└── README.md
```

---

## ✨ Usage

- **Sign Up / Log In:** Register or log in with your email and password.
- **Create Task:** Add a new task with a title and description.
- **(Optional) Category:** If enabled, select a category for your task.
- **Task List:** View, complete, or delete your tasks.
- **Sign Out:** Log out securely.

---

## 🛡️ Security

- **Supabase Auth**: Handles all authentication securely.
- **Environment Variables**: Sensitive keys are never committed.
- **RLS Policies**: Supabase Row Level Security ensures users only access their own data.

---

## 🌐 Deployment

### Deploy to Vercel

1. **Push your code to GitHub:**

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Import your repo on [vercel.com](https://vercel.com)**
3. **Set environment variables** in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **Deploy!**

---

## 📝 Customization

- **Categories:** If you don’t want categories, you can remove the dropdown from the task form and related code.
- **Styling:** Tweak Tailwind classes in your components for your own look.
- **Icons:** Use any Lucide icon you like.

---

## 🧑‍💻 Contributing

Pull requests are welcome! For major changes, please open an issue first.

---

## 📄 License

MIT

---

<<<<<<< HEAD
**Built with ❤️ using Next.js, Supabase, and Tailwind CSS**
=======
### Built with ❤️ using Next.js, Supabase, and Tailwind CSS
>>>>>>> 22d4a74 (your commit message)
