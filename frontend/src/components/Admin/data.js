const STATUS_ON_DECK = { id: 1, name: 'On Deck', color: 'blue.300' };
const STATUS_IN_PROGRESS = {
  id: 2,
  name: 'In Progress',
  color: 'yellow.400',
};
const STATUS_TESTING = { id: 3, name: 'Testing', color: 'pink.300' };
const STATUS_DEPLOYED = { id: 4, name: 'Deployed', color: 'green.300' };
export const STATUSES = [STATUS_ON_DECK, STATUS_IN_PROGRESS, STATUS_TESTING, STATUS_DEPLOYED];

const DATA = [
  {
    task: 'Add a New Feature',
    status: STATUS_ON_DECK,
    due: new Date('2023/10/15'),
    notes: 'test11',
  },
  {
    task: 'Write Integration Tests',
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: 'test12',
  },
  {
    task: 'Add Instagram Integration',
    status: STATUS_DEPLOYED,
    due: null,
    notes: 'test13',
  },
  {
    task: 'Cleanup Database',
    status: null,
    due: new Date('2023/02/15'),
    notes: 'test14',
  },
  {
    task: 'Refactor API Endpoints',
    status: STATUS_TESTING,
    due: null,
    notes: 'test15',
  },
  {
    task: 'Add Documentation to API',
    status: null,
    due: new Date('2023/09/12'),
    notes: 'test16',
  },
  {
    task: 'Update NPM Packages',
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: 'test17',
  },
  {
    task: 'Add a New Feature',
    status: STATUS_ON_DECK,
    due: new Date('2023/10/15'),
    notes: 'test21',
  },
  {
    task: 'Write Integration Tests',
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: 'test22',
  },
  {
    task: 'Add Instagram Integration',
    status: STATUS_DEPLOYED,
    due: null,
    notes: 'test23',
  },
  {
    task: 'Cleanup Database',
    status: null,
    due: new Date('2023/02/15'),
    notes: 'test24',
  },
  {
    task: 'Refactor API Endpoints',
    status: STATUS_TESTING,
    due: null,
    notes: 'test25',
  },
  {
    task: 'Add Documentation to API',
    status: null,
    due: new Date('2023/09/12'),
    notes: 'test26',
  },
  {
    task: 'Update NPM Packages',
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: 'test27',
  },
  {
    task: 'Add a New Feature',
    status: STATUS_ON_DECK,
    due: new Date('2023/10/15'),
    notes: 'test31',
  },
  {
    task: 'Write Integration Tests',
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: 'test32',
  },
  {
    task: 'Add Instagram Integration',
    status: STATUS_DEPLOYED,
    due: null,
    notes: 'test33',
  },
  {
    task: 'Cleanup Database',
    status: null,
    due: new Date('2023/02/15'),
    notes: 'test34',
  },
  {
    task: 'Refactor API Endpoints',
    status: STATUS_TESTING,
    due: null,
    notes: 'test35',
  },
  {
    task: 'Add Documentation to API',
    status: null,
    due: new Date('2023/09/12'),
    notes: 'test36',
  },
  {
    task: 'Update NPM Packages',
    status: STATUS_IN_PROGRESS,
    due: null,
    notes: 'test37',
  },
];

export default DATA;
