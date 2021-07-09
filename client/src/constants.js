import { Home as HomeIcon, People as PeopleIcon, LibraryBooks as LibraryBooksIcon } from '@material-ui/icons';

export const ROUTES = {
  student: {
    base: { href: '/', Icon: null, text: '' },
  },
  office: {
    base: { href: '/office', Icon: null, text: '' },
  },
  professor: {
    base: { href: '/proffesor', Icon: null, text: '' },
  },
  admin: {
    base: { href: '/admin', Icon: HomeIcon, text: 'Početna' },
    users: { href: '/admin/users', Icon: PeopleIcon, text: 'Korisnici' },
    subjects: { href: '/admin/subjects', Icon: LibraryBooksIcon, text: 'Predmeti' },
  },
};

export const ROLES = {
  STUDENT: 'STUDENT',
  OFFICE: 'OFFICE',
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
