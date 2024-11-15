import vine from '@vinejs/vine'

export const createCustomerValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(50),
    cpf: vine
      .string()
      .trim()
      .regex(/\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/)
      .unique(async (db, value) => {
        const customer = await db.from('customers').where('cpf', value).first()
        return !customer
      }),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const customer = await db.from('customers').where('email', value).first()
        return !customer
      }),
  })
)
