// next-sitemap.config.js
/** @type {import('next-sitemap').IConfig} */
module.exports = {
  // siteUrl: process.env.NEXT_PUBLIC_API_BASE_URL, // 웹사이트의 기본 URL
  generateRobotsTxt: true, // 파일을 생성 robots.txt하고 생성된 사이트맵을 나열 (기본 false)
  sitemapSize: 7000, // 사이트맵 크기를 지정하여 큰 사이트맵을 여러 파일로 분할 (기본 5000)
  exclude: ["/server-sitemap.xml"], // sitemap 등록 제외
  // robotsTxtOptions: { // robots.txt 옵션 설정
  //     additionalSitemaps: [
  //         `${process.env.NEXT_PUBLIC_API_BASE_URL}/server-sitemap.xml` // dynamic sitemap
  //     ],
  //     policies: [ //  정책 설정
  //         {
  //             userAgent: '*', // 모든 agent 허용
  //             allow: '/', // 모든 페이지 주소 크롤링 허용
  //         }
  //     ],
  // }
};
