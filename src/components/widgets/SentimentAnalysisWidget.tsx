import { Smile, Meh, Frown, MessageCircle } from 'lucide-react';
import type { SentimentAnalysisData } from '@/types/widget';

export function SentimentAnalysisWidget({ data }: { data: SentimentAnalysisData }) {
  if (!data) {
    return (
      <div className="my-4 rounded-lg border border-destructive/30 bg-destructive/5 p-4">
        <p className="text-sm text-destructive">Unable to load sentiment analysis: Invalid data</p>
      </div>
    );
  }

  const sentimentConfig = {
    positive: {
      icon: Smile,
      color: 'text-success',
      bg: 'bg-emerald-500/20',
      border: 'border-success/30',
    },
    neutral: {
      icon: Meh,
      color: 'text-chart-4',
      bg: 'bg-amber-500/20',
      border: 'border-chart-4/30',
    },
    negative: {
      icon: Frown,
      color: 'text-destructive',
      bg: 'bg-red-500/20',
      border: 'border-destructive/30',
    },
  };

  const config = sentimentConfig[data.overall];
  const Icon = config.icon;

  return (
    <div className="space-y-6 my-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
          <MessageCircle className="h-5 w-5 text-primary" />
          Customer Sentiment Analysis
        </h3>
        <p className="text-sm text-muted-foreground">Overall sentiment trends and feedback</p>
      </div>
      <div className={`glass-card rounded-lg border ${config.border} ${config.bg} p-6 backdrop-blur-md transition-all duration-200 hover:shadow-md`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Icon className={`h-12 w-12 ${config.color}`} />
            <div>
              <div className="text-xs font-semibold uppercase text-muted-foreground mb-1">Overall Sentiment</div>
              <div className={`text-2xl font-bold ${config.color} capitalize`}>{data.overall}</div>
            </div>
          </div>
          <div className={`text-5xl font-bold ${config.color}`}>{data.score}%</div>
        </div>
      </div>
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
        <h4 className="text-sm font-semibold mb-4 text-foreground">Sentiment Breakdown</h4>
        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center gap-2">
                <Smile className="h-4 w-4 text-success" />
                <span className="font-medium text-foreground">Positive</span>
              </div>
              <span className="font-semibold text-success">{data.breakdown.positive}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-success rounded-full transition-all duration-300" style={{ width: `${data.breakdown.positive}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center gap-2">
                <Meh className="h-4 w-4 text-chart-4" />
                <span className="font-medium text-foreground">Neutral</span>
              </div>
              <span className="font-semibold text-chart-4">{data.breakdown.neutral}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-chart-4 rounded-full transition-all duration-300" style={{ width: `${data.breakdown.neutral}%` }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between text-sm mb-2">
              <div className="flex items-center gap-2">
                <Frown className="h-4 w-4 text-destructive" />
                <span className="font-medium text-foreground">Negative</span>
              </div>
              <span className="font-semibold text-destructive">{data.breakdown.negative}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div className="h-full bg-destructive rounded-full transition-all duration-300" style={{ width: `${data.breakdown.negative}%` }}></div>
            </div>
          </div>
        </div>
      </div>
      {data.recentComments && data.recentComments.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4 backdrop-blur-md">
          <h4 className="text-sm font-semibold mb-3 text-foreground">Recent Feedback</h4>
          <div className="space-y-3">
            {data.recentComments.map((comment, i) => {
              const commentConfig = sentimentConfig[comment.sentiment];
              const CommentIcon = commentConfig.icon;
              return (
                <div key={i} className={`flex gap-3 p-3 rounded-lg border ${commentConfig.border} ${commentConfig.bg} transition-all duration-200 hover:shadow-sm`}>
                  <CommentIcon className={`w-5 h-5 ${commentConfig.color} flex-shrink-0 mt-0.5`} />
                  <div className="flex-1">
                    <div className="text-sm text-foreground">{comment.text}</div>
                    <div className="text-xs text-muted-foreground mt-1">{comment.timestamp}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
