import React from 'react'
import { NavLink, useNavigate } from 'react-router'
import { useFirebaseContext } from '../context/FirebaseContext.jsx';

const Navbar = ({
    user,
    onSignUp,
    onLogIn,
    onLogOut}) => {
         
  return (
    <nav className='flex flex-col sm:flex-row bg-blue-700 text-lg font-semibold p-4 gap-2'>
      <div className='flex flex-col sm:flex-row gap-2'>
        <NavLink className={({isActive}) => `cursor-pointer ${isActive ? 'text-white': 'text-slate-300'} hover:text-white`} to="/dashboard" hidden={user ? false: true} >Dashboard</NavLink>
        <NavLink className={({isActive}) => `cursor-pointer ${isActive ? 'text-white': 'text-slate-300'} hover:text-white`} to="/tasks" hidden={user ? false : true}>Tasks</NavLink>
      </div>
      <div className='flex flex-col sm:flex-row sm:ml-auto gap-2'>
        {/* <button className={`mx-2  text-black rounded-md ${signupVisible || 'hidden'}`} onClick={() =>   onSignUp && onSignUp() }>Sign Up</button> */}
        <NavLink className={({isActive}) => `cursor-pointer ${isActive ? 'text-white': 'text-slate-300'} hover:text-white`} to="/signup"  hidden={user ? true : false}>Sign Up</NavLink>
        <NavLink className={({isActive}) => `cursor-pointer ${isActive ? 'text-white': 'text-slate-300'} hover:text-white`} to="/login" hidden={user ? true : false}>Log In</NavLink>
        {/* <button className={`mx-2  text-black rounded-md cursor-pointer ${loginVisible || 'hidden'}`} onClick={() => onLogIn && onLogIn()}>Login</button> */}
        <span className="text-white hover:text-white" hidden={user ? false : true}>{user?.email}</span>
        <NavLink className="cursor-pointer text-white hover:text-white" onClick={() => onLogOut && onLogOut()} hidden={user ? false: true} >Log Out</NavLink>  
        {/* <div className='rounded-full bg-white w-10 h-10 my-auto mr-4 flex justify-center items-center'>
          <i class="fa-regular fa-user"></i>
        </div> */}
      </div>
    </nav>
    
  )
}

export default Navbar