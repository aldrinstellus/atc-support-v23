/**
 * Demo Variant Type Definitions
 *
 * Types for managing demo variants (Gov CIO, Gov Prog, Client Service).
 * Each variant targets different audiences with different durations and content.
 */

// Note: DeckVariant import removed as presentation features are no longer in V16

/**
 * Supported demo variant types
 */
export type DemoVariantType =
  | 'gov-cio'          // Government CIO - 5 minute executive summary
  | 'gov-prog'         // Government Program Team - 15 minute detailed
  | 'client-service';  // Client Service Demo - Original persona-based demos

/**
 * Target audience for demo variant
 */
export interface VariantAudience {
  /** Audience type identifier */
  type: 'executive' | 'manager' | 'technical' | 'mixed';

  /** Audience role/title */
  role: string;

  /** Audience seniority level */
  seniority: 'c-level' | 'director' | 'manager' | 'individual-contributor';

  /** Expected technical knowledge (1-10) */
  technicalLevel: number;

  /** Primary concerns/interests */
  interests: string[];
}

/**
 * Demo variant configuration
 */
export interface DemoVariantConfig {
  /** Variant identifier */
  id: DemoVariantType;

  /** Display name */
  name: string;

  /** Short description */
  description: string;

  /** Target duration in minutes */
  durationMinutes: number;

  /** Target audience */
  audience: VariantAudience;

  /** Key messages to emphasize */
  keyMessages: string[];

  /** Presentation style */
  style: {
    /** Pacing: 'fast' | 'moderate' | 'slow' */
    pacing: 'fast' | 'moderate' | 'slow';

    /** Detail level: 'high-level' | 'balanced' | 'detailed' */
    detailLevel: 'high-level' | 'balanced' | 'detailed';

    /** Use technical jargon */
    technicalLanguage: boolean;

    /** Show metrics/data */
    showMetrics: boolean;
  };

  /** Features to highlight */
  highlightFeatures: string[];

  /** Color scheme override */
  color?: string;

  /** Icon name (Lucide icon) */
  icon?: string;
}

/**
 * Government CIO variant specifics (5 minutes)
 */
export interface GovCIOVariant extends DemoVariantConfig {
  id: 'gov-cio';

  /** Executive summary focus areas */
  executiveFocus: {
    /** ROI/cost savings emphasis */
    roi: boolean;

    /** Compliance/security emphasis */
    compliance: boolean;

    /** Strategic alignment emphasis */
    strategy: boolean;

    /** Team efficiency emphasis */
    efficiency: boolean;
  };

  /** High-level metrics to show */
  execMetrics: Array<{
    label: string;
    value: string | number;
    trend?: 'up' | 'down' | 'stable';
    color?: string;
  }>;
}

/**
 * Government Program Team variant specifics (15 minutes)
 */
export interface GovProgVariant extends DemoVariantConfig {
  id: 'gov-prog';

  /** Detailed walkthrough sections */
  walkthrough: {
    /** Show full workflow diagrams */
    workflows: boolean;

    /** Include hands-on demos */
    handsonDemo: boolean;

    /** Show integration details */
    integrations: boolean;

    /** Include technical Q&A */
    technicalQA: boolean;
  };

  /** Use cases to demonstrate */
  useCases: Array<{
    title: string;
    description: string;
    duration: number; // seconds
    slides: string[]; // slide IDs
  }>;
}

/**
 * Client Service variant specifics (Original demo)
 */
export interface ClientServiceVariant extends DemoVariantConfig {
  id: 'client-service';

  /** Original persona-based demos */
  personas: {
    /** Include C-Level demo */
    cLevel: boolean;

    /** Include CS Manager demo */
    csManager: boolean;

    /** Include Support Agent demo */
    supportAgent: boolean;
  };
}

/**
 * Variant switcher state
 */
export interface VariantSwitcherState {
  /** Currently active variant */
  activeVariant: DemoVariantType;

  /** Available variants to switch to */
  availableVariants: DemoVariantType[];

  /** Is switcher visible */
  visible: boolean;

  /** Switcher position */
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

/**
 * Variant comparison for A/B testing
 */
export interface VariantComparison {
  /** Variant A identifier */
  variantA: DemoVariantType;

  /** Variant B identifier */
  variantB: DemoVariantType;

  /** Metrics to compare */
  metrics: {
    /** Completion rate */
    completionRate: { a: number; b: number };

    /** Average engagement score (1-10) */
    engagementScore: { a: number; b: number };

    /** User feedback scores */
    feedbackScore: { a: number; b: number };

    /** Conversion/success rate */
    conversionRate?: { a: number; b: number };
  };

  /** Statistical significance */
  significance?: {
    /** P-value */
    pValue: number;

    /** Is statistically significant */
    isSignificant: boolean;

    /** Confidence interval */
    confidenceInterval: number;
  };
}

/**
 * Registry of all demo variants
 */
export interface DemoVariantRegistry {
  /** All available variants */
  variants: Record<DemoVariantType, DemoVariantConfig>;

  /** Default variant to show */
  defaultVariant: DemoVariantType;

  /** Variant selection strategy */
  selectionStrategy?: {
    /** Auto-select based on user role */
    autoSelectByRole?: boolean;

    /** Remember user's last choice */
    rememberChoice?: boolean;

    /** Allow manual override */
    allowOverride?: boolean;
  };
}
