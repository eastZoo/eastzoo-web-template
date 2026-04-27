import { useState, useRef, useEffect, useCallback } from "react";
import styled, { keyframes } from "styled-components";
import {
  PlusIconSmall,
  EllipsisIcon,
  ChevronDownIcon,
  ArrowUpIcon,
  LogoIcon,
  EditIcon,
  TrashIcon,
} from "@/styles/icons";
import {
  chatHistoryDummy,
  getChatSessionById,
  groupLabels,
  type ChatHistoryItem,
  type ChatMessage,
} from "@/lib/data/chatDummy";
import { Alert } from "@/components/atoms/Alert";

/**
 * 채팅
 * Figma design: node 118-13787 (빈 상태), node 118-13472 (대화 상태)
 */
export default function ChatPage() {
  /** ============================= state 영역 ============================= */
  const [selectedModel, setSelectedModel] = useState("GPT");
  const [inputMessage, setInputMessage] = useState("");
  const [selectedChatId, setSelectedChatId] = useState<string | null>(null);
  const [chatHistory, setChatHistory] =
    useState<ChatHistoryItem[]>(chatHistoryDummy);
  const [currentMessages, setCurrentMessages] = useState<ChatMessage[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /** 채팅 메뉴 관련 state */
  const [openMenuChatId, setOpenMenuChatId] = useState<string | null>(null);
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [chatToDelete, setChatToDelete] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  /** ============================= 비즈니스 로직 영역 ============================= */
  const handleNewChat = () => {
    setSelectedChatId(null);
    setCurrentMessages([]);
    setInputMessage("");
  };

  const handleChatSelect = (chatId: string) => {
    setSelectedChatId(chatId);
    const session = getChatSessionById(chatId);
    if (session) {
      setCurrentMessages(session.messages);
    }
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newUserMessage: ChatMessage = {
      id: `msg-new-${Date.now()}`,
      role: "user",
      content: inputMessage.trim(),
      timestamp: new Date().toISOString(),
    };

    // 새 채팅인 경우 히스토리에 추가
    if (!selectedChatId) {
      const newChatId = `chat-${Date.now()}`;
      const newHistoryItem: ChatHistoryItem = {
        id: newChatId,
        title:
          inputMessage.trim().slice(0, 30) +
          (inputMessage.length > 30 ? "..." : ""),
        timestamp: "방금 전",
        group: "today",
      };
      setChatHistory((prev) => [newHistoryItem, ...prev]);
      setSelectedChatId(newChatId);
    }

    setCurrentMessages((prev) => [...prev, newUserMessage]);
    setInputMessage("");

    // 시뮬레이션: AI 응답 (실제로는 API 호출)
    setTimeout(() => {
      const aiResponse: ChatMessage = {
        id: `msg-ai-${Date.now()}`,
        role: "assistant",
        content:
          "요청하신 내용을 확인했습니다. 관련 문서를 기반으로 답변드리겠습니다.\n\n현재 시스템에서 해당 기능을 지원하고 있으며, 자세한 설정 방법은 관련 문서를 참고해주세요.",
        references: ["관련 문서.pdf"],
        timestamp: new Date().toISOString(),
      };
      setCurrentMessages((prev) => [...prev, aiResponse]);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleChatMenu = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    setOpenMenuChatId(openMenuChatId === chatId ? null : chatId);
  };

  /** 메뉴 닫기 */
  const handleCloseMenu = useCallback(() => {
    setOpenMenuChatId(null);
  }, []);

  /** 수정하기 클릭 */
  const handleEditChat = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    console.log("Edit chat:", chatId);
    setOpenMenuChatId(null);
    // TODO: 수정 모달 또는 기능 구현
  };

  /** 삭제하기 클릭 */
  const handleDeleteClick = (e: React.MouseEvent, chatId: string) => {
    e.stopPropagation();
    setChatToDelete(chatId);
    setShowDeleteAlert(true);
    setOpenMenuChatId(null);
  };

  /** 삭제 확인 */
  const handleDeleteConfirm = () => {
    if (chatToDelete) {
      setChatHistory((prev) => prev.filter((chat) => chat.id !== chatToDelete));
      if (selectedChatId === chatToDelete) {
        setSelectedChatId(null);
        setCurrentMessages([]);
      }
    }
    setShowDeleteAlert(false);
    setChatToDelete(null);
  };

  /** 삭제 취소 */
  const handleDeleteCancel = () => {
    setShowDeleteAlert(false);
    setChatToDelete(null);
  };

  /** ============================= useEffect 영역 ============================= */
  // 메시지가 추가되면 스크롤 아래로
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentMessages]);

  // Textarea 자동 높이 조절
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  }, [inputMessage]);

  // 메뉴 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        handleCloseMenu();
      }
    };

    if (openMenuChatId) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openMenuChatId, handleCloseMenu]);

  /** ============================= 렌더링 헬퍼 ============================= */
  const groupedChats = chatHistory.reduce(
    (acc, chat) => {
      if (!acc[chat.group]) acc[chat.group] = [];
      acc[chat.group].push(chat);
      return acc;
    },
    {} as Record<string, ChatHistoryItem[]>
  );

  const hasMessages = currentMessages.length > 0;

  /** 마크다운 스타일 텍스트 렌더링 (간단 버전) */
  const renderMessageContent = (content: string) => {
    const lines = content.split("\n");
    return lines.map((line, idx) => {
      // Bold 처리 (**text**)
      const boldRegex = /\*\*(.*?)\*\*/g;
      const parts: (string | React.ReactNode)[] = [];
      let lastIndex = 0;
      let match;

      while ((match = boldRegex.exec(line)) !== null) {
        if (match.index > lastIndex) {
          parts.push(line.slice(lastIndex, match.index));
        }
        parts.push(
          <strong key={`bold-${idx}-${match.index}`}>{match[1]}</strong>
        );
        lastIndex = match.index + match[0].length;
      }
      if (lastIndex < line.length) {
        parts.push(line.slice(lastIndex));
      }

      return (
        <MessageLine key={idx}>
          {parts.length > 0 ? parts : line || <br />}
        </MessageLine>
      );
    });
  };

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
            {(["today", "yesterday", "thisWeek", "older"] as const).map(
              (group) =>
                groupedChats[group]?.length > 0 && (
                  <ChatGroup key={group}>
                    <GroupLabel>{groupLabels[group]}</GroupLabel>
                    {groupedChats[group].map((chat) => (
                      <ChatItemWrapper key={chat.id}>
                        <ChatItem
                          $active={selectedChatId === chat.id}
                          onClick={() => handleChatSelect(chat.id)}
                        >
                          <ChatItemContent>
                            <ChatTitle>{chat.title}</ChatTitle>
                            <ChatTimestamp>{chat.timestamp}</ChatTimestamp>
                          </ChatItemContent>
                          <ChatMenuButton
                            onClick={(e) => handleChatMenu(e, chat.id)}
                          >
                            <EllipsisIcon />
                          </ChatMenuButton>
                        </ChatItem>

                        {/* Chat Menu Tooltip */}
                        {openMenuChatId === chat.id && (
                          <ChatMenu ref={menuRef}>
                            <ChatMenuItem
                              onClick={(e) => handleEditChat(e, chat.id)}
                            >
                              <MenuItemIcon>
                                <EditIcon />
                              </MenuItemIcon>
                              <MenuItemLabel>수정하기</MenuItemLabel>
                            </ChatMenuItem>
                            <ChatMenuItem
                              onClick={(e) => handleDeleteClick(e, chat.id)}
                            >
                              <MenuItemIcon>
                                <TrashIcon />
                              </MenuItemIcon>
                              <MenuItemLabel>삭제하기</MenuItemLabel>
                            </ChatMenuItem>
                          </ChatMenu>
                        )}
                      </ChatItemWrapper>
                    ))}
                  </ChatGroup>
                )
            )}
          </ChatHistoryContainer>
        </Sidebar>

        {/* Main Chat Area */}
        <ChatArea>
          {/* Model Selector */}
          <ModelSelectorWrapper>
            <ModelSelector>
              <ModelButton>
                <span>{selectedModel}</span>
                <ChevronDownIcon />
              </ModelButton>
            </ModelSelector>
          </ModelSelectorWrapper>

          {/* Chat Content */}
          <ChatContentWrapper>
            {hasMessages ? (
              /* 대화 내용이 있을 때 — 빈 화면에서 전환 시 진입 애니메이션 */
              <ActiveChatColumn>
                <MessagesAnimShell>
                  <MessagesContainer>
                    {currentMessages.map((message) => (
                      <MessageWrapper key={message.id} $role={message.role}>
                        {message.role === "user" ? (
                          <UserMessage>{message.content}</UserMessage>
                        ) : (
                          <AssistantMessageWrapper>
                            <AssistantMessage>
                              {renderMessageContent(message.content)}
                            </AssistantMessage>
                            {message.references &&
                              message.references.length > 0 && (
                                <ReferenceRow>
                                  <ReferenceLabel>참조:</ReferenceLabel>
                                  {message.references.map((ref, idx) => (
                                    <ReferenceBadge key={idx}>
                                      {ref}
                                    </ReferenceBadge>
                                  ))}
                                </ReferenceRow>
                              )}
                          </AssistantMessageWrapper>
                        )}
                      </MessageWrapper>
                    ))}
                    <div ref={messagesEndRef} />
                  </MessagesContainer>
                </MessagesAnimShell>

                <BottomInputAnimShell>
                  <ChatInputSection>
                    <ChatInputContainer>
                      <ChatTextarea
                        ref={textareaRef}
                        placeholder="업로드 한 문서 기반으로 질문하세요..."
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        rows={1}
                      />
                      <SendButton
                        onClick={handleSendMessage}
                        $hasContent={!!inputMessage.trim()}
                      >
                        <ArrowUpIcon />
                      </SendButton>
                    </ChatInputContainer>
                  </ChatInputSection>
                </BottomInputAnimShell>
              </ActiveChatColumn>
            ) : (
              /* 빈 상태 - 입력창이 중앙에 위치 */
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

                {/* 중앙 위치 입력창 */}
                <CenteredInputContainer>
                  <ChatTextarea
                    ref={textareaRef}
                    placeholder="업로드 한 문서 기반으로 질문하세요..."
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                  />
                  <SendButton
                    onClick={handleSendMessage}
                    $hasContent={!!inputMessage.trim()}
                  >
                    <ArrowUpIcon />
                  </SendButton>
                </CenteredInputContainer>
              </EmptyState>
            )}
          </ChatContentWrapper>
        </ChatArea>
      </MainContainer>

      {/* 대화 삭제 확인 Alert */}
      <Alert
        isOpen={showDeleteAlert}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title="대화 삭제"
        description="이 대화를 삭제하시겠습니까?"
        cancelText="취소"
        confirmText="삭제"
        confirmVariant="danger"
      />
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
  background: ${({ $active }) =>
    $active ? "rgba(0, 102, 255, 0.08)" : "transparent"};

  &:hover {
    background: ${({ $active }) =>
      $active ? "rgba(0, 102, 255, 0.08)" : "rgba(112, 115, 124, 0.08)"};
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

const ModelSelectorWrapper = styled.div`
  padding: 16px 16px 0;
  flex-shrink: 0;
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

const ChatContentWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

/** 빈 화면 → 대화 화면 전환 시 스레드·입력창 진입 */
const chatThreadEnter = keyframes`
  from {
    opacity: 0;
    transform: translateY(14px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const bottomInputFromCenter = keyframes`
  from {
    opacity: 0;
    transform: translateY(calc(-1 * min(26vh, 220px)));
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const ActiveChatColumn = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  min-height: 0;
  overflow: hidden;
`;

const MessagesAnimShell = styled.div`
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  animation: ${chatThreadEnter} 0.42s cubic-bezier(0.22, 1, 0.36, 1) both;
`;

const BottomInputAnimShell = styled.div`
  flex-shrink: 0;
  animation: ${bottomInputFromCenter} 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
  animation-delay: 0.06s;
`;

/* ===== Messages ===== */
const MessagesContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 16px;
  display: flex;
  flex-direction: column;
  gap: 16px;

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

const MessageWrapper = styled.div<{ $role: "user" | "assistant" }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ $role }) => ($role === "user" ? "flex-end" : "flex-start")};
  width: 100%;
