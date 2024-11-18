import vine, { SimpleMessagesProvider } from '@vinejs/vine'

export const createPhoneValidator = vine.compile(
  vine.object({
    phoneNumber: vine
      .string()
      .trim()
      .regex(/^\d{11}$/)
      .unique(async (db, value) => {
        const phone = await db.from('phones').where('phone_number', value).first()
        return !phone
      }),
  })
)

export const updatePhoneValidator = vine.compile(
  vine.object({
    phoneNumber: vine
      .string()
      .trim()
      .regex(/^\d{11}$/)
      .unique(async (db, value, field) => {
        const phone = await db.from('phones').where('phone_number', value).first()
        return !phone
      }),
  })
)

vine.messagesProvider = new SimpleMessagesProvider({
  regex: 'The {{ field }} field must contain exactly 11 digits',
})
