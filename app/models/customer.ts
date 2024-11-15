import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, hasOne } from '@adonisjs/lucid/orm'
import Address from './address.js'
import type { HasMany, HasOne } from '@adonisjs/lucid/types/relations'
import Phone from './phone.js'
import Sale from './sale.js'

export default class Customer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'full_name' })
  declare fullName: string | null

  @column()
  declare cpf: string

  @column()
  declare email: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Address)
  declare address: HasOne<typeof Address>

  @hasOne(() => Phone)
  declare phone: HasOne<typeof Phone>

  @hasMany(() => Sale)
  declare sales: HasMany<typeof Sale>
}
