import { ObjectId } from "mongodb";
import { collection } from "../../config/mongodb.js";

export default class TrackerModels {

    async getAllProjects() {
        const projects = await collection().find().toArray()
        return projects
    }
    async addProject(name, description, author) {
        await collection().insertOne({ name, description, author })
        return "Project Added"
    }
    async getProject(id) {
        const project = await collection().findOne({ _id: new ObjectId(id) })
        return project
    }
    async addIssue(id, title, description, label, author) {
        await collection().updateOne({ _id: new ObjectId(id) }, { $push: { issues: { title, description, label, author } } })
        return "Project Added"
    }

}