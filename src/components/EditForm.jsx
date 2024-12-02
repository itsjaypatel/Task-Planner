import React, { useEffect, useState } from 'react'
import { findById, updateById } from '../backend/TaskManager.js';
import DateUtil from '../utils/DateUtil.js';

const EditForm = ({taskToEdit, onClose, onUpdate}) => {

  const [input,setInput] = useState(null);
  
  useEffect(function(){
    //fetch task from firestore
    findById(taskToEdit)
        .then((docSnap) => {
            if(docSnap.exists()){
                // console.log("received data :: " , docSnap.data());
                setInput({...docSnap.data(),id: taskToEdit});
            }else{
                console.log("data not exists");
            }
        }).catch(err => {
            console.error("Error while fetching data inside editform from db :: ", err)
        });   
  },[])

      
  return (
    <>
            <h2 className='text-4xl font-bold'>Edit Task</h2>
            <p className='text-sm font-light'>Task Id: {taskToEdit}</p>

            <form className='flex flex-col mt-5' 
            onSubmit={
                (e) => {
                    e.preventDefault();
                    if(input.completed){
                        const { date, time } = DateUtil.getTimeInString(DateUtil.currentIndianTimeInMillis());
                        onUpdate({...input,endDate:date,endTime:time});
                    }else{
                        onUpdate(input);
                    }
                }
            }>
                <div className='w-full'>
                    <label className='block text-sm font-bold'>Title:</label>
                    <input className='rounded-md w-full' type='text' placeholder='Title' required value={input?.title} onChange={(e) => setInput({...input,"title":e.target.value})}/>
                </div>
                
                    <div className='mt-2'>
                        <label className='block text-sm font-bold'>Priority:</label>
                        <input className='rounded-md w-full' type="number" min={1} max={5} value={input?.priority} onChange={(e) => setInput({...input,"priority": Number(e.target.value)})}/>
                    </div>
                    <div className='mt-2'>
                        <div>
                            <label className='block text-sm font-bold'>Status:</label>
                            <div className='flex justify-stretch'>
                                <div>
                                    
                                    <input className='rounded-md' type="radio" name='completed' checked={!input?.completed} onChange={(e) => {
                                        setInput({...input, completed: false})
                                    }}  /> Pending
                                </div>
                                <div>
                                    <input className='ml-2 rounded-md' type="radio" name='completed' checked={input?.completed} onChange={(e) => {
                                        setInput({...input, completed: true})
                                    }} /> Completed
                                </div>
                            </div>
                        </div>
                    </div>
               
                <div className='mt-2'>
                    <label className='block text-sm font-bold'>Start Date & Time:</label>
                    <div>
                        <input className='rounded-md me-2' type='date' required value={input?.startDate} onChange={(e) => {
                            setInput({...input, startDate: e.target.value})
                        }} />
                        <input className='rounded-md' type='time' required value={input?.startTime} onChange={(e) => {
                            setInput({...input, startTime: e.target.value})
                        }} />
                    </div>
                </div>
                <div className='mt-2'>
                    <label className='block text-sm font-bold'>End Date & Time:</label>
                    <div>
                        <input className='rounded-md me-2' type='date' value={input?.endDate}  required onChange={(e) => {
                            setInput({...input, endDate: e.target.value})
                        }} />
                        <input className='rounded-md' type='time'  required value={input?.endTime} onChange={(e) => {
                            setInput({...input, endTime: e.target.value})
                        }} />
                    </div>
                </div>
                
                <div className='flex flex-row justify-center'>
                    <button type='submit' className='p-2 mx-2 mt-4 w-1/4 rounded-md bg-blue-700 hover:bg-blue-500  text-white'>Update</button>
                    <button type="button" className='p-2 mx-2 mt-4 w-1/4 rounded-md bg-gray-700 hover:bg-gray-500  text-white' onClick={(e) => {
                        e.stopPropagation();
                        onClose();
                    }} >Cancel</button>
                </div>
            </form>
        </>
  )
}

export default EditForm;