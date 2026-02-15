import { COLUMNS } from './constants';

export function createTask(overrides = {}) {
  return {
    id: crypto.randomUUID?.() ?? `t-${Date.now()}-${Math.random().toString(36).slice(2)}`,
    title: '',
    description: '',
    priority: 'medium',
    dueDate: '',
    tags: [],
    createdAt: new Date().toISOString(),
    columnId: COLUMNS.TODO,
    ...overrides,
  };
}

export function sortTasksByDueDate(tasks) {
  return [...tasks].sort((a, b) => {
    const aDate = a.dueDate ? new Date(a.dueDate).getTime() : Infinity;
    const bDate = b.dueDate ? new Date(b.dueDate).getTime() : Infinity;
    return aDate - bDate;
  });
}

export function filterTasksByPriority(tasks, priority) {
  if (!priority) return tasks;
  return tasks.filter((t) => (t.priority || '').toLowerCase() === priority.toLowerCase());
}

export function filterTasksBySearch(tasks, search) {
  const q = (search || '').trim().toLowerCase();
  if (!q) return tasks;
  return tasks.filter((t) => (t.title || '').toLowerCase().includes(q));
}
