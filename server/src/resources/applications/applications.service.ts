import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Application } from './application.entity';

@Injectable()
export class ApplicationsService {
  constructor(
    @Inject('APPLICATION_REPOSITORY')
    private applicationsRepository: Repository<Application>,
  ) {}

  getAll(): Promise<Application[]> {
    return this.applicationsRepository.find();
  }
  getByStudentEmail(studentEmail: string): Promise<Application[]> {
    return this.applicationsRepository
      .createQueryBuilder('application')
      .innerJoinAndSelect('application.student', 'student')
      .where('student.email = :email', { email: studentEmail })
      .leftJoinAndSelect('application.topic', 'topic')
      .leftJoinAndSelect('application.mentor', 'mentor')
      .getMany();
  }
  save(application: Partial<Application>): Promise<Application> {
    return this.applicationsRepository.save(application);
  }
}
