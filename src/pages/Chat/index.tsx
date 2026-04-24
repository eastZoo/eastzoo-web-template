import { useState } from "react";
import styled from "styled-components";
import {
  PlusIconSmall,
  EllipsisIcon,
  ChevronDownIcon,
  ArrowUpIcon,
  LogoIcon,
} from "@/styles/icons";

/** ============================= Types ============================= */
interface ChatHistoryItem {
  id: string;
  title: string;
  timestamp: string;
  group: "today" | "yesterday" | "thisWeek";
}

/**
 * 채팅
 * Figma design: node 118-13787
 */
export default function ChatPage() {
  /** ============================= state 영역 ============================= */
  const [selectedModel, setSelectedModel] = useState("GPT");
  const [inputMessage, setInputMessage] = useState("");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

  /** ============================= 샘플 데이터 (임시) ============================= */
  const chatHistory: ChatHistoryItem[] = [
    { id: "1", title: "보안 정책 외부 접근 제어", timestamp: "방금 전", group: "today" },
    { id: "2", title: "API 연동 명세 문의", timestamp: "1시간 전", group: "today" },
    { id: "3", title: "아키텍처 설계 검토 요청", timestamp: "어제 15:30", group: "yesterday" },
    { id: "4", title: "4분기 보고서 핵심 요약", timestamp: "어제 11:20", group: "yesterday" },
    { id: "5", title: "개발 환경 설정 방법", timestamp: "1월 13일", group: "thisWeek" },
    { id: "6", title: "프로젝트 일정 확인", timestamp: "1월 12일", group: "thisWeek" },
  ];

  const groupLabels: Record<string, string> = {
    today: "오늘",
    yesterday: "어제",
    thisWeek: "이번 주",
  };

  /** ============================= 비즈니스 로직 영역 ============================= */
  const handleNewChat = () => {
    setSelectedChatId(null);
    setInputMessage("");
    console.log("New chat created");
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    console.log("Chat selected:", chatId);
  };

  const handleSendMessage = () => {
    if (inputMessage.trim()) {
      console.log("Sending message:", inputMessage);
      setInputMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChatMenu = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    console.log("Chat menu clicked:", chatId);
  };

  /** ============================= 렌더링 헬퍼 ============================= */
  const groupedChats = chatHistory.reduce((acc, chat) => {
    if (!acc[chat.group]) acc[chat.group] = [];
    acc[chat.group].push(chat);
    return acc;
  }, {} as Record<string, ChatHistoryItem[]>);

  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader>
        <PageTitle>채팅</PageTitle>
      </PageHeader>

      {/* Main Container */}
      <MainContainer>
        {/* Left Sidebar - Chat History */}
        <Sidebar>
          {/* New Chat Button */}
          <NewChatSection>
            <NewChatButton onClick={handleNewChat}>
              <PlusIconSmall />
              <span>새 채팅</span>
            </NewChatButton>
          </NewChatSection>

          {/* Chat History List */}
          <ChatHistoryContainer>
            {(["today", "yesterday", "thisWeek"] as const).map((group) => (
              groupedChats[group]?.length > 0 && (
                <ChatGroup key={group}>
                  <GroupLabel>{groupLabels[group]}</GroupLabel>
                  {groupedChats[group].map((chat) => (
                    <ChatItem
                      key={chat.id}
                      $active={selectedChatId === chat.id}
                      onClick={() => handleChatSelect(chat.id)}
                    >
                      <ChatItemContent>
                        <ChatTitle>{chat.title}</ChatTitle>
                        <ChatTimestamp>{chat.timestamp}</ChatTimestamp>
                      </ChatItemContent>
                      <ChatMenuButton onClick={(e) => handleChatMenu(e, chat.id)}>
                        <EllipsisIcon />
                      </ChatMenuButton>
                    </ChatItem>
                  ))}
                </ChatGroup>
              )
            ))}
          </ChatHistoryContainer>
        </Sidebar>

        {/* Main Chat Area */}
        <ChatArea>
          <ChatContent>
            {/* Model Selector */}
            <ModelSelector>
              <ModelButton>
                <span>{selectedModel}</span>
                <ChevronDownIcon />
              </ModelButton>
            </ModelSelector>

            {/* Empty State */}
            <EmptyState>
              <EmptyStateContent>
                <LogoIcon />
                <EmptyStateTextGroup>
                  <EmptyStateTitle>무엇이 궁금하신가요?</EmptyStateTitle>
                  <EmptyStateSubtitle>
                    업로드 된 문서를 바탕으로 자유롭게 질문해 보세요.
                  </EmptyStateSubtitle>
                </EmptyStateTextGroup>
              </EmptyStateContent>

              {/* Chat Input */}
              <ChatInputWrapper>
                <ChatInput
                  placeholder="업로드 한 문서 기반으로 질문하세요..."
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
                <SendButton onClick={handleSendMessage} $hasContent={!!inputMessage.trim()}>
                  <ArrowUpIcon />
                </SendButton>
              </ChatInputWrapper>
            </EmptyState>
          </ChatContent>
        </ChatArea>
      </MainContainer>
    </PageContainer>
  );
}

