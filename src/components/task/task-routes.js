import Router from '@koa/router'
import * as TaskControllers from '#components/task/task-controllers.js'
import { isAuthenticated, isAuthenticatedWithUser } from '#middlewares/jwt-handler.js'

const tasks = new Router()

tasks.get('/', isAuthenticatedWithUser, TaskControllers.index)
tasks.get('/:id', isAuthenticatedWithUser, TaskControllers.id)
tasks.get('/lists/:listId', isAuthenticatedWithUser, TaskControllers.getAllByList)
tasks.post('/', isAuthenticatedWithUser, TaskControllers.create)
tasks.put('/:id', isAuthenticatedWithUser, TaskControllers.update)
tasks.del('/:id', isAuthenticatedWithUser, TaskControllers.destroy)

export default tasks
