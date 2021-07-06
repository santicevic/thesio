import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject('SUBJECT_REPOSITORY')
    private subjectsRepository: Repository<Subject>,
  ) {}

  async getAll(): Promise<Subject[]> {
    return this.subjectsRepository.find();
  }
}
