"use client";
import { useRouter } from "next/navigation";
import { useState, KeyboardEvent } from "react";
import { toast } from "react-toastify";

import * as F from "./findEmail.style";
import theme from "@styles/theme";
import { paths } from "@lib/paths";
import { onChangeEventType } from "@utils/types";
import { onlyNumber } from "@utils/commons";

import {
  Wrapper,
  AuthWrapper,
  AuthTitle,
  AuthDescription,
  FlexBox,
} from "@components/share/commons/commons.style";
import StyledInput from "@components/styled/StyledInput";
import StyledButton from "@components/styled/StyledButton";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string[] | null>(null);
  const [inputs, setInputs] = useState({
    cellphone: "",
    authNum: "",
  });

  const onChange = (e: onChangeEventType) => {
    const { name, value } = e.target;

    if (name === "cellphone") {
      return setInputs({
        ...inputs,
        [name]: onlyNumber(value),
      });
    }

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  const handleCheckCellphone = async () => {
    try {
      toast.success("인증번호를 보냈습니다.");
    } catch (err) {
      console.info(err);
    }
  };

  const onSubmit = async () => {
    const { cellphone, authNum } = inputs;

    if (!cellphone) {
      toast.error("휴대폰 번호를 입력해주세요.");
      return;
    }
    if (!authNum) {
      toast.error("인증번호를 입력해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      setResult(["example@platcube.com"]);
    } catch (err) {
      console.info(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <AuthWrapper>
        <AuthTitle>이메일를 잊으셨나요?</AuthTitle>
        <AuthDescription>휴대폰 번호와 인증번호를 입력해주세요</AuthDescription>
        <StyledInput
          name="cellphone"
          value={inputs.cellphone}
          onChange={onChange}
          onClick={handleCheckCellphone}
          placeholder="휴대폰 번호"
          maxLength={11}
          margin="0 0 8px"
          buttonTitle="입력완료"
          padding="14px 100px 14px 12px"
          BUTTON
        />
        <StyledInput
          name="authNum"
          value={inputs.authNum}
          onChange={onChange}
          onKeyDown={(e: KeyboardEvent<HTMLInputElement>) =>
            e.key === "Enter" && onSubmit()
          }
          placeholder="6자리 인증번호"
          maxLength={6}
          margin="0 0 48px"
        />
        <StyledButton
          title="찾기"
          onClick={onSubmit}
          loading={isLoading}
          fontSize={18}
          fontFamily="PretendardSemiBold"
        />
        {result && (
          <F.SearchArea>
            <F.SearchText>검색결과</F.SearchText>
            {!result.length ? (
              <F.Empty>검색 결과가 존재하지 않습니다.</F.Empty>
            ) : (
              <>
                <F.Result>{result[0]}</F.Result>
                <StyledButton
                  title="로그인하러 가기"
                  margin="32px 0 187px"
                  width={343}
                  fontSize={14}
                  fontFamily="PretendardRegular"
                  fontColor={theme.colors.blackColor}
                  bgColor={theme.colors.whiteColor}
                  border={`${theme.colors.ultraLightGrayBgColor} 1px solid`}
                  onClick={() => router.push(`/${paths.LOGIN}`)}
                  borderRadius={0}
                />
              </>
            )}
          </F.SearchArea>
        )}
      </AuthWrapper>
    </Wrapper>
  );
};

export default Login;
