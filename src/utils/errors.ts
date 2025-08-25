import { GraphQLError } from "graphql";
import { toast } from "react-toastify";

// import client from '@apolloClient';
// import { userLogout } from '@modules/authentication';

// TODO: 추후 테스트
// const handleRenewalAccessToken = async () => { // access token 갱신
//     try {
//         const { data } = await client.mutate({
//             mutation: REQ_ADMIN_ACCESS_TOKEN
//         });
//         if (data?.reqAdminAccessToken) {
//             setCookie('CMT', data?.reqAdminAccessToken as string);
//             window.location.reload();
//         }
//     } catch (error) {
//         console.error(error);
//     }
// };

//에러 핸들링
export const errorHandler = (error: GraphQLError | Error) => {
  const { message } = error ?? {};
  if (message) {
    toast.error(errorType[message as keyof typeof errorType]);
    // if (message === 'err_01') handleRenewalAccessToken();
    // if (message === 'err_02' || message === 'err_03') userLogout();
    return;
  } else {
    console.error(`server : ${message}`);
  }
};

const errorType = {
  err_00: "먼저 로그인이 필요합니다.",
  err_01: "유효하지 않은 토큰입니다.",
  err_02: "인증이 만료 되었습니다.",
  err_03: "다른 곳에서 로그인 하였습니다.",
  err_04: "사용자 인증에 실패하였습니다.",
  err_05: "등록에 실패하였습니다.",
  err_06: "조회에 실패하였습니다.",
  err_07: "수정에 실패하였습니다.",
  err_08: "삭제에 실패하였습니다.",
  err_09: "발송에 실패하였습니다.",
  err_10: "로그인에 실패하였습니다.",
  err_11: "권한이 없습니다.",
  err_12: "회원가입에 실패하였습니다.",
  err_13: "마스터 계정만 가능합니다.",
  err_14: "인증번호가 일치하지 않습니다. 다시 입력해주세요.",
  err_15: "등록되지 않은 계정입니다.",
  err_16: "현재 비밀번호가 틀립니다.",
  err_17: "현재 등록되어 있는 비밀번호와 새로운 비밀번호가 동일합니다.",
  err_18: "비밀번호를 변경한지 24시간이 지나야 다시 변경할 수 있습니다.",
  err_19: "이미 등록된 계정입니다.",
  err_20: "입력한 비밀번호와 확인 비밀번호가 다릅니다.",
  err_21: "이미 등록된 휴대폰 번호입니다.",
  err_22: "이미 등록된 이메일입니다.",
  err_23: "잘못된 휴대폰 번호 형식입니다.",
  err_24: "잘못된 이메일 형식입니다.",
} as const;
