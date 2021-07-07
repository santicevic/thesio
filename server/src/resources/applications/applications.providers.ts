import { Connection } from 'typeorm';
import { Application } from './application.entity';

export const applicationProviders = [
  {
    provide: 'APPLICATION_REPOSITORY',
    useFactory: (connection: Connection) =>
      connection.getRepository(Application),
    inject: ['DATABASE_CONNECTION'],
  },
];
