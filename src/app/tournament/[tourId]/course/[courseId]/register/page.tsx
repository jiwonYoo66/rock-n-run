"use client";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";
import { toast } from "react-toastify";

import theme from "@styles/theme";
import * as R from "./register.style";
import { paths } from "@lib/paths";
import { useWindowSize } from "@hooks/useWindowSize";
import { onlyNumber } from "@utils/commons";
import {
  validateMultipleInputs,
  validateRegisterInputs,
} from "@utils/validations";

import { Wrapper, FlexBox } from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";
import Breadcrumbs from "@components/layout/breadcrumbs/Breadcrumbs";
import StyledButton from "@components/styled/StyledButton";
import StyledInput from "@components/styled/StyledInput";
import StyledSelect from "@components/styled/StyledSelect";
import StyledBirthdayCalendar from "@components/styled/StyledBirthdayCalendar";

type Form = {
  nationality: string;
  gender: string;
  krName: string;
  engFirstName: string;
  engLastName: string;
  phone: string;
  emergencyContact: string;
  emergencyContactRelationship: string;
  email: string;
  merchandise: string;
  birthday: null | Date;
};

const initialForm: Form = {
  nationality: "국적",
  gender: "성별",
  krName: "",
  engFirstName: "",
  engLastName: "",
  phone: "",
  emergencyContact: "",
  emergencyContactRelationship: "",
  email: "",
  merchandise: "기념품을 선택해주세요.",
  birthday: null,
};