`;

const UserMessage = styled.div`
  max-width: 70%;
  padding: 13px 16px;
  background: #1b2a6b;
  border-radius: 8px;
  color: #ffffff;
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.0912px;
  white-space: pre-wrap;
  word-break: break-word;
`;

const AssistantMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`;

const AssistantMessage = styled.div`
  padding: 8px 0;
  color: #171719;
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.0912px;

  strong {
    font-weight: 700;
  }
`;

const MessageLine = styled.div`
  min-height: 1.5em;
`;

const ReferenceRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  padding: 0 4px;
`;

const ReferenceLabel = styled.span`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.334;
  letter-spacing: 0.3024px;
  color: rgba(55, 56, 60, 0.61);
`;

const ReferenceBadge = styled.span`
  display: inline-flex;
  align-items: center;
  padding: 4px 9px 5px;
  background: rgba(55, 56, 60, 0.61);
  border-radius: 5px;
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.334;
  letter-spacing: 0.3024px;
  color: #ffffff;
`;

/* ===== Empty State ===== */
const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 16px;
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

/* ===== Chat Input ===== */
const ChatInputSection = styled.div`
  padding: 17px 16px 16px;
  border-top: 1px solid #e4e8f4;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
`;

const CenteredInputContainer = styled.div`
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

const ChatInputContainer = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
  width: 100%;
  max-width: 928px;
  padding: 9px 17px;
  background: #ffffff;
  border: 1px solid #e4e8f4;
  border-radius: 8px;
