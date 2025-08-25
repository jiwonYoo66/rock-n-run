import Postcode from 'daum-postcode';

declare global {
	interface Window {
		kakao: any;
		daum: Postcode;
	}
}
