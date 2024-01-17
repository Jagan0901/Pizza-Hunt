import express from 'express';
import cors from "cors";
import * as dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
import { usersRouter } from './routes/users.js';


dotenv.config();


const app = express();

app.use(cors());
// const corsOptions = {
//   origin: "https://pizzas-hunt.netlify.app",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// app.use(cors(corsOptions));

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

app.get("/", (req,res) => {
    res.send(`Hello Everyone`)
});


app.use("/users",usersRouter);



app.listen(PORT, ()=>  console.log("Server started on the PORT", PORT) )
