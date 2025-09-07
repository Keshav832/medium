# Medium Clone 📝  

A **full-stack Medium-like blogging platform** built with **React, Hono, Prisma, and PostgreSQL**.  
Users can sign up, write and publish blogs with a rich text editor (Quill), and read blogs with author info and clean UI.  

---

## 🔗 Live Demo

- **Frontend**: [https://medium-8hk.pages.dev]
- **Backend API**: [https://backend.kkasera58.workers.dev]

---

## ✨ Features  

- 🔐 **Authentication** – Sign up & Sign in with JWT  
- 📝 **Create & Publish Blogs** with rich text editor (Quill)  
- 📖 **Read Blogs** with clean full-page reader mode
- 📱 **Responsive UI** built with TailwindCSS  
- ⏳ **Skeleton Loaders & Spinners** for better UX  
- 🔄 **Infinite Scroll** to load blogs seamlessly  

---

## 🛠️ Tech Stack  

**Frontend**  
- React + TypeScript  
- TailwindCSS
- Quill (Rich text editor)  

**Backend**  
- Hono (Fast edge-compatible framework)  
- Prisma ORM  
- JWT Authentication  

**Database**  
- PostgreSQL  

---

## 📸 Screenshots  

- **Homepage**  
  ![Homepage](./screenshots/home.png)  

- **Full Blog Page**  
  ![Full Blog](./screenshots/fullblog.png)  

- **Publish Page (Editor)**  
  ![Publish](./screenshots/publish.png)  

- **Auth Pages (Signup / Signin)**  
  ![Auth](./screenshots/auth.png)  

---

## ⚡ Getting Started  

### 1️⃣ Clone the repo  
```bash
git clone https://github.com/yourusername/medium-clone.git
cd medium-clone
```

### 2️⃣ Install dependencies  
```bash
# Install all packages
cd backend
npm install

cd frontend
npm install
```

### 3️⃣ Setup environment  
Create a `.env` file in **backend/** folders. Example for backend:  
```env
DATABASE_URL="postgresql://username:password@localhost:5432/medium"
JWT_SECRET="yoursecret"
```

Create a `.wrangler.jsonc` file in **backend/** folders, and add your connection pool URL. Example for backend:  
```env
"vars": {
  "DATABASE_URL": "prisma://accelerate.prisma-data.net/?api_key=apikey",
  "JWT_SECRET"="yoursecret"
}
```

Create a `.env` file in **frontend/** folders. Example for backend:  
```env
VITE_BACKEND_URL=http://localhost:8787
```

### 4️⃣ Setup Prisma
```bash
# Inside backend/
# Optional: if you want to apply migrations locally
npx prisma migrate dev --name init_schema

npx prisma generate --no-engine
npm install @prisma/extension-accelerate
```

### 5️⃣ Run the app 
```bash
# Backend
cd backend
npm run dev

# Frontend
cd frontend
npm run dev
```

App will be available at:  
👉 Frontend: `http://localhost:5173`  
👉 Backend: `http://localhost:8787/api/v1`  

---

## 🚀 Future Improvements  

- 🗂️ Add Categories / Tags for blogs 
- 🖼️ Image upload in editor  
- 🔍 Search & Filter blogs  
- 👥 User profile pages  

---

## 🤝 Contributing  

Pull requests are welcome! For major changes, please open an issue first to discuss.  

---

## 📜 License  

MIT License © 2025 Keshav Kasera
