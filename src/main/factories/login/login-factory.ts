import env from '../../config/env'
import { Controller } from '../../../presentation/protocols'
import { makeLoginValidation } from './login-validation'
import { LoginController } from '../../../presentation/controllers/login/login'
import { DbAuthentication } from '../../../data/usecases/authentication/db-authentication'
import { LogControllerDecorator } from '../../decorators/log'
import { LogMongoRepository } from '../../../infra/db/mongodb/log-repository/log'
import { AccountMongoRepository } from '../../../infra/db/mongodb/account-repository/account'
import { JwtAdapter } from '../../../infra/criptography/jwt-adapter/jwt-adapter'
import { BCryptAdapter } from '../../../infra/criptography/bcrypt-adapter/bcrypt-adapter'

export const makeLoginController = (): Controller => {
  const salt = 12
  const bCryptAdapter = new BCryptAdapter(salt)
  const jwtAdapter = new JwtAdapter(env.jwtSecret)
  const accountMongoRepository = new AccountMongoRepository()
  const dbAuthentication = new DbAuthentication(accountMongoRepository, bCryptAdapter, jwtAdapter, accountMongoRepository)
  const loginController = new LoginController(dbAuthentication, makeLoginValidation())
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(loginController, logMongoRepository)
}
