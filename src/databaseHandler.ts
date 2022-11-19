import {openDB} from 'idb';
import { Trip } from './models/Trip';

const DATABASE_NAME = "TripManagementDB";

initDB().then(()=>{
    console.log("Database initialized complete!");
})
export const insertTrip = async(infoTrip:Trip)=> {
    const db = await openDB(DATABASE_NAME,2);
    await db.put("trip",infoTrip)
    console.log("inserted trip successfully ")
}

export const getTripByID =async (id:number) => {
    const db = await openDB(DATABASE_NAME,2);
    return await db.get("trip",id)
}

export const getAllTrip = async()=>{
    const db = await openDB(DATABASE_NAME,2);
    return await db.getAll("trip")
}

export const deleteTripById =async (id:number) => {
    const db = await openDB(DATABASE_NAME,2);
    return await db.delete("trip",id)
}
export const deleteAllTrip = async()=>{
    const db = await openDB(DATABASE_NAME,2);
    return await db.clear("trip")
}

async function initDB() {
    const db = await openDB(DATABASE_NAME,2,{
        upgrade(db){
            const store = db.createObjectStore('trip',{
                keyPath: 'id',
                autoIncrement:true
            })
        }
    })
}