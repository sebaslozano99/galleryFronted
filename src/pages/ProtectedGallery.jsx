import { Outlet, Navigate } from "react-router-dom";
import { useUserContext } from "../context/UserContext";
import SquareLoader from "../components/SquareLoader";

export default function ProtectedGallery() {

  const { isAuthenticated, isLoading } = useUserContext();


  if(isLoading) return <div className="flex justify-center items-center w-full min-h-[92vh]" >
    <SquareLoader />
  </div>

  if(!isAuthenticated) return <Navigate to="/auth/login" replace />

  return (
    <main className="p-6 w-full min-h-[92vh] bg-gray-100" >
      <Outlet />
    </main>
  )
}

