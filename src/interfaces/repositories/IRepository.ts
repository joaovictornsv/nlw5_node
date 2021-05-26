import { Repository } from 'typeorm';

export interface IRepository<T> extends Repository<T>{}
