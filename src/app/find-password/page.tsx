"use client";
import { useRouter } from "next/navigation";
import { useState, KeyboardEvent } from "react";
import { toast } from "react-toastify";

import { paths } from "@lib/paths";
import { onChangeEventType } from "@utils/types";
import { onlyNumber, isEmail } from "@utils/commons";

import {
  Wrapper,
  AuthWrapper,
  AuthTitle,
  AuthDescription,
} from "@components/share/commons/commons.style";
import StyledInput from "@components/styled/StyledInput";
import StyledButton from "@components/styled/StyledButton";

const FindPassword = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [checkPhoneNum, setCheckPhoneNum] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
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
      setCheckPhoneNum(true);
    } catch (err) {
      console.info(err);
    }
  };

  const onSubmit = async () => {
    const { email, cellphone, authNum } = inputs;

    if (!isEmail(email)) {
      toast.error("이메일을 정확히 입력해주세요.");
      return;
    }
    if (cellphone.length < 11) {
      toast.error("휴대폰 번호를 입력해주세요.");
      return;
    }
    if (!authNum) {
      toast.error("인증번호를 입력해주세요.");
      return;
    }
    setIsLoading(true);
    try {
      toast.info("1회용 비밀번호를 발급했습니다.");
      router.push(`/${paths.LOGIN}`);
    } catch (err) {
      console.info(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <AuthWrapper>
        <AuthTitle>비밀번호를 잊으셨나요?</AuthTitle>
        <AuthDescription>
          이메일과 휴대폰 번호, 인증번호를 입력해주세요
        </AuthDescription>
        <StyledInput
          name="email"
          value={inputs.email}
          onChange={onChange}
          placeholder="이메일"
          margin="0 0 8px"
        />
        <StyledInput
          name="cellphone"
          value={inputs.cellphone}
          onChange={onChange}
          onClick={handleCheckCellphone}
          placeholder="휴대폰 번호"
          maxLength={11}
          margin="0 0 8px"
          buttonTitle="인증번호"
          padding="14px 100px 14px 12px"
          disabled={checkPhoneNum}
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
          title="1회용 비밀번호 발급하기"
          onClick={onSubmit}
          loading={isLoading}
          fontSize={18}
          fontFamily="PretendardSemiBold"
        />
      </AuthWrapper>
    </Wrapper>
  );
};

export default FindPassword;
