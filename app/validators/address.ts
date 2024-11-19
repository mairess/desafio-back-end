import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createAddressValidator = vine.compile(
  vine.object({
    street: vine.string(),
    number: vine.number().positive(),
    neighborhood: vine.string(),
    city: vine.string(),
    state: vine
      .string()
      .trim()
      .regex(/^[A-Z]{2}$/),
    zipCode: vine.string().fixedLength(8),
    country: vine.string().minLength(2),
  })
)

export const updateAddressValidator = vine.compile(
  vine.object({
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
    country: vine.string().minLength(2),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  regex: 'The {{ field }} field must be two upper letters',
})
