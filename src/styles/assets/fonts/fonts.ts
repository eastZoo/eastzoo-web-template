import { createGlobalStyle } from "styled-components";
import PretendardBlack from "./woff/Pretendard-Black.woff";
import PretendardBlack2 from "./woff2/Pretendard-Black.woff2";
import PretendardExtraBold from "./woff/Pretendard-ExtraBold.woff";
import PretendardExtraBold2 from "./woff2/Pretendard-ExtraBold.woff2";
import PretendardBold from "./woff/Pretendard-Bold.woff";
import PretendardBold2 from "./woff2/Pretendard-Bold.woff2";
import PretendardSemiBold from "./woff/Pretendard-SemiBold.woff";
import PretendardSemiBold2 from "./woff2/Pretendard-SemiBold.woff2";
import PretendardMedium from "./woff/Pretendard-Medium.woff";
import PretendardMedium2 from "./woff2/Pretendard-Medium.woff2";
import PretendardLight from "./woff/Pretendard-Light.woff";
import PretendardLight2 from "./woff2/Pretendard-Light.woff2";
import PretendardExtraLight from "./woff/Pretendard-ExtraLight.woff";
import PretendardExtraLight2 from "./woff2/Pretendard-ExtraLight.woff2";
import PretendardThin from "./woff/Pretendard-Thin.woff";
import PretendardThin2 from "./woff2/Pretendard-Thin.woff2";
import PretendardRegular from "./woff/Pretendard-Regular.woff";
import PretendardRegular2 from "./woff2/Pretendard-Regular.woff2";
export const GlobalFonts = createGlobalStyle`

@font-face {
	font-family: 'Pretendard';
	font-weight: 900;
	font-display: swap;
	src: local('Pretendard Black'), url(${PretendardBlack2}) format('woff2'), url(${PretendardBlack}) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 800;
	font-display: swap;
	src: local('Pretendard ExtraBold'), url(${PretendardExtraBold2}) format('woff2'), url(${PretendardExtraBold}) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 700;
	font-display: swap;
	src: local('Pretendard Bold'), url(${PretendardBold2}) format('woff2'), url(${PretendardBold}) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 600;
	font-display: swap;
	src: local('Pretendard SemiBold'), url(${PretendardSemiBold2}) format('woff2'), url(${PretendardSemiBold}) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 500;
	font-display: swap;
	src: local('Pretendard Medium'), url(${PretendardMedium2}) format('woff2'), url(${PretendardMedium}) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 400;
	font-display: swap;
	src: local('Pretendard Regular'), url(${PretendardRegular2}) format('woff2'), url(${PretendardRegular}) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 300;
	font-display: swap;
	src: local('Pretendard Light'), url(${PretendardLight2}) format('woff2'), url(${PretendardLight}) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 200;
	font-display: swap;
	src: local('Pretendard ExtraLight'), url(${PretendardExtraLight2}) format('woff2'), url(${PretendardExtraLight}) format('woff');
}

@font-face {
	font-family: 'Pretendard';
	font-weight: 100;
	font-display: swap;
	src: local('Pretendard Thin'), url(${PretendardThin2}) format('woff2'), url(${PretendardThin}) format('woff');
}
`;
