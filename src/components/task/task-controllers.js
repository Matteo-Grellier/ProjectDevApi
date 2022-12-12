import TaskModel from '#components/task/task-model.js'
import { updateTask } from '#components/task/task-use-cases.js'
import Joi from 'joi'

export async function index (ctx) {
  try {
    const tasks = await TaskModel.find({})
    ctx.ok(tasks)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function id (ctx) {
  try {
    if(!ctx.params.id) throw new Error('No id supplied')

    const task = await TaskModel.findOne({_id: ctx.params.id, user: ctx.state.user.id})
    if(task) 
    { 
      ctx.ok(task)
    } else {
      ctx.status = 401
    }
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function getAllByList (ctx) {
  try {
    if(!ctx.params.listId) throw new Error('No id supplied')
    const tasks = await TaskModel.findByListId(ctx.params.listId)
    ctx.ok(tasks)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}


export async function create (ctx) {
  try {
    const taskValidationSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
      list: Joi.string().required()
    })
    const { error} = taskValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)

    const userId = ctx.state.user.id
    const newTask = await TaskModel.create({...ctx.request.body, user: userId})

    ctx.ok(newTask)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function update (ctx) {
  try {
    const taskValidationSchema = Joi.object({
      title: Joi.string().required(),
      description: Joi.string(),
      list: Joi.string(),
      done: Joi.boolean()
    })
    if(!ctx.params.id) throw new Error('No id supplied')
    const { error, value } = taskValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)

    const updatedTask = await updateTask({_id: ctx.params.id, user: ctx.state.user.id}, ctx.request.body)
    if(updatedTask) 
    { 
      ctx.ok(updatedTask)
    } else {
      ctx.status = 401
    }
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function destroy (ctx) {
  try {
    if(!ctx.params.id) throw new Error('No id supplied')
    const toDestroyTask = await TaskModel.findByIdAndDelete({_id: ctx.params.id, user: ctx.state.user.id})
    if(toDestroyTask) 
    { 
      ctx.ok('Task deleted')
    } else {
      ctx.status = 401
    }
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}