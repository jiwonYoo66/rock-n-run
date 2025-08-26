import { GraphQLError } from "graphql";
import { getYear } from "date-fns";
import { range } from "d3-array";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import { Address } from "react-daum-postcode/lib/loadPostcode";
import { deflate } from "zlib";

// 아이디 영문 및 숫자
export const isEngNumber = (word: string) => {
  const idRegex = /^[a-zA-Z0-9]+$/;
  return idRegex.test(word);
};
// 한글, 영문, 숫자만
export const isNotSpecialWord = (word: string) => {
  const regex = /^[ㄱ-ㅎ가-힣a-zA-Z0-9]+$/;
  return regex.test(word);
};
// 이메일 야부 정규식
export const isEmail = (email: string) => {
  const emailRegex =
    /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
  return emailRegex.test(email);
};
// 비밀번호 유효성 검사
export const isPasswordCheck = (password: string) => {
  const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*?_]).{8,16}$/;
  return passwordRegex.test(password);
};
// 주민등록번호 유효성 검사
export const isRrnNumber = (rrn: string) => {
  const numbers = rrn.replace(/[^0-9]/g, "");
  if (numbers.length !== 13) return false;

  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 2, 3, 4, 5];
  let sum = 0;

  for (let i = 0; i < 12; i++) {
    sum += parseInt(numbers[i], 10) * weights[i];
  }

  const checkDigit = (11 - (sum % 11)) % 10;
  return checkDigit === parseInt(numbers[12], 10);
};
// 숫자만 입력 가능
export const onlyNumber = (text: string) => {
  return text.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
};
// 휴대폰 번호 유효성 확인
export const isPhoneNumber = (number: string) => {
  const phoneRegex =
    /^\s*(?:\+?(\d{1,3})[-. (]*)?\s*((01[016789]{3})[-. )]*)?((\d{3,4})[-. ]*)+(\d{4})+\s*$/;
  if (number.length < 11) return false;
  return phoneRegex.test(number);
};

// 휴대폰 번호 하이픈
export const addHyphen = (number: string) => {
  if (number.length < 11) return false;
  return number.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
};

// 카드번호 hyphen 추가
export const insertCardNumberHyphen = (number: string) => {
  return number.replace(/(.{4})/g, "$1-").slice(0, -1);
};
// 휴대폰 번호 처음, 가운데, 끝자리 분리
export const phoneNumberReplace = (number: string) => {
  if (!isPhoneNumber(number)) return number;

  const removeHyphen = number.replace(/-/g, ""); // '-' 제거
  const phone1 = removeHyphen.substring(0, 3); // 010
  const phone2 = removeHyphen.substring(3, 7); // 0000
  const phone3 = removeHyphen.substring(7, 11); // 1234

  return [phone1, phone2, phone3];
};
// 초 -> 분으로 변환 ex) 180 -> 3:00
export const timeToString = (seconds: number) => {
  let minute = "" + Math.floor(seconds / 60);
  let dividedSec: number | string = seconds % 60;
  if (dividedSec < 10) {
    dividedSec = "0" + dividedSec;
  }
  return minute + ":" + dividedSec;
};
// Daum Postcode Callback Function
export const onCompletePostcode = (data: Address) => {
  let fullAddress = data.address;
  let extraAddress = "";

  if (data.addressType === "R") {
    if (data.bname !== "") {
      extraAddress += data.bname;
    }
    if (data.buildingName !== "") {
      extraAddress +=
        extraAddress !== "" ? `, ${data.buildingName}` : data.buildingName;
    }
    fullAddress += extraAddress !== "" ? ` (${extraAddress})` : "";
  }
  return fullAddress;
};
// pc mobile 여부
export const isMobile = () => {
  const userAgent = navigator.userAgent;

  return !!(
    userAgent.match(/Android/i) ||
    userAgent.match(/webOS/i) ||
    userAgent.match(/iPhone/i) ||
    userAgent.match(/iPad/i) ||
    userAgent.match(/iPod/i) ||
    userAgent.match(/BlackBerry/i) ||
    userAgent.match(/Windows Phone/i) ||
    /Mobi/i.test(userAgent)
  );
};
// 배열 랜덤 섞기
export const getRandomIndex = (length: number) => {
  return Math.floor(Math.random() * length);
};
// Navigator Language
export const getUserLanguage = () => {
  const language = navigator.language || "ko";

  if (language.includes("ko")) {
    return "ko";
  } else if (language.includes("en")) {
    return "en";
  } else if (language.includes("ja")) {
    return "ja";
  } else if (language.includes("zh")) {
    return "zh";
  } else {
    return "ko";
  }
};
// 모달 오픈 시 body 스크롤 제어
export const handleBodyScroll = (property: "hidden" | "initial") => {
  document.body.style.overflow = property;
};
// 유튜브 썸네일 이미지
export const getYoutubeThumbnailUrl = (url: string) => {
  let videoId = "";

  // 1. 표준 링크 처리
  if (url.includes("youtube.com/watch?v=")) {
    videoId = url.replace("https://www.youtube.com/watch?v=", "").split("&")[0];
    // split('&')[0]: 매개변수가 있는 경우 잘라내기 위함
  }
  // 2. 짧은 링크 처리
  else if (url.includes("youtu.be/")) {
    videoId = url.replace("https://youtu.be/", "").split("?")[0];
  }
  // 3. 임베드 링크 처리
  else if (url.includes("youtube.com/embed/")) {
    videoId = url.replace("https://www.youtube.com/embed/", "").split("?")[0];
  }

  // 4. 썸네일 URL 반환(videoId 없으면 빈 문자열 반환)
  return videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : "";
};

