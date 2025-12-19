# Demo Preparation Guide: Herbert Roberts (Service Team Lead)

**Mode**: Project Mode
**Primary Focus**: Technical leadership, code quality, and deployment management
**Demo Duration**: 5-7 minutes per category
**Difficulty**: Intermediate-Advanced

---

## 🎯 Persona Overview

**Who They Are**:
Herbert Roberts is a Service Team Lead managing 4-8 developers, responsible for code quality, deployment success, and technical decision-making. His day involves code reviews, architecture decisions, deployment monitoring, incident response, and mentoring developers. He balances feature velocity with technical excellence.

**What They Care About**:
- Goal 1: Maintain 85%+ test coverage on all services (quality gate)
- Goal 2: Keep deployment success rate at 95%+ (reliable releases)
- Goal 3: Reduce critical vulnerabilities to zero (security compliance)
- Goal 4: Decrease MTTR (Mean Time to Recovery) from 4 hours to <2 hours

**Their Pain Points** (before V17):
- Problem 1: Manual aggregation of code quality metrics across 6+ repositories (SonarQube, CodeClimate, GitHub, etc.)
- Problem 2: Reactive deployment issues - pipeline breaks discovered in prod, not pre-deployment
- Problem 3: Difficulty balancing feature velocity with technical debt paydown (no data-driven prioritization)

**How V17 Helps**:
V17 aggregates code quality metrics from all repositories into a unified dashboard. Herbert can ask "Quality metrics by sprint" and see test coverage, code smells, and vulnerabilities across all services. The AI proactively flags deployment risks before pipelines run. Technical debt is quantified and prioritized by business impact.

---

## 📋 Top Demo Scenarios

### Scenario 1: Code Quality Overview

**Query**: "Quality metrics by sprint"
**Widget**: `code-quality-dashboard`
**Shows**: Test coverage 87%, code smells down 15%, 2 critical vulnerabilities (both patched)
**Script**: "Herbert's code quality dashboard shows Sprint 12 achieved 87% test coverage - above the 85% target. Code smells decreased 15% from last sprint due to refactoring work. Two critical vulnerabilities were detected early and patched before production deployment. This aggregates data from SonarQube, Snyk, and GitHub across 6 repositories."

### Scenario 2: Code Review Backlog

**Query**: "Pending code reviews requiring approval"
**Widget**: `code-quality-dashboard` (PR view)
**Shows**: 8 pending PRs, 3 open >48 hours (SLA breach), average review time 18 hours
**Script**: "V17 shows 8 pending pull requests awaiting Herbert's approval. Three have been open >48 hours, breaching the team's 24-hour code review SLA. Average review time is 18 hours - below the 24-hour target but trending upward. Herbert can identify if certain developers consistently submit PRs late Friday (poor timing) or if he needs to delegate more reviews."

### Scenario 3: Deployment Pipeline Health

**Query**: "Deployment pipeline health"
**Widget**: `deployment-pipeline-dashboard`
**Shows**: 12 deployments this week (11 successful, 1 rolled back), pipeline success rate 92%
**Script**: "The deployment dashboard shows 12 deployments this week with 11 successful and 1 rollback. The 92% success rate is below Herbert's 95% target. Drilling into the failed deployment reveals a missing database migration - caught by automated smoke tests before reaching production. V17 flags that similar migration issues occurred in 3 of the last 5 rollbacks, suggesting a systematic process gap."

### Scenario 4: Technical Debt Tracking

**Query**: "Refactoring backlog prioritization"
**Widget**: `code-quality-dashboard` (technical debt view)
**Shows**: 47 technical debt items, $125K estimated cost to fix, top 5 by business impact
**Script**: "Technical debt tracking shows 47 items worth an estimated $125K in developer time to fix. V17 prioritizes by business impact: Item #1 'Monolithic authentication service' blocks 3 planned features and risks security compliance. Item #2 'Legacy API with no test coverage' has 12 dependent services. Herbert can use this data to negotiate technical debt sprints with the Product Owner."

### Scenario 5: Team Performance Trends

**Query**: "Team performance trends"
**Widget**: `code-quality-dashboard` (team metrics)
**Shows**: Velocity stable (±8%), bug introduction rate down 22%, code review quality improved
**Script**: "Team performance metrics show velocity stable at ±8% variance over 6 sprints - excellent predictability. Bug introduction rate decreased 22% due to TDD adoption. Code review quality scores improved from 6.5/10 to 8.2/10 based on defect catch rate. These trends validate Herbert's investments in testing and review rigor."

---

## 🔗 Cross-Persona Workflows

### Workflow 4: Receives Blocker Escalation from Developer
**Role**: Herbert diagnoses blocker reported by Molly, provides solution
**Flow**: Molly reports OAuth error → Herbert debugs → Provides solution + estimates impact
**Time**: 4-8 hours

### Workflow 5: Code Quality Issue Escalation
**Role**: Herbert escalates security vulnerability requiring immediate deployment block
**Flow**: Herbert detects critical CVE → Blocks deployment → Coordinates emergency patch across team
**Time**: 6-8 hours

---

## 🎬 Complete Demo Script (5-7 minutes)

**Opening** (30 seconds):
> "Meet Herbert Roberts, Service Team Lead managing an 8-person development team. His challenge? Maintaining code quality while shipping features fast. Before V17, he spent 2-3 hours per week aggregating quality metrics. Watch the transformation..."

**Scenario Sequence** (5 minutes):
1. Code Quality Dashboard (1.5 min)
2. Code Review Backlog (1 min)
3. Deployment Pipeline Health (1.5 min)
4. Technical Debt Prioritization (1 min)

**Closing** (30 seconds):
> "Herbert reduced quality metric compilation from 3 hours to 30 seconds weekly. Deployment success rate improved from 88% to 95%. MTTR decreased from 4 hours to 1.8 hours. Team velocity remained stable while quality improved 28%."

---

## 💡 Quick Reference

**Top 5 Queries**:
1. "Quality metrics by sprint" → `code-quality-dashboard`
2. "Pending code reviews requiring approval" → `code-quality-dashboard` (PR view)
3. "Deployment pipeline health" → `deployment-pipeline-dashboard`
4. "Critical vulnerabilities in codebase" → `code-quality-dashboard` (security view)
5. "Refactoring backlog prioritization" → `code-quality-dashboard` (technical debt)

**Key Metrics**:
- Test coverage: 78% → 87% (12% improvement)
- Deployment success rate: 88% → 95% (8% improvement)
- MTTR: 4 hours → 1.8 hours (55% reduction)
- Code smell reduction: 15% per sprint (sustained improvement)

---

**Status**: ✅ READY FOR DEMO
