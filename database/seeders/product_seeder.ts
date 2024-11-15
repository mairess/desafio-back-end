import Product from '#models/product'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Product.createMany([
      { name: 'Product 1', price: 100, description: 'Descrição do produto 1' },
      { name: 'Product 2', price: 50, description: 'Descrição do produto 2' },
      { name: 'Product 3', price: 300, description: 'Descrição do produto 3' },
      { name: 'Product 4', price: 80, description: 'Descrição do produto 4' },
      { name: 'Product 5', price: 60, description: 'Descrição do produto 5' },
      { name: 'Product 6', price: 150, description: 'Descrição do produto 6' },
      { name: 'Product 7', price: 25, description: 'Descrição do produto 7' },
      { name: 'Product 8', price: 75, description: 'Descrição do produto 8' },
      { name: 'Product 9', price: 110, description: 'Descrição do produto 9' },
      { name: 'Product 10', price: 40, description: 'Descrição do produto 10' },
      { name: 'Product 11', price: 90, description: 'Descrição do produto 11' },
      { name: 'Product 12', price: 120, description: 'Descrição do produto 12' },
      { name: 'Product 13', price: 180, description: 'Descrição do produto 13' },
      { name: 'Product 14', price: 65, description: 'Descrição do produto 14' },
      { name: 'Product 15', price: 55, description: 'Descrição do produto 15' },
    ])
  }
}
