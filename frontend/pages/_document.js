import { Html, Head, Main, NextScript } from 'next/document'

function Document() {
  return (
    <Html>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        <link href="/fonts.css" rel="stylesheet" />
        <meta
          name="description"
          content="말듣꾸는 한국어 사용자의 음성을 인공지능을 통해 분석하여 어느 지방의 사투리를 사용하는지 알려주는 서비스입니다. 내가 평소에 쓰는 억양은 어느 지방의 억양에 가까운지 한 번 알아보세요!"
        />
        <meta name="keywords" content="AI, 사투리, 방언, 음성분석, 캐릭터" />
        <meta property="og:title" content="말듣꾸 - AI방언분석" />
        <meta property="og:description" content="AI 방언분석 서비스 말듣꾸 입니다. 내가 평소에 쓰는 억양은 어느 지방의 억양에 가까운지 한 번 알아보세요!" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <div id="modal-root" />
      </body>
    </Html>
  )
}

export default Document