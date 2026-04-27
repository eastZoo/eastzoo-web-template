import type { DefaultTheme } from "styled-components";

/**
 * Figma 디자인 토큰 (insystem-atoms configureTokens와 공유)
 * - main.tsx에서 이 객체를 import하여 configureTokens()에 전달
 */
export const figmaTokens = {
  semantic: {
    primary: {
      normal: "#2ec4a0", // Figma: --primary/normal (파란색)
      strong: "#2ec4a0",
      heavy: "#2ec4a0",
    },
    accent: {
      normal: "#2ec4a0", // Figma: --color/cyan/47 (민트/샴록)
      light: "rgba(46, 196, 160, 0.12)", // Figma: --color/cyan/47-12%
    },
    label: {
      normal: "#1E2846", // Figma: white text
      neutral: "#1E2846",
      alternative: "#1E2846",
      assistive: "rgba(255, 255, 255, 0.35)", // Figma: --color/white/-35%
      disable: "#1E2846",
    },
    background: {
      normal: "rgba(255, 255, 255, 0.06)",
      alternative: "rgba(255, 255, 255, 0.04)",
      elevated: "rgba(255, 255, 255, 0.08)",
      transparentPrimary: "rgba(0, 102, 255, 0.08)", // Figma: --background/transparent/primary
    },
    line: {
      normalNormal: "rgba(112, 115, 124, 0.22)",
      solidNeutral: "rgba(112, 115, 124, 0.12)",
      solidAlternative: "rgba(112, 115, 124, 0.08)", // Figma: --line/normal/alternative
    },
    interaction: {
      inactive: "#989ba2", // Figma: --interaction/inactive
    },
    status: {
      negative: "#FF4242",
      positive: "#00BF40",
    },
    staticColor: {
      white: "#FFFFFF",
      black: "#000000",
    },
  },
  spacing: {
    radius: { sm: 4, md: 8 },
    gap: { xs: 4, sm: 6, md: 8 },
    paddingX: { xs: 4, sm: 8, md: 11, lg: 12, xl: 14 },
    paddingY: { xs: 4, sm: 6, md: 8, lg: 10 },
  },
  typography: {
    fontFamily: "'Pretendard Variable', 'Pretendard', sans-serif",
    fontSize: { xs: 12, sm: 13, md: 14, lg: 15, xl: 16 },
    lineHeight: { xs: 1.333, md: 1.429, xl: 1.5 },
    fontWeight: { regular: 400, medium: 500, semibold: 600, bold: 700 },
  },
};

/**
 * styled-components DefaultTheme
 * - Figma 디자인 토큰 기반
 */
