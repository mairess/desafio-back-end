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

vine.messagesProvider = new SimpleMessagesProvider({
  regex: 'The {{ field }} field must be two upper letters',
})
