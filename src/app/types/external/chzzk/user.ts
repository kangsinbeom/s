export interface ChzzkUserInfoResponse {
  code: number;
  message: string | null;
  content: UserInfoContent;
}

export interface UserInfoContent {
  hasProfile: boolean;
  userIdHash: string;
  nickname: string;
  profileImageUrl: string;
  penalties: any[]; // penalties 안에 구체적인 구조를 알면 더 자세히 정의 가능
  officialNotiAgree: boolean;
  officialNotiAgreeUpdatedDate: string | null;
  verifiedMark: boolean;
  loggedIn: boolean;
}
