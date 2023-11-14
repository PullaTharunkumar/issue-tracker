import { MongoClient } from "mongodb"

// cloud URL
const url = "mongodb+srv://Tharunkumar:Tharun@cluster0.ik37pmo.mongodb.net/?retryWrites=true&w=majority"
let client;

export const connectToMongoDB = () => {
    // Connecting Mongo DB
    MongoClient.connect(url).then(clientInstance => {
        client = clientInstance
        console.log('MongoDB is Connected');
    }).catch(err => {
        console.log('error while connecting to MongoDB', err);
    })
}

// Retring MongoDB collect
export const collection = () =>{
    const db =  client.db('issueTracker')
    return db.collection('projects')
} 

