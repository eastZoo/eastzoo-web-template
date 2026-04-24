import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  IsButton,
  IsInputSearch,
  IsSelect,
  IsFileDrop,
} from "insystem-atoms";
import {
  PlusIcon,
  DocumentIcon,
  DocumentCheckIcon,
  ClockIcon,
  SearchIcon,
  GridIcon,
  ListIcon,
  UploadIcon,
  FileUploadIcon,
  FolderUploadIcon,
  FolderCreateIcon,
} from "@/styles/icons";

/** ============================= Filter Options ============================= */
const fileTypeOptions = [
  { value: "", label: "파일 유형" },
  { value: "pdf", label: "PDF" },
  { value: "doc", label: "DOC/DOCX" },
  { value: "img", label: "이미지" },
  { value: "etc", label: "기타" },
];

const dateOptions = [
  { value: "", label: "날짜" },
  { value: "today", label: "오늘" },
  { value: "week", label: "최근 7일" },
  { value: "month", label: "최근 30일" },
  { value: "all", label: "전체" },
];

const scopeOptions = [
  { value: "", label: "공개 범위" },
  { value: "public", label: "전체 공개" },
  { value: "team", label: "팀 공개" },
  { value: "private", label: "비공개" },
];

const vectorOptions = [
  { value: "", label: "벡터화 상태" },
  { value: "complete", label: "완료" },
  { value: "pending", label: "대기중" },
  { value: "error", label: "오류" },
];

/**
 * 파일 관리
 * Figma design: node 104-3544
 */
