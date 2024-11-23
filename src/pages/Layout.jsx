import { Outlet } from "react-router-dom";
import Header from "../components/Header";



export default function Layout() {
  return (
    <>
      <Header />
      <main className="p-6 w-full min-h-[90vh] bg-gray-100" >
        <Outlet />
      </main>
    </>
  )
}
