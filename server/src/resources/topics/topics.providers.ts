import { Connection } from 'typeorm';
import { Topic } from './topic.entity';

export const topicProviders = [
  {
    provide: 'TOPIC_REPOSITORY',
    useFactory: (connection: Connection) => connection.getRepository(Topic),
    inject: ['DATABASE_CONNECTION'],
  },
];
