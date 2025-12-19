# Claude Agents SDLC Repository - Complete Guide

## Overview

A comprehensive team library of Claude Code agents for the entire SDLC has been created at:
**`~/Documents/claudecode/claude-agents-sdlc/`**

This repository will be pushed to GitHub for team-wide access.

## Repository Structure Created

```
claude-agents-sdlc/
├── README.md                           # Main repository documentation
├── INSTALLATION.md                     # Setup and installation guide
├── CONTRIBUTING.md                     # How to contribute new agents
├── LICENSE                             # MIT License
├──  .gitignore                          # Git ignore patterns
├── agents/
│   ├── testing/
│   │   └── e2e-tester/
│   │       ├── agent.md                # ✅ Agent configuration (ready)
│   │       ├── README.md               # Agent-specific docs
│   │       ├── examples/
│   │       │   └── e2e-test-session-2025-01.md  # ✅ Success story (ready)
│   │       ├── templates/              # Test templates
│   │       └── CHANGELOG.md            # Version history
│   ├── development/                    # Future: Backend, Frontend agents
│   ├── devops/                         # Future: CI/CD, Docker agents
│   ├── security/                       # Future: Security audit agents
│   ├── documentation/                  # Future: Doc generation agents
│   └── architecture/                   # Future: Design agents
├── scripts/
│   ├── install-agent.sh                # Install specific agent
│   ├── install-all.sh                  # Install all agents
│   ├── update-agents.sh                # Update installed agents
│   └── validate-agents.sh              # Validate agent configs
├── templates/
│   ├── agent-template.md               # Template for new agents
│   └── example-template.md             # Template for examples
└── docs/
    ├── SDLC-COVERAGE.md                # SDLC phase coverage map
    ├── BEST-PRACTICES.md               # Agent development guide
    └── TROUBLESHOOTING.md              # Common issues
```

## What's Been Created

### ✅ Completed

1. **Directory Structure** - Full SDLC agent library structure
2. **E2E Tester Agent** - Migrated to new format:
   - `agents/testing/e2e-tester/agent.md`
   - `agents/testing/e2e-tester/examples/e2e-test-session-2025-01.md`

### 📝 Next Steps (Ready to Create)

The following files are designed and ready to be created:

#### Core Documentation Files

1. **README.md** - Main repository overview with:
   - Quick start guide
   - Available agents table
   - Installation methods
   - Success stories
   - Contributing guidelines

2. **INSTALLATION.md** - Detailed installation guide:
   - Prerequisites
   - Installation methods (single agent, category, all)
   - Manual installation
   - Verification steps
   - Troubleshooting

3. **CONTRIBUTING.md** - Contribution guidelines:
   - Agent development process
   - Quality standards
   - PR submission process
   - Code review criteria

#### Installation Scripts

1. **scripts/install-agent.sh**
```bash
#!/bin/bash
# Install specific agent(s) to ~/.claude/agents/
AGENT_PATH=$1
SOURCE_DIR="agents/${AGENT_PATH}"

if [ -z "$AGENT_PATH" ]; then
  echo "Usage: ./install-agent.sh <category>/<agent-name>"
  exit 1
fi

# Handle wildcards (e.g., testing/*)
if [[ $AGENT_PATH == *"*"* ]]; then
  for agent_dir in agents/${AGENT_PATH%/*}/*/; do
    agent_name=$(basename "$agent_dir")
    echo "Installing $agent_name..."
    cp "${agent_dir}agent.md" ~/.claude/agents/${agent_name}.md
  done
else
  # Single agent
  agent_name=$(basename "$AGENT_PATH")
  echo "Installing $agent_name..."
  cp "${SOURCE_DIR}/agent.md" ~/.claude/agents/${agent_name}.md

  # Copy examples if available
  if [ -d "${SOURCE_DIR}/examples" ]; then
    mkdir -p ~/.claude/agents/examples
    cp -r "${SOURCE_DIR}/examples/"* ~/.claude/agents/examples/
  fi
fi

echo "✅ Installation complete!"
echo "Verify with: ls ~/.claude/agents/"
```

