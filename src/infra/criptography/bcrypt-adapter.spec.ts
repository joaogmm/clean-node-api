import bcrypt from 'bcrypt'
import { BCryptAdapter } from './bcrypt-adapter'

jest.mock('bcrypt', () => ({
  async hash (): Promise<string> {
    return new Promise(resolve => resolve('hash'))
  }
}))

describe('BCrypt Adapter', () => {
  test('Should call BCrypt with correct value', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.encrypt('any_value')
    expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
  })

  test('Should a hash success', async () => {
    const salt = 12
    const sut = new BCryptAdapter(salt)
    const hash = await sut.encrypt('any_value')
    expect(hash).toBe('hash')
  })
})
