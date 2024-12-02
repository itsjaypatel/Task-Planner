import React, { useEffect, useState } from 'react'
import { dashboardStats } from '../backend/TaskManager';
import Stats from '../components/Stats';
import Table from '../components/Table';
import { useFirebaseContext } from '../context/FirebaseContext';
import ProfileCard from '../components/ProfileCard';
import Loader from '../components/Loader';
import { where } from 'firebase/firestore';

const Dashboard = () => {

  const [stats,setStats] = useState();
  const {appUser} = useFirebaseContext();

  useEffect(()=>{
    dashboardStats([where('user','==',appUser.email)])
    .then(stats => {
      // console.log("stats :: ", stats);
      setStats(stats);
    })
  },[])

  if(!stats)  return <Loader/>

  return (
    <div className='flex-grow'>
      {/* <h2 className='m-5 text-4xl font-bold'>Dashboard</h2> */}
      {/* <ProfileCard/> */}
      <h2 className='m-5 text-3xl font-bold'>Summery</h2>
      <Stats stats={
        [
          {
            value: `${stats.total}`,
            label: "Total Tasks"
          },
          {
            value: `${Math.round((stats.completed.count * 100)/(stats.total || 1))} %`,
            label: "Tasks Completed"
          },
          {
            value: `${Math.round((stats.pending.count * 100)/(stats.total || 1))} %`,
            label: "Tasks Pending"
          },
          {
            value: `${Math.round((stats.completed.totalTimePerCompletedTask)/((stats.completed.count || 1) * 3600000))} hrs`,
            label: "Average time per completed task"
          }
        ]} />

      <h2 className='m-5 text-3xl font-bold'>Pending Task Summary</h2>
      <Stats stats={
        [
          {
            value: `${stats.pending.count}`,
            label: "Pending Tasks"
          },
          {
            value: `${Math.round((stats.pending.totalTimelapsed)/3600000)} hrs`,
            label: "Total time lapsed"
          },
          {
            value: `${Math.round((stats.pending.totalTimeToFinish)/3600000)} hrs`,
            label: "Total time to finish estimated based on endtime"
          }
        ]} />

      <Table
        columns={["Task Priority", "Pending Tasks", "Time lapsed(hrs)", "Time to finish(hrs)"]}
        matrix={
          stats
          .pending
          .priority
          .filter((ele) =>  ele !== null)
          .map(ele => [ele["priority"],ele["count"],Math.round(ele["timeLapsed"]/3600000),Math.round(ele["timeToFinish"]/3600000)])} />

    </div>
  )
}

export default Dashboard