export const theme: DefaultTheme = {
  semantic: figmaTokens.semantic,
  spacing: figmaTokens.spacing,
  shadows: {
    popup: "0px 2px 10px 0px rgba(0,0,0,0.1)",
    modal: "0px 8px 24px 0px rgba(0,0,0,.14)",
    field: "0px 6px 16px 0px rgba(0,0,0,.06)",
    item: "0px 5px 10px 0px rgba(0,0,0,.12)",
    card: "0px 12px 12px 0px rgba(0,0,0,.08)",
  },

  colors: {
    // Primary (무채색 - 검정 위주)
    primary100: "#262626",
    primary60: "#26262699",
    primary50: "#26262680",
    primary38: "#26262661",
    primary10: "#26262619",
    primary6: "#2626260f",
    primary5: "#2626260d",
    primaryHover: "#171717",
    secondary100: "#404040",

    // Basic
    white100: "#ffffff",
    white80: "#ffffffcc",
    white60: "#ffffff99",
    white38: "#ffffff61",
    white12: "#ffffff1f",
    black100: "#000000",
    black90: "#000000e6",
    black80: "#000000cc",
    black70: "#000000b3",
    black60: "#00000099",
    black38: "#00000061",
    black30: "#0000004C",
    black12: "#0000001f",
    black10: "#00000019",
    black8: "#00000014",
    black5: "#0000000d",
    black4: "#00000004",
    black2: "#00000005",

    // Gray scale
    gray50: "#f9fafb",
    gray100: "#f3f4f6",
    gray200: "#e5e7eb",
    gray300: "#d1d5db",
    gray400: "#9ca3af",
    gray500: "#6b7280",
    gray600: "#4b5563",
    gray700: "#374151",
    gray800: "#1f2937",
    gray900: "#111827",

    // Status
    greenStatus: "#00C572",
    greenStatus8: "#00C57214",
    greenStatusHover: "#09B06A",
    yellowStatus: "#FFBC11",
    redStatus: "#dc2626",
    redStatus5: "#dc26260d",
    redStatus8: "#dc262614",
    redStatusHover: "#b91c1c",
    redStatusLight: "#fee2e2",
    redStatusBorder: "#fecaca",
    blueStatus: "#0098FF",
    grayStatus: "#00000061",

    // Text
    text: {
      primary: "#262626",
      secondary: "#6b7280",
    },

    // Component
    flowLabelBox: "#666666",
    labelBox: "#4b5563",
    scrollTrack: "#1A1A1A",
    authBackground: "rgba(0,0,0,0.3)",
    shipMonitorBackgroud: "#e5e7eb",
    shipMonitorShade: "#d1d5db",
    shipMonitorBorder: "#9ca3af",

    // Sidemenu (Figma design - Dark navy theme)
    sidemenuBackground: "#0f172a", // Figma screenshot: dark navy blue
    sidemenuBackgroundLight: "#1e293b",
    sidemenuBorder: "rgba(112, 115, 124, 0.08)", // Figma: --line/normal/alternative
    sidemenuTextNormal: "#989ba2", // Figma: --interaction/inactive (비활성 메뉴)
    sidemenuTextActive: "#2ec4a0", // Figma: --primary/normal (활성 메뉴 텍스트)
    sidemenuActive: "rgba(0, 102, 255, 0.08)", // Figma: --background/transparent/primary (활성 메뉴 배경)
    sidemenuHover: "rgba(255, 255, 255, 0.06)",
    sidemenuDivider: "rgba(112, 115, 124, 0.08)",
    sidemenuScrollbar: "rgba(255, 255, 255, 0.2)",
    sidemenuLogoutButton: "rgba(255, 255, 255, 0.06)",
    sidemenuLogoutButtonHover: "rgba(255, 255, 255, 0.1)",
    sidemenuIconBg: "rgba(255, 255, 255, 0.06)",
    sidemenuAvatarBg: "rgba(46, 196, 160, 0.12)", // Figma: --color/cyan/47-12%
    sidemenuAvatarBorder: "#2ec4a0", // Figma: --color/cyan/47
    sidemenuAvatarText: "#2ec4a0", // Figma: --color/cyan/47
    sidemenuUserName: "#FFFFFF", // white
    sidemenuUserRole: "rgba(255, 255, 255, 0.35)", // Figma: --color/white/-35%
  },
};

/**
 * insystem-atoms configureTokens()에 전달할 토큰 객체
 * - figmaTokens를 insystem-atoms 형식에 맞게 변환
 */
export const insystemAtomsTokens = {
  semantic: {
    primary: {
      normal: figmaTokens.semantic.primary.normal,
      strong: figmaTokens.semantic.primary.strong,
      heavy: figmaTokens.semantic.primary.heavy,
    },
    label: {
      normal: figmaTokens.semantic.label.normal,
      neutral: figmaTokens.semantic.label.neutral,
      alternative: figmaTokens.semantic.label.alternative,
      assistive: figmaTokens.semantic.label.assistive,
      disable: figmaTokens.semantic.label.disable,
    },
    background: {
      normal: figmaTokens.semantic.background.normal,
      alternative: figmaTokens.semantic.background.alternative,
      elevated: figmaTokens.semantic.background.elevated,
    },
    line: {
      normalNormal: figmaTokens.semantic.line.normalNormal,
      solidNeutral: figmaTokens.semantic.line.solidNeutral,
      solidAlternative: figmaTokens.semantic.line.solidAlternative,
    },
    status: {
      negative: figmaTokens.semantic.status.negative,
    },
    staticColor: {
      white: figmaTokens.semantic.staticColor.white,
    },
  },
  spacing: {
    radius: { md: figmaTokens.spacing.radius.md },
  },
};
