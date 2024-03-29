// ** React Import
import { Children } from "react";

// ** Next Import
import Document, { Html, Head, Main, NextScript } from "next/document";

// ** Emotion Imports
import createEmotionServer from "@emotion/server/create-instance";

// ** Utils Imports
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="ko">
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap" />
          <link rel="apple-touch-icon" sizes="152x152" href="/images/apple-touch-icon.png" />
          <link rel="shortcut icon" href="/images/favicon.png" />
          <meta name="google-site-verification" content="cUsTLd6hFysJJCGxUTmfGAu4suZ-4tvmWM4u6yWx9ec" />
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4083591465738564" crossOrigin="anonymous"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

CustomDocument.getInitialProps = async (ctx) => {
  const originalRenderPage = ctx.renderPage;
  const cache = createEmotionCache();
  const { extractCriticalToChunks } = createEmotionServer(cache);

  ctx.renderPage = () =>
    originalRenderPage({
      enhanceApp: (App) => (props) =>
        (
          <App
            {...props} // @ts-ignore
            emotionCache={cache}
          />
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);
  const emotionStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionStyles.styles.map((style) => {
    return <style key={style.key} dangerouslySetInnerHTML={{ __html: style.css }} data-emotion={`${style.key} ${style.ids.join(" ")}`} />;
  });

  return {
    ...initialProps,
    styles: [...Children.toArray(initialProps.styles), ...emotionStyleTags],
  };
};

export default CustomDocument;
