import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Subject } from './subject.entity';

@Injectable()
export class SubjectsService {
  constructor(
    @Inject('SUBJECT_REPOSITORY')
    private subjectsRepository: Repository<Subject>,
  ) {}

  getAll(): Promise<Subject[]> {
    return this.subjectsRepository.find({
      relations: ['professor', 'students'],
    });
  }

  save(subjectToCreate: Partial<Subject>): Promise<Subject> {
    return this.subjectsRepository.save(subjectToCreate);
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

  getById(id: number): Promise<Subject> {
    return this.subjectsRepository.findOne(id, { relations: ['professor'] });
  }
}
