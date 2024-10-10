import { Link, useNavigate } from "react-router-dom"
import CommonForm from "@/components/common/form"
import { loginFormControls } from "@/components/config"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useToast } from "@/hooks/use-toast"
import { loginUser } from "@/store/auth-slice"


const initialState = {
  email :"",
  password :"",
}

function AuthLogin() {
  const [formData, setFormData] = useState(initialState)
  const isDisabled = false
  const dispatch = useDispatch();
  const {toast} = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      console.log(data);
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          description: data?.error?.message,
          variant: "destructive",
        });
      }
    });
  }


  
  
  return (
    <div className="mx-auto max-w-md w-full space-y-4 ">
      <div className="text-center">
        <h1 className="font-bold  text-3xl tracking-light text-foreground  ">
          Log in to your account
        </h1>
        <p className="mt-2">
          Don't have account? 
       <Link to='/auth/register' className="font-medium ml-2 text-primary hover:underline  ">Register</Link>
        </p>
      </div>
      <CommonForm 
      formControls={loginFormControls}
      formData={formData}
      setFormData={setFormData}
      onSubmit={onSubmit}
      buttonText={isDisabled}
  />
    </div>
  )
}

export default AuthLogin