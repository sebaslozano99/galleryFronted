import { Navigate, Outlet } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import SquareLoader from "../components/SquareLoader";


export default function Auth() {

  const { isLoading, isAuthenticated } = useUserContext();


  if(isLoading) return <div className="flex justify-center items-center w-full min-h-[92vh]" >
    <SquareLoader />
  </div>

  if(isAuthenticated) return <Navigate to="/gallery" replace />

  return (
    <main className="flex justify-center items-center p-6 w-full min-h-[92vh] bg-gray-100" >
      <Outlet />
    </main>
  )
}
