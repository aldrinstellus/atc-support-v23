import { Calendar, CheckCircle, Users, FileText } from 'lucide-react';

interface MeetingConfirmationData {
  title?: string;
  meetingDate: string;
  meetingTime: string;
  timezone: string;
  duration?: string;
  location?: string;
  invitesSent: Array<{
    name: string;
    email: string;
    role?: string;
  }>;
  briefingCreated?: boolean;
  briefingItems?: string[];
  nextAction?: string;
}

export function MeetingConfirmationWidget({ data }: { data: MeetingConfirmationData }) {
  const formatMeetingDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="rounded-lg border border-border bg-card p-6 my-4">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="h-5 w-5 text-primary" />
        <h3 className="text-lg font-semibold text-foreground">
          {data.title || 'Meeting Confirmed'}
        </h3>
      </div>

      <div className="space-y-4">
        {/* Success Message */}
        <div className="flex items-center gap-2 p-3 bg-emerald-500/20 rounded-lg border border-success/30">
          <CheckCircle className="w-5 h-5 text-success" />
          <span className="text-sm font-medium text-success">
            Meeting Scheduled Successfully
          </span>
        </div>

        {/* Meeting Details */}
        <div className="p-3 bg-muted rounded-lg">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {formatMeetingDate(data.meetingDate)}
              </span>
            </div>
            <div className="text-sm text-muted-foreground ml-6">
              {data.meetingTime} {data.timezone}
              {data.duration && ` • ${data.duration}`}
            </div>
            {data.location && (
              <div className="text-xs text-muted-foreground ml-6">{data.location}</div>
            )}
          </div>
        </div>

        {/* Invites Sent */}
        <div>
          <div className="flex items-center gap-2 text-xs font-medium text-foreground mb-3">
            <Users className="w-4 h-4" />
            <span>Calendar Invites Sent ({data.invitesSent.length})</span>
          </div>
          <div className="space-y-2">
            {data.invitesSent.map((invite, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-muted/50 rounded-lg"
              >
                <div>
                  <div className="text-sm text-foreground">{invite.name}</div>
                  {invite.role && (
                    <div className="text-xs text-muted-foreground">{invite.role}</div>
                  )}
                </div>
                <div className="text-xs text-muted-foreground">{invite.email}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Briefing Document */}
        {data.briefingCreated && data.briefingItems && (
          <div className="p-3 bg-primary/20 rounded-lg border border-primary/30">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium text-primary">
                Briefing Document Created
              </span>
            </div>
            <ul className="space-y-1">
              {data.briefingItems.map((item, index) => (
                <li key={index} className="flex gap-2 text-sm text-foreground">
                  <span className="text-success">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Next Action */}
        {data.nextAction && (
          <div className="text-sm text-muted-foreground italic">{data.nextAction}</div>
        )}
      </div>
    </div>
  );
}
