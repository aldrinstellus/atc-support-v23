import {
  Send,
  FileText,
  Lightbulb,
  AlertCircle,
  CheckCircle2,
  Clock,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import type { ResponseComposerData } from '@/types/widget';

export function ResponseComposerWidget({ data, onAction }: { data: ResponseComposerData; onAction?: (action: string) => void }) {
  const priorityColors = {
    critical: 'border-destructive/30 bg-red-500/20 text-destructive',
    high: 'border-chart-4/30 bg-amber-500/20 text-chart-4',
    medium: 'border-chart-3/30 bg-lime-500/20 text-chart-3',
    low: 'border-success/30 bg-emerald-500/20 text-success',
  };

  const toneColors = {
    professional: 'bg-primary/20 text-primary',
    empathetic: 'bg-success/20 text-success',
    technical: 'bg-chart-3/20 text-chart-3',
    apologetic: 'bg-chart-4/20 text-chart-4',
  };

  return (
    <div className="space-y-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Response Composer</h3>
          <p className="text-sm text-muted-foreground">
            AI-powered response generator for {data.ticketId}
          </p>
        </div>
      </div>

      {/* Ticket Context */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-mono text-primary font-semibold">
                {data.ticketId}
              </span>
              <span
                className={`text-xs px-2 py-1 rounded-full uppercase font-medium border ${priorityColors[data.priority]}`}
              >
                {data.priority}
              </span>
            </div>
            <h4 className="text-base font-semibold text-foreground mb-1">{data.subject}</h4>
            <div className="text-sm text-muted-foreground">Customer: {data.customer}</div>
          </div>
        </div>

        {/* Last Message */}
        <div className="pt-3 border-t border-border/50">
          <div className="flex items-center gap-2 mb-2">
            <div className="text-xs text-muted-foreground">Last message from {data.lastMessage.from}</div>
            <Clock className="h-3 w-3 text-muted-foreground" />
            <div className="text-xs text-muted-foreground">{data.lastMessage.timestamp}</div>
          </div>
          <div className="bg-muted/50 rounded p-3">
            <p className="text-sm text-foreground whitespace-pre-wrap">
              {data.lastMessage.content}
            </p>
          </div>
        </div>

        {/* Suggested Tone */}
        <div className="flex items-center gap-2 mt-3 pt-3 border-t border-border/50">
          <span className="text-xs text-muted-foreground">Suggested Tone:</span>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${toneColors[data.suggestedTone]}`}
          >
            {data.suggestedTone}
          </span>
        </div>
      </div>

      {/* AI Generated Response */}
      <div className="glass-card rounded-lg border border-primary/30 bg-primary/20 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <Sparkles className="h-4 w-4 text-primary" />
          AI-Generated Response
        </h4>

        {/* Response Content */}
        <div className="bg-card/70 rounded-lg p-4 mb-4 border border-border/50">
          <p className="text-sm text-foreground whitespace-pre-wrap leading-relaxed">
            {data.aiGeneratedResponse.content}
          </p>
        </div>

        {/* Key Points */}
        {data.aiGeneratedResponse.keyPoints && data.aiGeneratedResponse.keyPoints.length > 0 && (
          <div className="mb-4 pb-4 border-b border-border/50">
            <div className="text-xs font-medium text-muted-foreground mb-2">Key Points Covered:</div>
            <div className="space-y-1">
              {data.aiGeneratedResponse.keyPoints.map((point, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="h-3 w-3 text-success flex-shrink-0 mt-0.5" />
                  <span className="text-xs text-foreground/90">{point}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Next Steps */}
        {data.aiGeneratedResponse.nextSteps && data.aiGeneratedResponse.nextSteps.length > 0 && (
          <div className="mb-4 pb-4 border-b border-border/50">
            <div className="text-xs font-medium text-muted-foreground mb-2">Suggested Next Steps:</div>
            <div className="space-y-1">
              {data.aiGeneratedResponse.nextSteps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-xs font-semibold text-primary flex-shrink-0">
                    {idx + 1}.
                  </span>
                  <span className="text-xs text-foreground/90">{step}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Estimated Sentiment */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">Estimated Customer Sentiment:</span>
          <span
            className={`text-xs px-2 py-1 rounded-full font-medium capitalize ${
              data.aiGeneratedResponse.estimatedSentiment === 'positive'
                ? 'bg-success/20 text-success'
                : data.aiGeneratedResponse.estimatedSentiment === 'negative'
                ? 'bg-destructive/20 text-destructive'
                : 'bg-muted text-muted-foreground'
            }`}
          >
            {data.aiGeneratedResponse.estimatedSentiment}
          </span>
        </div>
      </div>

      {/* Template Options */}
      {data.templateOptions && data.templateOptions.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <FileText className="h-4 w-4 text-primary" />
            Alternative Templates
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.templateOptions.map((template, idx) => (
              <div
                key={idx}
                className="border border-border/50 rounded-lg p-3 bg-muted/30 hover:bg-muted/50 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <h5 className="text-sm font-semibold text-foreground">{template.name}</h5>
                </div>
                <p className="text-xs text-muted-foreground mb-2">{template.description}</p>
                <div className="bg-card/70 rounded p-2 mt-2">
                  <p className="text-xs text-foreground/80 line-clamp-3">{template.preview}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Knowledge Base Articles */}
      {data.knowledgeBaseArticles && data.knowledgeBaseArticles.length > 0 && (
        <div className="glass-card rounded-lg border border-chart-3/30 bg-lime-500/20 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
            <BookOpen className="h-4 w-4 text-chart-3" />
            Relevant Knowledge Base Articles
          </h4>
          <div className="space-y-3">
            {data.knowledgeBaseArticles.map((article) => (
              <div
                key={article.id}
                className="border border-border/50 rounded-lg p-3 bg-card/50 hover:bg-card/70 transition-all duration-200 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex-1">
                    <h5 className="text-sm font-semibold text-foreground mb-1">
                      {article.title}
                    </h5>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {article.excerpt}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="text-xs font-semibold text-chart-3">
                      {(article.relevance * 100).toFixed(0)}%
                    </div>
                    <div className="text-xs text-muted-foreground">relevance</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border/50">
                  <span className="text-xs font-mono text-muted-foreground">
                    {article.id}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tips */}
      <div className="glass-card rounded-lg border border-primary/30 bg-primary/20 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-3 flex items-center gap-2 text-foreground">
          <Lightbulb className="h-4 w-4 text-primary" />
          Response Tips
        </h4>
        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/90">
              Acknowledge the customer&apos;s concern first before providing solutions
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/90">
              Be specific about next steps and timelines
            </span>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-success flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/90">
              Include relevant documentation or KB article links
            </span>
          </div>
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-chart-4 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-foreground/90">
              Review response for tone and clarity before sending
            </span>
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <button
          onClick={() => onAction?.('send the response')}
          className="flex items-center gap-2 text-sm text-primary-foreground bg-primary hover:bg-primary/90 font-medium px-6 py-2.5 rounded shadow-sm hover:shadow transition-all"
        >
          <Send className="h-4 w-4" />
          Send Response
        </button>
        <button
          onClick={() => onAction?.('edit and customize')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium px-4 py-2.5 rounded bg-muted/20 hover:bg-muted/30 border border-border hover:border-border/80 transition-all"
        >
          <FileText className="h-4 w-4" />
          Edit & Customize
        </button>
        <button
          onClick={() => onAction?.('regenerate response')}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium px-4 py-2.5 rounded bg-muted/20 hover:bg-muted/30 border border-border hover:border-border/80 transition-all"
        >
          <Sparkles className="h-4 w-4" />
          Regenerate
        </button>
      </div>
    </div>
  );
}
