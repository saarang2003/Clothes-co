import { Outlet } from "react-router"
import AdminSidebar from "./sidebar"
import AdminHeader from "./headers"
import { useState } from "react"


function AdminLayout() {

  const [openSidebar , setOpenSidebar] = useState(false);
  
  return (
    <div className="flex min-h-screen w-full">
      <AdminSidebar open={openSidebar} setOpen={setOpenSidebar} />
      <div  className="flex flex-1 flex-col border border-purple-900 ">
        <AdminHeader setOpen = {setOpenSidebar} />
        <main className="flex-1 flex-col flex bg-muted/90 p-4 md:p-6">
        <Outlet/>
        </main>
      </div>
    </div>
  )
}

export default AdminLayout