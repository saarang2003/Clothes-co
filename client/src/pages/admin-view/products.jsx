import CommonForm from "@/components/common/form"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { Fragment } from "react"

function AdminProducts() {
  return (
   <Fragment>
    <div className="mb-5 border border-red-500 w-full flex justify-end">
      <Button>Add New Product</Button>
    </div>
    <div className="grid gap-4 border border-red-700 md:grid-cols-3 lg: grid-cols-4">
      <div className="h-[350px] w-[300px] border border-green-700 ">
        sfs
      </div>
    </div>
    <Sheet>
      <SheetContent side = "right" className ="overflow-hidden">
        <SheetHeader>
          <SheetTitle>
            Add Product
          </SheetTitle>
        </SheetHeader>
        <ProductImageUpload
        
        />
        <div className="py-6">
          <CommonForm
          
          />

        </div>
      </SheetContent>
    </Sheet>
   </Fragment>
  )
}

export default AdminProducts