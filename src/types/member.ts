export interface Member {
  /** index key */
  mbrId: string;

  /** 사용자 ID */
  mbrUserId: string;

  /** 권한 그룹 */
  mbrUserGroup: string;

  /** 소속(부서) */
  mbrUserDepartment: string;

  /** 계급 */
  mbrUserRank: string;

  /** 성명 */
  mbrUserName: string;

  /** 연락처 */
  mbrUserTell: string;

  /** 최초 등록 일시 */
  mbrFirstTime: Date;

  /** 작성자 ID */
  userId: string;

  /** 작성자 이름 */
  userName: string;

  /** 작성 시간 */
  userTime: Date;
}
