import express from 'express';
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { usersRouter } from './routes/users.js';


dotenv.config();


const app = express();

const PORT = process.env.PORT;

const MONGO_URL = process.env.MONGO_URL;

app.use(express.json());


async function createConnection(){
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Mongo is connected");
    return client;
}

export const client = await createConnection();



app.use("/users",usersRouter);



app.listen(PORT, ()=>  console.log("Server started on the PORT", PORT) )
