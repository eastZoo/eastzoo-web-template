import type { User } from "@/types/User";
import { dummyUsers } from "../../data/userDataDummy";

interface LoginRequest {
  userId: string;
  password: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  user?: User;
  token?: string;
  email?: string;
}

/** 로그인 API */
export const loginApi = async (
  request: LoginRequest
): Promise<LoginResponse> => {
  await new Promise((resolve) => setTimeout(resolve, 300));

  const { userId, password } = request;

  const user = dummyUsers.find((u) => u.userId === userId);

  if (!user) {
    return {
      success: false,
      message: "존재하지 않는 아이디입니다.",
    };
  }

  if (user.password !== password) {
    return {
      success: false,
      message: "비밀번호를 잘못 입력하셨습니다.",
    };
  }

  return {
    success: true,
    message: "로그인에 성공했습니다.",
    user: user,
    token: "dummy-token-" + user.oid,
  };
};
