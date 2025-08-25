import { useState, useEffect } from "react";
import { useReactiveVar } from "@apollo/client";
import { dentalInfoVar } from "@store/index";
import { isMobile } from "@utils/commons";

type CoordsType = {
  lat: number;
  lng: number;
};

const KAKAO_MAP_URL = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_APP_KEY}&libraries=services,clusterer&autoload=false`;

export const useKakaoMap = () => {
  const dentalInfo = useReactiveVar(dentalInfoVar);
  const [coords, setCoords] = useState<CoordsType>({
    lat: 33.450701,
    lng: 126.570667,
  });
  const [sendAddressModal, setSendAddressModal] = useState(false);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = KAKAO_MAP_URL;
    script.async = true;

    const onLoadMap = () => {
      window.kakao?.maps?.load(() => {
        const { kakao } = window;
        const geocoder = new kakao.maps.services.Geocoder();

        if (dentalInfo.hospAddr) {
          geocoder.addressSearch(
            dentalInfo.hospAddr,
            (result: any, status: string) => {
              if (status === kakao.maps.services.Status.OK) {
                setCoords({
                  lat: result[0].y,
                  lng: result[0].x,
                });
              }
            }
          );
        }
      });
    };

    script.addEventListener("load", onLoadMap);
    document.head.appendChild(script);

    return () => {
      script.removeEventListener("load", onLoadMap);
      document.head.removeChild(script);
    };
  }, [dentalInfo]);

  const handleOpenKaKaoMap = () => {
    if (isMobile()) {
      window.location.href = `kakaomap://look?p=${coords.lat},${coords.lng}`;
    } else {
      window.open(
        `https://map.kakao.com/link/search/${dentalInfo.hospAddr}`,
        "_blank"
      );
    }
  };

  return {
    coords,
    sendAddressModal,
    setSendAddressModal,
    handleOpenKaKaoMap,
  };
};
