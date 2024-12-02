import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useAuthContext } from '../context/AuthContext.jsx';
import { useFirebaseContext } from '../context/FirebaseContext.jsx';

const Navbar = ({
    user,
    onSignUp,
    onLogIn,
    onLogOut}) => {
         
  return (
    <nav className='flex flex-row bg-blue-700 text-lg font-semibold'>
      <div className='flex flex-row gap-x-12'>
        <NavLink className={({isActive}) => `cursor-pointer ${isActive ? 'text-white': 'text-slate-300'} hover:text-white ml-5 py-4`} to="/dashboard" >Dashboard</NavLink>
        <NavLink className={({isActive}) => `cursor-pointer ${isActive ? 'text-white': 'text-slate-300'} hover:text-white py-4`} to="/tasks" >Tasks</NavLink>
      </div>
      <div className='ml-auto flex flex-row gap-x-12 '>
        {/* <button className={`mx-2  text-black rounded-md ${signupVisible || 'hidden'}`} onClick={() =>   onSignUp && onSignUp() }>Sign Up</button> */}
        <NavLink className={({isActive}) => `cursor-pointer ${isActive ? 'text-white': 'text-slate-300'} hover:text-white py-4`} to="/signup"  hidden={user ? true : false}>Sign Up</NavLink>
        <NavLink className={({isActive}) => `cursor-pointer ${isActive ? 'text-white': 'text-slate-300'} hover:text-white mr-12 py-4`} to="/login" hidden={user ? true : false}>Log In</NavLink>
        {/* <button className={`mx-2  text-black rounded-md cursor-pointer ${loginVisible || 'hidden'}`} onClick={() => onLogIn && onLogIn()}>Login</button> */}
        <span className="text-white hover:text-white py-4 px-2" hidden={user ? false : true}>{user?.email}</span>
        <NavLink className="cursor-pointer text-white hover:text-white py-4 px-4" onClick={() => onLogOut && onLogOut()} hidden={user ? false: true} >Log Out</NavLink>  
        {/* <div className='rounded-full bg-white w-10 h-10 my-auto mr-4 flex justify-center items-center'>
          <i class="fa-regular fa-user"></i>
        </div> */}
      </div>
    </nav>
    
  )
}

export default Navbar