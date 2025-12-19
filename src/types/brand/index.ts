/**
 * Brand Module - Type Definitions
 *
 * Types for managing brand identities (CTIS, ITSS, Client Service).
 */

/**
 * Supported brand identities
 */
export type BrandIdentity =
  | 'ctis'           // Centralized IT Solutions
  | 'itss'           // IT Support Services
  | 'client-service' // Generic client service brand
  | 'custom';        // Custom brand

/**
 * Brand color palette
 */
export interface BrandColors {
  /** Primary brand color */
  primary: string;

  /** Secondary brand color */
  secondary?: string;

  /** Accent color */
  accent?: string;

  /** Success color */
  success?: string;

  /** Warning color */
  warning?: string;

  /** Error color */
  error?: string;

  /** Neutral/gray scale */
  neutral?: {
    50: string;
    100: string;
    200: string;
    300: string;
    400: string;
    500: string;
    600: string;
    700: string;
    800: string;
    900: string;
  };
}

/**
 * Brand typography
 */
export interface BrandTypography {
  /** Heading font family */
  headingFont: string;

  /** Body font family */
  bodyFont: string;

  /** Monospace font family */
  monoFont?: string;

  /** Font weights */
  weights: {
    light: number;
    normal: number;
    medium: number;
    semibold: number;
    bold: number;
  };

  /** Font sizes (rem) */
  sizes: {
    xs: string;
    sm: string;
    base: string;
    lg: string;
    xl: string;
    '2xl': string;
    '3xl': string;
    '4xl': string;
    '5xl': string;
  };
}

/**
 * Brand logo configuration
 */
export interface BrandLogo {
  /** Logo type */
  type: 'image' | 'svg' | 'text';

  /** Logo URL or path (for image/svg) */
  url?: string;

  /** Logo text (for text-based logos) */
  text?: string;

  /** Logo alt text for accessibility */
  alt: string;

  /** Logo width in pixels */
  width?: number;

  /** Logo height in pixels */
  height?: number;

  /** Logo variants for different contexts */
  variants?: {
    /** Light background version */
    light?: string;

    /** Dark background version */
    dark?: string;

    /** Monochrome version */
    monochrome?: string;

    /** Icon-only version (no text) */
    icon?: string;
  };
}

/**
 * Brand voice/tone guidelines
 */
export interface BrandVoice {
  /** Voice characteristics */
  characteristics: string[];

  /** Example phrases */
  examplePhrases?: string[];

  /** Words to use */
  preferredTerms?: Record<string, string>;

  /** Words to avoid */
  avoidTerms?: string[];

  /** Tone for different contexts */
  contextualTone?: {
    executive: string;
    technical: string;
    customer: string;
  };
}

/**
 * Core Brand Configuration interface
 */
export interface BrandConfig {
  /** Brand identifier */
  id: BrandIdentity;

  /** Brand display name */
  name: string;

  /** Brand tagline */
  tagline?: string;

  /** Brand description */
  description?: string;

  /** Color palette */
  colors: BrandColors;

  /** Typography */
  typography: BrandTypography;

  /** Logo configuration */
  logo: BrandLogo;

  /** Brand voice */
  voice?: BrandVoice;

  /** Contact information */
  contact?: {
    /** Website URL */
    website?: string;

    /** Support email */
    email?: string;

    /** Support phone */
    phone?: string;

    /** Social media links */
    social?: Record<string, string>;
  };

  /** Legal information */
  legal?: {
    /** Company legal name */
    companyName?: string;

    /** Copyright text */
    copyright?: string;

    /** Privacy policy URL */
    privacyUrl?: string;

    /** Terms of service URL */
    termsUrl?: string;
  };
}

/**
 * CTIS brand specifics (Centralized IT Solutions)
 */
export interface CTISBrand extends BrandConfig {
  id: 'ctis';

  /** Government-specific branding */
  governmentBranding: {
    /** Enable government seals/badges */
    showSeals: boolean;

    /** Compliance badges to display */
    complianceBadges?: string[];

    /** Security clearance level */
    clearanceLevel?: string;
  };
}

/**
 * ITSS brand specifics (IT Support Services)
 */
export interface ITSSBrand extends BrandConfig {
  id: 'itss';

  /** Service-level branding */
  serviceBranding: {
    /** SLA guarantee messaging */
    slaMessaging?: string;

    /** 24/7 support badge */
    show24x7Badge?: boolean;

    /** Certifications to display */
    certifications?: string[];
  };
}

/**
 * Brand registry for managing multiple brands
 */
export interface BrandRegistry {
  /** All available brands */
  brands: Record<BrandIdentity, BrandConfig>;

  /** Default brand to use */
  defaultBrand: BrandIdentity;

  /** Current active brand */
  activeBrand?: BrandIdentity;
}

/**
 * Brand switcher state
 */
export interface BrandSwitcherState {
  /** Currently active brand */
  activeBrand: BrandIdentity;

  /** Available brands to switch to */
  availableBrands: BrandIdentity[];

  /** Is brand switcher visible */
  visible: boolean;

  /** Switcher position */
  position?: 'header' | 'footer' | 'sidebar';
}

/**
 * Brand theme CSS variables
 */
export interface BrandThemeVariables {
  /** CSS variable name-value pairs */
  [key: string]: string;
}

/**
 * Generates CSS custom properties from brand config
 */
export type BrandThemeGenerator = (brand: BrandConfig) => BrandThemeVariables;
