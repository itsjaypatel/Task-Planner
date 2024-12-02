import React from 'react'

const LogoutModel = ({onClose , onLogout}) => {
  return (
    <div className='flex flex-col gap-2'>
    {/* <i className="fa-solid fa-trash fa-2xl text-6xl text-center" style={{color: "#ff0000"}} ></i> */}
    <i className="fa-solid fa-right-from-bracket text-6xl text-center"></i>
    <h2 className='text-2xl text-center'>Are you sure you want to logout?</h2>
    <div className='flex flex-row justify-center'>
      <button type="button" className='p-2 mx-2 mt-4 w-1/4 rounded-md bg-red-700 hover:bg-red-500  text-white' onClick={(e) => {
          e.preventDefault();
          onClose();
      }} >Cancel</button>
        <button type='button' className='p-2 mx-2 mt-4 w-1/4 rounded-md bg-gray-700 hover:bg-gray-500  text-white' onClick={(e) => {
            onLogout();
        }}>Yes</button>
    </div>
    </div>
  )
}

export default LogoutModel