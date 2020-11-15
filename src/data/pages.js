export default [
  {},
  {
    name: 'View',
    key: 'view',
    path: '/',
    routes: [
      {
        name: 'Dashboard',
        key: 'dashboard',
        path: '/dashboard'
      },
      {
        name: 'Calendar',
        key: 'calendar',
        path: '/calendar'
      },
      {
        name: 'List',
        key: 'list',
        path: '/list'
      }
    ]
  },
  {
    name: 'Reporting',
    id: 'reporting'
  },
  { name: 'Add', id: 'add' },
  { name: 'Settings', id: 'settings' },
  { name: 'Jobs', id: 'jobs' }
];
