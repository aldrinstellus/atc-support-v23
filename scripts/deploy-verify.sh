#!/bin/bash

# =============================================================================
# V21 DEPLOYMENT VERIFICATION SCRIPT
# 3-Level Full Spectrum Check
# =============================================================================
#
# Usage: ./scripts/deploy-verify.sh [--skip-local] [--skip-push]
#
# Levels:
#   1. LOCAL VALIDATION - Build, type-check, lint
#   2. GITHUB PUSH - Commit and push verification
#   3. VERCEL PRODUCTION - Deploy, cache headers, live verification
#
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color
BOLD='\033[1m'

# Configuration
VERCEL_URL="https://atc-support-v21.vercel.app"
DEMO_PATH="/demo/c-level"
FULL_URL="${VERCEL_URL}${DEMO_PATH}"

# Flags
SKIP_LOCAL=false
SKIP_PUSH=false

# Parse arguments
for arg in "$@"; do
  case $arg in
    --skip-local)
      SKIP_LOCAL=true
      shift
      ;;
    --skip-push)
      SKIP_PUSH=true
      shift
      ;;
  esac
done

# Helper functions
print_header() {
  echo ""
  echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
  echo -e "${BOLD}${CYAN}$1${NC}"
  echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
}

print_step() {
  echo -e "${YELLOW}▶${NC} $1"
}

print_success() {
  echo -e "${GREEN}✅ $1${NC}"
}

print_error() {
  echo -e "${RED}❌ $1${NC}"
}

print_warning() {
  echo -e "${YELLOW}⚠️  $1${NC}"
}

print_info() {
  echo -e "${CYAN}ℹ️  $1${NC}"
}

# Track results
declare -a LEVEL1_RESULTS=()
declare -a LEVEL2_RESULTS=()
declare -a LEVEL3_RESULTS=()

# =============================================================================
# LEVEL 1: LOCAL VALIDATION
# =============================================================================
run_level1() {
  print_header "LEVEL 1: LOCAL VALIDATION"

  if [ "$SKIP_LOCAL" = true ]; then
    print_warning "Skipping Level 1 (--skip-local flag)"
    return 0
  fi

  local level1_pass=true

  # 1.1 TypeScript Check
  print_step "Running TypeScript type-check..."
  if npm run type-check > /dev/null 2>&1; then
    print_success "TypeScript: No errors"
    LEVEL1_RESULTS+=("TypeScript: ✅ PASS")
  else
    print_error "TypeScript: Errors found"
    LEVEL1_RESULTS+=("TypeScript: ❌ FAIL")
    level1_pass=false
  fi

  # 1.2 ESLint Check
  print_step "Running ESLint..."
  if npm run lint > /dev/null 2>&1; then
    print_success "ESLint: No errors"
    LEVEL1_RESULTS+=("ESLint: ✅ PASS")
  else
    print_warning "ESLint: Warnings found (non-blocking)"
    LEVEL1_RESULTS+=("ESLint: ⚠️ WARNINGS")
  fi

  # 1.3 Build Check
  print_step "Running production build..."
  if npm run build > /dev/null 2>&1; then
    print_success "Build: Success"
    LEVEL1_RESULTS+=("Build: ✅ PASS")
  else
    print_error "Build: Failed"
    LEVEL1_RESULTS+=("Build: ❌ FAIL")
    level1_pass=false
  fi

  # 1.4 Check for uncommitted changes
  print_step "Checking git status..."
  if [ -z "$(git status --porcelain)" ]; then
    print_success "Git: Working tree clean"
    LEVEL1_RESULTS+=("Git Status: ✅ CLEAN")
  else
    print_warning "Git: Uncommitted changes detected"
    LEVEL1_RESULTS+=("Git Status: ⚠️ UNCOMMITTED")
    git status --short
  fi

  if [ "$level1_pass" = false ]; then
    print_error "Level 1 FAILED - Fix errors before proceeding"
    return 1
  fi

  print_success "LEVEL 1 COMPLETE"
  return 0
}

