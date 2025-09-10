"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect, KeyboardEvent, MouseEvent } from "react";
import { toast } from "react-toastify";

import * as J from "./join.style";
import theme from "@styles/theme";
import { paths } from "@lib/paths";
import { onChangeEventType } from "@utils/types";
import { validateJoin } from "@utils/validations";

import {
  Wrapper,
  AuthWrapper,
  AuthTitle,
  FlexBox,
} from "@components/share/commons/commons.style";
import StyledSelect from "@components/styled/StyledSelect";
import StyledInput from "@components/styled/StyledInput";
import StyledPassword from "@components/styled/StyledPassword";
import StyledButton from "@components/styled/StyledButton";
import StyledBirthdayCalendar from "@components/styled/StyledBirthdayCalendar";
import StyledPolicyCheckbox from "@components/styled/StyledPolicyCheckbox";
import StyledPostcode from "@components/styled/StyledPostcode";
import { isEmail } from "@utils/commons";

const Login = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [checkInfo, setCheckInfo] = useState<Record<string, boolean>>({
    email: false,
    cellphone: false,
  });
  const [togglePolicy, setTogglePolicy] = useState<Record<string, boolean>>({
    checkAll: false,
    privacy: false,
    service: false,
  });
  const [inputs, setInputs] = useState<Record<string, string>>({
    nationality: "선택",
    email: "",
    authEmailNum: "",
    password: "",
    passwordConfirm: "",
    name: "",
    cellphone: "",
    authPhoneNum: "",
    zipcode: "",
    address: "",
    addressDetail: "",
    gender: "선택",
  });

  const onChange = (e: onChangeEventType) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value,
    });
  };

  // 중복확인 & 인증
  const handleCheckOverlap = (e: MouseEvent<HTMLButtonElement>) => {
    const { name } = e.currentTarget;
    if (name === "email") {
      if (!isEmail(inputs.email))
        return toast.error("이메일을 정확히 입력해주세요.");
    }
    if (name === "cellphone") {
      if (inputs.cellphone.length < 11)
        return toast.error("휴대폰번호를 정확히 입력해주세요.");
    }
    try {
      setCheckInfo((prev) => {
        return {
          ...prev,
          [name]: !prev[name],
        };
      });
      toast.success("인증번호를 전송했습니다.");
    } catch (err) {
      console.error(err);
    }
  };

  // 약관동의
  const handleTogglePolicy = (e: onChangeEventType) => {
    const { name } = e.target;
    if (name === "checkAll") {
      return setTogglePolicy((prev) => {
        return {
          checkAll: !prev[name],
          privacy: !prev[name],
          service: !prev[name],
        };
      });
    }
    if (name === "privacy") {
      return setTogglePolicy((prev) => {
        return {
          ...prev,
          [name]: !prev[name],
          checkAll: !prev[name] && prev.service ? true : false,
        };
      });
    }
    if (name === "service") {
      return setTogglePolicy((prev) => {
        return {
          ...prev,
          [name]: !prev[name],
          checkAll: !prev[name] && prev.privacy ? true : false,
        };
      });
    }
  };

  const onSubmit = async () => {
    if (!validateJoin(inputs, birthday, checkInfo)) return;

    setIsLoading(true);
    try {
      toast.success("회원가입이 완료되었습니다.");
      router.push(`/`);
    } catch (err) {
      console.info(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Wrapper>
      <AuthWrapper>
        <AuthTitle $margin="0 0 48px">락앤런 회원가입</AuthTitle>
        <StyledSelect
          title="국적"
          name="nationality"
          value={inputs.nationality}
          options={[
            { title: "선택", value: "선택" },
            { title: "대한민국", value: 1 },
          ]}
          onChange={onChange}
          placeholder="선택"
          margin="0 0 20px"
          COLUMN
          DATA_VALUE
        />
        <StyledInput
          title="이메일(아이디)"
          name="email"
          value={inputs.email}
          onChange={onChange}
          placeholder="이메일을 입력해주세요"
          onClick={handleCheckOverlap}
          margin="0 0 8px"
          buttonTitle="인증번호"
          padding="14px 100px 14px 12px"
          disabled={checkInfo.email}
          BUTTON
        />
        <StyledInput
          name="authEmailNum"
          value={inputs.authEmailNum}
          onChange={onChange}
          placeholder="6자리 인증번호"
          maxLength={6}
          margin="0 0 20px"
        />
        <StyledPassword
          name="password"
          title="비밀번호"
          value={inputs.password}
          onChange={onChange}
          placeholder="비밀번호를 입력해주세요"
          margin="0 0 8px"
          ICON={false}
        />
        <StyledPassword
          name="passwordConfirm"
          value={inputs.passwordConfirm}
          onChange={onChange}
          placeholder="비밀번호 재입력"
          margin="0 0 20px"
          ICON={false}
        />
        <StyledInput
          title="이름"
          name="name"
          value={inputs.name}
          onChange={onChange}
          placeholder="이름을 입력해주세요"
          maxLength={20}
          margin="0 0 20px"
        />
        <StyledInput
          title="휴대폰번호"
          name="cellphone"
          value={inputs.cellphone}
          onChange={onChange}
          onClick={handleCheckOverlap}
          placeholder="휴대폰번호를 입력해주세요"
          maxLength={11}
          margin="0 0 8px"
          buttonTitle="인증번호"
          padding="14px 100px 14px 12px"
          disabled={checkInfo.cellphone}
          BUTTON
        />
        <StyledInput
          name="authPhoneNum"
          value={inputs.authPhoneNum}
          onChange={onChange}
          placeholder="6자리 인증번호"
          maxLength={6}
          margin="0 0 20px"
        />
        <StyledBirthdayCalendar
          title="생년월일"
          value={birthday}
          onChange={(date) => setBirthday(date as Date)}
          placeholder="연도. 월. 일"
          margin="0 0 20px"
          COLUMN
        />
        <StyledPostcode
          value={inputs.address}
          setInputs={setInputs}
          borderRadius={0}
          margin="0 0 8px"
        />
        <StyledInput
          name="addressDetail"
          value={inputs.addressDetail}
          onChange={onChange}
          placeholder="상세주소"
          maxLength={80}
          margin="0 0 20px"
          borderRadius={0}
        />
        <StyledSelect
          title="성별"
          name="gender"
          value={inputs.gender}
          options={[
            { title: "선택", value: "선택" },
            { title: "남성", value: 1 },
            { title: "여성", value: 2 },
          ]}
          onChange={onChange}
          placeholder="선택"
          margin="0 0 32px"
          COLUMN
          DATA_VALUE
        />
        <StyledPolicyCheckbox
          checkboxId="policyAll"
          name="checkAll"
          label="약관 전체 동의"
          subLabel="(선택항목 포함)"
          value={false}
          checked={togglePolicy.checkAll}
          onChange={handleTogglePolicy}
          margin="0 0 20px"
        />
        <StyledPolicyCheckbox
          checkboxId="policy1"
          name="privacy"
          label="[필수] 개인정보 수집·이용 동의"
          value={false}
          checked={togglePolicy.privacy}
          onChange={handleTogglePolicy}
          onClick={() => {}}
          margin="0 0 16px"
          OPTIONS
        />
        <StyledPolicyCheckbox
          checkboxId="policy2"
          name="service"
          label="[필수] 서비스 이용 약관 동의"
          value={false}
          checked={togglePolicy.service}
          onChange={handleTogglePolicy}
          onClick={() => {}}
          OPTIONS
        />
        <StyledButton
          title="회원가입하기"
          margin="32px 0 180px"
          width={343}
          fontSize={14}
          onClick={onSubmit}
          borderRadius={0}
          disabled={!togglePolicy.checkAll}
        />
      </AuthWrapper>
    </Wrapper>
  );
};

export default Login;
