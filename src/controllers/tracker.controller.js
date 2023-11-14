import TrackerModels from "../models/tracker.models.js"

export default class TrackerController {
    constructor() {
        this.trackerModel = new TrackerModels()
    }
    // Getting all Projects from MongoDB
    async getProject(req, res) {
        try {
            const projects = await this.trackerModel.getAllProjects()
            return res.status(200).render('homePage', { title: 'Home', projects })
        } catch (err) {
            console.log("Error getting in getProject Function", err);
        }
    }
    // Rendering Create Project Page
    createProjectPage(req, res) {
        return res.render('createProject', { title: 'Create Project' })
    }
    // create Project in MongoDB
    async createProject(req, res) {
        try {
            const { name, description, author } = req.body
            if (!name || !description || !author) {
                return
            }
            await this.trackerModel.addProject(name, description, author)
            console.log("Project added");
            return res.redirect('/')
        } catch (err) {
            console.log("Error while Create Project createProject Function", err);
        }
    }
    //project Details Page render
    async projectDetails(req, res) {
        try {
            const id = req.params
            const project = await this.trackerModel.getProject(id)
            return res.render('projectDetails', { title: 'Project Details', project, issues: project.issues })
        } catch (err) {
            console.log("Error getting in projectDetails Function", err);
        }
    }
    //create Issue Page render
    createIssuePage(req, res) {
        return res.status(200).render('createIssues', { title: 'Create Issues', id: req.params.id })
    }
    // Create Issue
    async createIssue(req, res) {
        try {
            const { title, description, label, author } = req.body
            const id = req.params
            if (!title || !description || !label || !author) {
                return
            }
            await this.trackerModel.addIssue(id, title, description, label, author)
            return res.status(201).redirect(`/project-details/${id.id}`)
        } catch (err) {
            console.log("Error getting in createIssue Function", err);
        }
    }
    // Filter based on labels
    async labelFilter(req, res) {
        try {
            const { bug, feature, enhancement, critical, inProgress, completed } = req.body
            const id = req.params;
            const project = await this.trackerModel.getProject(id)
            let issueList = project.issues.filter(issue => {
                return (bug && issue.label == bug) || (feature && issue.label == feature) || (enhancement && issue.label == enhancement) || (critical && issue.label == critical) || (inProgress && issue.label == inProgress) || (completed && issue.label == completed)
            })
            if (!bug && !feature && !enhancement && !critical && !inProgress && !completed) {
                issueList = project.issues
            }
            return res.render('projectDetails', { title: 'Project Details', project, issues: issueList })
        } catch (err) {
            console.log("Error getting in labelFilter Function", err);
        }
    }
    // Filter based on Author
    async authorFilter(req, res) {
        try {
            const id = req.params;
            const author = req.body.author
            console.log("author", author, req.body);
            const project = await this.trackerModel.getProject(id)
            let issueList = project.issues.filter(issue => issue.author == author)
            if (!author) {
                issueList = project.issues
            }
            return res.render('projectDetails', { title: 'Project Details', project, issues: issueList })
        } catch (err) {
            console.log("Error getting in authorFilter Function", err);
        }
    }
    // search function based on title description 
    async search(req, res) {
        try {
            const id = req.params;
            const { title, description } = req.body
            const project = await this.trackerModel.getProject(id)
            let issueList = project.issues.filter(issue => {
                return (title && issue.title == title) || (description && issue.description == description)
            })
            if (!title && !description) {
                issueList = project.issues
            }
            return res.render('projectDetails', { title: 'Project Details', project, issues: issueList })
        } catch (err) {
            console.log("Error getting in search Function", err);
        }
    }
}