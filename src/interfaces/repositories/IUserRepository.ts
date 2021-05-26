import { UserRepository } from '@repositories/UserRepository';

type T = typeof UserRepository

export interface IUserRepository extends T {}