/** ============================= Styled Components ============================= */

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: rgba(112, 115, 124, 0.16);
`;

const PageHeader = styled.header`
  display: flex;
  align-items: center;
  height: 56px;
  padding: 0 24px;
  background: #f7f7f8;
  border-bottom: 1px solid rgba(112, 115, 124, 0.22);
  flex-shrink: 0;
`;

const PageTitle = styled.h1`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 15px;
  font-weight: 600;
  line-height: 1.467;
  letter-spacing: 0.144px;
  color: #1b2a6b;
  margin: 0;
`;

const MainContainer = styled.main`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

/* ===== Left Sidebar ===== */
const Sidebar = styled.aside`
  display: flex;
  flex-direction: column;
  width: 240px;
  min-width: 240px;
  height: 100%;
  background: #ffffff;
  border-right: 1px solid #e4e8f4;
  overflow: hidden;
`;

const NewChatSection = styled.div`
  padding: 14px 12px 15px;
  border-bottom: 1px solid #e4e8f4;
`;

const NewChatButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  width: 100%;
  padding: 10px 9px 11px;
  background: #2ec4a0;
  border: none;
  border-radius: 8px;
  color: #ffffff;
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: #26a88a;
  }

  svg {
    flex-shrink: 0;
  }
`;

const ChatHistoryContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 8px;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(112, 115, 124, 0.3);
    border-radius: 8px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const ChatGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const GroupLabel = styled.div`
  padding: 11px 8px 6px;
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 10px;
  font-weight: 600;
  letter-spacing: 0.6px;
  text-transform: uppercase;
  color: #a0aabf;
`;

const ChatItem = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  padding: 9px 10px;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;
  background: ${({ $active }) => ($active ? "rgba(0, 102, 255, 0.08)" : "transparent")};

  &:hover {
    background: ${({ $active }) => ($active ? "rgba(0, 102, 255, 0.08)" : "rgba(112, 115, 124, 0.08)")};
  }
`;

const ChatItemContent = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 2px;
  overflow: hidden;
  padding: 1px 0 2px;
`;

const ChatTitle = styled.div`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #1b2a6b;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ChatTimestamp = styled.div`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 11px;
  font-weight: 400;
  color: #a0aabf;
`;

const ChatMenuButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  padding: 0;
  margin: 0;
  background: transparent;
  border: none;
  cursor: pointer;
  color: #a0aabf;
  opacity: 0;
  transition: opacity 0.15s ease;
  flex-shrink: 0;

  ${ChatItem}:hover & {
    opacity: 1;
  }

  &:hover {
    color: #70737c;
  }
`;

/* ===== Main Chat Area ===== */
const ChatArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  height: 100%;
  background: #f4f6fb;
  overflow: hidden;
`;

const ChatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  overflow-y: auto;
`;

const ModelSelector = styled.div`
  display: flex;
`;

const ModelButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 4px;
  background: transparent;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.15s ease;

  span {
    font-family: "Pretendard Variable", "Pretendard", sans-serif;
    font-size: 16px;
    font-weight: 600;
    line-height: 1.5;
    letter-spacing: 0.0912px;
    color: rgba(46, 47, 51, 0.88);
  }

  svg {
    color: rgba(46, 47, 51, 0.88);
  }

  &:hover {
    background: rgba(0, 102, 255, 0.08);
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
`;

const EmptyStateContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const EmptyStateTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  text-align: center;
`;

const EmptyStateTitle = styled.h2`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.24px;
  color: rgba(46, 47, 51, 0.88);
  margin: 0;
`;

const EmptyStateSubtitle = styled.p`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.0912px;
  color: rgba(55, 56, 60, 0.61);
  margin: 0;
`;

const ChatInputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 614px;
  max-width: 100%;
  padding: 9px 17px;
  background: #ffffff;
  border: 1px solid #e4e8f4;
  border-radius: 8px;
`;

const ChatInput = styled.input`
  flex: 1;
  min-width: 0;
  padding: 0;
  border: none;
  background: transparent;
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  color: #171719;
  outline: none;

  &::placeholder {
    color: #a0aabf;
  }
`;

const SendButton = styled.button<{ $hasContent?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 6px;
  background: ${({ $hasContent }) => ($hasContent ? "#0066FF" : "rgba(0, 102, 255, 0.5)")};
  border: none;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: ${({ $hasContent }) => ($hasContent ? "#0052cc" : "rgba(0, 102, 255, 0.5)")};
  }
`;
