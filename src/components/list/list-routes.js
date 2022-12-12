import Router from '@koa/router'
import * as listControllers from '#components/list/list-controllers.js'
import { isAuthenticatedWithUser } from '#middlewares/jwt-handler.js'


const lists = new Router()

lists.get('/', listControllers.index)
lists.get('/:id', isAuthenticatedWithUser, listControllers.id)
lists.post('/', isAuthenticatedWithUser, listControllers.create)
lists.put('/:id', isAuthenticatedWithUser, listControllers.update)
lists.del('/:id', isAuthenticatedWithUser, listControllers.destroy)

export default lists