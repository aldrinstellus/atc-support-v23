import { Search, BookOpen, Star, Eye, Calendar, Tag, TrendingUp, Lightbulb } from 'lucide-react';
import type { KnowledgeBaseSearchData } from '@/types/widget';

export function KnowledgeBaseSearchWidget({ data }: { data: KnowledgeBaseSearchData }) {
  return (
    <div className="space-y-4 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Search className="h-5 w-5 text-primary" />
            Knowledge Base Search
          </h4>
          <p className="text-sm text-muted-foreground mt-1">
            {data.resultsCount} articles found for &quot;{data.query}&quot;
          </p>
        </div>
      </div>

      {/* AI Suggestion */}
      {data.aiSuggestion && (
        <div className="glass-card rounded-lg border border-primary/30 bg-primary/5 p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-primary mb-1">AI Suggestion</p>
              <p className="text-sm text-foreground/90">{data.aiSuggestion}</p>
            </div>
          </div>
        </div>
      )}

      {/* Top Results */}
      <div className="space-y-3">
        <h5 className="text-sm font-semibold text-foreground flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-primary" />
          Top Results
        </h5>

        {data.topResults.map((article) => (
          <div
            key={article.id}
            className="glass-card rounded-lg border border-border bg-card/70 p-4 hover:border-primary/50 hover:bg-card/90 transition-all cursor-pointer"
          >
            {/* Article Header */}
            <div className="flex items-start justify-between gap-4 mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded">
                    {article.relevance}% match
                  </span>
                  <span className="text-xs text-muted-foreground">{article.category}</span>
                </div>
                <h6 className="text-sm font-semibold text-foreground mb-1 flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-primary" />
                  {article.title}
                </h6>
                <p className="text-xs text-muted-foreground">{article.id}</p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-1 flex-shrink-0">
                <Star className="h-4 w-4 text-chart-4 fill-chart-4" />
                <span className="text-sm font-medium text-foreground">{article.rating}</span>
              </div>
            </div>

            {/* Excerpt */}
            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{article.excerpt}</p>

            {/* Metadata */}
            <div className="flex items-center gap-4 text-xs text-muted-foreground flex-wrap">
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{article.views.toLocaleString()} views</span>
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                <span>Updated {article.lastUpdated}</span>
              </div>
            </div>

            {/* Tags */}
            <div className="flex items-center gap-2 mt-3 flex-wrap">
              {article.tags.map((tag) => (
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
        ))}
      </div>

      {/* Related Searches */}
      {data.relatedSearches.length > 0 && (
        <div className="glass-card rounded-lg border border-border bg-card/50 p-4">
          <h6 className="text-sm font-semibold text-foreground mb-3">Related Searches</h6>
          <div className="flex flex-wrap gap-2">
            {data.relatedSearches.map((search, index) => (
              <button
                key={index}
                className="text-xs text-primary hover:text-primary/80 bg-primary/5 hover:bg-primary/10 px-3 py-1.5 rounded border border-primary/20 hover:border-primary/40 transition-all"
              >
                {search}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="flex items-center gap-2 pt-2">
        <button className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 font-medium px-4 py-2 rounded bg-primary/5 hover:bg-primary/10 border border-primary/20 hover:border-primary/40 transition-all">
          <Search className="h-4 w-4" />
          Refine Search
        </button>
        <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground font-medium px-4 py-2 rounded bg-muted/20 hover:bg-muted/30 border border-border hover:border-border/80 transition-all">
          <BookOpen className="h-4 w-4" />
          Browse All Articles
        </button>
      </div>
    </div>
  );
}
