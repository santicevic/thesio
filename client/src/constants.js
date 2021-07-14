import {
  Home as HomeIcon,
  People as PeopleIcon,
  LibraryBooks as LibraryBooksIcon,
  Description as DescriptionIcon,
} from '@material-ui/icons';

export const ROUTES = {
  student: {
    base: { href: '/', Icon: null, text: '' },
  },
  professor: {
    base: { href: '/professor', Icon: HomeIcon, text: 'Početna' },
    applications: { href: '/professor/applications', Icon: DescriptionIcon, text: 'Prijave' },
  },
  admin: {
    base: { href: '/admin', Icon: HomeIcon, text: 'Početna' },
    users: { href: '/admin/users', Icon: PeopleIcon, text: 'Korisnici' },
    subjects: { href: '/admin/subjects', Icon: LibraryBooksIcon, text: 'Kolegiji' },
  },
};

export const ROLES = {
  STUDENT: 'STUDENT',
  PROFESSOR: 'PROFESSOR',
  ADMIN: 'ADMIN',
};

export const STUDIES = {
  PEIT: 'PEIT',
  NAUTICAL: 'NAUTICAL',
  MECHANICAL: 'MECHANICAL',
  MANAGEMENT: 'MANAGEMENT',
  MARINA: 'MARINA',
};

export const LEVELS = {
  BACHELORES: 'BACHELORES',
  MASTERS: 'MASTERS',
};

export const APPLICATION_STATUS = {
  DRAFT: 'DRAFT',
  PENDING_MENTOR: 'PENDING_MENTOR',
  PENDING_ADMIN: 'PENDING_ADMIN',
  SCHEDULED: 'SCHEDULED',
  DONE: 'DONE',
};

export const ROLE_TRANSLATION = {
  STUDENT: 'Student',
  PROFESSOR: 'Profesor',
  ADMIN: 'Admin',
};

export const STUDIES_TRANSLATION = {
  PEIT: 'PEIT',
  NAUTICAL: 'Pomorska nautika',
  MECHANICAL: 'Brodostrojarstvo',
  MANAGEMENT: 'Pomorski menadžment',
  MARINA: 'Jahte i marine',
};

export const LEVELS_TRANSLATION = {
  BACHELORES: 'Preddiplomski',
  MASTERS: 'Diplomski',
};

export const APPLICATION_STATUS_TRANSLATION = {
  DRAFT: 'U pripremi',
  PENDING_MENTOR: 'Čeka potvrdu mentora',
  PENDING_ADMIN: 'Čeka potvrdu studentske službe',
  SCHEDULED: 'Zakazano',
  DONE: 'Završeno',
};