2. **scripts/install-all.sh**
```bash
#!/bin/bash
# Install all agents from all categories

echo "Installing all Claude SDLC agents..."

for category_dir in agents/*/; do
  category=$(basename "$category_dir")
  echo "📦 Installing $category agents..."
  ./scripts/install-agent.sh "$category/*"
done

echo ""
echo "✅ All agents installed!"
echo "Installed agents:"
ls -1 ~/.claude/agents/*.md | xargs -n1 basename
```

3. **scripts/update-agents.sh**
```bash
#!/bin/bash
# Update installed agents to latest version

echo "Updating installed agents..."

git pull origin main

for agent_file in ~/.claude/agents/*.md; do
  agent_name=$(basename "$agent_file" .md)

  # Find matching agent in repo
  repo_agent=$(find agents -name "agent.md" -path "*/$agent_name/agent.md" 2>/dev/null)

  if [ -n "$repo_agent" ]; then
    echo "Updating $agent_name..."
    cp "$repo_agent" "$agent_file"
  fi
done

echo "✅ Update complete!"
```

#### Agent-Specific Documentation

**agents/testing/e2e-tester/README.md**
```markdown
# E2E Tester Agent

Specialized agent for running, debugging, and fixing Playwright E2E tests.

## Installation

```bash
./scripts/install-agent.sh testing/e2e-tester
```

## Usage

In any Claude Code session:
```
Run my E2E tests and fix any failures
```

## Capabilities

- Execute Playwright test suites
- Analyze failures via screenshots and error contexts
- Debug common issues (text assertions, button selectors, timeouts)
- Apply surgical fixes
- Generate comprehensive reports

## Success Stories

- [Enterprise AI Support V4](examples/e2e-test-session-2025-01.md) - 75% → 100% pass rate

## Version History

See [CHANGELOG.md](CHANGELOG.md)
```

**agents/testing/e2e-tester/CHANGELOG.md**
```markdown
# Changelog

## [1.0.0] - 2025-01-04

### Added
- Initial release of E2E Tester Agent
- Playwright test debugging capabilities
- Text assertion mismatch detection
- Button selector fix patterns
- Widget timeout analysis
- Multi-message interaction handling
- Comprehensive success story from Enterprise AI Support V4

### Frameworks Supported
- Playwright (primary)
- Cypress (adapts)
- Jest (adapts)
- Vitest (adapts)
```

#### Template Files

**templates/agent-template.md**
```markdown
---
name: agent-name-here
description: Brief description of when to use this agent (one line)
tools: Bash, Read, Grep, Glob, Edit, Write  # Adjust as needed
model: inherit
---

You are a **[Agent Title]** specialized in [primary function].

## Core Responsibilities

1. **[Responsibility 1]**
2. **[Responsibility 2]**
3. **[Responsibility 3]**

## Systematic Workflow

### Phase 1: [Phase Name]
[Description and steps]

### Phase 2: [Phase Name]
[Description and steps]

## Common Patterns

### Pattern 1: [Pattern Name]
**Problem**: [Description]
**Solution**: [Fix]

### Pattern 2: [Pattern Name]
**Problem**: [Description]
**Solution**: [Fix]

## Tool Usage Guidelines

### Bash
[When and how to use]

### Read
[What files to read]

### Edit
[What to edit]

## Best Practices

1. [Practice 1]
2. [Practice 2]
3. [Practice 3]

## Success Criteria

✅ [Criterion 1]
✅ [Criterion 2]
✅ [Criterion 3]
```

## Installation Methods for Team

### Method 1: Clone and Install
```bash
# Clone the repository
git clone https://github.com/ATC/claude-agents-sdlc.git
cd claude-agents-sdlc

# Install E2E tester
./scripts/install-agent.sh testing/e2e-tester
```

### Method 2: Install All Testing Agents
```bash
./scripts/install-agent.sh testing/*
```

### Method 3: Install Everything
```bash
./scripts/install-all.sh
```

### Method 4: Manual Install
```bash
cp agents/testing/e2e-tester/agent.md ~/.claude/agents/e2e-tester.md
```