export default function FileManagementPage() {
  /** ============================= state 영역 ============================= */
  const [searchKeyword, setSearchKeyword] = useState("");
  const [fileType, setFileType] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [scopeFilter, setScopeFilter] = useState("");
  const [vectorFilter, setVectorFilter] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("list");
  const [showUploadMenu, setShowUploadMenu] = useState(false);
  const uploadMenuRef = useRef<HTMLDivElement>(null);
  const uploadButtonRef = useRef<HTMLDivElement>(null);

  /** ============================= 통계 데이터 (임시) ============================= */
  const stats = {
    totalFiles: 0,
    myFiles: 0,
    pendingApproval: 0,
  };

  /** ============================= 비즈니스 로직 영역 ============================= */
  const handleUploadClick = () => {
    setShowUploadMenu(!showUploadMenu);
  };

  const handleFileUpload = () => {
    setShowUploadMenu(false);
    console.log("File upload clicked");
  };

  const handleFolderUpload = () => {
    setShowUploadMenu(false);
    console.log("Folder upload clicked");
  };

  const handleCreateFolder = () => {
    setShowUploadMenu(false);
    console.log("Create folder clicked");
  };

  const handleFileChange = (newFiles: File[]) => {
    console.log("Files selected:", newFiles);
  };

  const handleFileRemove = () => {
    console.log("File removed");
  };

  /** ============================= useEffect 영역 ============================= */
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        uploadMenuRef.current &&
        !uploadMenuRef.current.contains(event.target as Node) &&
        uploadButtonRef.current &&
        !uploadButtonRef.current.contains(event.target as Node)
      ) {
        setShowUploadMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <PageContainer>
      {/* Page Header */}
      <PageHeader>
        <PageTitle>파일 관리</PageTitle>
      </PageHeader>

      {/* Main Content */}
      <MainContainer>
        <Content>
          {/* Content Header */}
          <ContentHeader>
            <HeaderTextGroup>
              <MainTitle>내 파일</MainTitle>
              <Description>
                업로드한 문서를 관리하고 벡터화 상태를 확인하세요.
              </Description>
            </HeaderTextGroup>
            <UploadButtonWrapper ref={uploadButtonRef}>
              <UploadButton
                variant="solid"
                color="primary"
                size="sm"
                leftIconSlot={<PlusIcon />}
                onClick={handleUploadClick}
              >
                업로드
              </UploadButton>
              {showUploadMenu && (
                <UploadMenu ref={uploadMenuRef}>
                  <MenuItem onClick={handleFileUpload}>
                    <MenuItemIcon>
                      <FileUploadIcon />
                    </MenuItemIcon>
                    <MenuItemLabel>파일 업로드</MenuItemLabel>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleFolderUpload}>
                    <MenuItemIcon>
                      <FolderUploadIcon />
                    </MenuItemIcon>
                    <MenuItemLabel>폴더 업로드</MenuItemLabel>
                  </MenuItem>
                  <MenuDivider />
                  <MenuItem onClick={handleCreateFolder}>
                    <MenuItemIcon>
                      <FolderCreateIcon />
                    </MenuItemIcon>
                    <MenuItemLabel>폴더 생성하기</MenuItemLabel>
                  </MenuItem>
                </UploadMenu>
              )}
            </UploadButtonWrapper>
          </ContentHeader>

          {/* Status Cards */}
          <StatusCardGrid>
            {/* Card 1: 전체 파일 (cyan) */}
            <StatusCard>
              <CardIconWrap $color="cyan">
                <DocumentIcon />
              </CardIconWrap>
              <CardTextGroup>
                <CardNumber>{stats.totalFiles}</CardNumber>
                <CardLabel>전체 파일</CardLabel>
              </CardTextGroup>
            </StatusCard>

            {/* Card 2: 내가 올린 파일 (gray) */}
            <StatusCard>
              <CardIconWrap $color="gray">
                <DocumentCheckIcon />
              </CardIconWrap>
              <CardTextGroup>
                <CardNumber>{stats.myFiles}</CardNumber>
                <CardLabel>내가 올린 파일</CardLabel>
              </CardTextGroup>
            </StatusCard>

            {/* Card 3: 승인 대기 (orange) */}
            <StatusCard>
              <CardIconWrap $color="orange">
                <ClockIcon />
              </CardIconWrap>
              <CardTextGroup>
                <CardNumber>{stats.pendingApproval}</CardNumber>
                <CardLabel>승인 대기</CardLabel>
              </CardTextGroup>
            </StatusCard>
          </StatusCardGrid>

          {/* Table Container */}
          <TableContainer>
            {/* Search Bar */}
            <SearchBar>
              <SearchLeft>
                <SearchInputWrapper>
                  <IsInputSearch
                    size="sm"
                    labelShow={false}
                    placeholder="파일 검색..."
                    suffix
                    suffixSlot={<SearchIcon />}
                    clearable
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    onClear={() => setSearchKeyword("")}
                    fullWidth
                  />
                </SearchInputWrapper>
                <SelectWrapper>
                  <IsSelect
                    size="small"
                    labelShow={false}
                    options={fileTypeOptions}
                    value={fileType}
                    onChange={setFileType}
                    fullWidth
                  />
                </SelectWrapper>
                <SelectWrapper>
                  <IsSelect
                    size="small"
                    labelShow={false}
                    options={dateOptions}
                    value={dateFilter}
                    onChange={setDateFilter}
                    fullWidth
                  />
                </SelectWrapper>
                <SelectWrapper>
                  <IsSelect
                    size="small"
                    labelShow={false}
                    options={scopeOptions}
                    value={scopeFilter}
                    onChange={setScopeFilter}
                    fullWidth
                  />
                </SelectWrapper>
                <SelectWrapper>
                  <IsSelect
                    size="small"
                    labelShow={false}
                    options={vectorOptions}
                    value={vectorFilter}
                    onChange={setVectorFilter}
                    fullWidth
                  />
                </SelectWrapper>
              </SearchLeft>
              <SearchRight>
                <ViewToggle>
                  <ViewButton
                    $active={viewMode === "grid"}
                    onClick={() => setViewMode("grid")}
                    title="그리드 보기"
                    $position="left"
                  >
                    <GridIcon />
                  </ViewButton>
                  <ViewButton
                    $active={viewMode === "list"}
                    onClick={() => setViewMode("list")}
                    title="목록 보기"
                    $position="right"
                  >
                    <ListIcon />
                  </ViewButton>
                </ViewToggle>
              </SearchRight>
            </SearchBar>

            {/* Drag Drop Area */}
            <DragDropArea>
              <IsFileDrop
                labelShow={false}
                fullWidth
                accept=".jpg,.jpeg,.png,.pdf,.doc,.docx"
                leadText="끌어다 놓기 또는 "
                actionText="선택하기"
                infoText="JPG, PNG 형식만 허용됩니다(최대 2MB)"
                dropIconSlot={<UploadIcon />}
                onFileChange={handleFileChange}
                onFileRemove={handleFileRemove}
              />
            </DragDropArea>
          </TableContainer>
        </Content>
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
  flex: 1;
  overflow: auto;
  padding: 24px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
