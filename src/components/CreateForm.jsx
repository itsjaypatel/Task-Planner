import React, { useState } from 'react'
import { add } from '../backend/TaskManager';
import DateUtil from '../utils/DateUtil';
import { useFirebaseContext } from '../context/FirebaseContext';

const CreateForm = ({ onClose, onAddTask }) => {

    
    const { appUser } = useFirebaseContext();
    const { date, time } = DateUtil.getTimeInString(Date.now() + (5 * 3600 + 1800)*1000);
    const [input, setInput] = useState({
        user: appUser.email,
        title: "",
        priority: 1,
        completed: false,
        startDate: date,
        startTime: time,
        endDate: date,
        endTime: time
    });

    return (
        <>
            <h2 className='text-4xl font-bold'>Add Task</h2>

            <form className='flex flex-col mt-5' onSubmit={(e) => {

                //stop default behaviour of form
                e.preventDefault();
                e.stopPropagation();

                onAddTask(input);
            }}>
                <div className='w-full'>
                    <label className='block text-sm font-bold'>Title:</label>
                    <input className='rounded-md w-full' type='text' placeholder='Title' required value={input.id} onChange={(e) => setInput({ ...input, "title": e.target.value })} />
                </div>

                <div className='mt-2'>
                    <label className='block text-sm font-bold'>Priority:</label>
                    <input className='rounded-md w-full' type="number" min={1} max={5} value={input.priority} onChange={(e) => setInput({ ...input, priority: Number(e.target.value) })} />
                </div>
                <div className='mt-2'>
                    <div>
                        <label className='block text-sm font-bold'>Status:</label>
                        <div className='flex justify-stretch'>
                            <div>

                                <input className='rounded-md' type="radio" name='completed' checked={!input.completed} onChange={(e) => {
                                    setInput({ ...input, completed: false })
                                }} /> Pending
                            </div>
                            <div>
                                <input className='ml-2 rounded-md' type="radio" name='completed' checked={input.completed} onChange={(e) => {
                                    setInput({ ...input, completed: true })
                                }} /> Completed
                            </div>
                        </div>
                    </div>
                </div>

                <div className='mt-2'>
                    <label className='block text-sm font-bold'>Start Date & Time:</label>
                    <div>
                        <input className='rounded-md me-2' type='date' required value={input.startDate} onChange={(e) => {
                            // console.log("start date:: ", e.target.value);
                            setInput({ ...input, startDate: e.target.value })
                        }} />
                        <input className='rounded-md' type='time' required value={input.startTime} onChange={(e) => {
                            // console.log("start time:: ", e.target.value);
                            setInput({ ...input, startTime: e.target.value })
                        }} />
                    </div>
                </div>
                <div className='mt-2'>
                    <label className='block text-sm font-bold'>End Date & Time:</label>
                    <div>
                        <input className='rounded-md me-2' type='date' value={input.endDate} required onChange={(e) => {
                            // console.log("end date:: ", e.target.value);
                            setInput({ ...input, endDate: e.target.value })
                        }} />
                        <input className='rounded-md' type='time' required value={input.endTime} onChange={(e) => {
                            // console.log("end time:: ", e.target.value);
                            setInput({ ...input, endTime: e.target.value })
                        }} />
                    </div>
                </div>

                <div className='flex flex-row justify-center'>
                    <button type='submit' className='p-2 mx-2 mt-4 w-1/4 rounded-md bg-blue-700 hover:bg-blue-500  text-white'>Add</button>
                    <button type="button" className='p-2 mx-2 mt-4 w-1/4 rounded-md bg-gray-700 hover:bg-gray-500  text-white' onClick={(e) => {
                        e.preventDefault();
                        onClose();
                    }} >Cancel</button>
                </div>
            </form>
        </>
    )
}

export default CreateForm