import type { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
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

    // Sidemenu
    sidemenuBackground: "#111827",
    sidemenuBackgroundLight: "#1f2937",
    sidemenuActive: "#374151",
    sidemenuHover: "rgba(255, 255, 255, 0.1)",
    sidemenuDivider: "rgba(255, 255, 255, 0.2)",
    sidemenuScrollbar: "rgba(255, 255, 255, 0.3)",
    sidemenuLogoutButton: "#4b5563",
    sidemenuLogoutButtonHover: "#374151",
  },
};
