import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Blogs } from './pages/Blogs'
import { Blog } from './pages/Blog'
import { Publish } from './pages/Publish';
import type { JSX } from 'react'
import { Toaster } from 'react-hot-toast'

function isAuthenticated() {
  return Boolean(localStorage.getItem("token"))
}

// Protect route Publish
function ProtectedRoute({ children }: { children: JSX.Element }) {
  if (!isAuthenticated()) {
    return <Navigate to="/signin" replace />
  }
  return children
}

// Redirect away from signin/signup if already logged in
function RedirectIfAuth({ children }: { children: JSX.Element }) {
  if (isAuthenticated()) {
    return <Navigate to="/blogs" replace />
  }
  return children
}

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/blogs" replace />}/>
          <Route path="/signup" element={<RedirectIfAuth><Signup /></RedirectIfAuth>} />
          <Route path="/signin" element={<RedirectIfAuth><Signin /></RedirectIfAuth>} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blog/:id" element={<Blog />} />
          <Route path="/publish" element={<ProtectedRoute><Publish /></ProtectedRoute>} />
          <Route path="*" element={<Navigate to="/blogs" replace />} />
        </Routes>
        <Toaster position="top-left" reverseOrder={false}/>
      </BrowserRouter>
  )
}

export default App