import vine from '@vinejs/vine'

export const createSaleValidator = vine.compile(
  vine.object({
    customerId: vine.number().positive(),
    productId: vine.number().positive(),
    quantity: vine.number().positive().min(1),
  })
)