# =============================================================================
# LEVEL 2: GITHUB PUSH VERIFICATION
# =============================================================================
run_level2() {
  print_header "LEVEL 2: GITHUB PUSH VERIFICATION"

  if [ "$SKIP_PUSH" = true ]; then
    print_warning "Skipping Level 2 (--skip-push flag)"
    return 0
  fi

  local level2_pass=true

  # 2.1 Check if there are changes to commit
  print_step "Checking for changes to commit..."
  if [ -n "$(git status --porcelain)" ]; then
    print_info "Changes detected - committing..."
    git add .
    git commit -m "deploy: automated deployment $(date +%Y-%m-%d-%H%M)"
    LEVEL2_RESULTS+=("Commit: ✅ CREATED")
  else
    print_info "No changes to commit"
    LEVEL2_RESULTS+=("Commit: ℹ️ NO CHANGES")
  fi

  # 2.2 Push to GitHub
  print_step "Pushing to GitHub..."
  if git push origin main 2>&1; then
    print_success "GitHub push: Success"
    LEVEL2_RESULTS+=("GitHub Push: ✅ PASS")
  else
    print_error "GitHub push: Failed"
    LEVEL2_RESULTS+=("GitHub Push: ❌ FAIL")
    level2_pass=false
  fi

  # 2.3 Verify remote is up to date
  print_step "Verifying remote sync..."
  git fetch origin main > /dev/null 2>&1
  LOCAL_HASH=$(git rev-parse HEAD)
  REMOTE_HASH=$(git rev-parse origin/main)

  if [ "$LOCAL_HASH" = "$REMOTE_HASH" ]; then
    print_success "Remote sync: Verified (${LOCAL_HASH:0:7})"
    LEVEL2_RESULTS+=("Remote Sync: ✅ VERIFIED")
  else
    print_error "Remote sync: Mismatch"
    LEVEL2_RESULTS+=("Remote Sync: ❌ MISMATCH")
    level2_pass=false
  fi

  if [ "$level2_pass" = false ]; then
    print_error "Level 2 FAILED"
    return 1
  fi

  print_success "LEVEL 2 COMPLETE"
  return 0
}

# =============================================================================
# LEVEL 3: VERCEL PRODUCTION VALIDATION
# =============================================================================
run_level3() {
  print_header "LEVEL 3: VERCEL PRODUCTION VALIDATION"

  local level3_pass=true

  # 3.1 Deploy to Vercel
  print_step "Deploying to Vercel production..."
  DEPLOY_OUTPUT=$(vercel --prod --yes 2>&1)

  if echo "$DEPLOY_OUTPUT" | grep -q "Production:"; then
    print_success "Vercel deploy: Success"
    LEVEL3_RESULTS+=("Vercel Deploy: ✅ PASS")

    # Extract deployment URL
    DEPLOY_URL=$(echo "$DEPLOY_OUTPUT" | grep "Production:" | awk '{print $2}')
    print_info "Deployed to: $DEPLOY_URL"
  else
    print_error "Vercel deploy: Failed"
    LEVEL3_RESULTS+=("Vercel Deploy: ❌ FAIL")
    echo "$DEPLOY_OUTPUT"
    level3_pass=false
  fi

  # Wait for deployment to propagate
  print_step "Waiting for deployment to propagate (10s)..."
  sleep 10

  # 3.2 Verify Cache Headers
  print_step "Verifying cache control headers..."
  HEADERS=$(curl -sI "$FULL_URL" 2>/dev/null)

  # Check for no-cache
  if echo "$HEADERS" | grep -qi "cache-control.*no-cache"; then
    print_success "Cache-Control: no-cache header present"
    LEVEL3_RESULTS+=("Cache-Control: ✅ NO-CACHE")
  else
    print_error "Cache-Control: no-cache header MISSING"
    LEVEL3_RESULTS+=("Cache-Control: ❌ MISSING")
    level3_pass=false
  fi

  # Check for CDN cache control
  if echo "$HEADERS" | grep -qi "cdn-cache-control.*no-store"; then
    print_success "CDN-Cache-Control: no-store present"
    LEVEL3_RESULTS+=("CDN-Cache: ✅ NO-STORE")
  else
    print_warning "CDN-Cache-Control: header not found"
    LEVEL3_RESULTS+=("CDN-Cache: ⚠️ NOT FOUND")
  fi

  # Check Vercel cache status
  CACHE_STATUS=$(echo "$HEADERS" | grep -i "x-vercel-cache" | awk '{print $2}' | tr -d '\r')
  if [ "$CACHE_STATUS" = "MISS" ] || [ "$CACHE_STATUS" = "STALE" ]; then
    print_success "Vercel Cache: $CACHE_STATUS (fresh content)"
    LEVEL3_RESULTS+=("Vercel Cache: ✅ $CACHE_STATUS")
  elif [ -n "$CACHE_STATUS" ]; then
    print_warning "Vercel Cache: $CACHE_STATUS"
    LEVEL3_RESULTS+=("Vercel Cache: ⚠️ $CACHE_STATUS")
  fi

  # 3.3 Verify HTTP Status
  print_step "Verifying HTTP response..."
  HTTP_STATUS=$(curl -sI "$FULL_URL" 2>/dev/null | head -1 | awk '{print $2}')

  if [ "$HTTP_STATUS" = "200" ]; then
    print_success "HTTP Status: 200 OK"
    LEVEL3_RESULTS+=("HTTP Status: ✅ 200")
  else
    print_error "HTTP Status: $HTTP_STATUS"
    LEVEL3_RESULTS+=("HTTP Status: ❌ $HTTP_STATUS")
    level3_pass=false
  fi

  # 3.4 Verify Security Headers
  print_step "Verifying security headers..."
  local security_pass=true

  if echo "$HEADERS" | grep -qi "x-content-type-options.*nosniff"; then
    print_success "X-Content-Type-Options: nosniff"
  else
    print_warning "X-Content-Type-Options: missing"
    security_pass=false
  fi

  if echo "$HEADERS" | grep -qi "x-frame-options"; then
    print_success "X-Frame-Options: present"
  else
    print_warning "X-Frame-Options: missing"
    security_pass=false
  fi

  if [ "$security_pass" = true ]; then
    LEVEL3_RESULTS+=("Security Headers: ✅ PASS")
  else
    LEVEL3_RESULTS+=("Security Headers: ⚠️ PARTIAL")
  fi

  # 3.5 Content Verification (check for expected content)
  print_step "Verifying page content..."
  PAGE_CONTENT=$(curl -s "$FULL_URL" 2>/dev/null)

  if echo "$PAGE_CONTENT" | grep -q "ATC Support\|Enterprise AI\|demo"; then
    print_success "Page content: Valid"
    LEVEL3_RESULTS+=("Content Check: ✅ VALID")
  else
    print_warning "Page content: Could not verify"
    LEVEL3_RESULTS+=("Content Check: ⚠️ UNVERIFIED")
  fi

  # 3.6 Response Time Check
  print_step "Checking response time..."
  RESPONSE_TIME=$(curl -o /dev/null -s -w '%{time_total}' "$FULL_URL")
  RESPONSE_MS=$(echo "$RESPONSE_TIME * 1000" | bc | cut -d. -f1)

  if [ "$RESPONSE_MS" -lt 3000 ]; then
    print_success "Response time: ${RESPONSE_MS}ms (< 3s)"
    LEVEL3_RESULTS+=("Response Time: ✅ ${RESPONSE_MS}ms")
  else
    print_warning "Response time: ${RESPONSE_MS}ms (slow)"
    LEVEL3_RESULTS+=("Response Time: ⚠️ ${RESPONSE_MS}ms")
  fi

  if [ "$level3_pass" = false ]; then
    print_error "Level 3 FAILED"
    return 1
  fi

  print_success "LEVEL 3 COMPLETE"
  return 0
}