`;

const MainTitle = styled.h2`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.4;
  letter-spacing: -0.24px;
  color: #1b2a6b;
  margin: 0;
`;

const Description = styled.p`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.429;
  letter-spacing: 0.203px;
  color: #6b7a9f;
  margin: 0;
`;

/* Upload Button with Menu */
const UploadButtonWrapper = styled.div`
  position: relative;
`;

const UploadButton = styled(IsButton)`
  box-shadow: 0px 0px 10px 0px rgba(46, 182, 170, 0.25);
`;

const UploadMenu = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  right: 0;
  min-width: 140px;
  background: #ffffff;
  border: 1px solid #eaebec;
  border-radius: 8px;
  box-shadow: 0px 4px 6px -1px rgba(23, 23, 23, 0.06),
    0px 2px 4px -2px rgba(23, 23, 23, 0.06);
  padding: 4px 0;
  z-index: 100;
`;

const MenuItem = styled.button`
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
  letter-spacing: 0.3024px;
  color: rgba(46, 47, 51, 0.88);
`;

const MenuDivider = styled.div`
  height: 1px;
  margin: 0 8px;
  background: rgba(112, 115, 124, 0.08);
`;

/* Status Cards */
const StatusCardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 14px;
`;

const StatusCard = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 11px 21px;
  background: #ffffff;
  border: 1px solid rgba(112, 115, 124, 0.22);
  border-radius: 12px;
`;

const CardIconWrap = styled.div<{ $color: "cyan" | "gray" | "orange" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 10px;
  flex-shrink: 0;

  ${({ $color }) => {
    switch ($color) {
      case "cyan":
        return `
          background: rgba(0, 189, 222, 0.12);
          color: #00bdde;
        `;
      case "orange":
        return `
          background: rgba(255, 146, 0, 0.12);
          color: #ff9200;
        `;
      default:
        return `
          background: rgba(112, 115, 124, 0.08);
          color: #70737c;
        `;
    }
  }}
`;

const CardTextGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const CardNumber = styled.span`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 22px;
  font-weight: 700;
  line-height: 1.364;
  letter-spacing: -0.427px;
  color: #171719;
`;

const CardLabel = styled.span`
  font-family: "Pretendard Variable", "Pretendard", sans-serif;
  font-size: 12px;
  font-weight: 400;
  line-height: 1.334;
  letter-spacing: 0.302px;
  color: rgba(55, 56, 60, 0.61);
`;

/* Table Container */
const TableContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 17px;
  background: #ffffff;
  border: 1px solid rgba(112, 115, 124, 0.22);
  border-radius: 12px;
  min-height: 500px;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const SearchLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const SearchInputWrapper = styled.div`
  width: 200px;

  /* Override IsInputSearch to use filled background */
  & > div > div:first-child {
    background: rgba(112, 115, 124, 0.08);
    border: 1px solid rgba(112, 115, 124, 0.22);
  }
`;

const SelectWrapper = styled.div`
  width: 120px;

  /* Override IsSelect to use filled background */
  & button {
    background: rgba(112, 115, 124, 0.08);
    border: 1px solid rgba(112, 115, 124, 0.22);
  }
`;

const SearchRight = styled.div`
  display: flex;
  align-items: center;
`;

const ViewToggle = styled.div`
  display: flex;
  align-items: center;
`;

const ViewButton = styled.button<{ $active: boolean; $position: "left" | "right" }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 8px;
  border: 1px solid rgba(112, 115, 124, 0.12);
  background: ${({ $active }) =>
    $active ? "rgba(112, 115, 124, 0.16)" : "#ffffff"};
  cursor: pointer;
  color: #70737c;
  transition: background 0.15s ease;

  ${({ $position }) =>
    $position === "left"
      ? `
    border-radius: 8px 0 0 8px;
    border-right: none;
  `
      : `
    border-radius: 0 8px 8px 0;
  `}

  &:hover {
    background: rgba(112, 115, 124, 0.08);
  }
`;

const DragDropArea = styled.div`
  flex: 1;
  display: flex;
  align-items: stretch;

  /* Override IsFileDrop styles */
  & > div {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  & > div > div:last-child {
    flex: 1;
    min-height: 400px;
  }
`;
