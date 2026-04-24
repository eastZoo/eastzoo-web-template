/**
 * Centralized Icon Components
 * All icons use currentColor for CSS color inheritance
 *
 * Usage:
 * import { PlusIcon, DocumentIcon } from "@/styles/icons";
 */

/** Plus Icon - Generic plus/add icon */
export const PlusIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path
      d="M10 4V16M4 10H16"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Small Plus Icon - For compact buttons (13x13) */
export const PlusIconSmall = () => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
    <path
      d="M6.5 1V12M1 6.5H12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Document Icon - File/document representation */
export const DocumentIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M11.25 1.25H5C4.33696 1.25 3.70107 1.51339 3.23223 1.98223C2.76339 2.45107 2.5 3.08696 2.5 3.75V16.25C2.5 16.913 2.76339 17.5489 3.23223 18.0178C3.70107 18.4866 4.33696 18.75 5 18.75H15C15.663 18.75 16.2989 18.4866 16.7678 18.0178C17.2366 17.5489 17.5 16.913 17.5 16.25V7.5L11.25 1.25Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.25 1.25V7.5H17.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Document Check Icon - File with checkmark */
export const DocumentCheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M11.25 1.25H5C4.33696 1.25 3.70107 1.51339 3.23223 1.98223C2.76339 2.45107 2.5 3.08696 2.5 3.75V16.25C2.5 16.913 2.76339 17.5489 3.23223 18.0178C3.70107 18.4866 4.33696 18.75 5 18.75H15C15.663 18.75 16.2989 18.4866 16.7678 18.0178C17.2366 17.5489 17.5 16.913 17.5 16.25V7.5L11.25 1.25Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.25 1.25V7.5H17.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.5 12.5L9.16667 14.1667L12.5 10.8333"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Clock Icon - Time/pending indicator */
export const ClockIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle
      cx="12"
      cy="12"
      r="9"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 6V12L15.5 15.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Search Icon - Magnifying glass */
export const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <circle
      cx="7"
      cy="7"
      r="5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 14L11 11"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Grid Icon - Grid view toggle */
export const GridIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect
      x="2"
      y="2"
      width="5"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <rect
      x="9"
      y="2"
      width="5"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <rect
      x="2"
      y="9"
      width="5"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.2"
    />
    <rect
      x="9"
      y="9"
      width="5"
      height="5"
      rx="1"
      stroke="currentColor"
      strokeWidth="1.2"
    />
  </svg>
);

/** List Icon - List view toggle */
export const ListIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M2 4H14M2 8H14M2 12H14"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Upload Icon - File upload indicator */
export const UploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M11.25 1.25H5C4.33696 1.25 3.70107 1.51339 3.23223 1.98223C2.76339 2.45107 2.5 3.08696 2.5 3.75V16.25C2.5 16.913 2.76339 17.5489 3.23223 18.0178C3.70107 18.4866 4.33696 18.75 5 18.75H15C15.663 18.75 16.2989 18.4866 16.7678 18.0178C17.2366 17.5489 17.5 16.913 17.5 16.25V7.5L11.25 1.25Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.25 1.25V7.5H17.5"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 14V10M10 10L8 12M10 10L12 12"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** File Upload Icon - Alias for UploadIcon (menu item) */
export const FileUploadIcon = UploadIcon;

/** Folder Upload Icon - Folder with upload arrow */
export const FolderUploadIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M2.5 5C2.5 4.17157 3.17157 3.5 4 3.5H7.17157C7.70201 3.5 8.21071 3.71071 8.58579 4.08579L9.41421 4.91421C9.78929 5.28929 10.298 5.5 10.8284 5.5H16C16.8284 5.5 17.5 6.17157 17.5 7V15C17.5 15.8284 16.8284 16.5 16 16.5H4C3.17157 16.5 2.5 15.8284 2.5 15V5Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 13V9M10 9L8 11M10 9L12 11"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Folder Create Icon - Folder with plus sign */
export const FolderCreateIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M2.5 5C2.5 4.17157 3.17157 3.5 4 3.5H7.17157C7.70201 3.5 8.21071 3.71071 8.58579 4.08579L9.41421 4.91421C9.78929 5.28929 10.298 5.5 10.8284 5.5H16C16.8284 5.5 17.5 6.17157 17.5 7V15C17.5 15.8284 16.8284 16.5 16 16.5H4C3.17157 16.5 2.5 15.8284 2.5 15V5Z"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M10 8V14M7 11H13"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Ellipsis Icon - Vertical three dots menu */
export const EllipsisIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="6" r="1.5" fill="currentColor" />
    <circle cx="12" cy="12" r="1.5" fill="currentColor" />
    <circle cx="12" cy="18" r="1.5" fill="currentColor" />
  </svg>
);

/** Chevron Down Icon - Dropdown arrow */
export const ChevronDownIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M5 7.5L10 12.5L15 7.5"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Arrow Up Icon - Send/submit arrow */
export const ArrowUpIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M8 13V3M8 3L4 7M8 3L12 7"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/** Logo Icon - Brand logo with gradient */
export const LogoIcon = () => (
  <svg width="42" height="53" viewBox="0 0 42 53" fill="none">
    <path d="M21 0L0 12V40L21 52L42 40V12L21 0Z" fill="url(#logo-gradient)" />
    <path
      d="M21 10L8 17.5V32.5L21 40L34 32.5V17.5L21 10Z"
      fill="white"
      fillOpacity="0.3"
    />
    <path
      d="M21 16L12 21V31L21 36L30 31V21L21 16Z"
      fill="white"
      fillOpacity="0.5"
    />
    <defs>
      <linearGradient
        id="logo-gradient"
        x1="0"
        y1="0"
        x2="42"
        y2="52"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#2EC4A0" />
        <stop offset="1" stopColor="#0066FF" />
      </linearGradient>
    </defs>
  </svg>
);
