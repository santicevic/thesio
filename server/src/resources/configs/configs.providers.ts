import { Connection } from 'typeorm';
import { Config } from './config.entity';

export const configProviders = [
  {
    provide: 'CONFIG_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Config),
    inject: ['DATABASE_CONNECTION'],
  },
];
