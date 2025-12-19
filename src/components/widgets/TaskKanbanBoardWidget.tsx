import {
  LayoutGrid,
  Circle,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import type { TaskKanbanData } from '@/types/widget';

export function TaskKanbanBoardWidget({ data }: { data: TaskKanbanData }) {
  // Defensive check
  if (!data || typeof data !== 'object') {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-red-500/20 p-4">
        <p className="text-sm text-destructive">Unable to load kanban board data</p>
      </div>
    );
  }

  const priorityColors = {
    critical: 'border-l-destructive bg-red-500/20',
    high: 'border-l-chart-4 bg-amber-500/20',
    medium: 'border-l-chart-3 bg-lime-500/20',
    low: 'border-l-muted-foreground/50 bg-muted/20',
  };

  const columnIcons = {
    todo: <Circle className="h-4 w-4 text-muted-foreground" />,
    'in-progress': <Clock className="h-4 w-4 text-chart-3" />,
    review: <AlertCircle className="h-4 w-4 text-chart-4" />,
    done: <CheckCircle2 className="h-4 w-4 text-success" />,
  };

  const columnColors = {
    todo: 'border-muted-foreground/30 bg-card/50',
    'in-progress': 'border-chart-3/30 bg-lime-500/20',
    review: 'border-chart-4/30 bg-amber-500/20',
    done: 'border-success/30 bg-emerald-500/20',
  };

  const columnLabels = {
    todo: 'To Do',
    'in-progress': 'In Progress',
    review: 'Review',
    done: 'Done',
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <LayoutGrid className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          </div>
          <p className="text-xs text-muted-foreground">Sprint: {data.sprint}</p>
        </div>
      </div>

      {/* My Tasks Summary */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-muted-foreground mb-1">{data.myTasks.todo}</div>
          <p className="text-xs text-muted-foreground">My To Do</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-chart-3 mb-1">{data.myTasks.inProgress}</div>
          <p className="text-xs text-muted-foreground">In Progress</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-chart-4 mb-1">{data.myTasks.review}</div>
          <p className="text-xs text-muted-foreground">In Review</p>
        </div>
        <div className="rounded-lg border border-border bg-card/50 p-3 text-center">
          <div className="text-2xl font-bold text-success mb-1">{data.myTasks.completed}</div>
          <p className="text-xs text-muted-foreground">Completed</p>
        </div>
      </div>

      {/* Kanban Board */}
      {data.columns && data.columns.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {data.columns.map((column, idx) => (
            <div key={idx} className={`rounded-lg border p-4 ${columnColors[column.name]}`}>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  {columnIcons[column.name]}
                  <h4 className="text-sm font-semibold text-foreground">{columnLabels[column.name]}</h4>
                </div>
                <span className="text-xs font-medium text-muted-foreground">
                  {column.tasks.length}
                </span>
              </div>

              <div className="space-y-2">
                {column.tasks.map((task, taskIdx) => (
                  <div
                    key={taskIdx}
                    className={`border-l-4 ${priorityColors[task.priority]} rounded-r p-3 bg-card transition-all duration-200 hover:shadow-md`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span className="text-xs font-mono font-semibold text-muted-foreground">{task.id}</span>
                      <span className="text-xs font-medium text-primary">{task.storyPoints} pts</span>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-2">{task.title}</p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">{task.assignedTo}</span>
                      {task.blockedBy && (
                        <span className="text-xs px-2 py-0.5 rounded bg-red-500/20 text-destructive border border-destructive/30">
                          Blocked
                        </span>
                      )}
                    </div>

                    {task.tags && task.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {task.tags.map((tag, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 rounded bg-muted text-foreground">
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
