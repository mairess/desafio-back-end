import { Exception } from '@adonisjs/core/exceptions'

export default class NotFoundException extends Exception {
  constructor(entity: string, id: string) {
    super(`${entity} not found with id ${id}`, { status: 404 })
  }
}
