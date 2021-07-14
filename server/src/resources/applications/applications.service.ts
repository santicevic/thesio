import { Injectable, Inject } from '@nestjs/common';
import { ApplicationStatus } from 'src/database/enums';
import { LessThan, Repository } from 'typeorm';
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

  getByMentor(mentorId: number): Promise<Application[]> {
    return this.applicationsRepository.find({
      where: { mentor: mentorId },
      relations: ['student', 'topic'],
      order: {
        applicationDate: 'DESC',
      },
    });
  }

  getById(id: number): Promise<Application> {
    return this.applicationsRepository.findOne(id, { relations: ['mentor'] });
  }

  getPendingAdmin(year: string): Promise<Application[]> {
    return this.applicationsRepository.find({
      where: { status: ApplicationStatus.PENDING_ADMIN, year },
      relations: ['student', 'topic', 'mentor'],
    });
  }

  getPendingGrade(): Promise<Application[]> {
    return this.applicationsRepository.find({
      where: {
        status: ApplicationStatus.SCHEDULED,
        defenseDate: LessThan(new Date()),
      },
      relations: ['student', 'topic', 'mentor'],
    });
  }
}
