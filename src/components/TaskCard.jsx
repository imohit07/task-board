import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PRIORITY_LABELS } from '../lib/constants';
import { Button } from './Button';

export function TaskCard({ task, onEdit, onDelete }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task.id, data: { task } });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const due = task.dueDate
    ? new Date(task.dueDate).toLocaleDateString(undefined, { dateStyle: 'short' })
    : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`task-card ${isDragging ? 'task-card-dragging' : ''}`}
      {...attributes}
      {...listeners}
    >
      <div className="task-card-header">
        <span className="task-card-title">{task.title || 'Untitled'}</span>
        <span className={`task-priority task-priority-${task.priority || 'medium'}`}>
          {PRIORITY_LABELS[task.priority] || task.priority}
        </span>
      </div>
      {task.description && (
        <p className="task-card-desc">{task.description}</p>
      )}
      {due && <p className="task-card-due">Due: {due}</p>}
      {Array.isArray(task.tags) && task.tags.length > 0 && (
        <div className="task-card-tags">
          {task.tags.map((tag) => (
            <span key={tag} className="tag">{tag}</span>
          ))}
        </div>
      )}
      <div className="task-card-actions">
        <Button variant="secondary" type="button" onClick={(e) => { e.stopPropagation(); onEdit?.(task); }}>
          Edit
        </Button>
        <Button variant="danger" type="button" onClick={(e) => { e.stopPropagation(); onDelete?.(task); }}>
          Delete
        </Button>
      </div>
    </div>
  );
}
