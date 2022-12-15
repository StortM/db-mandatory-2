import { Injectable } from '@nestjs/common'
import { hash, compare, hashSync } from 'bcrypt'
import { saltRounds } from 'src/sql/auth/constants'

export interface ICryptService {
  hash(input: string): Promise<string>
  compare(input1: string, input2: string): Promise<boolean>
}

@Injectable()
export class CryptService implements ICryptService {
  async hash(input: string): Promise<string> {
    return hash(input, saltRounds)
  }

  /**
   * ONLY USE THIS FOR TESTING. OTHERWISE USE THE ASYNC VERSION.
   */
  hashSync(input: string): string {
    return hashSync(input, saltRounds)
  }

  async compare(input1: string, input2: string): Promise<boolean> {
    return compare(input1, input2)
  }
}
