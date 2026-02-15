export const COLUMNS = {
  TODO: 'todo',
  DOING: 'doing',
  DONE: 'done',
};

export const COLUMN_LABELS = {
  [COLUMNS.TODO]: 'Todo',
  [COLUMNS.DOING]: 'Doing',
  [COLUMNS.DONE]: 'Done',
};

export const PRIORITIES = ['low', 'medium', 'high'];
export const PRIORITY_LABELS = { low: 'Low', medium: 'Medium', high: 'High' };

export const DEMO_CREDENTIALS = {
  email: 'intern@demo.com',
  password: 'intern123',
};

export const STORAGE_KEYS = {
  AUTH: 'taskboard_auth',
  BOARD: 'taskboard_board',
  REMEMBER: 'taskboard_remember',
  ACTIVITY: 'taskboard_activity',
};

export const ACTIVITY_TYPES = {
  CREATED: 'task_created',
  EDITED: 'task_edited',
  MOVED: 'task_moved',
  DELETED: 'task_deleted',
};
