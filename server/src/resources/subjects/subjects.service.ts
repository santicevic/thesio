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
    return this.subjectsRepository.find({ relations: ['professor'] });
  }
  create(subjectToCreate: Partial<Subject>): Promise<Subject> {
    return this.subjectsRepository.save(subjectToCreate);
  }
  update(subjectToUpdate: Partial<Subject>): Promise<any> {
    return this.subjectsRepository.update(subjectToUpdate.id, subjectToUpdate);
  }
}
