import { Outlet } from 'react-router-dom'

export default function StartupLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-950 text-white">
      <div className="w-full max-w-2xl px-4">
        <Outlet />
      </div>
    </div>
  )
}
