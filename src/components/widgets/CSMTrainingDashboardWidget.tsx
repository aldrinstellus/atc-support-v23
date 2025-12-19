'use client';

import type { CSMTrainingDashboardData } from '@/types/widget';
import { GraduationCap, Calendar, Users, Star, Clock, BookOpen, AlertCircle, CheckCircle, XCircle } from 'lucide-react';

interface CSMTrainingDashboardWidgetProps {
  data: CSMTrainingDashboardData;
}

const trainingTypeLabels = {
  onboarding: 'Onboarding',
  'feature-adoption': 'Feature Adoption',
  'best-practices': 'Best Practices',
  advanced: 'Advanced',
  refresher: 'Refresher',
};

const trainingTypeColors = {
  onboarding: 'bg-blue-500/20 text-blue-400',
  'feature-adoption': 'bg-purple-500/20 text-purple-400',
  'best-practices': 'bg-green-500/20 text-green-400',
  advanced: 'bg-orange-500/20 text-orange-400',
  refresher: 'bg-yellow-500/20 text-yellow-400',
};

const statusIcons = {
  scheduled: Calendar,
  'in-progress': Clock,
  completed: CheckCircle,
  cancelled: XCircle,
};

const statusColors = {
  scheduled: 'text-blue-400',
  'in-progress': 'text-yellow-400',
  completed: 'text-green-400',
  cancelled: 'text-red-400',
};

const priorityColors = {
  high: 'bg-red-500/20 text-red-400 border-red-500/30',
  medium: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  low: 'bg-green-500/20 text-green-400 border-green-500/30',
};

export function CSMTrainingDashboardWidget({ data }: CSMTrainingDashboardWidgetProps) {
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/20">
            <GraduationCap className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{data.title}</h3>
            <p className="text-xs text-muted-foreground">{data.period}</p>
          </div>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        <div className="p-3 rounded-lg bg-blue-500/20">
          <p className="text-xs text-blue-400">Upcoming</p>
          <p className="text-xl font-bold text-blue-400">{data.upcomingCount}</p>
        </div>
        <div className="p-3 rounded-lg bg-emerald-500/20">
          <p className="text-xs text-green-400">Completed</p>
          <p className="text-xl font-bold text-green-400">{data.completedThisMonth}</p>
        </div>
        <div className="p-3 rounded-lg bg-amber-500/20">
          <p className="text-xs text-yellow-400">Avg Satisfaction</p>
          <div className="flex items-center gap-1">
            <p className="text-xl font-bold text-yellow-400">{data.averageSatisfaction}</p>
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
          </div>
        </div>
        <div className="p-3 rounded-lg bg-red-500/20">
          <p className="text-xs text-red-400">Needs Training</p>
          <p className="text-xl font-bold text-red-400">{data.customersNeedingTraining.length}</p>
        </div>
      </div>

      {/* Training Sessions */}
      <div className="mb-5">
        <h4 className="text-sm font-medium text-muted-foreground mb-3">Training Sessions</h4>
        <div className="space-y-2">
          {data.trainingSessions.map((session) => {
            const StatusIcon = statusIcons[session.status];
            return (
              <div
                key={session.id}
                className="p-3 rounded-lg border border-border bg-muted/20 hover:bg-muted/40 transition-colors"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded ${trainingTypeColors[session.trainingType]}`}>
                        {trainingTypeLabels[session.trainingType]}
                      </span>
                      <StatusIcon className={`h-4 w-4 ${statusColors[session.status]}`} />
                      <span className="text-xs text-muted-foreground capitalize">{session.status}</span>
                    </div>
                    <h5 className="font-medium text-foreground">{session.customerName}</h5>
                    <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {formatDate(session.scheduledDate)}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {session.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {session.attendees} attendees
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {session.topics.map((topic, idx) => (
                        <span key={idx} className="px-2 py-0.5 text-xs bg-muted rounded-full text-muted-foreground">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  {session.satisfactionScore && (
                    <div className="text-right">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        <span className="font-bold text-foreground">{session.satisfactionScore}</span>
                      </div>
                      {session.completionRate && (
                        <p className="text-xs text-muted-foreground">{session.completionRate}% complete</p>
                      )}
                    </div>
                  )}
                </div>
                {session.notes && (
                  <p className="mt-2 text-xs text-yellow-400 bg-amber-500/20 p-2 rounded">
                    {session.notes}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Customers Needing Training */}
      <div className="mb-5">
        <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <AlertCircle className="h-4 w-4 text-red-400" />
          Customers Needing Training
        </h4>
        <div className="space-y-2">
          {data.customersNeedingTraining.map((customer) => (
            <div
              key={customer.customerId}
              className="p-3 rounded-lg border border-border bg-muted/20"
            >
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-medium text-foreground">{customer.customerName}</h5>
                <span className={`px-2 py-0.5 text-xs font-medium rounded border ${priorityColors[customer.priority]}`}>
                  {customer.priority.toUpperCase()}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{customer.reason}</p>
              <div className="flex flex-wrap gap-1">
                {customer.suggestedTopics.map((topic, idx) => (
                  <span key={idx} className="px-2 py-0.5 text-xs bg-primary/20 text-primary rounded-full">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Top Requested Topics */}
      <div>
        <h4 className="text-sm font-medium text-muted-foreground mb-3 flex items-center gap-2">
          <BookOpen className="h-4 w-4" />
          Top Requested Topics
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {data.topRequestedTopics.map((topic, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded bg-muted/30">
              <span className="text-sm text-foreground">{topic.topic}</span>
              <span className="text-xs text-muted-foreground">{topic.requestCount} requests</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