const Register = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  const { tourId, courseId } = useParams();
  const [individual, setIndividual] = useState(true);
  const [group, setGroup] = useState(false);
  const [inputs, setInputs] = useState<Form>({ ...initialForm });
  const [multipleInputs, setMultipleInputs] = useState<Form[]>([
    { ...initialForm },
  ]);

  const selectType = (e: ChangeEvent<HTMLInputElement>) => {
    const { id } = e.target;
    if (id === "individual") {
      setIndividual(true);
      setGroup(false);
    } else {
      setGroup(true);
      setIndividual(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "emergencyContact") {
      return setInputs((prev) => {
        return {
          ...prev,
          [name]: onlyNumber(value),
        };
      });
    }
    setInputs((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  // 공통 업데이트 유틸
  const updateAt = (idx: number, patch: Partial<Form>) => {
    setMultipleInputs((prev) =>
      prev.map((item, i) => (i === idx ? { ...item, ...patch } : item))
    );
  };
  // onChange (calendar 공용)
  const onMultiBirthdayChange = (date: Date, index: number) => {
    console.log(date);
    updateAt(index, { birthday: date } as Partial<Form>);
  };

  // onChange (input/select 공용)
  const onMultiFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    if (name === "phone" || name === "emergencyContact") {
      return updateAt(index, {
        [name]: onlyNumber(value),
      } as Partial<Form>);
    }
    updateAt(index, { [name]: value } as Partial<Form>);
  };

  const onSubmit = () => {
    if (!validateRegisterInputs(inputs)) return;
    if (group && !validateMultipleInputs(multipleInputs)) return;
  };

  return (
    <Wrapper>
      <Headline title={"장수 쿨밸리 트레일레이스"} />
      <Breadcrumbs step={3} />
      <FlexBox $gap={20} $margin="32px 0">
        <R.Box>
          <R.Input
            id="individual"
            type="radio"
            name="type"
            onChange={selectType}
            checked={individual}
          />
          <R.Label
            htmlFor="individual"
            $fontFamily="PretendardSemiBold"
            $top={width! >= 1080 ? 8 : 6}
            $fontSize={width! >= 1080 ? 24 : 18}
          >
            개인
          </R.Label>
        </R.Box>
        <R.Box>
          <R.Input
            id="group"
            type="radio"
            name="type"
            onChange={selectType}
            checked={group}
          />
          <R.Label
            htmlFor="group"
            $fontFamily="PretendardSemiBold"
            $top={width! >= 1080 ? 8 : 6}
            $fontSize={width! >= 1080 ? 24 : 18}
          >
            단체
          </R.Label>
        </R.Box>
      </FlexBox>
      <R.SectionHeader>기본정보입력</R.SectionHeader>
      <R.Section>
        <R.InputWrapper>
          <StyledSelect
            name="nationality"
            value={inputs.nationality}
            options={[
              { title: "국적", value: "국적" },
              { title: "대한민국", value: 1 },
            ]}
            onChange={onChange}
            placeholder="국적"
            height={64}
            fontSize={width! >= 1080 ? 20 : 16}
            fontFamily="PretendardMedium"
            COLUMN
            DATA_VALUE
          />
        </R.InputWrapper>
        <R.InputWrapper>
          <StyledSelect
            name="gender"
            value={inputs.gender}
            options={[
              { title: "성별", value: "성별" },
              { title: "남성", value: 1 },
              { title: "여성", value: 2 },
            ]}
            onChange={onChange}
            placeholder="성별"
            height={64}
            fontSize={width! >= 1080 ? 20 : 16}
            fontFamily="PretendardMedium"
            COLUMN
            DATA_VALUE
          />
        </R.InputWrapper>
        <R.InputWrapper>
          <StyledInput
            name="krName"
            value={inputs.krName}
            onChange={onChange}
            placeholder="한글이름"
            height={64}
            fontSize={width! >= 1080 ? 20 : 16}
            fontFamily="PretendardMedium"
            maxLength={50}
          />
        </R.InputWrapper>
        <R.EngNameWrapper>
          <StyledInput
            name="engFirstName"
            value={inputs.engFirstName}
            onChange={onChange}
            placeholder="영문 이름(First Name)"
            height={64}
            fontSize={width! >= 1080 ? 20 : 16}
            fontFamily="PretendardMedium"
            maxLength={50}
          />
          <StyledInput
            name="engLastName"
            value={inputs.engLastName}
            onChange={onChange}
            placeholder="영문 성(Last Name)"
            height={64}
            fontSize={width! >= 1080 ? 20 : 16}
            fontFamily="PretendardMedium"
            maxLength={50}
          />
        </R.EngNameWrapper>
        <R.InputWrapper>
          <StyledBirthdayCalendar
            value={inputs.birthday}
            onChange={(date) =>
              setInputs((prev) => {
                return {
                  ...prev,
                  birthday: date as Date,
                };
              })
            }
            placeholder="생년월일"
            height={64}
            fontSize={width! >= 1080 ? 20 : 16}
            fontFamily="PretendardMedium"
            COLUMN
            CALENDAR
          />
        </R.InputWrapper>
        <R.InputWrapper>
          <StyledInput
            name="emergencyContact"
            value={inputs.emergencyContact}
            onChange={onChange}
            placeholder="비상 연락처"
            height={64}
            fontSize={width! >= 1080 ? 20 : 16}
            fontFamily="PretendardMedium"
            maxLength={11}
          />
        </R.InputWrapper>
        <R.InputWrapper>
          <StyledInput
            name="phone"
            value={inputs.phone}
            onChange={onChange}
            placeholder="전화번호"
            height={64}
            fontSize={width! >= 1080 ? 20 : 16}
            fontFamily="PretendardMedium"
            maxLength={11}
          />
        </R.InputWrapper>
        <R.InputWrapper>
          <StyledInput
            name="emergencyContactRelationship"
            value={inputs.emergencyContactRelationship}
            onChange={onChange}
            placeholder="비상 연락처 관계"
            height={64}
            fontSize={width! >= 1080 ? 20 : 16}
            fontFamily="PretendardMedium"
          />
        </R.InputWrapper>
        <R.InputWrapper>
          <StyledInput
            name="email"
            value={inputs.email}
            onChange={onChange}
            placeholder="이메일 주소"
            height={64}
            fontSize={width! >= 1080 ? 20 : 16}
            fontFamily="PretendardMedium"
            maxLength={50}
          />
        </R.InputWrapper>
      </R.Section>
      <R.SectionHeader>기념품 선택</R.SectionHeader>
      <R.Section>
        <R.InputWrapper>
          <StyledSelect
            name="merchandise"
            value={inputs.merchandise}
            options={[
              {
                title: "기념품을 선택해주세요.",
                value: "기념품을 선택해주세요.",
              },
              { title: "메달", value: 1 },
              { title: "티셔츠", value: 2 },
            ]}
            onChange={onChange}
            placeholder="기념품을 선택해주세요."
            height={64}
            fontSize={width! >= 1080 ? 20 : 16}
            fontFamily="PretendardMedium"
            COLUMN
            DATA_VALUE
          />
        </R.InputWrapper>
        <R.InputWrapper>
          <StyledButton
            title="사이즈 가이드 보기"
            onClick={() => alert("clicked")}
            height={64}
            fontSize={width! >= 1080 ? 20 : 16}
            fontFamily="PretendardMedium"
            bgColor={theme.colors.whiteColor}
            border={`${theme.colors.lightGrayBorderColor} 1px solid`}
            fontColor={theme.colors.blackColor}
          />
        </R.InputWrapper>
      </R.Section>
      {group && (
        <>
          <FlexBox $justifyContent="flex-end" $margin="60px 0 16px">
            <R.ExcelButton>
              엑셀 양식 다운받기
              <Image
                src={"/assets/icons/icon_excel.svg"}
                alt="excel icon"
                width={24}
                height={24}
              />
            </R.ExcelButton>
          </FlexBox>
          <R.SectionHeader>단체 정보 입력</R.SectionHeader>
          {multipleInputs.map((data: Form, index: number) => (
            <FlexBox $alignItems="flex-start" $gap={44} key={index}>
              <R.InputTitle>참가자 {index + 1}</R.InputTitle>
              <R.GroupInputWrapper>
                <R.Section $margin="32px 0 24px">
                  <R.InputMobileTitle>참가자 {index + 1}</R.InputMobileTitle>
                  <R.InputWrapper>
                    <StyledSelect
                      name="nationality"
                      value={data.nationality}
                      options={[
                        { title: "국적", value: "국적" },
                        { title: "대한민국", value: 1 },
                      ]}
                      onChange={(e) => onMultiFormChange(e, index)}
                      placeholder="국적"
                      height={64}
                      fontSize={width! >= 1080 ? 20 : 16}
                      fontFamily="PretendardMedium"
                      COLUMN
                      DATA_VALUE
                    />
                  </R.InputWrapper>
                  <R.InputWrapper>
                    <StyledSelect
                      name="gender"
                      value={data.gender}
                      options={[
                        { title: "성별", value: "성별" },
                        { title: "남성", value: 1 },
                        { title: "여성", value: 2 },
                      ]}
                      onChange={(e) => onMultiFormChange(e, index)}
                      placeholder="성별"
                      height={64}
                      fontSize={width! >= 1080 ? 20 : 16}
                      fontFamily="PretendardMedium"
                      COLUMN
                      DATA_VALUE
                    />
                  </R.InputWrapper>
                  <R.InputWrapper>
                    <StyledInput
                      name="krName"
                      value={data.krName}
                      onChange={(e) => onMultiFormChange(e, index)}
                      placeholder="한글이름"
                      height={64}
                      fontSize={width! >= 1080 ? 20 : 16}
                      fontFamily="PretendardMedium"
                      maxLength={50}
                    />
                  </R.InputWrapper>
                  <R.EngNameWrapper>
                    <StyledInput
                      name="engFirstName"
                      value={data.engFirstName}
                      onChange={(e) => onMultiFormChange(e, index)}
                      placeholder="영문 이름(First Name)"
                      height={64}
                      fontSize={width! >= 1080 ? 20 : 16}
                      fontFamily="PretendardMedium"
                      maxLength={50}
                    />
                    <StyledInput
                      name="engLastName"
                      value={data.engLastName}
                      onChange={(e) => onMultiFormChange(e, index)}
                      placeholder="영문 성(Last Name)"
                      height={64}
                      fontSize={width! >= 1080 ? 20 : 16}
                      fontFamily="PretendardMedium"
                      maxLength={50}
                    />
                  </R.EngNameWrapper>
                  <R.InputWrapper>
                    <StyledBirthdayCalendar
                      value={data.birthday}
                      onChange={(date) =>
                        onMultiBirthdayChange(date as Date, index)
                      }
                      placeholder="생년월일"
                      height={64}
                      fontSize={width! >= 1080 ? 20 : 16}
                      fontFamily="PretendardMedium"
                      COLUMN
                      CALENDAR
                    />
                  </R.InputWrapper>
                  <R.InputWrapper>
                    <StyledInput
                      name="emergencyContact"
                      value={data.emergencyContact}
                      onChange={(e) => onMultiFormChange(e, index)}
                      placeholder="비상 연락처"
                      height={64}
                      fontSize={width! >= 1080 ? 20 : 16}
                      fontFamily="PretendardMedium"
                      maxLength={11}
                    />
                  </R.InputWrapper>
                  <R.InputWrapper>
                    <StyledInput
                      name="phone"
                      value={data.phone}
                      onChange={(e) => onMultiFormChange(e, index)}
                      placeholder="전화번호"
                      height={64}
                      fontSize={width! >= 1080 ? 20 : 16}
                      fontFamily="PretendardMedium"
                      maxLength={11}
                    />
                  </R.InputWrapper>
                  <R.InputWrapper>
                    <StyledInput
                      name="emergencyContactRelationship"
                      value={data.emergencyContactRelationship}
                      onChange={(e) => onMultiFormChange(e, index)}
                      placeholder="비상 연락처 관계"
                      height={64}
                      fontSize={width! >= 1080 ? 20 : 16}
                      fontFamily="PretendardMedium"
                    />
                  </R.InputWrapper>
                  <R.InputWrapper>
                    <StyledInput
                      name="email"
                      value={data.email}
                      onChange={(e) => onMultiFormChange(e, index)}
                      placeholder="이메일 주소"
                      height={64}
                      fontSize={width! >= 1080 ? 20 : 16}
                      fontFamily="PretendardMedium"
                      maxLength={50}
                    />
                  </R.InputWrapper>
                </R.Section>
                <R.Line />
                <R.Section $margin="24px 0 32px">
                  <R.InputWrapper>
                    <StyledSelect
                      name="merchandise"
                      value={data.merchandise}
                      options={[
                        {
                          title: "기념품을 선택해주세요.",
                          value: "기념품을 선택해주세요.",
                        },
                        { title: "메달", value: 1 },
                        { title: "티셔츠", value: 2 },
                      ]}
                      onChange={(e) => onMultiFormChange(e, index)}
                      placeholder="기념품을 선택해주세요."
                      height={64}
                      fontSize={width! >= 1080 ? 20 : 16}
                      fontFamily="PretendardMedium"
                      COLUMN
                      DATA_VALUE
                    />
                  </R.InputWrapper>
                </R.Section>
              </R.GroupInputWrapper>
            </FlexBox>
          ))}
          <R.ButtonWrapper>
            <R.InputWrapper>
              <StyledButton
                title="참가자 추가하기+"
                onClick={() =>
                  setMultipleInputs((prev) => [...prev, initialForm])
                }
                // onClick={() => setMembers((prev) => ++prev)}
                height={64}
                fontSize={width! >= 1080 ? 20 : 16}
                fontFamily="PretendardSemiBold"
                bgColor={theme.colors.whiteColor}
                border={`${theme.colors.blackColor} 1px solid`}
                fontColor={theme.colors.blackColor}
              />
            </R.InputWrapper>
            <R.InputWrapper>
              <StyledButton
                title="엑셀 업로드하기"
                onClick={() => alert("clicked")}
                height={64}
                fontSize={width! >= 1080 ? 20 : 16}
                fontFamily="PretendardSemiBold"
                bgColor={theme.colors.whiteColor}
                border={`${theme.colors.blackColor} 1px solid`}
                fontColor={theme.colors.blackColor}
              />
            </R.InputWrapper>
          </R.ButtonWrapper>
        </>
      )}
      <StyledButton
        title={`${(80000).toLocaleString()}원 결제하기`}
        onClick={onSubmit}
        height={68}
        fontSize={width! >= 1080 ? 22 : 18}
        fontFamily="PretendardSemiBold"
        margin="32px 0 0"
      />
      <R.Description>1인 1계정 원칙으로 대리신청이 불가합니다.</R.Description>
    </Wrapper>
  );
};

export default Register;
