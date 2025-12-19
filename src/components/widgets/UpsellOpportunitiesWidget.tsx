import {
  TrendingUp,
  DollarSign,
  Target,
  ArrowUpRight,
  Sparkles,
  Clock,
} from 'lucide-react';
import type { UpsellOpportunitiesData } from '@/types/widget';

export function UpsellOpportunitiesWidget({ data }: { data: UpsellOpportunitiesData }) {
  const opportunityTypeColors = {
    'tier-upgrade': 'border-l-primary bg-primary/20',
    'add-on': 'border-l-chart-3 bg-lime-500/20',
    'cross-sell': 'border-l-chart-4 bg-amber-500/20',
    'new-product': 'border-l-success bg-emerald-500/20',
  };

  const opportunityTypeTextColors = {
    'tier-upgrade': 'text-primary',
    'add-on': 'text-chart-3',
    'cross-sell': 'text-chart-4',
    'new-product': 'text-success',
  };

  const opportunityTypeLabels = {
    'tier-upgrade': 'Tier Upgrade',
    'add-on': 'Add-On',
    'cross-sell': 'Cross-Sell',
    'new-product': 'New Product',
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return 'text-success';
    if (confidence >= 60) return 'text-chart-3';
    if (confidence >= 40) return 'text-chart-4';
    return 'text-destructive';
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="space-y-6 my-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{data.title}</h3>
          <p className="text-sm text-muted-foreground">
            {data.totalOpportunities} opportunities identified
          </p>
        </div>
        <div className="text-right">
          <div className="text-2xl font-bold text-success">{formatCurrency(data.totalPotentialRevenue)}</div>
          <div className="text-xs text-muted-foreground">Total Potential Revenue</div>
        </div>
      </div>

      {/* Summary by Type */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-card rounded-lg border border-primary/30 bg-primary/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Tier Upgrades</div>
          <div className="text-2xl font-bold text-primary">{data.byType.tierUpgrade}</div>
        </div>
        <div className="glass-card rounded-lg border border-chart-3/30 bg-lime-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Add-Ons</div>
          <div className="text-2xl font-bold text-chart-3">{data.byType.addOn}</div>
        </div>
        <div className="glass-card rounded-lg border border-chart-4/30 bg-amber-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">Cross-Sell</div>
          <div className="text-2xl font-bold text-chart-4">{data.byType.crossSell}</div>
        </div>
        <div className="glass-card rounded-lg border border-success/30 bg-emerald-500/20 p-3">
          <div className="text-xs text-muted-foreground mb-1">New Product</div>
          <div className="text-2xl font-bold text-success">{data.byType.newProduct}</div>
        </div>
      </div>

      {/* Opportunity Cards */}
      <div className="space-y-3">
        {data.opportunities.map((opp, idx) => (
          <div
            key={idx}
            className={`border-l-4 ${opportunityTypeColors[opp.opportunityType]} rounded-r glass-card p-4 backdrop-blur-md transition-all duration-200 hover:shadow-md`}
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              {/* Customer Name & Type */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="text-base font-semibold text-foreground">{opp.customerName}</h4>
                  <span className={`flex items-center gap-1 text-xs font-semibold uppercase px-2 py-1 rounded ${opportunityTypeTextColors[opp.opportunityType]} border`}>
                    <ArrowUpRight className="h-3 w-3" />
                    {opportunityTypeLabels[opp.opportunityType]}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{opp.customerId}</span>
                  <span>|</span>
                  <span>Current ARR: {formatCurrency(opp.currentArr)}</span>
                </div>
              </div>

              {/* Revenue & Confidence */}
              <div className="text-right flex-shrink-0">
                <div className="flex items-center gap-2 justify-end">
                  <div className="text-2xl font-bold text-success">+{formatCurrency(opp.estimatedRevenue)}</div>
                </div>
                <div className={`text-sm font-semibold ${getConfidenceColor(opp.confidence)}`}>
                  {opp.confidence}% confidence
                </div>
              </div>
            </div>

            {/* Product & Timeline */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-3 pb-3 border-b border-border/50">
              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Target className="h-3 w-3 text-primary" />
                  <span className="text-xs text-muted-foreground">Suggested Product</span>
                </div>
                <div className="text-sm font-semibold text-foreground">{opp.suggestedProduct}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <Clock className="h-3 w-3 text-chart-3" />
                  <span className="text-xs text-muted-foreground">Timeline to Close</span>
                </div>
                <div className="text-sm font-semibold text-foreground">{opp.timelineToClose}</div>
              </div>

              <div>
                <div className="flex items-center gap-1 mb-1">
                  <DollarSign className="h-3 w-3 text-success" />
                  <span className="text-xs text-muted-foreground">Potential Growth</span>
                </div>
                <div className="text-sm font-semibold text-success">
                  +{Math.round((opp.estimatedRevenue / opp.currentArr) * 100)}%
                </div>
              </div>
            </div>

            {/* Reasons & Buying Signals */}
            <div className="space-y-3">
              {/* Reasons */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <TrendingUp className="h-3 w-3 text-chart-3" />
                  <span className="text-xs text-muted-foreground">Opportunity Drivers:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {opp.reasons.map((reason, reasonIdx) => (
                    <span key={reasonIdx} className="text-xs px-2 py-1 rounded bg-lime-500/20 text-chart-3">
                      {reason}
                    </span>
                  ))}
                </div>
              </div>

              {/* Buying Signals */}
              <div>
                <div className="flex items-center gap-1 mb-2">
                  <Sparkles className="h-3 w-3 text-success" />
                  <span className="text-xs text-muted-foreground">Buying Signals:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {opp.buyingSignals.map((signal, signalIdx) => (
                    <span key={signalIdx} className="text-xs px-2 py-1 rounded bg-emerald-500/20 text-success">
                      {signal}
                    </span>
                  ))}
                </div>
              </div>

              {/* Next Steps */}
              <div>
                <div className="text-xs text-muted-foreground mb-2">Next Steps:</div>
                <div className="flex flex-wrap gap-2">
                  {opp.nextSteps.map((step, stepIdx) => (
                    <span key={stepIdx} className="text-xs px-2 py-1 rounded bg-muted text-muted-foreground">
                      {step}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