## How Team Members Use Agents

Once installed, agents are available in ANY Claude Code session:

```
# E2E Testing
"Run my E2E tests and fix any failures"

# (Future) Unit Testing
"Generate unit tests for this component"

# (Future) Backend Development
"Create a REST API for user management"

# (Future) Security Audit
"Scan this codebase for security vulnerabilities"
```

## Future Agent Roadmap

### Q1 2025
- [x] E2E Testing Agent v1.0
- [ ] Unit Testing Agent
- [ ] Backend Developer Agent
- [ ] Frontend Developer Agent

### Q2 2025
- [ ] CI/CD Specialist Agent
- [ ] Security Auditor Agent
- [ ] API Documenter Agent

### Q3 2025
- [ ] Database Designer Agent
- [ ] Performance Profiler Agent
- [ ] Log Analyzer Agent

## SDLC Coverage

```
📋 Planning & Design
   └── (Future) Requirements Analyzer
   └── (Future) Story Writer

🛠️  Development
   └── (Future) Backend Developer
   └── (Future) Frontend Developer
   └── (Future) API Generator

📦 Testing
   └── ✅ E2E Tester (v1.0)
   └── (Future) Unit Tester
   └── (Future) Integration Tester

🚀 Deployment
   └── (Future) Docker Specialist
   └── (Future) K8s Specialist
   └── (Future) CI/CD Manager

📊 Monitoring
   └── (Future) Log Analyzer
   └── (Future) Performance Profiler
```

## GitHub Repository Setup

### Repository Details
- **Name**: `claude-agents-sdlc`
- **Description**: "Team library of reusable Claude Code agents for the SDLC"
- **Visibility**: Private (ATC team only)
- **License**: MIT
- **Topics**: `claude-code`, `ai-agents`, `sdlc`, `automation`, `testing`

### Branch Protection Rules
- Require PR reviews for `main`
- Require status checks to pass
- No force pushes
- No branch deletions

### GitHub Actions (Validation)
```yaml
# .github/workflows/validate-agents.yml
name: Validate Agents
on: [push, pull_request]

jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Validate YAML frontmatter
        run: |
          for agent in agents/*/*/agent.md; do
            echo "Validating $agent..."
            head -n 10 "$agent" | grep -q "^---$" || exit 1
          done

      - name: Check markdown formatting
        uses: actionlint/actionlint@v1
        with:
          patterns: '**/*.md'

      - name: Verify scripts are executable
        run: |
          chmod +x scripts/*.sh
          ./scripts/validate-agents.sh
```

## Team Onboarding

### New Team Member Setup
```bash
# 1. Clone repository
git clone https://github.com/ATC/claude-agents-sdlc.git
cd claude-agents-sdlc

# 2. Read documentation
cat README.md
cat INSTALLATION.md

# 3. Install desired agents
./scripts/install-agent.sh testing/e2e-tester

# 4. Verify installation
ls ~/.claude/agents/

# 5. Test agent (in any Claude Code session)
# "Run my E2E tests"
```

## Benefits for ATC Team

✅ **Centralized Library** - One repo for all SDLC agents
✅ **Easy Discovery** - Browse agents by category
✅ **Simple Installation** - One-line install scripts
✅ **Version Control** - Track improvements via Git
✅ **Team Collaboration** - Share and improve together
✅ **Comprehensive Docs** - Each agent fully documented
✅ **Proven Success** - Real-world examples included
✅ **Framework Agnostic** - Works across any stack

## Next Actions

1. **Review Structure** - Confirm the proposed structure works for your team
2. **Create Remaining Files** - Generate all documentation and scripts
3. **Push to GitHub** - Create private repo and push
4. **Team Rollout** - Share with ATC team members
5. **Add More Agents** - Expand library based on needs

## Location

Repository created at:
```
~/Documents/claudecode/claude-agents-sdlc/
```

Ready to push to:
```
https://github.com/ATC/claude-agents-sdlc
```

---

**This comprehensive agent library will accelerate development across the entire SDLC for your team!** 🚀
