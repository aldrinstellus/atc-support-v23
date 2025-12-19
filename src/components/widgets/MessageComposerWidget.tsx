import { Mail, User, Building, Calendar, Clock, Send, Lightbulb, FileText, Ticket, Heart } from 'lucide-react';
import type { MessageComposerData } from '@/types/widget';

export function MessageComposerWidget({ data, onAction }: { data: MessageComposerData; onAction?: (action: string) => void }) {
  const toneColors = {
    professional: 'text-primary bg-primary/20 border-primary/20',
    empathetic: 'text-chart-2 bg-chart-2/20 border-chart-2/20',
    direct: 'text-chart-4 bg-amber-500/20 border-chart-4/20',
    formal: 'text-muted-foreground bg-muted/20 border-muted/40',
  };

  return (
    <div className="space-y-4 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            {data.title}
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            AI-drafted message ready for your review
          </p>
        </div>
      </div>

      {/* Recipient Info */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <User className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{data.recipient.name}</p>
                <p className="text-xs text-muted-foreground">{data.recipient.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building className="h-3 w-3" />
                <span>{data.recipient.company}</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>{data.recipient.email}</span>
              </div>
            </div>
          </div>

          {/* Suggested Tone */}
          <span
            className={`text-xs font-medium px-3 py-1.5 rounded border ${
              toneColors[data.suggestedTone]
            } flex-shrink-0`}
          >
            {data.suggestedTone.charAt(0).toUpperCase() + data.suggestedTone.slice(1)} tone
          </span>
        </div>
      </div>

      {/* Context */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
        <h5 className="text-sm font-semibold text-foreground mb-3">Context</h5>
        <div className="space-y-2 text-sm">
          <div className="flex items-start gap-2">
            <span className="font-medium text-muted-foreground min-w-[120px]">Reason:</span>
            <span className="text-foreground">{data.context.reason}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-muted-foreground min-w-[120px]">Customer Health:</span>
            <span className="text-foreground">{data.context.customerHealth}</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-muted-foreground min-w-[120px]">Last Contact:</span>
            <span className="text-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {data.context.lastContact}
            </span>
          </div>
          <div className="flex items-start gap-2">
            <span className="font-medium text-muted-foreground min-w-[120px]">Related Tickets:</span>
            <div className="flex items-center gap-2 flex-wrap">
              {data.context.relatedTickets.map((ticketId) => (
                <span
                  key={ticketId}
                  className="inline-flex items-center gap-1 text-xs text-primary bg-primary/20 px-2 py-0.5 rounded border border-primary/20"
                >
                  <Ticket className="h-3 w-3" />
                  {ticketId}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* AI-Drafted Message */}
      <div className="glass-card rounded-lg border border-primary/30 bg-card/70 p-4">
        <div className="flex items-center justify-between mb-3">
          <h5 className="text-sm font-semibold text-foreground">AI-Drafted Message</h5>
          <button className="text-xs text-primary hover:text-primary/80 font-medium">
            Edit Message
          </button>
        </div>

        {/* Subject */}
        <div className="mb-4 pb-4 border-b border-border/50">
          <p className="text-xs font-medium text-muted-foreground mb-1">Subject:</p>
          <p className="text-sm font-semibold text-foreground">{data.aiDraftedMessage.subject}</p>
        </div>

        {/* Body */}
        <div className="space-y-3">
          <p className="text-xs font-medium text-muted-foreground">Message:</p>
          <div className="bg-background/50 rounded p-4 border border-border/50">
            <p className="text-sm text-foreground whitespace-pre-line leading-relaxed">
              {data.aiDraftedMessage.body}
            </p>
          </div>
        </div>
      </div>

      {/* Talking Points */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
        <h5 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
          <Lightbulb className="h-4 w-4 text-primary" />
          Key Talking Points
        </h5>
        <div className="space-y-2">
          {data.talkingPoints.map((point, index) => (
            <div key={index} className="flex items-start gap-2">
              <span className="text-primary mt-1">•</span>
              <span className="text-sm text-foreground flex-1">{point}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Template Options */}
      {data.templateOptions && data.templateOptions.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
          <h5 className="text-sm font-semibold text-foreground flex items-center gap-2 mb-3">
            <FileText className="h-4 w-4 text-primary" />
            Alternative Templates
          </h5>
          <div className="space-y-2">
            {data.templateOptions.map((template, index) => (
              <button
                key={index}
                className="w-full flex items-start gap-3 p-3 rounded border border-border/50 bg-background/50 hover:border-primary/50 hover:bg-card/50 transition-all text-left"
              >
                <FileText className="h-4 w-4 text-primary flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground mb-1">{template.name}</p>
                  <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                  <p className="text-xs text-muted-foreground italic line-clamp-2">&quot;{template.preview}&quot;</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Scheduling Suggestion */}
      {data.schedulingSuggestion && (
        <div className="glass-card rounded-lg border border-chart-2/30 bg-chart-2/20 p-4">
          <div className="flex items-start gap-3">
            <Clock className="h-5 w-5 text-chart-2 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground mb-2">Scheduling Suggestion</p>
              <p className="text-sm text-muted-foreground mb-3">
                Based on customer&apos;s availability, these times work best:
              </p>
              <div className="flex items-center gap-2 flex-wrap">
                {data.schedulingSuggestion.preferredTimes.map((time, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center gap-1 text-xs text-chart-2 bg-chart-2/20 px-3 py-1.5 rounded border border-chart-2/30"
                  >
                    <Calendar className="h-3 w-3" />
                    {time}
                  </span>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Suggested duration: {data.schedulingSuggestion.meetingDuration}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={() => onAction?.('send the message')}
          className="flex items-center gap-2 text-sm text-primary-foreground bg-primary hover:bg-primary/90 font-medium px-6 py-2.5 rounded shadow-sm hover:shadow transition-all"
        >
          <Send className="h-4 w-4" />
          Send Message
        </button>
        <button
          onClick={() => onAction?.('save as draft')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium px-4 py-2.5 rounded bg-muted/20 hover:bg-muted/30 border border-border hover:border-border/80 transition-all"
        >
          <FileText className="h-4 w-4" />
          Save as Draft
        </button>
        <button
          onClick={() => onAction?.('save as template')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium px-4 py-2.5 rounded bg-muted/20 hover:bg-muted/30 border border-border hover:border-border/80 transition-all"
        >
          <Heart className="h-4 w-4" />
          Save as Template
        </button>
      </div>
    </div>
  );
}
