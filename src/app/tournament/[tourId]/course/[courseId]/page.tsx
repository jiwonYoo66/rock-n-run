"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

import * as A from "./agreement.style";
import theme from "@styles/theme";
import { paths } from "@lib/paths";
import { useWindowSize } from "@hooks/useWindowSize";

import { Wrapper, FlexBox } from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";
import Breadcrumbs from "@components/layout/breadcrumbs/Breadcrumbs";
import StyledButton from "@components/styled/StyledButton";
import { toast } from "react-toastify";

const Agreement = () => {
  const router = useRouter();
  const { width } = useWindowSize();
  const { tourId, courseId } = useParams();
  const [checkAll, setCheckAll] = useState(false);
  const [checkPolicy, setCheckPolicy] = useState<Record<string, boolean>>({
    policy1: false,
    policy2: false,
    marketing: false,
  });

  useEffect(() => {
    if (
      Object.values(checkPolicy).filter((data) => data === true).length === 3
    ) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [checkPolicy]);

  const onChangeAll = () => {
    setCheckAll((prev) => !prev);
    if (checkAll) {
      setCheckPolicy({
        policy1: false,
        policy2: false,
        marketing: false,
      });
    } else {
      setCheckPolicy({
        policy1: true,
        policy2: true,
        marketing: true,
      });
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setCheckPolicy((prev) => {
      return {
        ...prev,
        [name]: !prev[name],
      };
    });
  };

  const onSubmit = () => {
    const { policy1, policy2 } = checkPolicy;
    if (!policy1 || !policy2)
      return toast.error("필수 항목을 모두 동의해주세요.");
    router.push(
      `/${paths.TOURNAMENT}/${tourId}/${paths.COURSE}/${courseId}/${paths.REGISTER}`
    );
  };
  return (
    <Wrapper>
      <Headline title={"장수 쿨밸리 트레일레이스"} />
      <Breadcrumbs step={2} />
      <A.BorderBox>
        <A.Box>
          <A.Input
            id="agreeAll"
            type="checkbox"
            name="agreeAll"
            onChange={onChangeAll}
            checked={checkAll}
          />
          <A.Label
            htmlFor="agreeAll"
            $fontFamily="PretendardSemiBold"
            $top={width! >= 1080 ? 8 : 6}
            $fontSize={width! >= 1080 ? 22 : 18}
          >
            모두 동의합니다
          </A.Label>
        </A.Box>
      </A.BorderBox>
      <FlexBox $flexDirection="column" $gap={20}>
        <A.BorderBox $grayBg>
          <A.Box>
            <A.Input
              id="policy1"
              type="checkbox"
              name="policy1"
              // value={value}
              onChange={onChange}
              checked={checkPolicy.policy1}
            />
            <A.Label htmlFor="policy1">
              [필수] 대회 참가 서약에 관한 동의
            </A.Label>
          </A.Box>
        </A.BorderBox>
        <A.AgreementContent>
          <A.Agreement>
            1. 대회의 성격 및 참가 자격 초보자들이 하기 좋은 코스이며
            트레일러닝이 첫 입문으로 많이 선택감사원은 세입·세출의 결산을 매년
            검사하여 대통령과 차년도국회에 그 결과를 보고하여야 한다. 정당의
            목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에
            그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여
            해산된다. 제2항과 제3항의 처분에 대하여는 법원에 제소할 수 없다.
            대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다.
            선거운동은 각급 선거관리위원회의 관리하에 법률이 정하는 범위안에서
            하되, 균등한 기회가 보장되어야 한다. 국회는 의장 1인과 부의장 2인을
            선출한다. 저작자·발명가·과학기술자와 예술가의 권리는 법률로써
            보호한다. 공무원의 직무상 불법행위로 손해를 받은 국민은 법률이
            정하는 바에 의하여 국가 또는 공공단체에 정당한 배상을 청구할 수
            있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다. 국회의원이
            회기전에 체포 또는 구금된 때에는 현행범인이 아닌 한 국회의 요구가
            있으면 회기중 석방된다. 체포·구속·압수 또는 수색을 할 때에는 적법한
            절차에 따라 검사의 신청에 의하여 법관이 발부한 영장을 제시하여야
            한다. 다만, 현행범인인 경우와 장기 3년 이상의 형에 해당하는 죄를
            범하고 도피 또는 증거인멸의 염려가 있을 때에는 사후에 영장을 청구할
            수 있다. 선거에 관한 경비는 법률이 정하는 경우를 제외하고는 정당
            또는 후보자에게 부담시킬 수 없다. 공무원의 신분과 정치적 중립성은
            법률이 정하는 바에 의하여 보장된다. 모든 국민은 근로의 의무를 진다.
            국가는 근로의 의무의 내용과 조건을 민주주의원칙에 따라 법률로
            정한다. 대법원장의 임기는 6년으로 하며, 중임할 수 없다. 국가는
            농·어민과 중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과
            발전을 보장한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한
            재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다.
            가부동수인 때에는 부결된 것으로 본다. 대통령의 임기연장 또는
            중임변경을 위한 헌법개정은 그 헌법개정 제안 당시의 대통령에 대하여는
            효력이 없다.
          </A.Agreement>
        </A.AgreementContent>
        <A.BorderBox $grayBg>
          <A.Box>
            <A.Input
              id="policy2"
              type="checkbox"
              name="policy2"
              // value={value}
              onChange={onChange}
              checked={checkPolicy.policy2}
            />
            <A.Label htmlFor="policy2">
              [필수] 대회 참가 서약에 관한 동의
            </A.Label>
          </A.Box>
        </A.BorderBox>
        <A.AgreementContent>
          <A.Agreement>
            1. 대회의 성격 및 참가 자격 초보자들이 하기 좋은 코스이며
            트레일러닝이 첫 입문으로 많이 선택감사원은 세입·세출의 결산을 매년
            검사하여 대통령과 차년도국회에 그 결과를 보고하여야 한다. 정당의
            목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에
            그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여
            해산된다. 제2항과 제3항의 처분에 대하여는 법원에 제소할 수 없다.
            대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다.
            선거운동은 각급 선거관리위원회의 관리하에 법률이 정하는 범위안에서
            하되, 균등한 기회가 보장되어야 한다. 국회는 의장 1인과 부의장 2인을
            선출한다. 저작자·발명가·과학기술자와 예술가의 권리는 법률로써
            보호한다. 공무원의 직무상 불법행위로 손해를 받은 국민은 법률이
            정하는 바에 의하여 국가 또는 공공단체에 정당한 배상을 청구할 수
            있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다. 국회의원이
            회기전에 체포 또는 구금된 때에는 현행범인이 아닌 한 국회의 요구가
            있으면 회기중 석방된다. 체포·구속·압수 또는 수색을 할 때에는 적법한
            절차에 따라 검사의 신청에 의하여 법관이 발부한 영장을 제시하여야
            한다. 다만, 현행범인인 경우와 장기 3년 이상의 형에 해당하는 죄를
            범하고 도피 또는 증거인멸의 염려가 있을 때에는 사후에 영장을 청구할
            수 있다. 선거에 관한 경비는 법률이 정하는 경우를 제외하고는 정당
            또는 후보자에게 부담시킬 수 없다. 공무원의 신분과 정치적 중립성은
            법률이 정하는 바에 의하여 보장된다. 모든 국민은 근로의 의무를 진다.
            국가는 근로의 의무의 내용과 조건을 민주주의원칙에 따라 법률로
            정한다. 대법원장의 임기는 6년으로 하며, 중임할 수 없다. 국가는
            농·어민과 중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과
            발전을 보장한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한
            재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다.
            가부동수인 때에는 부결된 것으로 본다. 대통령의 임기연장 또는
            중임변경을 위한 헌법개정은 그 헌법개정 제안 당시의 대통령에 대하여는
            효력이 없다.
          </A.Agreement>
        </A.AgreementContent>
        <A.BorderBox $grayBg>
          <A.Box>
            <A.Input
              id="marketing"
              type="checkbox"
              name="marketing"
              // value={value}
              onChange={onChange}
              checked={checkPolicy.marketing}
            />
            <A.Label htmlFor="marketing">
              [선택] 마케팅 및 홍보 개인정보 활용 동의
            </A.Label>
          </A.Box>
        </A.BorderBox>
        <A.AgreementContent>
          <A.Agreement>
            1. 대회의 성격 및 참가 자격 초보자들이 하기 좋은 코스이며
            트레일러닝이 첫 입문으로 많이 선택감사원은 세입·세출의 결산을 매년
            검사하여 대통령과 차년도국회에 그 결과를 보고하여야 한다. 정당의
            목적이나 활동이 민주적 기본질서에 위배될 때에는 정부는 헌법재판소에
            그 해산을 제소할 수 있고, 정당은 헌법재판소의 심판에 의하여
            해산된다. 제2항과 제3항의 처분에 대하여는 법원에 제소할 수 없다.
            대통령은 국민의 보통·평등·직접·비밀선거에 의하여 선출한다.
            선거운동은 각급 선거관리위원회의 관리하에 법률이 정하는 범위안에서
            하되, 균등한 기회가 보장되어야 한다. 국회는 의장 1인과 부의장 2인을
            선출한다. 저작자·발명가·과학기술자와 예술가의 권리는 법률로써
            보호한다. 공무원의 직무상 불법행위로 손해를 받은 국민은 법률이
            정하는 바에 의하여 국가 또는 공공단체에 정당한 배상을 청구할 수
            있다. 이 경우 공무원 자신의 책임은 면제되지 아니한다. 국회의원이
            회기전에 체포 또는 구금된 때에는 현행범인이 아닌 한 국회의 요구가
            있으면 회기중 석방된다. 체포·구속·압수 또는 수색을 할 때에는 적법한
            절차에 따라 검사의 신청에 의하여 법관이 발부한 영장을 제시하여야
            한다. 다만, 현행범인인 경우와 장기 3년 이상의 형에 해당하는 죄를
            범하고 도피 또는 증거인멸의 염려가 있을 때에는 사후에 영장을 청구할
            수 있다. 선거에 관한 경비는 법률이 정하는 경우를 제외하고는 정당
            또는 후보자에게 부담시킬 수 없다. 공무원의 신분과 정치적 중립성은
            법률이 정하는 바에 의하여 보장된다. 모든 국민은 근로의 의무를 진다.
            국가는 근로의 의무의 내용과 조건을 민주주의원칙에 따라 법률로
            정한다. 대법원장의 임기는 6년으로 하며, 중임할 수 없다. 국가는
            농·어민과 중소기업의 자조조직을 육성하여야 하며, 그 자율적 활동과
            발전을 보장한다. 국회는 헌법 또는 법률에 특별한 규정이 없는 한
            재적의원 과반수의 출석과 출석의원 과반수의 찬성으로 의결한다.
            가부동수인 때에는 부결된 것으로 본다. 대통령의 임기연장 또는
            중임변경을 위한 헌법개정은 그 헌법개정 제안 당시의 대통령에 대하여는
            효력이 없다.
          </A.Agreement>
        </A.AgreementContent>
      </FlexBox>

      <StyledButton
        title="계속 진행하기"
        onClick={onSubmit}
        height={68}
        fontSize={width! >= 1080 ? 22 : 18}
        fontFamily="PretendardSemiBold"
        margin="32px 0 130px"
      />
    </Wrapper>
  );
};

export default Agreement;
