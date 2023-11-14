import { MongoClient } from "mongodb"


const url = "mongodb+srv://Tharunkumar:Tharun@cluster0.ik37pmo.mongodb.net/?retryWrites=true&w=majority"
let client;

export const connectToMongoDB = () => {
    MongoClient.connect(url).then(clientInstance => {
        client = clientInstance
        console.log('MongoDB is Connected');
    }).catch(err => {
        console.log('error while connecting to MongoDB', err);
    })
}

export const collection = () =>{
    const db =  client.db('issueTracker')
    return db.collection('projects')
} 

