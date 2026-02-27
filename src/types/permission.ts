export interface Permission {
  pmsId: number;

  /** 권한그룹 **/
  pmsGroup: string;

  /** 메뉴 **/
  pmsMenuName: string;

  /** comment: '사용여부 **/
  pmsMenuActive: number;

  /** 작성/등록 **/
  pmsMenuInsert: number;

  /** 편집 **/
  pmsMenuUpdate: number;

  /** 삭제 **/
  pmsMenuDelete: number;

  /** 읽기 **/
  pmsMenuRead: number;

  order?: number;

  depth?: number;
}
