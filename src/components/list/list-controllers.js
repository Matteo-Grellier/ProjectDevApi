import ListModel from '#components/list/list-model.js'
import TaskModel from '#components/task/task-model.js'

import Joi from 'joi'

export async function index (ctx) {
  try {
    const lists = await ListModel.find({user: ctx.state.user.id})
    ctx.ok(lists)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function id (ctx) {
  try {
    if(!ctx.params.id) throw new Error('No id supplied')

    const list = await ListModel.findOne({_id: ctx.params.id, user: ctx.state.user.id})
    if(list) 
    { 
      list.tasks = await TaskModel.findByListId(ctx.params.id)
      ctx.ok(list)
    } else {
      ctx.status = 401
    }

  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function create (ctx) {
  try {
    const listValidationSchema = Joi.object({
      title: Joi.string().required()
    })
    const { error} = listValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)

    const userId = ctx.state.user.id
    const newList = await ListModel.create({...ctx.request.body, user: userId})
    ctx.body = newList
    
    ctx.ok(newList)
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function update (ctx) {
  try {
    const listValidationSchema = Joi.object({
      title: Joi.string().required()
    })
    if(!ctx.params.id) throw new Error('No id supplied')
    const { error, value } = listValidationSchema.validate(ctx.request.body)
    if(error) throw new Error(error)

    const updatedList = await ListModel.findByIdAndUpdate({_id: ctx.params.id, user: ctx.state.user.id}, value, { runValidators: true, new: true })
    if(updatedList) 
    { 
      ctx.ok(updatedList)
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
    // await TaskModel.deleteMany({ list:})
    const toDestroyList =  await ListModel.findByIdAndDelete({_id: ctx.params.id, user: ctx.state.user.id})
    if(toDestroyList) 
    { 
      ctx.ok(toDestroyList)
      ctx.ok('Ressource deleted')
    } else {
      ctx.status = 401
    }
  } catch (e) {
    ctx.badRequest({ message: e.message })
  }
}