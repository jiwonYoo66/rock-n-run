"use client";
import { useRouter, useParams } from "next/navigation";
import styled, { css } from "styled-components";

import theme from "@styles/theme";
import { useWindowSize } from "@hooks/useWindowSize";

import { FlexBox } from "@components/share/commons/commons.style";
import StyledButton from "@components/styled/StyledButton";
import { paths } from "@lib/paths";

const CourseCard = ({ data, index }: any) => {
  const router = useRouter();
  const { tourId } = useParams();
  const { width } = useWindowSize();
  return (
    <Card>
      <FlexBox
        $justifyContent="space-between"
        $alignItems="flex-start"
        $margin="0 0 32px"
      >
        <Type className="notranslate">20K</Type>
        <Price>{(80000).toLocaleString()}원</Price>
      </FlexBox>
      <FlexBox $flexDirection="column" $alignItems="flex-start" $gap={20}>
        <Description>
          초보자들이 하기 좋은 코스이며 트레일러닝이 첫 입문으로 많이 선택하는
          락앤런20K 코스
        </Description>
        <TagList>
          {[
            { title: "20km", value: 1 },
            { title: "초보자", value: 2 },
            { title: "단체", value: 3 },
          ].map((data, index) => (
            <Tag key={`${data?.value}-${index}`}>{data?.title}</Tag>
          ))}
        </TagList>
        <Description>
          현재 <BoldText>{56}명</BoldText>이 신청하였습니다.
          <br />
          참가신청을 바로 진행해주세요.
        </Description>
      </FlexBox>
      <StyledButton
        title={index === 3 ? "예약마감" : "참가신청하러가기"} //TODO: 임시
        onClick={() =>
          router.push(`/${paths.TOURNAMENT}/${tourId}/${paths.COURSE}/${index}`)
        } //TODO: 임시 index 처리
        margin="32px 0 0"
        height={60}
        fontSize={width! >= 1080 ? 22 : 18}
        fontFamily="PretendardSemiBold"
        disabled={index === 3} //TODO: 임시
      />
    </Card>
  );
};

export default CourseCard;

const Card = styled.li`
  padding: 20px;
  width: 100%;
  border: ${theme.colors.blackColor} 1px solid;
`;

const Type = styled.h2`
  ${theme.typography.largeTitle}
  font-family: Tenada, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.emphasizedTitle}
  }
`;

const Price = styled.span`
  ${theme.typography.caption}
  ${theme.devices.desktop} {
    ${theme.typography.headline2}
  }
`;

const Description = styled.div`
  ${theme.typography.caption}
  width: 100%;
  ${theme.devices.desktop} {
    ${theme.typography.headline2}
  }
`;
const TagList = styled.ul`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;
const Tag = styled.li`
  ${theme.typography.caption}
  display: inline-block;
  padding: 10px;
  background-color: ${theme.colors.ultraLightGrayBgColor};
  cursor: pointer;
  ${theme.devices.desktop} {
    ${theme.typography.headline2}
  }
`;
const BoldText = styled.span`
  ${theme.typography.caption}
  font-family: PretendardBold, sans-serif;
  ${theme.devices.desktop} {
    ${theme.typography.headline2}
  }
`;
