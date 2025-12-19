import {
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  AlertCircle,
  XCircle,
} from 'lucide-react';
import type { MeetingSchedulerData } from '@/types/widget';

export function MeetingSchedulerWidget({ data }: { data: MeetingSchedulerData }) {
  const slotStatusColors = {
    available: 'border-chart-3/30 bg-lime-500/20 hover:border-chart-3/50 hover:bg-lime-500/30',
    preferred: 'border-success/50 bg-emerald-500/20 hover:border-success/70 hover:bg-emerald-500/30',
    unavailable: 'border-muted/30 bg-muted/20 opacity-50 cursor-not-allowed',
  };

  const slotStatusIcons = {
    available: CheckCircle2,
    preferred: CheckCircle2,
    unavailable: XCircle,
  };

  const attendeeStatusColors = {
    organizer: 'border-primary/30 bg-primary/20 text-primary',
    available: 'border-success/30 bg-emerald-500/20 text-success',
    external: 'border-chart-3/30 bg-lime-500/20 text-chart-3',
    tentative: 'border-chart-4/30 bg-amber-500/20 text-chart-4',
  };

  return (
    <div className="space-y-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              {data.duration}
            </div>
            {data.type && (
              <>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground capitalize">{data.type}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Available Slots */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <Calendar className="h-4 w-4 text-primary" />
          Available Time Slots
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {data.availableSlots.map((slot, idx) => {
            const StatusIcon = slotStatusIcons[slot.status];
            const isAvailable = slot.status !== 'unavailable';

            return (
              <button
                key={idx}
                disabled={!isAvailable}
                className={`text-left rounded-lg border p-3 transition-all duration-200 ${slotStatusColors[slot.status]} ${isAvailable ? 'cursor-pointer' : ''}`}
              >
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <div className="text-sm font-semibold text-foreground">{slot.date}</div>
                    <div className="text-xs text-muted-foreground">{slot.time} {slot.timezone}</div>
                  </div>
                  <StatusIcon className={`h-4 w-4 ${slot.status === 'preferred' ? 'text-success' : slot.status === 'available' ? 'text-chart-3' : 'text-muted-foreground'}`} />
                </div>
                {slot.note && (
                  <div className="text-xs text-muted-foreground mt-2 pt-2 border-t border-border/50">
                    {slot.note}
                  </div>
                )}
                {slot.conflicts && slot.conflicts.length > 0 && (
                  <div className="flex items-start gap-1 mt-2 pt-2 border-t border-border/50">
                    <AlertCircle className="h-3 w-3 text-chart-4 flex-shrink-0 mt-0.5" />
                    <span className="text-xs text-chart-4">
                      {slot.conflicts.join(', ')}
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Attendees */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <Users className="h-4 w-4 text-primary" />
          Attendees
        </h4>
        <div className="space-y-2">
          {data.attendees.map((attendee, idx) => (
            <div key={idx} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-primary via-chart-2 to-primary shadow-sm ring-2 ring-primary/20">
                  <span className="text-xs font-bold text-primary-foreground">
                    {attendee.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="text-sm font-medium text-foreground">{attendee.name}</div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-medium px-2 py-0.5 rounded border inline-block ${attendeeStatusColors[attendee.status]}`}>
                      {attendee.status}
                    </span>
                    {attendee.required && (
                      <span className="text-xs text-muted-foreground">Required</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agenda */}
      {((data.agenda && data.agenda.length > 0) || (data.suggestedAgenda && data.suggestedAgenda.length > 0)) && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <CheckCircle2 className="h-4 w-4 text-primary" />
            {data.agenda ? 'Agenda' : 'Suggested Agenda'}
          </h4>
          <ol className="space-y-2 list-decimal list-inside">
            {(data.agenda || data.suggestedAgenda)?.map((item, idx) => (
              <li key={idx} className="text-sm text-foreground/90">{item}</li>
            ))}
          </ol>
        </div>
      )}

      {/* Coaching Tips */}
      {data.coachingTips && data.coachingTips.length > 0 && (
        <div className="glass-card rounded-lg border border-primary/30 bg-primary/20 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <AlertCircle className="h-4 w-4 text-primary" />
            Coaching Tips
          </h4>
          <div className="space-y-2">
            {data.coachingTips.map((tip, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span className="text-sm text-foreground/90">{tip}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
