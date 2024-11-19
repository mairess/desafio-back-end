import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await User.createMany([
      { fullName: 'Mirosmar Gleidson', email: 'miro@mail.com', password: '12345678' },
      { fullName: 'Juliana Silva', email: 'juliana@mail.com', password: '12345678' },
    ])
  }
}
