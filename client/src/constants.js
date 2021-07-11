import { Home as HomeIcon, People as PeopleIcon, LibraryBooks as LibraryBooksIcon } from '@material-ui/icons';

export const ROUTES = {
  student: {
    base: { href: '/', Icon: null, text: '' },
  },
  professor: {
    base: { href: '/proffesor', Icon: HomeIcon, text: 'Početna' },
  },
  admin: {
    base: { href: '/admin', Icon: HomeIcon, text: 'Početna' },
    users: { href: '/admin/users', Icon: PeopleIcon, text: 'Korisnici' },
    subjects: { href: '/admin/subjects', Icon: LibraryBooksIcon, text: 'Predmeti' },
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
