export const getSortType = (type: string) => {
	switch (type) {
		case '최신순':
			return 1;
		case '오래된순':
			return 2;
	}
}
