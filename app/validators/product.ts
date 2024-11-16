import vine from '@vinejs/vine'

export const createProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape().minLength(3).maxLength(50),
    description: vine.string().trim().escape().minLength(3).maxLength(255),
    price: vine.number().positive(),
  })
)

export const updateProductValidator = vine.compile(
  vine.object({
    name: vine.string().trim().escape().minLength(3).maxLength(50).optional(),
    description: vine.string().trim().escape().minLength(3).maxLength(255).optional(),
    price: vine.number().positive().optional(),
  })
)
