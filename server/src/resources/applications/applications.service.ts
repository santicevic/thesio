import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Application } from './application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @Inject('APPLICATION_REPOSITORY')
    private applicationsRepository: Repository<Application>,
  ) {}

  async getAll(): Promise<Application[]> {
    return this.applicationsRepository.find();
  }
}
