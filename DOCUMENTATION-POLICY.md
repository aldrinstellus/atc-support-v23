# 📜 Documentation Policy - Enterprise AI Support V14

**Effective Date**: October 14, 2025
**Version**: 14.0.0
**Status**: 🔒 **OFFICIAL POLICY** - All future work must follow these standards

---

## 🎯 Purpose

This document establishes the **official documentation standards** for Enterprise AI Support V14 and all future development. This policy ensures:

- **Consistency**: All documentation follows the same professional SDLC structure
- **Maintainability**: Clear organization makes documentation easy to find and update
- **Professionalism**: Enterprise-grade documentation suitable for any stakeholder
- **Historical Preservation**: Previous documentation is preserved without cluttering active docs

---

## 📋 Mandatory Documentation Structure

### ✅ REQUIRED: SDLC-Style Organization

**All documentation MUST be organized in the `/docs/` directory using these 15 categories:**

```
docs/
├── 00-DOCUMENTATION-INDEX.md        # Master index (REQUIRED at root)
├── 01-getting-started/              # Setup and onboarding
├── 02-architecture/                 # System design and patterns
├── 03-api/                          # API reference and examples
├── 04-database/                     # Schema and data management
├── 05-integrations/                 # External service integrations
├── 06-features/                     # Application features
├── 07-components/                   # UI component library
├── 08-development/                  # Developer workflow and standards
├── 09-testing/                      # Testing strategy and QA
├── 10-deployment/                   # Deployment and infrastructure
├── 11-operations/                   # DevOps and monitoring
├── 12-security/                     # Security practices and audits
├── 13-performance/                  # Optimization and benchmarks
├── 14-workflows/                    # AI workflow scenarios
└── 15-reference/                    # Glossary, FAQ, quick reference
```

### ✅ REQUIRED: File Naming Convention

- **Format**: `UPPERCASE-WITH-DASHES.md`
- **Examples**:
  - ✅ `QUICK-START.md`
  - ✅ `API-REFERENCE.md`
  - ✅ `SYSTEM-ARCHITECTURE.md`
  - ❌ `quick_start.md`
  - ❌ `apiReference.md`

### ✅ REQUIRED: Documentation Standards

All documentation files must include:

1. **Clear H1 title** with emoji indicator
2. **Metadata** (if applicable): version, date, status
3. **Table of contents** for files >100 lines
4. **Code examples** with proper syntax highlighting
5. **Cross-references** to related documentation
6. **Last updated date** in footer

---

## 🗂️ Historical Documentation: The Aldo Folder

### ✅ REQUIRED: /Aldo/ Folder Usage

**ALL historical, legacy, and extra documentation files MUST be moved to `/Aldo/` folder.**

**What goes in /Aldo/:**
- ✅ Previous version documentation
- ✅ Deprecated guides and references
- ✅ Old setup instructions
- ✅ Project evolution notes
- ✅ Session notes and working documents
- ✅ Duplicate or superseded documentation
- ✅ Experimental documentation that didn't make the cut
- ✅ Any `.md` files that don't fit the SDLC structure

**What does NOT go in /Aldo/:**
- ❌ Active SDLC documentation (stays in `/docs/`)
- ❌ README.md (stays at root)
- ❌ CLAUDE.md (stays at root)
- ❌ DOCUMENTATION-POLICY.md (stays at root)
- ❌ package.json, tsconfig.json, or any code files

### Example: Moving Files to Aldo

```bash
# Moving old documentation
mv OLD-GUIDE.md Aldo/
mv LEGACY-SETUP.md Aldo/
mv session-notes.md Aldo/

# Commit the cleanup
git add Aldo/
git commit -m "docs: Move historical documentation to Aldo/"
```

---

## 📝 Documentation Workflow

### When Creating New Documentation

**Step 1: Determine the Category**

Ask yourself: "Where does this documentation belong in the SDLC?"

