import { ObjectId } from "mongodb";
import { collection } from "../../config/mongodb.js";

export default class TrackerModels {
    // Getting All Projects From MongoDB
    async getAllProjects() {
        try {
            const projects = await collection().find().toArray()
            return projects
        } catch (err) {
            console.log("Error Getting while fetching All Projects from MongoDB", err);
        }
    }
    //updating creating Project in MongoD
    async addProject(name, description, author) {
        try {
            await collection().insertOne({ name, description, author })
            return "Project Added"
        } catch (err) {
            console.log("Error Getting while updating creating Project in MongoDB", err);
        }
    }
    //fetching Project from MongoDB
    async getProject(id) {
        try {
            const project = await collection().findOne({ _id: new ObjectId(id) })
            return project
        } catch (err) {
            console.log("Error Getting while fetching Project from MongoDB", err);
        }
    }
    //updating creating issue in MongoDB
    async addIssue(id, title, description, label, author) {
        try {
            await collection().updateOne({ _id: new ObjectId(id) }, { $push: { issues: { title, description, label, author } } })
            return "Project Added"
        } catch (err) {
            console.log("Error Getting while updating creating issue in MongoDB", err);
        }
    }
}