`;

const ChatTextarea = styled.textarea`
  flex: 1;
  min-width: 0;
  min-height: 22px;
  max-height: 120px;
  padding: 0;
  border: none;
  background: transparent;
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 22.4px;
  color: #171719;
  outline: none;
  resize: none;
  overflow-y: auto;

  &::placeholder {
    color: #a0aabf;
  }

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: rgba(112, 115, 124, 0.3);
    border-radius: 4px;
  }
`;

const SendButton = styled.button<{ $hasContent?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  padding: 6px;
  background: ${({ $hasContent }) =>
    $hasContent ? "#2EC4A0" : "rgba(46, 196, 160, 0.5)"};
  border: none;
  border-radius: 8px;
  color: #ffffff;
  cursor: pointer;
  transition: background 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: ${({ $hasContent }) =>
      $hasContent ? "#26A88A" : "rgba(46, 196, 160, 0.5)"};
  }
`;

/* ===== Chat Menu Tooltip ===== */
const ChatItemWrapper = styled.div`
  position: relative;
`;

const ChatMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  z-index: 100;
  min-width: 140px;
  padding: 4px 0;
  background: #ffffff;
  border: 1px solid #eaebec;
  border-radius: 8px;
  box-shadow:
    0px 4px 6px -1px rgba(23, 23, 23, 0.06),
    0px 2px 4px -2px rgba(23, 23, 23, 0.06);
`;

const ChatMenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 8px;
  background: transparent;
  border: none;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(23, 23, 25, 0.075);
  }
`;

const MenuItemIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  color: rgba(46, 47, 51, 0.88);
  flex-shrink: 0;
`;

const MenuItemLabel = styled.span`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.334;
  letter-spacing: 0.302px;
  color: rgba(46, 47, 51, 0.88);
`;
