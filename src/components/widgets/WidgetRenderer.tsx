import type {
  WidgetType,
  WidgetData,
  ExecutiveSummaryData,
  AnalyticsDashboardData,
  PerformanceTrendsData,
  SentimentAnalysisData,
  CustomerRiskProfileData,
  TeamWorkloadDashboardData,
  SLAPerformanceChartData,
  AgentDashboardData,
  TicketDetailData,
  LiveTicketDetailData,
  AgentPerformanceComparisonData,
  CustomerRiskListData,
  MeetingSchedulerData,
  MeetingConfirmationData,
  CallPrepNotesData,
  ResponseComposerData,
  SimilarTicketsAnalysisData,
  AgentPerformanceStatsData,
  KnowledgeBaseSearchData,
  KnowledgeArticleData,
  MessageComposerData,
  EscalationPathData,
  SystemAccessStatusData,
  InteractiveUpdateData,
  TicketProcessingData,
  ContractPerformanceData,
  DeliverableReviewListData,
  VendorComplianceData,
  ProgramHealthData,
  StakeholderEngagementData,
  RequirementsTrackingData,
  ChangeRequestData,
  SprintBurndownData,
  TeamVelocityData,
  CodeQualityData,
  DeploymentPipelineData,
  TaskKanbanData,
  ResourceCapacityData,
  BlockerResolutionData,
  ClientHealthDashboardData,
  RenewalPipelineData,
  UpsellOpportunitiesData,
  ProductAdoptionMetricsData,
  CSMInsightsDashboardData,
  CSMTrainingDashboardData,
  DoraMetricsData,
} from '@/types/widget';
import { ExecutiveSummaryWidget } from './ExecutiveSummaryWidget';
import { AnalyticsDashboardWidget } from './AnalyticsDashboardWidget';
import { PerformanceTrendsWidget } from './PerformanceTrendsWidget';
import { SentimentAnalysisWidget } from './SentimentAnalysisWidget';
import { CustomerRiskProfileWidget } from './CustomerRiskProfileWidget';
import { LiveTicketListWidget } from './LiveTicketListWidget';
import { LiveTicketDetailWidget } from './LiveTicketDetailWidget';
// LiveMetricsWidget is available but not currently used in any widget case
// import { LiveMetricsWidget } from './LiveMetricsWidget';
import { AgentDashboardWidget } from './AgentDashboardWidget';
import { TeamWorkloadDashboardWidget } from './TeamWorkloadDashboardWidget';
import { MeetingSchedulerWidget } from './MeetingSchedulerWidget';
import { MeetingConfirmationWidget } from './MeetingConfirmationWidget';
import { CustomerRiskListWidget } from './CustomerRiskListWidget';
import { TicketDetailWidget } from './TicketDetailWidget';
import { SLAPerformanceChartWidget } from './SLAPerformanceChartWidget';
import { AgentPerformanceComparisonWidget } from './AgentPerformanceComparisonWidget';
import { CallPrepNotesWidget } from './CallPrepNotesWidget';
import { ResponseComposerWidget } from './ResponseComposerWidget';
import { SimilarTicketsAnalysisWidget } from './SimilarTicketsAnalysisWidget';
import { AgentPerformanceStatsWidget } from './AgentPerformanceStatsWidget';
import { KnowledgeBaseSearchWidget } from './KnowledgeBaseSearchWidget';
import { KnowledgeArticleWidget } from './KnowledgeArticleWidget';
import { MessageComposerWidget } from './MessageComposerWidget';
import { EscalationPathWidget } from './EscalationPathWidget';
import { SystemAccessStatusWidget } from './SystemAccessStatusWidget';
import { InteractiveUpdateWidget } from './InteractiveUpdateWidget';
import { TicketProcessingWidget } from './TicketProcessingWidget';
import { ContractPerformanceDashboardWidget } from './ContractPerformanceDashboardWidget';
import { DeliverableReviewListWidget } from './DeliverableReviewListWidget';
import { VendorComplianceDashboardWidget } from './VendorComplianceDashboardWidget';
import { ProgramHealthDashboardWidget } from './ProgramHealthDashboardWidget';
import { StakeholderEngagementDashboardWidget } from './StakeholderEngagementDashboardWidget';
import { RequirementsTrackingDashboardWidget } from './RequirementsTrackingDashboardWidget';
import { ChangeRequestDashboardWidget } from './ChangeRequestDashboardWidget';
import { SprintBurndownChartWidget } from './SprintBurndownChartWidget';
import { TeamVelocityDashboardWidget } from './TeamVelocityDashboardWidget';
import { CodeQualityDashboardWidget } from './CodeQualityDashboardWidget';
import { DeploymentPipelineDashboardWidget } from './DeploymentPipelineDashboardWidget';
import { TaskKanbanBoardWidget } from './TaskKanbanBoardWidget';
import { ResourceCapacityDashboardWidget } from './ResourceCapacityDashboardWidget';
import { BlockerResolutionDashboardWidget } from './BlockerResolutionDashboardWidget';
import { ClientHealthDashboardWidget } from './ClientHealthDashboardWidget';
import { RenewalPipelineWidget } from './RenewalPipelineWidget';
import { UpsellOpportunitiesWidget } from './UpsellOpportunitiesWidget';
import { ProductAdoptionMetricsWidget } from './ProductAdoptionMetricsWidget';
import { CSMInsightsDashboardWidget } from './CSMInsightsDashboardWidget';
import { CSMTrainingDashboardWidget } from './CSMTrainingDashboardWidget';
import { DoraMetricsDashboardWidget } from './DoraMetricsDashboardWidget';

