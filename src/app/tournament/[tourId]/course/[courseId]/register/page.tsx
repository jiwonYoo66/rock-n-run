"use client";
import { useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { ChangeEvent, useState } from "react";

import theme from "@styles/theme";
import { paths } from "@lib/paths";
import { useWindowSize } from "@hooks/useWindowSize";

import { Wrapper, FlexBox } from "@components/share/commons/commons.style";
import Headline from "@components/layout/headline/Headline";
import Breadcrumbs from "@components/layout/breadcrumbs/Breadcrumbs";
import StyledButton from "@components/styled/StyledButton";
import { toast } from "react-toastify";

const Register = () => {
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

      <StyledButton
        title={`${(80000).toLocaleString()}원 결제하기`}
        onClick={onSubmit}
        height={68}
        fontSize={width! >= 1080 ? 22 : 18}
        fontFamily="PretendardSemiBold"
        margin="32px 0 130px"
      />
    </Wrapper>
  );
};

export default Register;