- Is it about getting started? → `01-getting-started/`
- Is it about system design? → `02-architecture/`
- Is it API documentation? → `03-api/`
- Is it a deployment guide? → `10-deployment/`
- Is it troubleshooting? → `11-operations/`
- Is it a reference? → `15-reference/`

**Step 2: Create the File**

```bash
# Create in the appropriate category
touch docs/03-api/NEW-API-FEATURE.md
```

**Step 3: Follow Documentation Standards**

Use this template:

```markdown
# 📘 Title Here

**Purpose**: Brief description of what this document covers

---

## Overview

[Main content here]

## Examples

[Code examples with syntax highlighting]

## Related Documentation

- [Link to related docs]

---

**Last Updated**: [Date]
**Version**: 14.0.0
```

**Step 4: Update the Index**

Add your new documentation to `docs/00-DOCUMENTATION-INDEX.md`:

```markdown
### 03-api/
- **[NEW-API-FEATURE.md](./03-api/NEW-API-FEATURE.md)** - Description here
```

**Step 5: Commit**

```bash
git add docs/03-api/NEW-API-FEATURE.md docs/00-DOCUMENTATION-INDEX.md
git commit -m "docs: Add NEW-API-FEATURE documentation"
```

### When Updating Existing Documentation

**Step 1: Read the Current File**

Always read the file first to understand its context.

**Step 2: Make Your Changes**

Update content, examples, or structure as needed.

**Step 3: Update Metadata**

Update the "Last Updated" date at the bottom of the file.

**Step 4: Commit**

```bash
git add docs/path/to/FILE.md
git commit -m "docs: Update FILE with [description]"
```

### When Deprecating Documentation

**Step 1: Move to Aldo**

```bash
mv docs/category/OLD-FILE.md Aldo/
```

**Step 2: Update Index**

Remove the reference from `docs/00-DOCUMENTATION-INDEX.md`.

**Step 3: Add Note (if needed)**

If the file was replaced, add a note in the new file:

```markdown
> **Note**: This document supersedes the previous `OLD-FILE.md`
> (now in `/Aldo/` for reference).
```

**Step 4: Commit**

```bash
git add docs/ Aldo/
git commit -m "docs: Deprecate OLD-FILE, replaced by NEW-FILE"
```

---

## 🚫 What NOT to Do

### ❌ DON'T Create Files Outside the Structure

**Wrong:**
```
docs/my-random-notes.md
docs/temp-file.md
docs/working-draft.md
```

**Right:**
```
Aldo/my-random-notes.md  # If it's historical/temporary
```

### ❌ DON'T Skip the Documentation Index

Every new file MUST be added to `docs/00-DOCUMENTATION-INDEX.md`.

### ❌ DON'T Use Inconsistent Naming

**Wrong:**
```
quick_start.md
QuickStart.md
quick-start-guide.md
```

**Right:**
```
QUICK-START.md
```

### ❌ DON'T Leave Old Docs in /docs/

When creating new documentation that replaces old docs, move the old ones to `/Aldo/`.

---

## 📊 Policy Compliance

### Documentation Quality Checklist

Before committing documentation changes, verify:

- ✅ File is in correct SDLC category folder
- ✅ File follows naming convention (UPPERCASE-WITH-DASHES.md)
- ✅ File is added to `docs/00-DOCUMENTATION-INDEX.md`
- ✅ File has proper H1 title with emoji
- ✅ File has "Last Updated" date
- ✅ Code examples use proper syntax highlighting
- ✅ Cross-references use relative links
- ✅ Old/deprecated docs moved to `/Aldo/`
- ✅ Commit message follows format: `docs: [description]`

### Audit Process

Documentation structure will be audited to ensure:

1. `/docs/` root contains ONLY `00-DOCUMENTATION-INDEX.md` + 15 category folders
2. All historical docs are in `/Aldo/`
3. All files follow naming conventions
4. All documentation is referenced in the index

---

## 🔧 Enforcement

### For Developers

- **Required**: Follow this policy for all documentation changes
- **Code Reviews**: PR reviews will check documentation compliance
- **CI/CD**: (Future) Automated checks for documentation structure

