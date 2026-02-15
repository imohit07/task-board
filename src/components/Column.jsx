import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { COLUMN_LABELS } from '../lib/constants';
import { TaskCard } from './TaskCard';

export function Column({ columnId, tasks, onEdit, onDelete }) {
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef}
      className={`board-column ${isOver ? 'board-column-over' : ''}`}
      data-column={columnId}
    >
      <h3 className="column-title">{COLUMN_LABELS[columnId] || columnId}</h3>
      <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
        <div className="column-cards">
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}
