import mongoose, { ConnectionStates, MongooseError } from "mongoose";
import { schemas } from "./models";

const connection : {
    isConnected:ConnectionStates|null
} = {
    isConnected:null
}

export async function connectToDB() {


    try {
        console.log(connection.isConnected);
        
        if (connection.isConnected) return;
        const db = await mongoose.connect(process.env.DB_URl as string);
        console.log("db initialized");
        connection.isConnected = db.connections[0].readyState;
        console.log(connection.isConnected);
    } catch(error:any) {
        throw new Error(error);
    }
};

export function pushModels() {
    try {

        schemas.map((s) => {
            mongoose.model(s.modelName,s.schema)
        });
    }catch(e) {
        throw e;    
    }
}