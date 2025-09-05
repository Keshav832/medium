import { Quote } from "./Quote"
import type { JSX } from "react"

export function AuthLayout({ children }: { children: JSX.Element }) {
  return (
    <div className="h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="flex justify-center items-center overflow-y-auto custom-scroll">
        {children}
      </div>
      <div className="hidden lg:flex items-center justify-center bg-slate-200">
        <Quote />
      </div>
    </div>
  )
}