/**
 * 배열을 랜덤으로 섞는 함수입니다.
 * @param array - 랜덤으로 섞을 ISectionContents 객체의 배열
 */
export const shuffleArray = (array: any[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
// 댓글 시간 계산
export const timeCalculator = (duration: number) => {
  let timeText = "";

  if (duration <= 60) {
    timeText = "방금 전";
  } else if (duration > 60 && duration <= 3600) {
    timeText = `${Math.floor(duration / 60)}분 전`;
  } else if (duration > 3600 && duration <= 86400) {
    timeText = `${Math.floor(duration / 60 / 60)}시간 전`;
  } else if (duration > 86400 && duration <= 604800) {
    timeText = `${Math.floor(duration / 60 / 60 / 24)}일 전`;
  } else if (duration > 604800 && duration <= 2592000) {
    timeText = `${Math.floor(duration / 60 / 60 / 24 / 7)}주 전`;
  } else if (duration > 2592000 && duration <= 31536000) {
    timeText = `${Math.floor(duration / 60 / 60 / 24 / 30)}달 전`;
  } else if (duration > 31536000) {
    timeText = `${Math.floor(duration / 60 / 60 / 24 / 30 / 12)}년 전`;
  }

  return timeText;
};
/**
 * todo 년도 구하기
 * @param {number} start todo 시작년도
 * @param {number} end todo 종료년도
 * @param {string} format todo 날짜 포맷
 */
export const getYearOption = (
  start?: number,
  end?: number,
  format?: string
) => {
  let years: string[] | number[] = range(
    start || getYear(new Date()),
    end || getYear(new Date()) + 10,
    1
  );

  switch (format) {
    case "YYYY년":
      return years.map((year) => `${year}년`);
    default:
      return years;
  }
};
export const getHourOptions = () => {
  // 24시간 1시간 단위
  const hourOptions = [];

  for (let hours = 0; hours <= 23; hours++) {
    hourOptions.push(`${String(hours).padStart(2, "0")}시`);
  }
  return hourOptions;
};
export const getMinOptions = () => {
  // 15분 단위
  const minOptions = [];

  for (let min = 0; min < 60; min += 10) {
    minOptions.push(`${String(min).padStart(2, "0")}분`);
  }
  return minOptions;
};
// 시간 선택 시, 분 text 제거 및 number return
export const getTimeNumber = (value: string) => {
  return parseInt(value.substring(0, 2), 10);
};
// 날짜, 시간, 분 조합 Date String
export const getDateTime = (date: Date, hour: string, min: string) => {
  return new Date(
    dayjs(date)
      .set("h", getTimeNumber(hour))
      .set("m", getTimeNumber(min))
      .format("YYYY-MM-DD HH:mm")
  );
};
// 첨부파일 파일명 구하기
export const getFileName = (file: string) => {
  const fullName = file.split("/")[5] || "";
  return fullName.substring(14);
};

// euc-kr decoding utf-8
export const parseAndDecodeQueryString = (
  string: string
): Record<string, string> => {
  const result: Record<string, string> = {};
  const pairs = string.split("&");

  // 한글 데이터 변환
  const decodeEUCKR = (string: string): string => {
    // euc-kr 로 인코딩 된 한글 패턴 확인
    if (!/%[B-F][0-9A-F](%[A-F0-9]{2})?/.test(string)) {
      return string; // 한글이 아니면 그대로 반환
    }

    try {
      const bytes = string
        .split("%")
        .slice(1)
        .map((byte) => parseInt(byte, 16));
      const decoder = new TextDecoder("euc-kr");
      return decoder.decode(new Uint8Array(bytes));
    } catch (e) {
      console.error("Decoding failed:", e);
      return string;
    }
  };

  for (const pair of pairs) {
    const [key, value] = pair.split("=");

    if (key && value) {
      const decodedKey = decodeURIComponent(key);
      result[decodedKey] = decodeEUCKR(value);
    }
  }

  return result;
};

// 신용카드 유효성 검사
export const validateCreditCard = (cardNumber: string) => {
  // 카드 번호를 숫자 배열로 변환
  const cardArray = cardNumber.replace(/\s+/g, "").split("").map(Number);

  // 카드 번호의 길이가 적절한지 확인
  if (cardArray.length < 13 || cardArray.length > 16) {
    return false;
  }

  // Luhn 알고리즘 적용
  let sum = 0;
  for (let i = 0; i < cardArray.length; i++) {
    let digit = cardArray[cardArray.length - 1 - i];
    if (i % 2 === 1) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    sum += digit;
  }

  // 합이 10의 배수인지 확인
  return sum % 10 === 0;
};

export const dayNumToString = (day: number) => {
  switch (day) {
    case 0:
      return "일";
    case 1:
      return "월";
    case 2:
      return "화";
    case 3:
      return "수";
    case 4:
      return "목";
    case 5:
      return "금";
    case 6:
      return "토";
    default:
      return day;
  }
};
