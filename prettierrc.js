module.exports = {
    semi: true, // 세미콜론
    trailingComma: 'none', // 배열 마지막 콜론 제거
    singleQuote: true, // 싱글 쿼트
    printWidth: 200, // 한줄 150 라인
    arrowParens: 'avoid', // parameter 가 하나일 경우 괄호 제거
    tabWidth: 4, // 들여쓰기 4칸
    jsxSingleQuote: false, // JSX 에서 싱글 쿼트를 사용하지 않음
    jsxBracketSameLine: true, // JSX 에서 브래켓이 같은 라인에 있지 않음
    bracketSpacing: true, // 객체 리터럴에서 브래켓 안에 공백을 추가함
    bracketLine: true,   // 객체 리터럴에서 브래켓이 새로운 라인에 있지 않음 (브래켓이 같은 라인에 있음), 이 옵션은 bracketSpacing 과 함께 사용할 때 의미가 있음
    proseWrap: 'preserve', // 프로즈 텍스트의 줄 바꿈을 유지함
    quoteProps: 'as-needed', // 필요한 경우에만 프로퍼티에 쿼트를 추가함
    endOfLine: 'lf', // 파일의 끝에 줄 바꿈 문자를 LF(\n)로 사용함
    range: 'Infinity', // 파일의 범위를 무한대로 설정하여 전체 파일을 포매팅함

    requirePragma: false, // 파일에 @format pragma가 필요하지 않음
    insertPragma: false, // 파일에 @format pragma를 자동으로 삽입하지 않음
    useTabs: false // 탭을 사용하여 인덴트를 함
}
