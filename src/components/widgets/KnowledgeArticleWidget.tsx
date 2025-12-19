import { BookOpen, Star, Eye, Calendar, User, Tag, ThumbsUp, ThumbsDown, AlertTriangle, Lightbulb, Code } from 'lucide-react';
import type { KnowledgeArticleData } from '@/types/widget';

export function KnowledgeArticleWidget({ data }: { data: KnowledgeArticleData }) {
  const helpfulPercentage = Math.round(
    (data.helpfulCount / (data.helpfulCount + data.notHelpfulCount)) * 100
  );

  const getSectionIcon = (type?: string) => {
    switch (type) {
      case 'code':
        return <Code className="h-4 w-4 text-primary" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-chart-4" />;
      case 'tip':
        return <Lightbulb className="h-4 w-4 text-chart-2" />;
      default:
        return <BookOpen className="h-4 w-4 text-primary" />;
    }
  };

  const getSectionClass = (type?: string) => {
    switch (type) {
      case 'warning':
        return 'border-chart-4/30 bg-amber-500/20';
      case 'tip':
        return 'border-chart-2/30 bg-chart-2/20';
      case 'code':
        return 'border-muted bg-muted/20';
      default:
        return 'border-border bg-card/50';
    }
  };

  return (
    <div className="space-y-4 my-4">
      {/* Header */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="text-xs font-medium text-muted-foreground bg-muted/50 px-2 py-0.5 rounded">
                {data.category}
              </span>
              <span className="text-xs text-muted-foreground">{data.id}</span>
            </div>
            <h4 className="text-lg font-semibold text-foreground mb-2">{data.title}</h4>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-1 flex-shrink-0">
            <Star className="h-5 w-5 text-chart-4 fill-chart-4" />
            <span className="text-lg font-bold text-foreground">{data.rating}</span>
          </div>
        </div>

        {/* Metadata */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>By {data.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>Updated {data.lastUpdated}</span>
          </div>
          <div className="flex items-center gap-1">
            <Eye className="h-3 w-3" />
            <span>{data.views.toLocaleString()} views</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {data.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted/50 px-2 py-0.5 rounded"
            >
              <Tag className="h-3 w-3" />
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Article Sections */}
      <div className="space-y-3">
        {data.sections.map((section, index) => (
          <div
            key={index}
            className={`glass-card rounded-lg border p-4 ${getSectionClass(section.type)}`}
          >
            {/* Section Heading */}
            <div className="flex items-center gap-2 mb-3">
              {getSectionIcon(section.type)}
              <h5 className="text-sm font-semibold text-foreground">{section.heading}</h5>
            </div>

            {/* Section Content */}
            {section.type === 'code' && section.code ? (
              <div className="bg-background/80 rounded p-3 border border-border/50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium text-muted-foreground">{section.code.language}</span>
                  <button className="text-xs text-primary hover:text-primary/80">Copy</button>
                </div>
                <pre className="text-xs text-foreground font-mono overflow-x-auto">
                  {section.code.snippet}
                </pre>
              </div>
            ) : section.type === 'list' && section.items ? (
              <ul className="space-y-1.5 text-sm text-foreground">
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="flex items-start gap-2">
                    <span className="text-primary mt-1.5">•</span>
                    <span className="flex-1">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">{section.content}</p>
            )}
          </div>
        ))}
      </div>

      {/* Related Articles */}
      {data.relatedArticles && data.relatedArticles.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
          <h5 className="text-sm font-semibold text-foreground mb-3">Related Articles</h5>
          <div className="space-y-2">
            {data.relatedArticles.map((article) => (
              <button
                key={article.id}
                className="w-full flex items-center justify-between p-3 rounded border border-border/50 bg-background/50 hover:border-primary/50 hover:bg-card/50 transition-all text-left"
              >
                <div className="flex items-center gap-3 flex-1">
                  <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{article.title}</p>
                    <p className="text-xs text-muted-foreground">{article.id}</p>
                  </div>
                </div>
                <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded flex-shrink-0">
                  {article.relevance}% match
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Feedback */}
      <div className="glass-card rounded-lg border border-border bg-card/70 p-4">
        <div className="flex items-center justify-between mb-3">
          <h5 className="text-sm font-semibold text-foreground">Was this article helpful?</h5>
          <span className="text-xs text-muted-foreground">
            {helpfulPercentage}% found this helpful ({data.helpfulCount + data.notHelpfulCount} votes)
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded border border-chart-2/50 bg-chart-2/20 hover:bg-chart-2/30 text-chart-2 hover:text-chart-2/80 transition-all">
            <ThumbsUp className="h-4 w-4" />
            <span className="text-sm font-medium">
              Yes ({data.helpfulCount})
            </span>
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded border border-destructive/50 bg-red-500/20 hover:bg-red-500/30 text-destructive hover:text-destructive/80 transition-all">
            <ThumbsDown className="h-4 w-4" />
            <span className="text-sm font-medium">
              No ({data.notHelpfulCount})
            </span>
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 pt-2">
        <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium px-4 py-2 rounded bg-primary/20 hover:bg-primary/30 border border-primary/20 hover:border-primary/40 transition-all">
          <BookOpen className="h-4 w-4" />
          Apply to Current Ticket
        </button>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium px-4 py-2 rounded bg-muted/20 hover:bg-muted/30 border border-border hover:border-border/80 transition-all">
          <Star className="h-4 w-4" />
          Bookmark Article
        </button>
      </div>
    </div>
  );
}