interface WidgetRendererProps {
  type: WidgetType;
  data: WidgetData;
  onAction?: (action: string) => void;
}

export function WidgetRenderer({ type, data, onAction }: WidgetRendererProps) {
  // Render widget component based on type
  const renderWidget = () => {
    switch (type) {
      case 'executive-summary':
        return <ExecutiveSummaryWidget data={data as ExecutiveSummaryData} />;

      case 'analytics-dashboard':
        return <AnalyticsDashboardWidget data={data as AnalyticsDashboardData} />;

      case 'performance-trends':
        return <PerformanceTrendsWidget data={data as PerformanceTrendsData} />;

      case 'sentiment-analysis':
        return <SentimentAnalysisWidget data={data as SentimentAnalysisData} />;

      case 'customer-risk-profile':
        return <CustomerRiskProfileWidget data={data as CustomerRiskProfileData} />;

      case 'ticket-list':
        return <LiveTicketListWidget />;

      case 'agent-dashboard':
        return <AgentDashboardWidget data={data as AgentDashboardData} />;

      case 'team-workload-dashboard':
        return <TeamWorkloadDashboardWidget data={data as TeamWorkloadDashboardData} />;

      case 'meeting-scheduler':
        return <MeetingSchedulerWidget data={data as MeetingSchedulerData} />;

      case 'meeting-confirmation':
        return <MeetingConfirmationWidget data={data as MeetingConfirmationData} />;

      case 'customer-risk-list':
        return <CustomerRiskListWidget data={data as CustomerRiskListData} />;

      case 'ticket-detail':
        return <TicketDetailWidget data={data as TicketDetailData} />;

      case 'live-ticket-detail':
        return <LiveTicketDetailWidget ticketNumber={(data as LiveTicketDetailData).ticketNumber} />;

      case 'sla-performance-chart':
        return <SLAPerformanceChartWidget data={data as SLAPerformanceChartData} />;

      case 'agent-performance-comparison':
        return <AgentPerformanceComparisonWidget data={data as AgentPerformanceComparisonData} />;

      case 'call-prep-notes':
        return <CallPrepNotesWidget data={data as CallPrepNotesData} />;

      case 'response-composer':
        return <ResponseComposerWidget data={data as ResponseComposerData} onAction={onAction} />;

      case 'similar-tickets-analysis':
        return <SimilarTicketsAnalysisWidget data={data as SimilarTicketsAnalysisData} />;

      case 'agent-performance-stats':
        return <AgentPerformanceStatsWidget data={data as AgentPerformanceStatsData} />;

      case 'knowledge-base-search':
        return <KnowledgeBaseSearchWidget data={data as KnowledgeBaseSearchData} />;

      case 'knowledge-article':
        return <KnowledgeArticleWidget data={data as KnowledgeArticleData} />;

      case 'message-composer':
        return <MessageComposerWidget data={data as MessageComposerData} onAction={onAction} />;

      case 'escalation-path':
        return <EscalationPathWidget data={data as EscalationPathData} />;

      case 'system-access-status':
        return <SystemAccessStatusWidget data={data as SystemAccessStatusData} />;

      case 'interactive-update':
        return <InteractiveUpdateWidget data={data as InteractiveUpdateData} />;

      case 'ticket-processing':
        return <TicketProcessingWidget data={data as TicketProcessingData} />;

      // V17 Government Mode Widgets
      case 'contract-performance-dashboard':
        return <ContractPerformanceDashboardWidget data={data as ContractPerformanceData} />;

      case 'deliverable-review-list':
        return <DeliverableReviewListWidget data={data as DeliverableReviewListData} />;

      case 'vendor-compliance-dashboard':
        return <VendorComplianceDashboardWidget data={data as VendorComplianceData} />;

      case 'program-health-dashboard':
        return <ProgramHealthDashboardWidget data={data as ProgramHealthData} />;

      case 'stakeholder-engagement-dashboard':
        return <StakeholderEngagementDashboardWidget data={data as StakeholderEngagementData} />;

      case 'requirements-tracking-dashboard':
        return <RequirementsTrackingDashboardWidget data={data as RequirementsTrackingData} />;

      case 'change-request-dashboard':
        return <ChangeRequestDashboardWidget data={data as ChangeRequestData} />;

      // V17 Project Mode Widgets
      case 'sprint-burndown-chart':
        return <SprintBurndownChartWidget data={data as SprintBurndownData} />;

      case 'team-velocity-dashboard':
        return <TeamVelocityDashboardWidget data={data as TeamVelocityData} />;

      case 'code-quality-dashboard':
        return <CodeQualityDashboardWidget data={data as CodeQualityData} />;

      case 'deployment-pipeline-dashboard':
        return <DeploymentPipelineDashboardWidget data={data as DeploymentPipelineData} />;

      case 'task-kanban-board':
        return <TaskKanbanBoardWidget data={data as TaskKanbanData} />;

      case 'resource-capacity-dashboard':
        return <ResourceCapacityDashboardWidget data={data as ResourceCapacityData} />;

      case 'blocker-resolution-dashboard':
        return <BlockerResolutionDashboardWidget data={data as BlockerResolutionData} />;

      // V18 ATC CSM Widgets
      case 'client-health-dashboard':
        return <ClientHealthDashboardWidget data={data as ClientHealthDashboardData} />;

      case 'renewal-pipeline':
        return <RenewalPipelineWidget data={data as RenewalPipelineData} />;

      case 'upsell-opportunities':
        return <UpsellOpportunitiesWidget data={data as UpsellOpportunitiesData} />;

      case 'product-adoption-metrics':
        return <ProductAdoptionMetricsWidget data={data as ProductAdoptionMetricsData} />;

      case 'csm-insights-dashboard':
        return <CSMInsightsDashboardWidget data={data as CSMInsightsDashboardData} />;

      case 'csm-training-dashboard':
        return <CSMTrainingDashboardWidget data={data as CSMTrainingDashboardData} />;

      case 'dora-metrics-dashboard':
        return <DoraMetricsDashboardWidget data={data as DoraMetricsData} />;

      default:
        // Fallback for unimplemented widgets
        return (
          <div className="my-4 rounded-lg border border-chart-4/30 bg-amber-500/20 p-4">
            <p className="text-sm text-muted-foreground">
              Widget type <span className="font-mono font-semibold text-foreground">{type}</span> is not yet implemented.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              This widget is coming soon. For now, check the data in the browser console.
            </p>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-3">
                <summary className="text-xs text-muted-foreground cursor-pointer hover:text-foreground">
                  View raw data (development only)
                </summary>
                <pre className="mt-2 text-xs bg-muted/50 p-2 rounded overflow-x-auto">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </details>
            )}
          </div>
        );
    }
  };

  // Wrap widget in container with data-widget-type for E2E testing
  return (
    <div data-widget-type={type}>
      {renderWidget()}
    </div>
  );
}
