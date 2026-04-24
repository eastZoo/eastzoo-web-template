import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    shadows: {
      popup: string;
      modal: string;
      field: string;
      item: string;
      card: string;
    };

    colors: {
      // Colors
      primary100: string;
      primary60: string;
      primary50: string;
      primary38: string;
      primary10: string;
      primary6: string;
      primary5: string;
      primaryHover: string;
      secondary100: string;

      // Basic
      white100: string;
      white80: string;
      white60: string;
      white38: string;
      white12: string;
      black100: string;
      black90: string;
      black80: string;
      black70: string;
      black60: string;
      black38: string;
      black30: string;
      black12: string;
      black10: string;
      black8: string;
      black5: string;
      black4: string;
      black2: string;

      // Gray scale
      gray50: string;
      gray100: string;
      gray200: string;
      gray300: string;
      gray400: string;
      gray500: string;
      gray600: string;
      gray700: string;
      gray800: string;
      gray900: string;

      // Status
      greenStatus: string;
      greenStatus8: string;
      greenStatusHover: string;
      yellowStatus: string;
      redStatus: string;
      redStatus5: string;
      redStatus8: string;
      redStatusHover: string;
      redStatusLight: string;
      redStatusBorder: string;
      blueStatus: string;
      grayStatus: string;

      // Text
      text: {
        primary: string;
        secondary: string;
      };

      // Component
      flowLabelBox: string;
      labelBox: string;
      scrollTrack: string;
      authBackground: string;
      shipMonitorBackgroud: string;
      shipMonitorShade: string;
      shipMonitorBorder: string;

      // Sidemenu
      sidemenuBackground: string;
      sidemenuBackgroundLight: string;
      sidemenuBorder: string;
      sidemenuTextNormal: string;
      sidemenuTextActive: string;
      sidemenuActive: string;
      sidemenuHover: string;
      sidemenuDivider: string;
      sidemenuScrollbar: string;
      sidemenuLogoutButton: string;
      sidemenuLogoutButtonHover: string;
      sidemenuIconBg: string;
      sidemenuAvatarBg: string;
      sidemenuAvatarBorder: string;
      sidemenuAvatarText: string;
      sidemenuUserName: string;
      sidemenuUserRole: string;
    };

    semantic?: {
      primary?: {
        normal?: string;
        strong?: string;
        heavy?: string;
      };
      label?: {
        normal?: string;
        neutral?: string;
        alternative?: string;
        assistive?: string;
        disable?: string;
      };
      background?: {
        normal?: string;
        alternative?: string;
        elevated?: string;
      };
      line?: {
        normalNormal?: string;
        solidNeutral?: string;
        solidAlternative?: string;
      };
      status?: {
        negative?: string;
      };
      staticColor?: {
        white?: string;
      };
    };

    spacing?: {
      radius?: {
        md?: number;
      };
    };
  }
}
