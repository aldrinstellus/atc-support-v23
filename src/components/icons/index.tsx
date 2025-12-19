/**
 * Sana.ai Icon Components
 * SVG icons extracted from the Sana.ai interface
 */

import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

// Home/Tasks icon
export function HomeIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 7.5L10 1.667L17.5 7.5V16.667C17.5 17.108 17.325 17.532 17.017 17.851C16.708 18.169 16.287 18.333 15.833 18.333H4.167C3.713 18.333 3.292 18.169 2.983 17.851C2.675 17.532 2.5 17.108 2.5 16.667V7.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 18.333V10H12.5V18.333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Chat/Message icon
export function ChatIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M17.5 12.5C17.5 12.942 17.325 13.366 17.017 13.684C16.708 14.002 16.287 14.167 15.833 14.167H5.833L2.5 17.5V4.167C2.5 3.725 2.675 3.301 2.983 2.983C3.292 2.665 3.713 2.5 4.167 2.5H15.833C16.287 2.5 16.708 2.665 17.017 2.983C17.325 3.301 17.5 3.725 17.5 4.167V12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Search icon
export function SearchIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M9.167 15.833C12.8489 15.833 15.833 12.8489 15.833 9.167C15.833 5.485 12.8489 2.5 9.167 2.5C5.485 2.5 2.5 5.485 2.5 9.167C2.5 12.8489 5.485 15.833 9.167 15.833Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 17.5L13.875 13.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Calendar/Meetings icon
export function CalendarIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.833 3.333H4.167C3.246 3.333 2.5 4.079 2.5 5V16.667C2.5 17.587 3.246 18.333 4.167 18.333H15.833C16.754 18.333 17.5 17.587 17.5 16.667V5C17.5 4.079 16.754 3.333 15.833 3.333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 1.667V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6.667 1.667V5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 8.333H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Plus icon
export function PlusIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 4.167V15.833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.167 10H15.833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Settings/Gear icon
export function SettingsIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 12.5C11.3807 12.5 12.5 11.3807 12.5 10C12.5 8.6193 11.3807 7.5 10 7.5C8.6193 7.5 7.5 8.6193 7.5 10C7.5 11.3807 8.6193 12.5 10 12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.167 12.5C16.0557 12.7513 16.0226 13.0302 16.0716 13.3005C16.1207 13.5708 16.2495 13.8203 16.442 14.017L16.492 14.067C16.6468 14.2216 16.7695 14.4053 16.8534 14.6076C16.9373 14.8099 16.9806 15.0268 16.9806 15.2458C16.9806 15.4649 16.9373 15.6817 16.8534 15.884C16.7695 16.0863 16.6468 16.27 16.492 16.4247C16.3373 16.5794 16.1536 16.7022 15.9513 16.7861C15.749 16.87 15.5321 16.9133 15.3131 16.9133C15.094 16.9133 14.8772 16.87 14.6749 16.7861C14.4726 16.7022 14.2889 16.5794 14.1342 16.4247L14.0842 16.3747C13.8875 16.1822 13.638 16.0534 13.3677 16.0044C13.0974 15.9553 12.8185 15.9884 12.5672 16.0997C12.3207 16.2058 12.1123 16.3831 11.9681 16.6091C11.8239 16.835 11.7504 17.0994 11.7575 17.3672V17.5C11.7575 17.942 11.5824 18.366 11.2745 18.6839C10.9666 19.0018 10.5553 19.1825 10.1264 19.1825C9.6975 19.1825 9.28627 19.0018 8.9784 18.6839C8.67052 18.366 8.49534 17.942 8.49534 17.5V17.425C8.49728 17.1482 8.41336 16.8774 8.25545 16.6497C8.09754 16.4219 7.8733 16.2486 7.61398 16.1538C7.36266 16.0425 7.08379 16.0094 6.8135 16.0585C6.5432 16.1075 6.29369 16.2363 6.09702 16.4288L6.04702 16.4788C5.89233 16.6336 5.70862 16.7563 5.50633 16.8402C5.30404 16.9241 5.08718 16.9674 4.86814 16.9674C4.6491 16.9674 4.43224 16.9241 4.22995 16.8402C4.02766 16.7563 3.84395 16.6336 3.68926 16.4788C3.53449 16.3242 3.41176 16.1405 3.32786 15.9382C3.24396 15.7359 3.20068 15.519 3.20068 15.3C3.20068 15.0809 3.24396 14.8641 3.32786 14.6618C3.41176 14.4595 3.53449 14.2758 3.68926 14.1211L3.73926 14.0711C3.93177 13.8744 4.06053 13.6249 4.10958 13.3546C4.15863 13.0843 4.12556 12.8055 4.01426 12.5541C3.90821 12.3076 3.73091 12.0993 3.50497 11.9551C3.27904 11.8108 3.01463 11.7374 2.74676 11.7444H2.61176C2.16986 11.7444 1.74579 11.5694 1.42792 11.2615C1.11004 10.9536 0.929382 10.5424 0.929382 10.1135C0.929382 9.68453 1.11004 9.2733 1.42792 8.96543C1.74579 8.65755 2.16986 8.48237 2.61176 8.48237H2.68676C2.96355 8.48431 3.23437 8.40039 3.46209 8.24248C3.68982 8.08457 3.86311 7.86033 3.95793 7.60101C4.06923 7.34969 4.1023 7.07082 4.05325 6.80053C4.0042 6.53023 3.87544 6.28072 3.68293 6.08405L3.63293 6.03405C3.47816 5.87936 3.35543 5.69565 3.27153 5.49336C3.18763 5.29107 3.14435 5.07421 3.14435 4.85517C3.14435 4.63613 3.18763 4.41927 3.27153 4.21698C3.35543 4.01469 3.47816 3.83098 3.63293 3.67629C3.78762 3.52152 3.97133 3.39879 4.17362 3.31489C4.37591 3.23099 4.59277 3.18771 4.81181 3.18771C5.03085 3.18771 5.24771 3.23099 5.45 3.31489C5.65229 3.39879 5.836 3.52152 5.99069 3.67629L6.04069 3.72629C6.23736 3.9188 6.48687 4.04756 6.75716 4.09661C7.02746 4.14566 7.30633 4.11259 7.55765 4.00129H7.61765C7.86414 3.89524 8.07247 3.71794 8.21669 3.492C8.36092 3.26607 8.43432 3.00166 8.42732 2.73379V2.5C8.42732 2.05797 8.6025 1.63389 8.91038 1.32601C9.21826 1.01814 9.62933 0.842957 10.0583 0.842957C10.4872 0.842957 10.8983 1.01814 11.2062 1.32601C11.5141 1.63389 11.6893 2.05797 11.6893 2.5V2.575C11.6823 2.84287 11.7557 3.10728 11.8999 3.33321C12.0441 3.55915 12.2525 3.73645 12.499 3.84249C12.7503 3.95379 13.0292 3.98686 13.2995 3.93781C13.5698 3.88876 13.8193 3.76 14.016 3.56749L14.066 3.51749C14.2207 3.36272 14.4044 3.23999 14.6067 3.15609C14.809 3.07219 15.0258 3.02891 15.2449 3.02891C15.4639 3.02891 15.6808 3.07219 15.8831 3.15609C16.0854 3.23999 16.2691 3.36272 16.4238 3.51749C16.5785 3.67218 16.7013 3.85589 16.7852 4.05818C16.8691 4.26047 16.9124 4.47733 16.9124 4.69637C16.9124 4.91541 16.8691 5.13227 16.7852 5.33456C16.7013 5.53685 16.5785 5.72056 16.4238 5.87525L16.3738 5.92525C16.1813 6.12192 16.0525 6.37143 16.0035 6.64172C15.9544 6.91202 15.9875 7.19089 16.0988 7.44221V7.50221C16.2048 7.7487 16.3821 7.95703 16.6081 8.10125C16.834 8.24548 17.0984 8.31888 17.3663 8.31188H17.5C17.942 8.31188 18.3532 8.48706 18.6611 8.79494C18.969 9.10282 19.1442 9.51405 19.1442 9.94309C19.1442 10.3721 18.969 10.7834 18.6611 11.0912C18.3532 11.3991 17.942 11.5743 17.5 11.5743H17.425C17.1571 11.5673 16.8927 11.6407 16.6668 11.7849C16.4408 11.9291 16.2635 12.1375 16.1575 12.384L16.167 12.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Chevron icons
export function ChevronDownIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 7.5L10 12.5L15 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ChevronRightIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M7.5 5L12.5 10L7.5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Star icon
export function StarIcon({ size = 20, filled = false, ...props }: IconProps & { filled?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill={filled ? 'currentColor' : 'none'}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 1.667L12.575 6.883L18.333 7.725L14.167 11.783L15.15 17.517L10 14.808L4.85 17.517L5.833 11.783L1.667 7.725L7.425 6.883L10 1.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Send icon
export function SendIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.333 1.667L9.167 10.833"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.333 1.667L12.5 18.333L9.167 10.833L1.667 7.5L18.333 1.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Arrow up icon
export function ArrowUpIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 15.833V4.167"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.167 10L10 4.167L15.833 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// User icon
export function UserIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.667 17.5V15.833C16.667 14.949 16.316 14.101 15.691 13.476C15.066 12.851 14.218 12.5 13.333 12.5H6.667C5.782 12.5 4.934 12.851 4.309 13.476C3.684 14.101 3.333 14.949 3.333 15.833V17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 9.167C11.841 9.167 13.333 7.675 13.333 5.833C13.333 3.992 11.841 2.5 10 2.5C8.159 2.5 6.667 3.992 6.667 5.833C6.667 7.675 8.159 9.167 10 9.167Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Clock icon
export function ClockIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 17.5C14.1421 17.5 17.5 14.1421 17.5 10C17.5 5.85786 14.1421 2.5 10 2.5C5.85786 2.5 2.5 5.85786 2.5 10C2.5 14.1421 5.85786 17.5 10 17.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 5V10L13.333 11.667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Folder icon
export function FolderIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.333 15.833C18.333 16.275 18.158 16.699 17.85 17.017C17.542 17.335 17.121 17.5 16.667 17.5H3.333C2.879 17.5 2.458 17.335 2.15 17.017C1.842 16.699 1.667 16.275 1.667 15.833V4.167C1.667 3.725 1.842 3.301 2.15 2.983C2.458 2.665 2.879 2.5 3.333 2.5H7.5L9.167 5H16.667C17.121 5 17.542 5.165 17.85 5.483C18.158 5.801 18.333 6.225 18.333 6.667V15.833Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// File icon
export function FileIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.667 1.667H5C4.558 1.667 4.134 1.842 3.817 2.15C3.499 2.458 3.333 2.879 3.333 3.333V16.667C3.333 17.121 3.499 17.542 3.817 17.85C4.134 18.158 4.558 18.333 5 18.333H15C15.442 18.333 15.866 18.158 16.183 17.85C16.501 17.542 16.667 17.121 16.667 16.667V6.667L11.667 1.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.667 1.667V6.667H16.667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Check/Checkmark icon
export function CheckIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.667 5L7.5 14.167L3.333 10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// X/Close icon
export function XIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15 5L5 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5 5L15 15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Filter icon
export function FilterIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.333 2.5H1.667L8.333 10.383V15.833L11.667 17.5V10.383L18.333 2.5Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Sparkles icon (AI)
export function SparklesIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 1.667L11.667 6.667L16.667 8.333L11.667 10L10 15L8.333 10L3.333 8.333L8.333 6.667L10 1.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15 13.333L15.833 15L17.5 15.833L15.833 16.667L15 18.333L14.167 16.667L12.5 15.833L14.167 15L15 13.333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Menu/Hamburger icon
export function MenuIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 10H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 15H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// More dots icon
export function MoreHorizontalIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 10.833C10.4602 10.833 10.833 10.4602 10.833 10C10.833 9.53976 10.4602 9.167 10 9.167C9.53976 9.167 9.167 9.53976 9.167 10C9.167 10.4602 9.53976 10.833 10 10.833Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M15.833 10.833C16.2932 10.833 16.667 10.4602 16.667 10C16.667 9.53976 16.2932 9.167 15.833 9.167C15.3728 9.167 15 9.53976 15 10C15 10.4602 15.3728 10.833 15.833 10.833Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M4.167 10.833C4.6272 10.833 5 10.4602 5 10C5 9.53976 4.6272 9.167 4.167 9.167C3.7068 9.167 3.333 9.53976 3.333 10C3.333 10.4602 3.7068 10.833 4.167 10.833Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Document/Page icon
export function DocumentIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M11.667 1.667H5C4.558 1.667 4.134 1.842 3.817 2.15C3.499 2.458 3.333 2.879 3.333 3.333V16.667C3.333 17.121 3.499 17.542 3.817 17.85C4.134 18.158 4.558 18.333 5 18.333H15C15.442 18.333 15.866 18.158 16.183 17.85C16.501 17.542 16.667 17.121 16.667 16.667V6.667L11.667 1.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.667 1.667V6.667H16.667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 10.833H6.667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 14.167H6.667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.333 7.5H7.5H6.667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Lightning/Bolt icon
export function BoltIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10.833 1.667L2.5 11.667H10L9.167 18.333L17.5 8.333H10L10.833 1.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Mail icon
export function MailIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.333 3.333H16.667C17.583 3.333 18.333 4.083 18.333 5V15C18.333 15.917 17.583 16.667 16.667 16.667H3.333C2.417 16.667 1.667 15.917 1.667 15V5C1.667 4.083 2.417 3.333 3.333 3.333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M18.333 5L10 10.833L1.667 5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Users/People icon
export function UsersIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M14.167 17.5V15.833C14.167 14.949 13.816 14.101 13.191 13.476C12.566 12.851 11.718 12.5 10.833 12.5H4.167C3.282 12.5 2.434 12.851 1.809 13.476C1.184 14.101 0.833 14.949 0.833 15.833V17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.5 9.167C9.341 9.167 10.833 7.675 10.833 5.833C10.833 3.992 9.341 2.5 7.5 2.5C5.659 2.5 4.167 3.992 4.167 5.833C4.167 7.675 5.659 9.167 7.5 9.167Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.167 17.5V15.833C19.166 15.094 18.918 14.376 18.462 13.794C18.006 13.212 17.369 12.798 16.65 12.617"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 2.617C14.054 2.797 14.693 3.211 15.15 3.794C15.607 4.377 15.856 5.096 15.856 5.837C15.856 6.578 15.607 7.297 15.15 7.88C14.693 8.463 14.054 8.877 13.333 9.057"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// TrendingUp icon (Sales)
export function TrendingUpIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M18.333 5L10.833 12.5L7.083 8.75L1.667 14.167"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 5H18.333V10"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Headphones icon (Customer Success)
export function HeadphonesIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M2.5 13.333V10C2.5 8.011 3.29 6.103 4.697 4.697C6.103 3.29 8.011 2.5 10 2.5C11.989 2.5 13.897 3.29 15.303 4.697C16.71 6.103 17.5 8.011 17.5 10V13.333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 14.167C17.5 14.608 17.325 15.032 17.017 15.351C16.708 15.669 16.287 15.833 15.833 15.833H15C14.558 15.833 14.134 15.669 13.817 15.351C13.499 15.032 13.333 14.608 13.333 14.167V12.5C13.333 12.058 13.499 11.634 13.817 11.317C14.134 10.999 14.558 10.833 15 10.833H17.5V14.167ZM2.5 14.167C2.5 14.608 2.675 15.032 2.983 15.351C3.292 15.669 3.713 15.833 4.167 15.833H5C5.442 15.833 5.866 15.669 6.183 15.351C6.501 15.032 6.667 14.608 6.667 14.167V12.5C6.667 12.058 6.501 11.634 6.183 11.317C5.866 10.999 5.442 10.833 5 10.833H2.5V14.167Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Briefcase icon (General)
export function BriefcaseIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M16.667 5.833H3.333C2.413 5.833 1.667 6.579 1.667 7.5V15.833C1.667 16.754 2.413 17.5 3.333 17.5H16.667C17.587 17.5 18.333 16.754 18.333 15.833V7.5C18.333 6.579 17.587 5.833 16.667 5.833Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M13.333 17.5V4.167C13.333 3.725 13.158 3.301 12.85 2.983C12.542 2.665 12.121 2.5 11.667 2.5H8.333C7.879 2.5 7.458 2.665 7.15 2.983C6.842 3.301 6.667 3.725 6.667 4.167V17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Globe icon
export function GlobeIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 18.333C14.6024 18.333 18.333 14.6024 18.333 10C18.333 5.39763 14.6024 1.667 10 1.667C5.39763 1.667 1.667 5.39763 1.667 10C1.667 14.6024 5.39763 18.333 10 18.333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.667 10H18.333"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 1.667C12.092 3.943 13.289 6.904 13.333 10C13.289 13.096 12.092 16.057 10 18.333C7.908 16.057 6.711 13.096 6.667 10C6.711 6.904 7.908 3.943 10 1.667Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Link icon
export function LinkIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M8.333 10.833C8.69 11.312 9.148 11.706 9.675 11.986C10.202 12.266 10.785 12.426 11.381 12.453C11.977 12.48 12.572 12.373 13.123 12.141C13.674 11.909 14.167 11.557 14.567 11.108L17.067 8.608C17.797 7.852 18.199 6.839 18.189 5.788C18.178 4.737 17.756 3.732 17.012 2.99C16.267 2.248 15.261 1.83 14.21 1.823C13.159 1.816 12.148 2.221 11.392 2.952L9.875 4.46"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.667 9.167C11.31 8.688 10.852 8.294 10.325 8.014C9.798 7.734 9.215 7.574 8.619 7.547C8.023 7.52 7.428 7.627 6.877 7.859C6.326 8.091 5.833 8.443 5.433 8.892L2.933 11.392C2.203 12.148 1.801 13.161 1.811 14.212C1.822 15.263 2.244 16.268 2.988 17.01C3.733 17.752 4.739 18.17 5.79 18.177C6.841 18.184 7.852 17.779 8.608 17.048L10.117 15.54"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Help/Question mark icon
export function HelpIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M10 18.333C14.6024 18.333 18.333 14.6024 18.333 10C18.333 5.39763 14.6024 1.667 10 1.667C5.39763 1.667 1.667 5.39763 1.667 10C1.667 14.6024 5.39763 18.333 10 18.333Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.575 7.5C7.77092 6.943 8.156 6.471 8.665 6.166C9.174 5.861 9.775 5.742 10.363 5.830C10.951 5.918 11.489 6.207 11.884 6.647C12.279 7.087 12.506 7.651 12.525 8.242C12.525 10 9.942 10.875 9.942 10.875"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M10 14.167H10.008"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Invite/User Plus icon
export function InviteIcon({ size = 20, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M13.333 17.5V15.833C13.333 14.949 12.982 14.101 12.357 13.476C11.732 12.851 10.884 12.5 10 12.5H4.167C3.282 12.5 2.434 12.851 1.809 13.476C1.184 14.101 0.833 14.949 0.833 15.833V17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.083 9.167C8.924 9.167 10.417 7.675 10.417 5.833C10.417 3.992 8.924 2.5 7.083 2.5C5.242 2.5 3.75 3.992 3.75 5.833C3.75 7.675 5.242 9.167 7.083 9.167Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16.667 6.667V11.667"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M19.167 9.167H14.167"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// Sana logo icon
export function SanaLogoIcon({ size = 32, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <path
        d="M8 16C8 11.582 11.582 8 16 8C20.418 8 24 11.582 24 16C24 20.418 20.418 24 16 24"
        stroke="var(--color-background-primary)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle
        cx="16"
        cy="16"
        r="4"
        fill="var(--color-background-primary)"
      />
    </svg>
  );
}
