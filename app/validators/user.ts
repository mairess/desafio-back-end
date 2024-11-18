import vine from '@vinejs/vine'

const password = vine.string().trim().minLength(8).optional()

export const updateUserValidator = vine.compile(
  vine.object({
    fullName: vine.string().trim().minLength(3).maxLength(50).optional(),
    email: vine
      .string()
      .trim()
      .email()
      .normalizeEmail()
      .unique(async (db, value, field) => {
        const match = await db
          .from('users')
          .select('id')
          .whereNot('id', field.meta.userId)
          .where('email', value)
          .first()

        return !match
      })
      .optional(),
    password,
  })
)
