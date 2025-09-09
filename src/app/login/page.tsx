"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, KeyboardEvent } from "react";
import { toast } from "react-toastify";

import * as L from "./login.style";
import theme from "@styles/theme";
import {
  LS_KEY_ID,
  LS_KEY_SAVE_ID_FLAG,
  LS_KEY_SAVE_EXPIRE_DATE,
} from "@lib/enum";
import { paths } from "@lib/paths";
import { userLogin } from "src/modules/authentication";
import { onChangeEventType } from "@utils/types";

import {
  Wrapper,
  AuthWrapper,
  AuthTitle,
  FlexBox,
} from "@components/share/commons/commons.style";
import StyledInput from "@components/styled/StyledInput";
import StyledPassword from "@components/styled/StyledPassword";
import StyledCheckbox from "@components/styled/StyledCheckbox";
import StyledButton from "@components/styled/StyledButton";

const Login = () => {
  const router = useRouter();
  const [saveIdFlag, setSaveIdFlag] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    const idFlag = localStorage.getItem(LS_KEY_SAVE_ID_FLAG);
    const expireDate = localStorage.getItem(LS_KEY_SAVE_EXPIRE_DATE);
    const clearLocalStorage = () => {
      localStorage.removeItem(LS_KEY_SAVE_EXPIRE_DATE);
      localStorage.removeItem(LS_KEY_SAVE_ID_FLAG);
      localStorage.removeItem(LS_KEY_ID);
      setSaveIdFlag(false);
    };
    // 저장 유효기간 지나면 아이디 저장 정보 제거
    if (expireDate && new Date().getTime() > JSON.parse(expireDate)) {
      clearLocalStorage();
      return;
    }

    // 아이디 저장 여부 반영
    if (idFlag !== null) setSaveIdFlag(JSON.parse(idFlag));

    // 아이디 미 저장 시 아이디 저장 정보 제거
    if (idFlag && !JSON.parse(idFlag as string)) {
      clearLocalStorage();
      return;
    }
    // 이메일 반영
    if (localStorage.getItem(LS_KEY_ID) !== null)
      setInputs((prev) => ({
        ...prev,
        email: localStorage.getItem(LS_KEY_ID) as string,
      }));
  }, []);

  const onChange = (e: onChangeEventType) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleSaveIdFlag = () => {
    localStorage.setItem(LS_KEY_SAVE_ID_FLAG, JSON.stringify(!saveIdFlag));
    setSaveIdFlag(!saveIdFlag);
  };

  const handleLogin = async () => {
    const { email, password } = inputs;

    if (!email || !password) {
      toast.error("로그인 정보를 입력해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      //     if (data?.userLogin) {
      if (saveIdFlag) {
        localStorage.setItem(LS_KEY_ID, email);
        // 아이디 저장 한달 유효 처리
        if (localStorage.getItem(LS_KEY_SAVE_EXPIRE_DATE) === null) {
          const expireDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; //30일동안 저장
          localStorage.setItem(
            LS_KEY_SAVE_EXPIRE_DATE,
            JSON.stringify(expireDate)
          );
        }
      }
      userLogin(email);
      // }
    } catch (err) {
      console.info(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <AuthWrapper>
        <AuthTitle $margin="0 0 48px">락앤런 회원 로그인</AuthTitle>
        <StyledInput
          name="email"
          value={inputs.email}
          onChange={onChange}
          placeholder="이메일"
          margin="0 0 8px"
        />
        <StyledPassword
          name="password"
          value={inputs.password}
          onChange={onChange}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && handleLogin()
          }
          placeholder="비밀번호"
          margin="0 0 28px"
          ICON={false}
        />
        <FlexBox $justifyContent="space-between">
          <StyledCheckbox
            checkboxId="saveId"
            name="saveId"
            checked={saveIdFlag}
            value={inputs.email}
            label="아이디 저장"
            onChange={handleSaveIdFlag}
            fontColor={theme.colors.blackColor}
          />

          <FlexBox $justifyContent="flex-end">
            <L.LinkButton href={`/${paths.FIND_EMAIL}`}>
              이메일 찾기
            </L.LinkButton>
            <L.LinkButton href={`/${paths.FIND_PASSWORD}`}>
              비밀번호 찾기
            </L.LinkButton>
          </FlexBox>
        </FlexBox>
        <StyledButton
          title="로그인"
          margin="48px 0 0"
          onClick={handleLogin}
          loading={isLoading}
          fontSize={18}
          fontFamily="PretendardSemiBold"
        />
        <StyledButton
          title="회원가입하기"
          margin="12px 0 0"
          onClick={() => router.push(`/${paths.JOIN}`)}
          loading={isLoading}
          border={`${theme.colors.lightGrayBorderColor} 1px solid`}
          bgColor={theme.colors.whiteColor}
          fontColor={theme.colors.blackColor}
          fontSize={18}
          fontFamily="PretendardRegular"
        />
        <FlexBox $justifyContent="space-between" $margin="48px 0">
          <L.Line />
          <L.LoginText>간편로그인</L.LoginText>
          <L.Line />
        </FlexBox>
        <L.SocialLogin onClick={() => {}}>
          <L.SocialLogo src="/assets/icons/icon_kakao.svg" />
          카카오 로그인
        </L.SocialLogin>
        <L.SocialLogin onClick={() => {}}>
          <L.SocialLogo src="/assets/icons/icon_naver.svg" />
          네이버 로그인
        </L.SocialLogin>
        <L.SocialLogin onClick={() => {}}>
          <L.SocialLogo src="/assets/icons/icon_google.svg" />
          구글 로그인
        </L.SocialLogin>
        <FlexBox
          $justifyContent="center"
          $margin="48px 0 148px"
          $fontFamily="PretendardMedium"
          $fontColor={theme.colors.lightGrayFontColor}
          $fontSize={12}
          className="notranslate"
        >
          &copy; <L.CompanyTitle>ROCKANDRUN</L.CompanyTitle> ALL RIGHT RESERVED
        </FlexBox>
      </AuthWrapper>
    </Wrapper>
  );
};

export default Login;
