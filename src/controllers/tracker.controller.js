import TrackerModels from "../models/tracker.models.js"

export default class TrackerController {

    constructor() {
        this.trackerModel = new TrackerModels()
    }

    async getProject(req, res) {
        const projects = await this.trackerModel.getAllProjects()
        return res.status(200).render('homePage', { title: 'Home', projects })
    }

    createProjectPage(req, res) {
        return res.render('createProject', { title: 'Create Project' })
    }

    async createProject(req, res) {
        const { name, description, author } = req.body
        if (!name || !description || !author) {
            return
        }
        await this.trackerModel.addProject(name, description, author)
        console.log("Project addded");
        return res.redirect('/')
    }

    async projectDetails(req, res) {
        const id = req.params
        const project = await this.trackerModel.getProject(id)
        return res.render('projectDetails', { title: 'Project Details', project, issues : project.issues })
    }
    createIssuePage(req, res) {
        return res.status(200).render('createIssues', { title: 'Create Issues', id : req.params.id })
    }

    async createIssue(req, res) {
        const { title, description, label, author } = req.body
        const id = req.params
        if (!title || !description || !label || !author) {
            return
        }
        await this.trackerModel.addIssue(id, title, description, label, author)
        console.log("Issuse addded",id);
        return res.status(201).redirect(`/project-details/${id.id}`)
    }

    async labelFilter(req,res){
        const { bug, feature, enhancement, critical, inProgress, completed } = req.body
        const id = req.params;
        const project = await this.trackerModel.getProject(id)
        let issueList = project.issues.filter(issue => {
            return (bug && issue.label == bug) || (feature && issue.label == feature) || (enhancement && issue.label == enhancement) || (critical && issue.label == critical) || (inProgress && issue.label == inProgress) || (completed && issue.label == completed)
        })
        if(!bug && !feature && !enhancement && !critical && !inProgress && !completed){
            issueList = project.issues
        }
        return res.render('projectDetails', { title: 'Project Details', project, issues : issueList}) 
    }

    async authorFilter(req,res){
        const id = req.params;
        const author = req.body.author
        console.log("author",author,req.body);
        const project = await this.trackerModel.getProject(id)
        let issueList = project.issues.filter(issue => issue.author == author)
        if(!author){
            issueList = project.issues
        }
        return res.render('projectDetails', { title: 'Project Details', project, issues : issueList}) 
    }
    async search(req,res){
        const id = req.params;
        const { title , description } = req.body
        const project = await this.trackerModel.getProject(id)
        let issueList = project.issues.filter(issue => {
            return (title && issue.title == title ) || (description && issue.description == description )
        })
        if(!title && !description){
            issueList = project.issues
        }
        return res.render('projectDetails', { title: 'Project Details', project, issues : issueList }) 
    }
}