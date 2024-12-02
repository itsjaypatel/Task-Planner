import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useFirebaseContext } from '../context/FirebaseContext';
import { Link, useNavigate } from 'react-router';
import FormErrorMessage from '../components/FormErrorMessage';


const SignUp = () => {
  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { ERROR_CODES, signup } = useFirebaseContext();
  const PASSWORD_REGEX_PATTERN = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;
  const [ customError, setCustomError ] = useState(null);


  const password = watch('password');

  const onSubmit = data => {
    const { email, password, confirmPassword } = data;
    console.log(data);
    signup(email,password)
    .then((credential) => {
        navigate('/dashboard');
    }).catch(err => {
      // console.log("error while sign up :: ", {code: err.code, message:err.message});
      setCustomError(ERROR_CODES[err.code] || 'Something Went Wrong');
    });
  };
  return (
    <div className='flex flex-col flex-grow items-center justify-center gap-10'>
      <h2 className='font-bold text-4xl text-blue-800'>Let's Get Started</h2>
      <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col w-full px-4 md:w-1/3 md:px-0 gap-2'>
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

        {errors?.password?.message && <FormErrorMessage message={errors?.password?.message}/>}

        <input className='rounded-md' type='password' placeholder='Confirm Password'
          {...register("confirmPassword",
            {
              required: "Confirm Password is required",
              validate: (value) => value === password || 'Confirm Password is not matching with Password'
            })} />
      
        {errors?.confirmPassword?.message && <FormErrorMessage message={errors?.confirmPassword?.message}/>}

        <div className='flex flex-col md:flex-row md:justify-between'>
          <button className='p-2 rounded-md bg-blue-700 hover:bg-blue-500  text-white w-full md:w-fit'>Sign Up &nbsp;
            <i className="fa-solid fa-arrow-right" style={{ color: "#ffffff" }}></i>
          </button>
          <Link className='p-2 rounded-md  text-black font-bold w-full md:w-fit text-center' onClick={() => { reset(); setCustomError(null);}}>Reset</Link>  
        </div>
      </form>
    </div>
  )
}

export default SignUp