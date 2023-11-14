import express from 'express'
import path from 'path'
import TrackerController from './src/controllers/tracker.controller.js';
import ejsLayouts from 'express-ejs-layouts'
import { connectToMongoDB } from './config/mongodb.js';

const server = express();
const trackerController = new TrackerController()
//EJS Using
server.set('view engine', 'ejs')
server.set('views', path.join(path.resolve(), 'src', 'views'))
// For Layouts
server.use(ejsLayouts)
// For Static Files
server.use(express.static('./assets'));
// used for form data
server.use(express.urlencoded({ "extended": false })) // to parse the incoming request

// Routes
// Home Route
server.get('/', (req, res) => trackerController.getProject(req, res))
// Creating Project Routes
server.get('/create-project', (req, res) => trackerController.createProjectPage(req, res))
server.post('/create-project', (req, res) => trackerController.createProject(req, res))
// Project Details Page Route
server.get('/project-details/:id', (req, res) => trackerController.projectDetails(req, res))
// Creating Issue Routes
server.get('/create-issue/:id', (req, res) => trackerController.createIssuePage(req, res))
server.post('/create-issue/:id', (req, res) => trackerController.createIssue(req, res))
// Filter and Search Routes
server.post('/labelFilter/:id', (req, res) => trackerController.labelFilter(req, res))
server.post('/authorFilter/:id', (req, res) => trackerController.authorFilter(req, res))
server.post('/search/:id', (req, res) => trackerController.search(req, res))
// Listening Port
server.listen(8080, () => {
    console.log(`Server running on port : 8080`)
    connectToMongoDB()
})