import { Outlet } from "react-router-dom";



export default function Auth() {
  return (
    <main className="flex justify-center items-center p-6 w-full min-h-[92vh] bg-gray-100" >
      <Outlet />
    </main>
  )
}
