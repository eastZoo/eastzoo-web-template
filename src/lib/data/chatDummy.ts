/**
 * 채팅 더미 데이터
 * Claude 채팅과 유사한 구조로 설계
 */

/** 채팅 메시지 타입 */
export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  /** 참조 문서 (AI 응답에만 해당) */
  references?: string[];
  timestamp: string;
}

/** 채팅 세션 타입 */
export interface ChatSession {
  id: string;
  title: string;
  timestamp: string;
  group: "today" | "yesterday" | "thisWeek" | "older";
  messages: ChatMessage[];
}

/** 채팅 히스토리 아이템 (사이드바용) */
export interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  group: "today" | "yesterday" | "thisWeek" | "older";
}

/** 채팅 세션 더미 데이터 */
export const chatSessionsDummy: ChatSession[] = [
  {
    id: "1",
    title: "보안 정책 외부 접근 제어",
    timestamp: "방금 전",
    group: "today",
    messages: [
      {
        id: "msg-1-1",
        role: "user",
        content: "외부 접근 제어 주요 정책 알려줘",
        timestamp: "2026-04-24T10:30:00",
      },
      {
        id: "msg-1-2",
        role: "assistant",
        content:
          "보안 정책 가이드라인 v2 문서를 기반으로 외부 접근 제어 관련 내용을 정리해드립니다.\n\n**외부 접근 제어 주요 정책**\n1. 모든 외부 접근은 VPN을 통해서만 허용됩니다\n2. IP 화이트리스트 기반 접근 제한 적용\n3. 2단계 인증(2FA) 필수 적용 대상입니다",
        references: ["보안 정책 가이드라인 v2.pdf", "시스템 아키텍처 설계서.docx"],
        timestamp: "2026-04-24T10:30:05",
      },
      {
        id: "msg-1-3",
        role: "user",
        content: "IP 화이트리스트 설정 방법도 알려줘",
        timestamp: "2026-04-24T10:31:00",
      },
      {
        id: "msg-1-4",
        role: "assistant",
        content:
          "IP 화이트리스트 설정은 다음 절차를 따릅니다.\n\n관리자 콘솔 → 네트워크 설정 → 접근 제어 메뉴에서 허용할 IP 대역을 등록하면 됩니다.\nCIDR 표기법을 지원합니다.",
        references: ["보안 정책 가이드라인 v2.pdf"],
        timestamp: "2026-04-24T10:31:10",
      },
    ],
  },
  {
    id: "2",
    title: "API 연동 명세 문의",
    timestamp: "1시간 전",
    group: "today",
    messages: [
      {
        id: "msg-2-1",
        role: "user",
        content: "REST API 인증 방식이 어떻게 되나요?",
        timestamp: "2026-04-24T09:00:00",
      },
      {
        id: "msg-2-2",
        role: "assistant",
        content:
          "API 연동 명세서에 따르면 인증 방식은 다음과 같습니다.\n\n**인증 방식**\n- Bearer Token 기반 JWT 인증\n- Access Token 유효기간: 1시간\n- Refresh Token 유효기간: 7일\n\n**헤더 형식**\n```\nAuthorization: Bearer {access_token}\n```",
        references: ["API 연동 명세서.pdf"],
        timestamp: "2026-04-24T09:00:08",
      },
      {
        id: "msg-2-3",
        role: "user",
        content: "Rate Limit은 어떻게 적용되나요?",
        timestamp: "2026-04-24T09:02:00",
      },
      {
        id: "msg-2-4",
        role: "assistant",
        content:
          "Rate Limit 정책은 다음과 같이 적용됩니다.\n\n- **일반 API**: 분당 100회\n- **검색 API**: 분당 30회\n- **파일 업로드**: 분당 10회\n\n제한 초과 시 429 Too Many Requests 응답이 반환됩니다.",
        references: ["API 연동 명세서.pdf"],
        timestamp: "2026-04-24T09:02:12",
      },
    ],
  },
  {
    id: "3",
    title: "아키텍처 설계 검토 요청",
    timestamp: "어제 15:30",
    group: "yesterday",
    messages: [
      {
        id: "msg-3-1",
        role: "user",
        content: "현재 시스템 아키텍처 구조를 요약해줘",
        timestamp: "2026-04-23T15:30:00",
      },
      {
        id: "msg-3-2",
        role: "assistant",
        content:
          "시스템 아키텍처 설계서를 기반으로 요약해드립니다.\n\n**전체 구조**\n- 마이크로서비스 아키텍처 (MSA) 기반\n- Kubernetes 클러스터 환경\n- API Gateway: Kong\n\n**주요 서비스**\n1. Auth Service - 인증/인가\n2. User Service - 사용자 관리\n3. Document Service - 문서 처리\n4. Search Service - 검색 엔진",
        references: ["시스템 아키텍처 설계서.docx"],
        timestamp: "2026-04-23T15:30:15",
      },
    ],
  },
  {
    id: "4",
    title: "4분기 보고서 핵심 요약",
    timestamp: "어제 11:20",
    group: "yesterday",
    messages: [
      {
        id: "msg-4-1",
        role: "user",
        content: "4분기 프로젝트 보고서의 핵심 내용 요약해줘",
        timestamp: "2026-04-23T11:20:00",
      },
      {
        id: "msg-4-2",
        role: "assistant",
        content:
          "2024년 4분기 프로젝트 보고서 핵심 요약입니다.\n\n**주요 성과**\n- 신규 기능 12개 배포 완료\n- 시스템 가용성 99.9% 달성\n- 응답 시간 30% 개선\n\n**진행 중인 작업**\n- AI 검색 기능 고도화\n- 모바일 앱 개발\n\n**다음 분기 계획**\n- 글로벌 확장 준비\n- 보안 인증 취득 (ISO 27001)",
        references: ["2024 4분기 프로젝트 보고서.pdf"],
        timestamp: "2026-04-23T11:20:20",
      },
    ],
  },
  {
    id: "5",
    title: "개발 환경 설정 방법",
    timestamp: "1월 13일",
    group: "thisWeek",
    messages: [
      {
        id: "msg-5-1",
        role: "user",
        content: "로컬 개발 환경 설정 방법 알려줘",
        timestamp: "2026-01-13T14:00:00",
      },
      {
        id: "msg-5-2",
        role: "assistant",
        content:
          "개발 환경 세팅 가이드를 참고하여 안내드립니다.\n\n**필수 설치 항목**\n1. Node.js v20 이상\n2. Docker Desktop\n3. Git\n\n**설정 순서**\n1. 레포지토리 클론\n2. `npm install` 실행\n3. `.env.local` 파일 생성\n4. `npm run dev`로 개발 서버 실행\n\n자세한 내용은 개발 환경 세팅 가이드 문서를 확인해주세요.",
        references: ["개발 환경 세팅 가이드.docx"],
        timestamp: "2026-01-13T14:00:15",
      },
    ],
  },
  {
    id: "6",
    title: "프로젝트 일정 확인",
    timestamp: "1월 12일",
    group: "thisWeek",
    messages: [
      {
        id: "msg-6-1",
        role: "user",
        content: "이번 달 주요 마일스톤 알려줘",
        timestamp: "2026-01-12T10:00:00",
      },
      {
        id: "msg-6-2",
        role: "assistant",
        content:
          "1월 주요 마일스톤 일정입니다.\n\n**Week 1 (1/1 ~ 1/7)**\n- 신규 버전 기획 확정\n\n**Week 2 (1/8 ~ 1/14)**\n- 디자인 시안 검토\n- 기술 스펙 확정\n\n**Week 3 (1/15 ~ 1/21)**\n- 개발 착수\n- 테스트 환경 구축\n\n**Week 4 (1/22 ~ 1/31)**\n- 1차 개발 완료\n- 내부 QA 시작",
        references: ["프로젝트 일정표.xlsx"],
        timestamp: "2026-01-12T10:00:10",
      },
    ],
  },
];

/** 사이드바용 채팅 히스토리 데이터 (세션에서 추출) */
export const chatHistoryDummy: ChatHistoryItem[] = chatSessionsDummy.map(
  (session) => ({
    id: session.id,
    title: session.title,
    timestamp: session.timestamp,
    group: session.group,
  })
);

/** ID로 채팅 세션 찾기 */
export function getChatSessionById(id: string): ChatSession | undefined {
  return chatSessionsDummy.find((session) => session.id === id);
}

/** 그룹 라벨 */
export const groupLabels: Record<string, string> = {
  today: "오늘",
  yesterday: "어제",
  thisWeek: "이번 주",
  older: "이전",
};
