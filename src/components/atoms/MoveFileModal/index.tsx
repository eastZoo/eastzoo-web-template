import { useState, useMemo } from "react";
import styled from "styled-components";
import { Modal } from "../Modal";

/** 폴더 아이템 타입 */
export interface FolderItem {
  id: string;
  name: string;
}

export interface MoveFileModalProps {
  /** 모달 표시 여부 */
  isOpen: boolean;
  /** 모달 닫기 핸들러 */
  onClose: () => void;
  /** 이동 핸들러 */
  onMove: (targetFolderId: string) => void;
  /** 이동할 파일/폴더 이름 */
  fileName?: string;
  /** 폴더 목록 */
  folders: FolderItem[];
}

/** ============================= Icons ============================= */
const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
      stroke="rgba(55, 56, 60, 0.28)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 14L11.1 11.1"
      stroke="rgba(55, 56, 60, 0.28)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FolderIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <path
      d="M14 12.6667C14 13.0203 13.8595 13.3594 13.6095 13.6095C13.3594 13.8595 13.0203 14 12.6667 14H3.33333C2.97971 14 2.64057 13.8595 2.39052 13.6095C2.14048 13.3594 2 13.0203 2 12.6667V3.33333C2 2.97971 2.14048 2.64057 2.39052 2.39052C2.64057 2.14048 2.97971 2 3.33333 2H6L8 4.66667H12.6667C13.0203 4.66667 13.3594 4.80714 13.6095 5.05719C13.8595 5.30724 14 5.64638 14 6V12.6667Z"
      fill="#1B2A6B"
    />
  </svg>
);

const CheckCircleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 18.5C14.6944 18.5 18.5 14.6944 18.5 10C18.5 5.30558 14.6944 1.5 10 1.5C5.30558 1.5 1.5 5.30558 1.5 10C1.5 14.6944 5.30558 18.5 10 18.5ZM14.2803 8.28033C14.5732 7.98744 14.5732 7.51256 14.2803 7.21967C13.9874 6.92678 13.5126 6.92678 13.2197 7.21967L8.75 11.6893L6.78033 9.71967C6.48744 9.42678 6.01256 9.42678 5.71967 9.71967C5.42678 10.0126 5.42678 10.4874 5.71967 10.7803L8.21967 13.2803C8.51256 13.5732 8.98744 13.5732 9.28033 13.2803L14.2803 8.28033Z"
      fill="#0066FF"
    />
  </svg>
);

/**
 * MoveFileModal 컴포넌트
 * 파일/폴더 이동 모달
 * Figma design: node 117-2579
 */
