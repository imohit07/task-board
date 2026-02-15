import { ACTIVITY_TYPES } from '../lib/constants';

const typeLabels = {
  [ACTIVITY_TYPES.CREATED]: 'Created',
  [ACTIVITY_TYPES.EDITED]: 'Edited',
  [ACTIVITY_TYPES.MOVED]: 'Moved',
  [ACTIVITY_TYPES.DELETED]: 'Deleted',
};

function formatTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, { dateStyle: 'short', timeStyle: 'short' });
  } catch {
    return iso;
  }
}

export function ActivityLog({ entries }) {
  if (!entries?.length) {
    return (
      <aside className="activity-log">
        <h3 className="activity-title">Activity</h3>
        <p className="activity-empty">No activity yet.</p>
      </aside>
    );
  }

  return (
    <aside className="activity-log" aria-label="Activity log">
      <h3 className="activity-title">Activity</h3>
      <ul className="activity-list">
        {entries.map((entry, i) => (
          <li key={`${entry.at}-${entry.taskId}-${i}`} className="activity-item">
            <span className="activity-type">{typeLabels[entry.type] || entry.type}</span>
            {entry.title && <span className="activity-task">“{entry.title}”</span>}
            {entry.type === ACTIVITY_TYPES.MOVED && entry.from && entry.to && (
              <span className="activity-move">
                {entry.from} → {entry.to}
              </span>
            )}
            <time className="activity-time" dateTime={entry.at}>
              {formatTime(entry.at)}
            </time>
          </li>
        ))}
      </ul>
    </aside>
  );
}
