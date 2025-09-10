import {
  isEmail,
  isRequiredChars,
  isNumericSpecialChars,
  isRepeatedChars,
} from "./commons";
import { toast } from "react-toastify";

type InputsType = Record<string, string>;

// 비밀번호 형식
export const validatePw = (pw: string) => {
  if (pw.length < 8) {
    return false;
  } else if (!isRequiredChars(pw)) {
    return false;
  } else if (!isNumericSpecialChars(pw)) {
    return false;
  } else if (isRepeatedChars(pw)) {
    return false;
  }
  return true;
};

// 이메일 찾기
export const validateFindEmail = (inputs: InputsType) => {
  const { license, name } = inputs;
  let validity = true;

  if (!license || license.length < 8) {
    toast.error("요양기관번호를 정확히 입력해주세요");
    validity = false;
  } else if (!name) {
    toast.error("대표자명을 입력해주세요");
    validity = false;
  }

  return validity;
};
// 비밀번호 찾기
export const validateFindPw = (
  inputs: InputsType,
  verifyCellphone: boolean
) => {
  const { email, name, license, cellphone, verifyCode } = inputs;
  let validity = true;

  if (!isEmail(email)) {
    toast.error("이메일을 정확히 입력해주세요");
    validity = false;
  } else if (!license || license.length < 8) {
    toast.error("요양기관번호를 정확히 입력해주세요");
    validity = false;
  } else if (!name) {
    toast.error("대표자명을 입력해주세요");
    validity = false;
  }

  return validity;
};

// 회원가입
export const validateJoin = (
  inputs: InputsType,
  birthday: Date | null,
  checkDup: Record<string, boolean>
) => {
  const {
    nationality,
    email,
    authEmailNum,
    password,
    passwordConfirm,
    name,
    cellphone,
    authPhoneNum,
    address,
    gender,
  } = inputs;

  let validity = true;

  if (nationality === "선택") {
    toast.error("국적을 선택해주세요.");
    validity = false;
  } else if (!isEmail(email)) {
    toast.error("이메일을 정확히 입력해주세요.");
    validity = false;
  } else if (!checkDup.email) {
    toast.error("이메일을 인증해주세요.");
    validity = false;
  } else if (authEmailNum.length < 6) {
    toast.error("이메일 인증번호를 정확히 입력해주세요.");
    validity = false;
  } else if (!validatePw(password)) {
    toast.error("비밀번호를 확인해주세요");
  } else if (password !== passwordConfirm) {
    toast.error("비밀번호 재입력을 확인해주세요");
  } else if (!name) {
    toast.error("이름을 입력해주세요.");
    validity = false;
  } else if (+nationality === 1 && cellphone.replaceAll("-", "").length < 11) {
    // TODO: 임시. 추후 한국인만 판별
    toast.error("휴대폰번호를 정확히 입력해주세요.");
    validity = false;
  } else if (+nationality === 1 && !checkDup.cellphone) {
    // TODO: 임시. 추후 한국인만 판별
    toast.error("휴대폰번호를 인증해주세요.");
    validity = false;
  } else if (+nationality === 1 && authPhoneNum.length < 6) {
    // TODO: 임시. 추후 한국인만 판별
    toast.error("휴대폰 인증번호를 정확히 입력해주세요.");
    validity = false;
  } else if (!birthday) {
    toast.error("생년월일을 선택해주세요.");
    validity = false;
  } else if (!address) {
    toast.error("주소를 입력해주세요.");
    validity = false;
  } else if (gender === "선택") {
    toast.error("성별을 선택해주세요.");
    validity = false;
  }

  return validity;
};
