import { Outlet } from "react-router"
import ShoppingHeader from "./header"


function ShoppingLayout() {
  return (
    <div className="flex flex-col bg-white overflow-hidden ">
        <ShoppingHeader/>
        <main className="  flex-1  flex flex-col bg-muted/90 p-4 md:p-6">
        <Outlet/>
        </main>
    </div>
  )
}

export default ShoppingLayout