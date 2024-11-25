import { Outlet } from "react-router-dom";


export default function Gallery() {
  return (
    <main className="p-6 w-full min-h-[92vh] bg-gray-100" >
      <Outlet />
    </main>
  )
}