export const MoveFileModal = ({
  isOpen,
  onClose,
  onMove,
  folders,
}: MoveFileModalProps) => {
  /** ============================= state 영역 ============================= */
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  /** ============================= 비즈니스 로직 영역 ============================= */
  const filteredFolders = useMemo(() => {
    if (!searchKeyword.trim()) return folders;
    return folders.filter((folder) =>
      folder.name.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [folders, searchKeyword]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKeyword(e.target.value);
  };

  const handleFolderSelect = (folderId: string) => {
    setSelectedFolderId(folderId === selectedFolderId ? null : folderId);
  };

  const handleMove = () => {
    if (selectedFolderId) {
      onMove(selectedFolderId);
      handleClose();
    }
  };

  const handleClose = () => {
    setSearchKeyword("");
    setSelectedFolderId(null);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      {/* Content */}
      <Content>
        {/* Title */}
        <Title>이동하기</Title>

        {/* Search Input */}
        <SearchInputWrapper>
          <SearchInputField>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <SearchInput
              type="text"
              value={searchKeyword}
              onChange={handleSearchChange}
              placeholder="폴더 검색..."
            />
          </SearchInputField>
        </SearchInputWrapper>

        {/* Folder List */}
        <FolderListWrapper>
          <FolderList>
            {filteredFolders.length > 0 ? (
              filteredFolders.map((folder) => (
                <FolderItem
                  key={folder.id}
                  $selected={selectedFolderId === folder.id}
                  onClick={() => handleFolderSelect(folder.id)}
                >
                  <FolderContent>
                    <FolderLabel>
                      <FolderIconWrapper>
                        <FolderIcon />
                      </FolderIconWrapper>
                      <FolderName>{folder.name}</FolderName>
                    </FolderLabel>
                    {selectedFolderId === folder.id && (
                      <CheckIconWrapper>
                        <CheckCircleIcon />
                      </CheckIconWrapper>
                    )}
                  </FolderContent>
                </FolderItem>
              ))
            ) : (
              <EmptyMessage>폴더가 없습니다.</EmptyMessage>
            )}
          </FolderList>
        </FolderListWrapper>
      </Content>

      {/* Actions */}
      <Actions>
        <CancelButton type="button" onClick={handleClose}>
          취소
        </CancelButton>
        <MoveButton
          type="button"
          onClick={handleMove}
          disabled={!selectedFolderId}
        >
          이동하기
        </MoveButton>
      </Actions>
    </Modal>
  );
};

export default MoveFileModal;

/** ============================= Styled Components ============================= */

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 24px 16px 16px;
`;

const Title = styled.h2`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.24px;
  color: #171719;
  margin: 0;
`;

/* ===== Search Input ===== */
const SearchInputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const SearchInputField = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  height: 40px;
  padding: 9px 8px;
  background: white;
  border: 1px solid rgba(112, 115, 124, 0.22);
  border-radius: 8px;
  transition: border-color 0.15s ease;

  &:focus-within {
    border-color: #0066ff;
  }
`;

const SearchIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
`;

const SearchInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.429;
  letter-spacing: 0.203px;
  color: rgba(46, 47, 51, 0.88);

  &::placeholder {
    color: rgba(55, 56, 60, 0.28);
  }
`;

/* ===== Folder List ===== */
const FolderListWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const FolderList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  height: 187px;
  padding: 12px;
  background: white;
  border: 1px solid rgba(112, 115, 124, 0.22);
  border-radius: 8px;
  overflow-y: auto;
`;

const FolderItem = styled.div<{ $selected: boolean }>`
  display: flex;
  align-items: center;
  padding: 0 4px;
  border-radius: 8px;
  cursor: pointer;
  background: ${({ $selected }) =>
    $selected ? "rgba(112, 115, 124, 0.16)" : "transparent"};
  transition: background 0.15s ease;

  &:hover {
    background: ${({ $selected }) =>
      $selected ? "rgba(112, 115, 124, 0.16)" : "rgba(112, 115, 124, 0.05)"};
  }
`;

const FolderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex: 1;
  padding: 8px 0;
`;

const FolderLabel = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 4px;
`;

const FolderIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2px;
  flex-shrink: 0;
`;

const FolderName = styled.span`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 500;
  line-height: 1.429;
  letter-spacing: 0.203px;
  color: rgba(46, 47, 51, 0.88);
`;

const CheckIconWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-top: 2px;
  flex-shrink: 0;
`;

const EmptyMessage = styled.p`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.429;
  letter-spacing: 0.203px;
  color: rgba(55, 56, 60, 0.61);
  text-align: center;
  padding: 24px 0;
  margin: 0;
`;

/* ===== Action Buttons ===== */
const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 16px;
`;

const CancelButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  background: rgba(112, 115, 124, 0.08);
  border: none;
  border-radius: 8px;
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 500;
  line-height: 1.5;
  letter-spacing: 0.091px;
  color: rgba(46, 47, 51, 0.88);
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover {
    background: rgba(112, 115, 124, 0.16);
  }
`;

const MoveButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  background: #2ec4a0;
  border: none;
  border-radius: 8px;
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.5;
  letter-spacing: 0.091px;
  color: white;
  cursor: pointer;
  transition: background 0.15s ease;

  &:hover:not(:disabled) {
    background: #26a88a;
  }

  &:disabled {
    background: rgba(112, 115, 124, 0.22);
    color: rgba(55, 56, 60, 0.61);
    cursor: not-allowed;
  }
`;
