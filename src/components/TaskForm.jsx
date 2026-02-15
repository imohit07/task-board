import { useState, useEffect } from 'react';
import { PRIORITIES, PRIORITY_LABELS } from '../lib/constants';
import { Button } from './Button';
import { Input } from './Input';
import { Modal } from './Modal';

const emptyTask = { title: '', description: '', priority: 'medium', dueDate: '', tags: [] };

export function TaskForm({ open, onClose, onSubmit, initialTask }) {
  const [form, setForm] = useState(emptyTask);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      if (initialTask) {
        setForm({
          title: initialTask.title || '',
          description: initialTask.description || '',
          priority: initialTask.priority || 'medium',
          dueDate: initialTask.dueDate ? initialTask.dueDate.slice(0, 10) : '',
          tags: Array.isArray(initialTask.tags) ? initialTask.tags.join(', ') : '',
        });
      } else {
        setForm(emptyTask);
      }
      setErrors({});
    }
  }, [open, initialTask]);

  const validate = () => {
    const e = {};
    if (!(form.title || '').trim()) e.title = 'Title is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    const tags = (form.tags || '')
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    onSubmit({
      title: form.title.trim(),
      description: (form.description || '').trim(),
      priority: form.priority || 'medium',
      dueDate: form.dueDate || '',
      tags,
    });
    onClose();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={initialTask ? 'Edit task' : 'New task'}
      footer={
        <>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit" form={initialTask ? 'task-form-edit' : 'task-form-new'}>
            {initialTask ? 'Save' : 'Create'}
          </Button>
        </>
      }
    >
      <form
        id={initialTask ? 'task-form-edit' : 'task-form-new'}
        onSubmit={handleSubmit}
        className="task-form"
      >
        <Input
          label="Title"
          value={form.title}
          onChange={(v) => setForm((f) => ({ ...f, title: v }))}
          error={errors.title}
          required
          placeholder="Task title"
        />
        <div className="input-group">
          <label className="input-label">Description</label>
          <textarea
            className="input textarea"
            value={form.description}
            onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
            placeholder="Optional description"
            rows={3}
          />
        </div>
        <div className="input-group">
          <label className="input-label">Priority</label>
          <select
            className="input"
            value={form.priority}
            onChange={(e) => setForm((f) => ({ ...f, priority: e.target.value }))}
          >
            {PRIORITIES.map((p) => (
              <option key={p} value={p}>
                {PRIORITY_LABELS[p]}
              </option>
            ))}
          </select>
        </div>
        <Input
          label="Due date"
          type="date"
          value={form.dueDate}
          onChange={(v) => setForm((f) => ({ ...f, dueDate: v }))}
        />
        <Input
          label="Tags"
          value={form.tags}
          onChange={(v) => setForm((f) => ({ ...f, tags: v }))}
          placeholder="tag1, tag2"
        />
      </form>
    </Modal>
  );
}
