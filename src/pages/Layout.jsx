import { Outlet } from "react-router-dom";
import Header from "../components/Header";



export default function Layout() {
  return (
    <>
      <Header />
      <main className="w-full bg-slate-50" >
        <Outlet />
      </main>
    </>
  )
}
