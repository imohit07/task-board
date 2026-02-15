import { useState } from 'react';
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
  closestCenter,
} from '@dnd-kit/core';
import { COLUMNS } from '../lib/constants';
import { useBoard } from '../context/BoardContext';
import { Button } from './Button';
import { Column } from './Column';
import { TaskCard } from './TaskCard';
import { TaskForm } from './TaskForm';
import { Modal } from './Modal';
import { ActivityLog } from './ActivityLog';

export function Board() {
  const {
    getFilteredColumn,
    addTask,
    updateTask,
    deleteTask,
    moveTask,
    resetBoard,
    search,
    setSearch,
    priorityFilter,
    setPriorityFilter,
    activity,
  } = useBoard();

  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  const handleDragStart = (event) => setActiveId(event.active.id);
  const handleDragEnd = (event) => {
    const { active, over } = event;
    setActiveId(null);
    if (!over?.id) return;
    const task = active.data?.current?.task;
    if (!task) return;
    const toColumn = [COLUMNS.TODO, COLUMNS.DOING, COLUMNS.DONE].includes(over.id)
      ? over.id
      : null;
    if (toColumn && toColumn !== task.columnId) {
      moveTask(task.id, task.columnId, toColumn, task.title);
    }
  };

  const activeTask = activeId
    ? [...getFilteredColumn(COLUMNS.TODO), ...getFilteredColumn(COLUMNS.DOING), ...getFilteredColumn(COLUMNS.DONE)].find(
        (t) => t.id === activeId
      )
    : null;

  const handleCreate = (data) => {
    addTask(data);
    setFormOpen(false);
  };

  const handleEdit = (data) => {
    if (editingTask) updateTask(editingTask.id, data);
    setEditingTask(null);
  };

  const handleDelete = (task) => {
    if (window.confirm(`Delete "${task.title}"?`)) deleteTask(task.id, task.title);
  };

  const handleResetConfirm = () => {
    resetBoard();
    setResetConfirmOpen(false);
  };

  return (
    <div className="board-page">
      <div className="board-toolbar">
        <input
          type="search"
          className="input search-input"
          placeholder="Search by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search tasks by title"
        />
        <select
          className="input filter-select"
          value={priorityFilter}
          onChange={(e) => setPriorityFilter(e.target.value)}
          aria-label="Filter by priority"
        >
          <option value="">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <Button onClick={() => { setEditingTask(null); setFormOpen(true); }}>
          New task
        </Button>
        <Button variant="secondary" onClick={() => setResetConfirmOpen(true)}>
          Reset board
        </Button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="board-columns">
          {[COLUMNS.TODO, COLUMNS.DOING, COLUMNS.DONE].map((colId) => (
            <Column
              key={colId}
              columnId={colId}
              tasks={getFilteredColumn(colId)}
              onEdit={setEditingTask}
              onDelete={handleDelete}
            />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? (
            <div className="task-card task-card-dragging task-card-overlay">
              <div className="task-card-header">
                <span className="task-card-title">{activeTask.title || 'Untitled'}</span>
                <span className={`task-priority task-priority-${activeTask.priority || 'medium'}`}>
                  {activeTask.priority}
                </span>
              </div>
              {activeTask.description && <p className="task-card-desc">{activeTask.description}</p>}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      <TaskForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleCreate}
      />
      <TaskForm
        open={!!editingTask}
        onClose={() => setEditingTask(null)}
        onSubmit={handleEdit}
        initialTask={editingTask}
      />

      <Modal
        open={resetConfirmOpen}
        onClose={() => setResetConfirmOpen(false)}
        title="Reset board?"
        footer={
          <>
            <Button variant="secondary" onClick={() => setResetConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleResetConfirm}>
              Reset
            </Button>
          </>
        }
      >
        <p>This will remove all tasks and activity log. This cannot be undone.</p>
      </Modal>

      <ActivityLog entries={activity} />
    </div>
  );
}
