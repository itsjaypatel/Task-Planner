import React, { useEffect, useState } from 'react'
import { add, deleteById, findByQuery, timeToFinish, updateById } from '../backend/TaskManager';
import EditForm from '../components/EditForm';
import CreateForm from '../components/CreateForm';
import DeleteAlert from '../components/DeleteAlert';
import Table from '../components/Table';
import DateUtil from '../utils/DateUtil';
import Modal from '../components/Model';
import { where } from 'firebase/firestore';
import useFetchTasks from '../hooks/useFetchTasks';
import { useFirebaseContext } from '../context/FirebaseContext';
import Loader from '../components/Loader';
const TaskList = () => {

  const filters = {
    "priority": { key: "priority", options: [1, 2, 3, 4, 5] },
    "completed": { key: "completed", options: [true, false] }
  };

  const [selectedTasks, setSelectedTasks] = useState(new Set([]));
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [addFormVisibllity, setAddFormVisiblity] = useState(false);
  const [deleteAlertVisiblity, setDeleteAlertVisblity] = useState(false);
  const [activeFilters, setActiveFilters] = useState(filters);
  const { data, error, refresh, setRefresh, setQuery } = useFetchTasks();
  
  useEffect(() => { 
    
    const query = [
      where("user","==",appUser.email)
    ];
    if(activeFilters.priority.options.length === 1){
      query.push(where("priority", "==", activeFilters.priority.options.at(0)))
    }
    
    if(activeFilters.completed.options.length === 1){
      query.push(where("completed", "==", activeFilters.completed.options.at(0)));
    }

    setQuery(query);
    setRefresh(true);
    
  }, [activeFilters])
  
  const { appUser } = useFirebaseContext();
  
  async function onAddTask(data) {
    try {
      console.log("insert new task :: starts :: ", data);
      const docId = await add(data);
      console.log("insert task :: success :: id :: ", docId)
      setAddFormVisiblity(visible => visible = false);
      // setQuery([]);
      setRefresh(true);
    } catch {
      console.error("insert new task :: failed :: ", err);
      setAddFormVisiblity(visible => visible = false);
    }
  }
  
  async function onUpdate(data) {
    try {
      console.log("update task :: starts :: id :: data :: ", taskToEdit, data);
      const docRef = await updateById(taskToEdit, data);
      console.log("update task :: success :: ", taskToEdit);
      setTaskToEdit((taskToEdit) => taskToEdit = null);
      setRefresh(true);
    } catch (error) {
      console.error("update task :: failed :: id :: ", taskToEdit, " :: ", error);
      setTaskToEdit((editTaskId) => editTaskId = null);
    }
  }
  
  
  async function onDelete() {
    try{
      console.log("deleteing selected task :: starts :: ", selectedTasks);
      const deleteResult = deleteById([...selectedTasks]);
      console.log("deleteing task :: success :: ", deleteResult);
      setDeleteAlertVisblity(false);
      setSelectedTasks(new Set([]));
      setRefresh(true);
    }catch(err){
      console.error("deleting task :: failed :: ", err);
      setTaskToEdit((editTaskId) => editTaskId = null);
    }
  }
  
  
  
  
  function updateActiveFilters(filterKey, e) {
    if (filterKey === "priority") {
      if (Number(e.target.value) === -1) {
        setActiveFilters({ ...activeFilters, priority: { "key": "priority", "options": [1, 2, 3, 4, 5] } })
      } else {
        setActiveFilters({ ...activeFilters, priority: { "key": "priority", "options": [Number(e.target.value)] } })
      }
    } else if (filterKey === "completed") {
      if (Number(e.target.value) === -1) {
        setActiveFilters({ ...activeFilters, completed: { "key": "completed", "options": [true, false] } })
      } else {
        setActiveFilters({ ...activeFilters, completed: { "key": "completed", "options": [e.target.value == true] } })
      }
    }
  }
  
  if(refresh) return <Loader/>
  return (
    <div className='flex-grow'>
      <h2 className='m-5 text-4xl font-bold'>Task List</h2>
      <div className='m-5 flex flex-row p-2 text-white justify-between'>
        <div className='flex flex-row w-full'>
          <button className='me-5 p-2 font-medium rounded-md cursor-pointer border border-blue-700 text-blue-700' onClick={() => {
            setAddFormVisiblity(true);
          }}>
            <i className="fa-solid fa-circle-plus fa-sm mr-1" style={{ color: "#005eff" }}></i>
            Add Task</button>
          
           <button className='p-2 font-medium rounded-md cursor-pointer border border-red-700 text-red-700' onClick={(e) => setDeleteAlertVisblity(true)} hidden={selectedTasks.size === 0}>
              <i className="fa-solid fa-trash fa-sm text-center mr-1" style={{ color: "#ff0000" }} ></i>
              Delete Selected</button>
          

          <div className='ml-auto flex gap-2'>

            {/* <select className='text-black rounded-md' name="sort" onChange={(e) => {
              setSortAndFilterInfo({ ...sortAndFilterInfo, sortKey: Number(e.target.value) })
              }} >
                <option value={-1} autoFocus>Sort</option> // -1
                <option value={0}>Start Time: ASC</option> // 0
                <option value={1}>Start Time: DESC</option> // 1
                <option value={2}>End Time: ASC</option> //
                <option value={3}>End Time: DESC</option>
              </select> */}

            <select className='text-black rounded-md' name="priority" value={
              activeFilters.priority.options.length === 5 ? -1 :
              activeFilters.priority.options[0]
            } onChange={(e) => {
              updateActiveFilters("priority", e);
            }} >
              <option value={-1}>Priority: All</option> // -1
              <option value={1} >Priority: 1</option> // 1
              <option value={2} >Priority: 2</option> //
              <option value={3} >Priority: 3</option>
              <option value={4} >Priority: 4</option>
              <option value={5} >Priority: 5</option>
            </select>

            <select className='text-black rounded-md' name="completed" value={
              activeFilters.completed.options.length === 2 ? -1 :
              ((activeFilters.completed.options.includes(false)) ? 0 : 1)
            } onChange={(e) => {
              updateActiveFilters("completed", e);
            }} >
              <option value={-1}>Status: All</option>
              <option value={0}>Status: Pending</option>
              <option value={1}>Status: Finished</option>
            </select>
          </div>
        </div>
        {/* <div>  
        <button className='p-2 mx-2 bg-white hover:bg-blue-100 text-black rounded-md' onClick={() => navigate('signup')}>Sign Up</button>
        <button className='p-2 mx-2 bg-white hover:bg-blue-100  text-black rounded-md cursor-pointer' onClick={() => navigate('login')}>Login</button>
        </div> */}
      </div>

      {data &&
        <Table columns={
          [
            <input type="checkbox" onChange={(e) => {
              if (!e.target.checked) {
                setSelectedTasks(new Set([]));
              } else {
                const ids = data.map((task) => task.id)
                setSelectedTasks(new Set(ids))
              }
            }} checked={selectedTasks.size === data.length && data.length !== 0}></input>,
            "Title",
            "Priority",
            "Status",
            "Start Time",
            "End Time",
            "Time To Finish(hrs)",
            "Edit"
          ]}
          
          matrix={
            data.map((task) =>
              [
                <input type="checkbox" checked={selectedTasks.has(task.id)} onChange={(e) => {
                  e.target.checked ? selectedTasks.add(task.id) : selectedTasks.delete(task.id);
                  setSelectedTasks(new Set(selectedTasks));
                }} color='black' />,
                task.title,
                task.priority,
                task.completed ? "Finished" : "Pending",
                `${task.startDate} ${DateUtil.convertTimeIn12Hour(task.startTime + ":00")}`,
                `${task.endDate} ${DateUtil.convertTimeIn12Hour(task.endTime + ":00")}`,
                timeToFinish(task.startDate, task.startTime, task.endDate, task.endTime),
                <i className="fa-solid fa-pencil" onClick={() => {
                  setTaskToEdit(task.id);
                }} ></i>
              ])
            } />}



      <Modal open={taskToEdit !== null} onClose={() => setTaskToEdit(null)} tasktoEdit={taskToEdit}>
        {taskToEdit && <EditForm taskToEdit={taskToEdit} onUpdate={onUpdate} onClose={() => setTaskToEdit(null)} />}
      </Modal>
      <Modal open={addFormVisibllity === true} onClose={() => setAddFormVisiblity(false)}>
        {
          addFormVisibllity && <CreateForm onAddTask={onAddTask} onClose={() => setAddFormVisiblity(false)} />
        }
      </Modal>
      <Modal open={deleteAlertVisiblity === true} onClose={() => setAddFormVisiblity(false)}>
        {
          deleteAlertVisiblity && <DeleteAlert selectedTasks={selectedTasks} onDelete={onDelete} onClose={() => setDeleteAlertVisblity(false)} />
        }
      </Modal>
    </div>
  )
}

export default TaskList