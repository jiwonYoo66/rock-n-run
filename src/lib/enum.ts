export const getSortType = (type: string) => {
  switch (type) {
    case "최신순":
      return 1;
    case "오래된순":
      return 2;
  }
};

export const getReservationType = (type: string | number) => {
  switch (type) {
    case "오픈 대기중":
      return 1;
    case "사전 예약중":
      return 2;
    case "대회 준비중": //예약 마감
      return 3;
    case "추가 접수중":
      return 4;
    case 1:
      return "오픈 대기중";
    case 2:
      return "사전 예약중";
    case 3:
      return "대회 준비중";
    case 4:
      return "추가 접수중";
  }
};
