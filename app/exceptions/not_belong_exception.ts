import { Exception } from '@adonisjs/core/exceptions'

export default class NotBelongException extends Exception {
  constructor(entityA: string, idA: string, entityB: string, idB: string) {
    super(`${entityA} ${idA} does not belong to ${entityB} ${idB}`, { status: 404 })
  }
}
