import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Config } from './config.entity';

@Injectable()
export class ConfigsService {
  constructor(
    @Inject('CONFIG_REPOSITORY')
    private configsRepository: Repository<Config>,
  ) {}

  async getAll(): Promise<Config[]> {
    return this.configsRepository.find();
  }
}
