import React from 'react'

const DeleteAlert = ({selectedTasks, onClose , onDelete}) => {
  return (
    <div className='flex flex-col gap-2'>
    <i className="fa-solid fa-trash fa-2xl text-6xl text-center" style={{color: "#ff0000"}} ></i>
    <h2 className='text-2xl text-center'>Are you sure?</h2>
    <p className='text-lg text-center font-light'>You are about to delete ({selectedTasks.size}) tasks.</p>
    <div className='flex flex-row justify-center'>
        <button type='button' className='p-2 mx-2 mt-4 w-1/4 rounded-md bg-red-700 hover:bg-red-500  text-white' onClick={(e) => {
            onDelete();
        }}>Delete</button>
        <button type="button" className='p-2 mx-2 mt-4 w-1/4 rounded-md bg-gray-700 hover:bg-gray-500  text-white' onClick={(e) => {
            e.preventDefault();
            onClose();
        }} >Cancel</button>
    </div>
    </div>
  )
}

export default DeleteAlert