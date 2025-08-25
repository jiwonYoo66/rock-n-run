/**
 * HTML 문자열에서 HTML 태그를 제거한다.
 * @param html {string} - HTML 태그를 포함할 수 있는 문자열.
 * @returns 태그가 제거된 새로운 문자열을 반환한다.
 */
export const stripHtml = (html: string) => {
	return html.replace(/<[^>]*>?/gm, '');
};

/**
 * 주어진 텍스트에서 문장을 추출하고, '다.'로 끝나는 문장만을 필터링하여 첫 2문장만 반환한다.
 * @param text {string} - 문장을 추출할 원본 텍스트.
 * @returns '다.'로 끝나는 문장 중 첫 2문장을 포함하는 배열을 반환한다.
 */
export const extractSentences = (text: string) => {
	const sentences = text.match(/[^.!?]+[.!?]+/g) || [];
	const filteredSentences = sentences.filter((sentence) =>
		sentence.trim().endsWith('다.')
	);
	return filteredSentences.slice(0, 2); // 첫 2문장만 추출
};

/**
 * 주어진 문장 배열에서 첫 번째 문장과 두 번째 문장을 조합하여 60자를 넘지 않는 짧은 설명을 반환한다.
 * 첫 번째 문장만으로 60자를 넘으면 첫 문장만 반환한다.
 * @param sentences {string[]} - 설명을 생성할 문장 배열.
 * @returns 60자를 넘지 않는 짧은 설명을 문자열로 반환한다.
 */
export const getShortDescription = (sentences: string[]) => {
	if (sentences.length === 0) return '';

	const firstSentence = sentences[0] || '';
	const secondSentence = sentences.length > 1 ? sentences[1] : '';

	if (firstSentence.length + secondSentence.length > 60) {
		return firstSentence;
	} else {
		return firstSentence + secondSentence;
	}
};