### For Claude Code AI

When working on this repository:

1. **ALWAYS** follow the SDLC structure for new documentation
2. **ALWAYS** move extra/historical files to `/Aldo/`
3. **NEVER** create documentation outside the 15 categories
4. **ALWAYS** update `docs/00-DOCUMENTATION-INDEX.md` when adding files
5. **ALWAYS** use proper file naming conventions

### For Contributors

All contributors must:

- Read this policy before creating documentation
- Follow the SDLC structure
- Keep `/docs/` root clean (only index + categories)
- Move historical files to `/Aldo/`

---

## 📚 Quick Reference

### Common Scenarios

**Scenario**: "I need to document a new feature"
- **Action**: Create file in `docs/06-features/`
- **Update**: `docs/00-DOCUMENTATION-INDEX.md`

**Scenario**: "I found an old setup guide"
- **Action**: Move to `Aldo/OLD-SETUP-GUIDE.md`
- **Update**: Remove from index if present

**Scenario**: "I have temporary working notes"
- **Action**: Keep in `Aldo/` (never commit to `/docs/`)

**Scenario**: "I'm updating existing docs"
- **Action**: Update file + "Last Updated" date
- **Commit**: `docs: Update [FILENAME] with [changes]`

### Category Selection Guide

| Content Type | Category |
|-------------|----------|
| Setup instructions | `01-getting-started/` |
| System design | `02-architecture/` |
| API endpoints | `03-api/` |
| Database tables | `04-database/` |
| External services | `05-integrations/` |
| App features | `06-features/` |
| UI widgets | `07-components/` |
| Dev workflow | `08-development/` |
| Test guides | `09-testing/` |
| Deployment | `10-deployment/` |
| Operations | `11-operations/` |
| Security | `12-security/` |
| Performance | `13-performance/` |
| AI workflows | `14-workflows/` |
| Glossary/FAQ | `15-reference/` |

---

## 📞 Questions?

If you're unsure where documentation should go:

1. Check `docs/00-DOCUMENTATION-INDEX.md` for examples
2. Review similar existing documentation
3. Use the category selection guide above
4. When in doubt, ask in PR review

---

## 🔄 Auto-Sync Features

### Browser Tab Title Auto-Sync

The browser tab title automatically syncs with the version from `package.json`:

**How It Works:**
- Update `package.json` version → Browser tab updates automatically
- No manual updates needed in `layout.tsx`

**Version Format Examples:**
```json
// package.json: "version": "14.0.0"  → Browser: "Enterprise AI Support V14"
// package.json: "version": "15.0.0"  → Browser: "Enterprise AI Support V15"
// package.json: "version": "14.1.0"  → Browser: "Enterprise AI Support V14.1"
// package.json: "version": "16.2.3"  → Browser: "Enterprise AI Support V16.2.3"
```

**When Creating New Versions:**
1. Update `package.json` version
2. Browser tab title updates automatically ✅
3. No manual changes needed in layout.tsx ✅

This ensures consistent branding across all versions and branches.

---

## 🎉 Benefits of This Policy

**For Developers:**
- Easy to find documentation
- Clear organization reduces confusion
- Professional codebase presentation
- Auto-sync features reduce manual work

**For New Team Members:**
- Quick onboarding with clear structure
- Everything has its place
- Historical context preserved

**For Stakeholders:**
- Enterprise-grade documentation
- SDLC-compliant organization
- Professional presentation

**For Maintenance:**
- Easy to update specific sections
- Clear file organization
- No documentation clutter

---

## 📈 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | Oct 14, 2025 | Initial policy established for V14 |

---

## ✅ Policy Acknowledgment

By working on Enterprise AI Support V14, you acknowledge and agree to follow this documentation policy.

---

**Policy Owner**: Enterprise AI Support V14 Team
**Effective Date**: October 14, 2025
**Review Cycle**: Annually or as needed

---

**This is the official documentation standard for V14 and all future versions.**

🔒 **LOCKED POLICY** - Changes to this policy require team approval.
