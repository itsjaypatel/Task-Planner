import { useEffect, useState } from "react";
import { findByQuery } from "../backend/TaskManager";
import { useFirebaseContext } from "../context/FirebaseContext";
import { where } from "firebase/firestore";

function useFetchTasks(defaultFilters) {

    
    const { appUser } = useFirebaseContext();


    // console.log("appuser email :: ", appUser?.email)
    const [query, setQuery] = useState([where('user','==',appUser.email)]);
    const [refresh, setRefresh] = useState(true);
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (refresh) {
            //refresh on
            console.log("Fetching tasks starts");
            findByQuery(query)
                .then(querySnapShot => {
                    const arr = [];
                    querySnapShot.forEach((doc) => arr.push({ ...doc.data(),id:doc.id }));
                    console.log("Fetching tasks starts :: success :: " , arr);
                    setData(arr);
                    setError(null);
                }).catch((error) => { 
                    console.error("Fetching tasks starts :: failed :: " , error);
                    setError(error);
                }).finally(() => {
                    setRefresh(false);
                });
        } else {
            //refresh off
        }
    }, [refresh])

    return { data, error, refresh, setRefresh, setQuery };
}

export default useFetchTasks;