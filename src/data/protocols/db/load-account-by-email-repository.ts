import { AccountModel } from '../../models/account'

export interface LoadAccountByEmailRepository {
  loadByEmail (email: string): Promise<AccountModel>
}
