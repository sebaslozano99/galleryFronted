import { Outlet } from "react-router-dom";
import Header from "../components/Header";



export default function Layout() {
  return (
    <>
      <Header />
      <main className="w-full bg-gray-100" >
        <Outlet />
      </main>
    </>
  )
}
