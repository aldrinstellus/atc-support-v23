# 📖 Documentation Guide

**How to create and maintain documentation in Enterprise AI Support V14**

---

## 📋 Overview

This guide provides step-by-step instructions for creating, organizing, and maintaining documentation in Enterprise AI Support V14. All documentation follows our **SDLC-style structure** defined in [DOCUMENTATION-POLICY.md](../../DOCUMENTATION-POLICY.md).

---

## 🎯 Quick Start

### The Golden Rules

1. ✅ **Use the 15 SDLC categories** - All docs go in numbered folders
2. ✅ **Keep docs/ root clean** - Only `00-DOCUMENTATION-INDEX.md` at root
3. ✅ **Move historical files to `/Aldo/`** - Keep active docs separate
4. ✅ **Update the index** - Every new file goes in `00-DOCUMENTATION-INDEX.md`
5. ✅ **Use naming convention** - `UPPERCASE-WITH-DASHES.md`

---

## 📁 The 15 SDLC Categories

### Where Does Your Documentation Belong?

| Category | Purpose | Examples |
|----------|---------|----------|
| **01-getting-started/** | Onboarding, setup | QUICK-START.md, PREREQUISITES.md |
| **02-architecture/** | System design, patterns | SYSTEM-ARCHITECTURE.md, DESIGN-PATTERNS.md |
| **03-api/** | API reference | API-REFERENCE.md, AUTHENTICATION.md |
| **04-database/** | Schema, migrations | DATABASE-SCHEMA.md, MIGRATIONS.md |
| **05-integrations/** | External services | ANTHROPIC-CLAUDE.md, ZOHO-DESK.md |
| **06-features/** | App capabilities | MULTI-PERSONA-SYSTEM.md, WIDGET-SYSTEM.md |
| **07-components/** | UI components | WIDGET-CATALOG.md, THEME-SYSTEM.md |
| **08-development/** | Dev workflow | DEVELOPER-GUIDE.md, CODING-STANDARDS.md |
| **09-testing/** | Testing, QA | E2E-TESTING.md, QA-CHECKLIST.md |
| **10-deployment/** | Deployment, infra | DOCKER-DEPLOYMENT.md, CI-CD-PIPELINE.md |
| **11-operations/** | DevOps, monitoring | MONITORING.md, TROUBLESHOOTING.md |
| **12-security/** | Security practices | SECURITY-OVERVIEW.md, SECURITY-HEADERS.md |
| **13-performance/** | Optimization | PERFORMANCE-GUIDE.md, BENCHMARKS.md |
| **14-workflows/** | AI scenarios | PASSWORD-RESET.md, ACCOUNT-UNLOCK.md |
| **15-reference/** | Glossary, FAQ | GLOSSARY.md, FAQ.md, QUICK-REFERENCE.md |

---

## ✏️ Creating New Documentation

### Step-by-Step Process

#### 1. Determine the Category

Ask yourself: **"What aspect of the SDLC does this cover?"**

**Examples:**
- "I need to document a new API endpoint" → `03-api/`
- "I'm writing a deployment guide" → `10-deployment/`
- "I'm documenting a troubleshooting process" → `11-operations/`
- "I'm creating a glossary of terms" → `15-reference/`

#### 2. Choose a File Name

**Format**: `UPPERCASE-WITH-DASHES.md`

**Good Examples:**
```
QUICK-START.md
API-REFERENCE.md
DATABASE-SCHEMA.md
PERFORMANCE-GUIDE.md
```

**Bad Examples:**
```
❌ quick_start.md         (wrong format)
❌ apiReference.md        (wrong format)
❌ database schema.md     (spaces not allowed)
❌ guide.md               (too vague)
```

#### 3. Create the File

```bash
# Navigate to project root
cd /Users/admin/Documents/claudecode/Projects/enterprise-ai-support-v14

# Create file in appropriate category
touch docs/[CATEGORY]/YOUR-FILE-NAME.md
```

**Example:**
```bash
touch docs/03-api/NEW-ENDPOINT-DOCS.md
```

#### 4. Use the Documentation Template

Start every documentation file with this template:

```markdown
# 📘 Your Title Here

**Brief description of what this document covers**

---

## Overview

[Introduction paragraph explaining the purpose and scope]

## Prerequisites

[Any requirements before using this documentation]

## Main Content

### Section 1

[Content here]

### Section 2

[Content here]

## Examples

### Example 1: [Description]

\`\`\`typescript
// Code example with syntax highlighting
const example = "Hello World";
\`\`\`

### Example 2: [Description]

\`\`\`bash
# Shell commands
npm install
\`\`\`

## Related Documentation

- [Link to Related Doc 1](./RELATED-DOC-1.md)
- [Link to Related Doc 2](../other-category/RELATED-DOC-2.md)

## Troubleshooting

### Issue 1

**Problem**: [Description]
**Solution**: [How to fix]

### Issue 2

**Problem**: [Description]
**Solution**: [How to fix]

## Additional Resources

- [External Link 1](https://example.com)
- [External Link 2](https://example.com)

---

**Last Updated**: October 14, 2025
**Version**: 14.0.0
**Status**: ✅ Active
```

#### 5. Write the Content

Follow these guidelines:

**Do:**
- ✅ Use clear, concise language
- ✅ Include code examples with syntax highlighting
- ✅ Add cross-references to related docs
- ✅ Include troubleshooting sections
- ✅ Use emoji indicators (📘 📋 ⚡ etc.)
- ✅ Add step-by-step instructions where applicable

**Don't:**
- ❌ Use unclear abbreviations without definitions
- ❌ Skip code examples
- ❌ Forget to cross-reference related docs
- ❌ Leave outdated information

#### 6. Update the Documentation Index

**CRITICAL**: Every new file MUST be added to `docs/00-DOCUMENTATION-INDEX.md`

```bash
# Open the index
code docs/00-DOCUMENTATION-INDEX.md

# Find the appropriate category section
# Add your file in alphabetical order within that section
```

**Example addition:**
```markdown
### 03-api/
**API reference and examples**
- **[API-OVERVIEW.md](./03-api/API-OVERVIEW.md)** - API introduction and conventions
- **[API-REFERENCE.md](./03-api/API-REFERENCE.md)** - Complete endpoint catalog (30+ endpoints)
- **[NEW-ENDPOINT-DOCS.md](./03-api/NEW-ENDPOINT-DOCS.md)** - Documentation for new endpoint ← ADD THIS
- **[AUTHENTICATION.md](./03-api/AUTHENTICATION.md)** - Authentication patterns and security
```

#### 7. Commit Your Changes

```bash
# Stage your changes
git add docs/[CATEGORY]/YOUR-FILE-NAME.md docs/00-DOCUMENTATION-INDEX.md

# Commit with clear message
git commit -m "docs: Add YOUR-FILE-NAME documentation"

# Push to remote
git push origin main
```

---

## 📝 Updating Existing Documentation

### Step-by-Step Process

#### 1. Read the Current File First

```bash
# Always read before editing
cat docs/[CATEGORY]/FILE-NAME.md
```

Or use the Read tool in Claude Code.

#### 2. Make Your Updates

- Update outdated information
- Add new examples
- Fix typos or unclear sections
- Improve formatting

#### 3. Update Metadata

Always update the "Last Updated" date:

```markdown
---

**Last Updated**: October 14, 2025  ← UPDATE THIS
**Version**: 14.0.0
**Status**: ✅ Active
```

#### 4. Commit Your Changes

```bash
git add docs/[CATEGORY]/FILE-NAME.md
git commit -m "docs: Update FILE-NAME with [specific changes]"
git push origin main
```

**Example commit messages:**
```
docs: Update API-REFERENCE with new authentication endpoint
docs: Fix typos in QUICK-START guide
docs: Add troubleshooting section to DEPLOYMENT-GUIDE
```

---

## 🗂️ Managing Historical Documentation

### When to Move Files to /Aldo/

Move documentation to `/Aldo/` when it is:

- ✅ Deprecated or superseded by newer docs
- ✅ From previous versions (V1-V13)
- ✅ Working notes or session documentation
- ✅ Experimental docs that didn't make the cut
- ✅ Duplicate information
- ✅ No longer relevant to V14

### How to Move Files to /Aldo/

```bash
# Move the file
mv docs/[CATEGORY]/OLD-FILE.md Aldo/

# Or move multiple files
mv docs/OLD-FILE-1.md docs/OLD-FILE-2.md Aldo/

# Remove from documentation index (if present)
# Edit docs/00-DOCUMENTATION-INDEX.md and remove the reference

# Commit the cleanup
git add docs/ Aldo/
git commit -m "docs: Move OLD-FILE to Aldo/ (deprecated)"
git push origin main
```

### Adding Deprecation Notes

If a file was replaced, add a note in the new file:

```markdown
> **Note**: This document supersedes `OLD-FILE.md` (now in `/Aldo/` for reference).
```

---

## ✅ Documentation Checklist

Before committing documentation changes, verify:

### File Organization
- [ ] File is in the correct SDLC category folder
- [ ] File follows naming convention: `UPPERCASE-WITH-DASHES.md`
- [ ] No extra files in `/docs/` root (only `00-DOCUMENTATION-INDEX.md`)
- [ ] Old/deprecated docs moved to `/Aldo/`

### Content Quality
- [ ] Clear H1 title with emoji indicator
- [ ] "Last Updated" date in footer
- [ ] Code examples with proper syntax highlighting
- [ ] Cross-references use relative links
- [ ] Troubleshooting section (if applicable)
- [ ] Related documentation links

### Index & Commit
- [ ] File added to `docs/00-DOCUMENTATION-INDEX.md`
- [ ] Commit message follows format: `docs: [description]`
- [ ] Changes pushed to remote

---

## 🎨 Formatting Guidelines

### Headers

Use hierarchical headers:

```markdown
# H1 - Document Title (use once at top)
## H2 - Major Section
### H3 - Subsection
#### H4 - Detail Section
```

### Code Blocks

Always specify the language for syntax highlighting:

````markdown
```typescript
const hello: string = "world";
```

```bash
npm install
```

```json
{
  "key": "value"
}
```
````

### Links

Use relative links for internal documentation:

```markdown
✅ [Quick Start](../01-getting-started/QUICK-START.md)
✅ [API Reference](./API-REFERENCE.md)
❌ [Quick Start](/docs/01-getting-started/QUICK-START.md)  (absolute paths break on GitHub)
```

### Lists

Use consistent formatting:

```markdown
**Unordered:**
- Item 1
- Item 2
  - Sub-item
  - Sub-item

**Ordered:**
1. First step
2. Second step
3. Third step

**Checklists:**
- [ ] Incomplete task
- [x] Completed task
```

### Tables

Use tables for structured data:

```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
| Data 4   | Data 5   | Data 6   |
```

### Callouts

Use blockquotes for important notes:

```markdown
> **Note**: Important information here

> **Warning**: Critical warning here

> **Tip**: Helpful tip here
```

---

## 🔍 Finding Documentation

### How to Search

**1. Start with the Index:**
```
docs/00-DOCUMENTATION-INDEX.md
```

**2. Browse by Category:**
```
docs/01-getting-started/
docs/02-architecture/
etc.
```

**3. Use grep to search content:**
```bash
grep -r "search term" docs/
```

**4. Check Historical Docs:**
```
Aldo/  (for older versions)
```

---

## 🚫 Common Mistakes to Avoid

### ❌ Mistake 1: Creating Files Outside Structure

**Wrong:**
```
docs/my-notes.md
docs/temp.md
docs/draft-guide.md
```

**Right:**
```
Aldo/my-notes.md       (if historical/temporary)
OR
docs/[CATEGORY]/PROPER-NAME.md  (if part of official docs)
```

### ❌ Mistake 2: Forgetting to Update Index

**Wrong:**
- Create `docs/03-api/NEW-FILE.md`
- Commit without updating `00-DOCUMENTATION-INDEX.md`

**Right:**
- Create `docs/03-api/NEW-FILE.md`
- Add entry to `docs/00-DOCUMENTATION-INDEX.md`
- Commit both files together

### ❌ Mistake 3: Inconsistent Naming

**Wrong:**
```
quick_start.md
Quick-Start-Guide.md
quickstart.md
```

**Right:**
```
QUICK-START.md
```

### ❌ Mistake 4: Leaving Old Docs in /docs/

**Wrong:**
- Keep old versions alongside new ones in `/docs/`
- Results in clutter and confusion

**Right:**
- Move old versions to `/Aldo/`
- Keep only current, active documentation in `/docs/`

---

## 📚 Examples

### Example 1: Adding API Documentation

```bash
# 1. Create the file
touch docs/03-api/WEBHOOK-ENDPOINTS.md

# 2. Write content using template
code docs/03-api/WEBHOOK-ENDPOINTS.md

# 3. Update index
code docs/00-DOCUMENTATION-INDEX.md
# Add: - **[WEBHOOK-ENDPOINTS.md](./03-api/WEBHOOK-ENDPOINTS.md)** - Webhook endpoint documentation

# 4. Commit
git add docs/03-api/WEBHOOK-ENDPOINTS.md docs/00-DOCUMENTATION-INDEX.md
git commit -m "docs: Add webhook endpoints documentation"
git push origin main
```

### Example 2: Moving Deprecated Documentation

```bash
# 1. Move old file to Aldo
mv docs/setup/OLD-SETUP-GUIDE.md Aldo/

# 2. Remove from index
code docs/00-DOCUMENTATION-INDEX.md
# Delete the OLD-SETUP-GUIDE.md reference

# 3. Add note in new file (if applicable)
code docs/01-getting-started/QUICK-START.md
# Add: > **Note**: This supersedes OLD-SETUP-GUIDE.md (now in /Aldo/)

# 4. Commit
git add docs/ Aldo/
git commit -m "docs: Deprecate OLD-SETUP-GUIDE, superseded by QUICK-START"
git push origin main
```

### Example 3: Updating Existing Documentation

```bash
# 1. Read current content
cat docs/10-deployment/DOCKER-DEPLOYMENT.md

# 2. Make updates
code docs/10-deployment/DOCKER-DEPLOYMENT.md
# Update content + "Last Updated" date

# 3. Commit
git add docs/10-deployment/DOCKER-DEPLOYMENT.md
git commit -m "docs: Update Docker deployment with multi-stage build instructions"
git push origin main
```

---

## 🎯 Best Practices

### For New Documentation

1. **Plan before writing** - Know which category it belongs to
2. **Use the template** - Start with the standard structure
3. **Include examples** - Code examples help understanding
4. **Cross-reference** - Link to related documentation
5. **Update the index** - Never skip this step

### For Existing Documentation

1. **Read first** - Understand current content before editing
2. **Preserve structure** - Maintain existing organization
3. **Update metadata** - Always update "Last Updated" date
4. **Test links** - Ensure all links still work
5. **Commit clearly** - Describe what changed

### For Historical Documentation

1. **Move promptly** - Don't let `/docs/` get cluttered
2. **Preserve context** - Keep old docs in `/Aldo/` for reference
3. **Add notes** - Explain why docs were deprecated
4. **Update index** - Remove references to moved files
5. **Clean commit** - Clear commit message about what moved

---

## 📞 Need Help?

### Quick Links

- **Policy Document**: [DOCUMENTATION-POLICY.md](../../DOCUMENTATION-POLICY.md)
- **Documentation Index**: [00-DOCUMENTATION-INDEX.md](../00-DOCUMENTATION-INDEX.md)
- **Coding Standards**: [CODING-STANDARDS.md](./CODING-STANDARDS.md)

### Common Questions

**Q: Where does my documentation go?**
A: Check the [15 SDLC categories](#-the-15-sdlc-categories) table above.

**Q: What if my doc fits multiple categories?**
A: Choose the primary purpose. Cross-reference from other categories in the index.

**Q: Can I create files outside the structure?**
A: No. All documentation must be in one of the 15 categories or in `/Aldo/`.

**Q: What about README files for sub-projects?**
A: README.md files for code directories are fine. This policy applies to `.md` documentation files.

---

**Last Updated**: October 14, 2025
**Version**: 14.0.0
**Status**: ✅ Active
