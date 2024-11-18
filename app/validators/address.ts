import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createAddressValidator = vine.compile(
  vine.object({
    customerId: vine.number().positive(),
    street: vine.string(),
    number: vine.number().positive(),
    neighborhood: vine.string(),
    city: vine.string(),
    state: vine
      .string()
      .trim()
      .regex(/^[A-Z]{2}$/),
    zipCode: vine.string().fixedLength(8),
  })
)

export const updateAddressValidator = vine.compile(
  vine.object({
    customerId: vine.number().positive(),
    street: vine.string().optional(),
    number: vine.number().positive().optional(),
    neighborhood: vine.string().optional(),
    city: vine.string().optional(),
    state: vine
      .string()
      .trim()
      .regex(/^[A-Z]{2}$/)
      .optional(),
    zipCode: vine.string().fixedLength(8).optional(),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  regex: 'The {{ field }} field must be two upper letters',
})