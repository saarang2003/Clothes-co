
import {registerFormControls} from '../../components/config/index';
import { Link, useNavigate } from 'react-router-dom';
import CommonForm from '@/components/common/form';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '@/store/auth-slice';
import { useToast } from '@/hooks/use-toast';




const initialState = {
  username: "",
  email: "",
  password: "",
};


function AuthRegister() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {toast} = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerUser(formData)).then((data) => {
      console.log(data); // Log the data for debugging
      if (data?.payload?.success) {
        toast({
          description: data?.payload?.message, // Ensure this is 'description'
        });
        navigate("/auth/login");
      } else {
        toast({
          description: data?.error?.message,
          variant: "destructive",
        });
      }
    });
  }
  

  console.log(formData);
  

  return (
    <div className='mx-auto space-y-4 w-full max-w-md'>
      <div className='text-center'>
        <h1 className='font-bold text-3xl tracking-light text-foreground '>
          Create New Account
        </h1>
        <p className='mt-1'>
          Already have an account?
          <Link className='font-medium ml-2 text-primary hover:underline' to='/auth/login'>
          Login</Link>
        </p>
      </div>
      <CommonForm
        formControls={registerFormControls}
        formData={formData}
        setFormData={setFormData}
        buttonText={"Sign up"}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export default AuthRegister