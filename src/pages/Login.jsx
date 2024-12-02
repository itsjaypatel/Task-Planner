import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { useFirebaseContext } from '../context/FirebaseContext';
import FormErrorMessage from '../components/FormErrorMessage';

const Login = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const [customError,setCustomError] = useState(null);
  const { ERROR_CODES, signin } = useFirebaseContext();
  
  const navigate = useNavigate();
  
  function onSubmit(data){
      const {email,password,signedInUser} = data;
    //replace logic with actual firebase login
    signin(email,password)
    .then((credential) => {
      console.log("signed in user set via observer :: ",signedInUser);
      navigate('/dashboard');
    }).catch((err) => {
      console.log("error while login :: ", {code: err.code, message:err.message});
      setCustomError(ERROR_CODES[err.code] || 'Something Went Wrong');
    })
  };
  return (

    <div className='flex flex-col flex-grow items-center justify-center gap-10'>
      <h2 className='font-bold text-3xl md:text-4xl text-blue-800'>Welcome Back!!</h2>  
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full px-2 sm:px-0  sm:w-1/2 md:w-1/3 gap-2'>
      {customError && <FormErrorMessage className="mx-auto" message={customError}/>}
      <input 
          className='rounded-md' 
          type='email' 
          placeholder='Email' 
          {...register("email", 
          { required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Email is not valid"
            }
           })} />

{errors?.email?.message && <FormErrorMessage message={errors?.email?.message}/>}
        
<input className='rounded-md' type='password' placeholder='Password'
          {...register("password",
            {
              onChange : (e) => console.log(e.target.value),
              required: "Password is required",
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/i,
                message: "Password not matching following requirements: Password must contain at least 8 characters, a lower case character, an upper case character, a non-alphanumeric character."
              }
            }
          )} />
        {errors?.password?.message && <FormErrorMessage  message={errors?.password?.message}/>}
        <div className='flex flex-col md:flex-row md:justify-between'>
        <button className='p-2 rounded-md bg-blue-700 hover:bg-blue-500  text-white w-full md:w-fit'>Log In &nbsp;
          <i className="fa-solid fa-arrow-right" style={{color:"#ffffff"}}></i></button>
          <Link className='p-2 rounded-md  text-black font-bold w-full md:w-fit text-center' onClick={() => reset()}>Reset</Link>  
        </div>
      </form>
    </div>
  )
}

export default Login