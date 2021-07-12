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
    return this.subjectsRepository.find({
      relations: ['professor', 'students'],
    });
  }
  create(subjectToCreate: Partial<Subject>): Promise<Subject> {
    return this.subjectsRepository.save(subjectToCreate);
  }
  update(subjectToUpdate: Partial<Subject>): Promise<any> {
    return this.subjectsRepository.save(subjectToUpdate);
  }
  count(): Promise<number> {
    return this.subjectsRepository.count();
  }
  getByProfessorId(professorId: string): Promise<Subject[]> {
    return this.subjectsRepository.find({
      where: { professor: professorId },
      relations: ['topics'],
    });
  }
}