# =============================================================================
# FINAL REPORT
# =============================================================================
print_final_report() {
  print_header "DEPLOYMENT VERIFICATION REPORT"

  echo ""
  echo -e "${BOLD}LEVEL 1: LOCAL VALIDATION${NC}"
  for result in "${LEVEL1_RESULTS[@]}"; do
    echo "  $result"
  done

  echo ""
  echo -e "${BOLD}LEVEL 2: GITHUB PUSH${NC}"
  for result in "${LEVEL2_RESULTS[@]}"; do
    echo "  $result"
  done

  echo ""
  echo -e "${BOLD}LEVEL 3: VERCEL PRODUCTION${NC}"
  for result in "${LEVEL3_RESULTS[@]}"; do
    echo "  $result"
  done

  echo ""
  echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
  echo ""
  echo -e "${BOLD}PRODUCTION URLS:${NC}"
  echo -e "  Main:  ${CYAN}${VERCEL_URL}${NC}"
  echo -e "  Demo:  ${CYAN}${FULL_URL}${NC}"
  echo ""
  echo -e "${BOLD}SHARE-READY STATUS:${NC}"

  # Count failures
  ALL_RESULTS=("${LEVEL1_RESULTS[@]}" "${LEVEL2_RESULTS[@]}" "${LEVEL3_RESULTS[@]}")
  FAIL_COUNT=0
  for result in "${ALL_RESULTS[@]}"; do
    if echo "$result" | grep -q "❌"; then
      ((FAIL_COUNT++))
    fi
  done

  if [ "$FAIL_COUNT" -eq 0 ]; then
    echo -e "  ${GREEN}${BOLD}✅ ALL CHECKS PASSED - SAFE TO SHARE${NC}"
    echo ""
    echo -e "  ${GREEN}Your deployment is verified and ready to share!${NC}"
  else
    echo -e "  ${RED}${BOLD}❌ $FAIL_COUNT CHECK(S) FAILED - DO NOT SHARE${NC}"
    echo ""
    echo -e "  ${RED}Fix the issues above before sharing.${NC}"
  fi

  echo ""
  echo -e "${BLUE}═══════════════════════════════════════════════════════════════════${NC}"
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================
main() {
  echo ""
  echo -e "${BOLD}${CYAN}"
  echo "╔═══════════════════════════════════════════════════════════════════╗"
  echo "║           V21 DEPLOYMENT VERIFICATION SYSTEM                      ║"
  echo "║                3-Level Full Spectrum Check                        ║"
  echo "╚═══════════════════════════════════════════════════════════════════╝"
  echo -e "${NC}"

  START_TIME=$(date +%s)

  # Run all levels
  run_level1 || { print_final_report; exit 1; }
  run_level2 || { print_final_report; exit 1; }
  run_level3 || { print_final_report; exit 1; }

  END_TIME=$(date +%s)
  DURATION=$((END_TIME - START_TIME))

  print_final_report

  echo -e "  ${CYAN}Total verification time: ${DURATION}s${NC}"
  echo ""
}

# Run main
main "$@"
