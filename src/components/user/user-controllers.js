import UserModel from '#components/user/user-model.js'
import Joi from 'joi'
import argon2, { hash } from 'argon2'
import { sendWelcomeEmail } from '#services/mailing/welcome-email.js'

export async function register (ctx) {
  try {
  const registerValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    terms_and_conditions: Joi.boolean().valid(true).required()
  })
  const params = ctx.request.body
  const { error, value } = registerValidationSchema.validate(params)
  if(error) throw new Error(error)
  const hashedPassword = await argon2.hash(value.password)
  const newUser = new UserModel({
    ...value,
    password: hashedPassword,
    settings: {
      terms_and_conditions: value.terms_and_conditions
    }
  })
  newUser.generateEmailVerificationToken()
  const user = await newUser.save()
  await sendWelcomeEmail(user, user.settings.validation_email_token)
  const token = user.generateJWT()
  ctx.ok({ token })
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function login (ctx) {
  try {
    const loginValidationSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required()
    })
    const parameters = ctx.request.body
    const { error, value } = loginValidationSchema.validate(parameters)
    if(error) throw new Error(error)
    const user = await UserModel
      .findOne
      ({ email: value.email })
      .select('+password')
    if(!user) throw new Error('Utilisateur non trouvé')
    const isPasswordValid = await argon2.verify(user.password, value.password)
    if(!isPasswordValid) throw new Error('Mot de passe invalide')
    const token = user.generateJWT()
    ctx.ok({ token })
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function profile (ctx) {
  try {
    const user
    = await UserModel
      .findById(ctx.state.user.id)
      .select('-password')
    if(!user) throw new Error('Utilisateur non trouvé')
    ctx.ok({ user })
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}

export async function modify (ctx) {
  try {
    const modifyValidationSchema = Joi.object({
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
      terms_and_conditions: Joi.boolean().valid(true).required()
    })
    const parameters = ctx.request.body
    const { error, value } = modifyValidationSchema.validate(parameters)
    if(error) throw new Error(error)
    const user = await UserModel
      .findById(ctx.state.user.id)
      .select('+password')
    if(!user) throw new Error('Utilisateur non trouvé')
    const isPasswordValid = await argon2.verify(user.password, value.password)
    if(!isPasswordValid) throw new Error('Mot de passe invalide')
    const hashedPassword = await argon2.hash(value.password
    )
    user.email = value.email
    user.password = hashedPassword
    user.settings.terms_and_conditions = value.terms_and_conditions
    await user.save()
    ctx.ok({ user })
  } catch(e) {
    ctx.badRequest({ message: e.message })
  }
}