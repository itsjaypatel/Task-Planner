import firebaseApp from "../db/firebase";
import { addDoc, and, collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, updateDoc, where } from "firebase/firestore";
import DateUtil from "../utils/DateUtil";

const db = getFirestore(firebaseApp);

export async function add(userTask){
    const docRef = await addDoc(collection(db, `tasks`),userTask);
    // console.log("Record added at path :: ", docRef);
    return docRef.id;
}

export async function findAll(){
    const querySnapshot = await getDocs(collection(db, `tasks`));
    const result = [];
    querySnapshot.forEach((doc) => result.push({...doc.data(),id: doc.id}));
    // console.log(`Records retrieved for  :: ${currentUser} :: `, result);
    return result;
}

export async function findById(docId) {
    const docRef = doc(db, "tasks",docId);
    return getDoc(docRef);
}

export async function updateById(docId,updatedData) {
    const docRef = doc(db,"tasks",docId)
    return updateDoc(docRef,updatedData)
}

export async function deleteById(docIds){
    const promises = docIds.map(docId => deleteDoc(doc(db,"tasks",docId)));
    return Promise.allSettled(promises);
}

export async function findByQuery(filters){
    return getDocs(query(collection(db, "tasks"), and(...filters)));
}

export function timeToFinish(startDate,startTime,endDate,endTime){

    const date1 = DateUtil.getTimeInMillis(startDate,startTime);
    const date2 = DateUtil.getTimeInMillis(endDate,endTime);

    return ((date2 - date1)/3600000).toFixed(1);
}

export async function dashboardStats(filters){

    const querySnapShot = await findByQuery(filters);
    const userTasks = [];
    querySnapShot.docs.forEach((doc) => userTasks.push(doc.data()));
    // (userTasks);
    const stat = {
        "total" : 0,
        "completed" : {
            "count": 0,
            "totalTimePerCompletedTask" : 0
        },
        "pending" : {
            "count": 0,
            "totalTimelapsed" : 0,
            "totalTimeToFinish": 0,
            "priority" : [
                null,
                {
                    "priority" : 1,
                    "count" :  0,
                    "timeLapsed": 0,
                    "timeToFinish": 0
                },
                {
                    "priority" : 2,
                    "count" :  0,
                    "timeLapsed": 0,
                    "timeToFinish": 0
                },
                {
                    "priority" : 3,
                    "count" :  0,
                    "timeLapsed": 0,
                    "timeToFinish": 0
                },
                {
                    "priority" : 4,
                    "count" :  0,
                    "timeLapsed": 0,
                    "timeToFinish": 0
                },
                {
                    "priority" : 5,
                    "count" :  0,
                    "timeLapsed": 0,
                    "timeToFinish": 0
                }
            ]
        }
    }

    userTasks.forEach(
        (t) => {

            stat.total += 1;
            if(t.completed){
                stat.completed.count += 1;
                stat.completed.totalTimePerCompletedTask += (
                    DateUtil.getTimeInMillis(t.endDate,t.endTime) - DateUtil.getTimeInMillis(t.startDate,t.startTime));
                
            }else{
                let timeToFinish = Math.max(0,(
                    DateUtil.getTimeInMillis(t.endDate,t.endTime) - DateUtil.currentIndianTimeInMillis()));
                let timeLapsed = DateUtil.currentIndianTimeInMillis() - DateUtil.getTimeInMillis(t.startDate,t.startTime);    
                    
                    
                stat.pending.count += 1;
                stat.pending.totalTimeToFinish += timeToFinish;
                stat.pending.totalTimelapsed += timeLapsed;

                stat.pending.priority[t.priority].count += 1;
                stat.pending.priority[t.priority].timeLapsed += timeLapsed;
                stat.pending.priority[t.priority].timeToFinish += timeToFinish;
            }
            
        })

    return stat;
}