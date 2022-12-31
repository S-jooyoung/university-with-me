// ** Next Imports
import Head from "next/head";

import type { NextPage } from "next";
import type { AppProps } from "next/app";

// ** Emotion Imports
import { CacheProvider } from "@emotion/react";
import type { EmotionCache } from "@emotion/cache";

// ** Component Imports
import UserLayout from "src/layouts/UserLayout";
import ThemeComponent from "src/@core/theme/ThemeComponent";

// ** Contexts
import { SettingsConsumer, SettingsProvider } from "src/@core/context/settingsContext";

// ** Utils Imports
import { createEmotionCache } from "src/@core/utils/create-emotion-cache";

// ** React Perfect Scrollbar Style
import "react-perfect-scrollbar/dist/css/styles.css";

// ** Global css styles
import "../../styles/globals.css";

// ** React query
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { DefaultSeo } from "next-seo";
import { GoogleAnalytics } from "nextjs-google-analytics";

const DEFAULT_SEO = {
  title: "대학나와 | 실시간 정시 경쟁률 서비스",
  description: "대학별 실시간 경쟁률 제공, 정시 경쟁률 제공",
  canonical: "https://daehagnawa.site/",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "https://daehagnawa.site/",
    title: "대학나와 | 실시간 정시 경쟁률 서비스",
    site_name: "대학나와",
    images: [
      {
        url: "https://daehagnawa.site/_next/image/?url=%2Fimages%2Fcards%2Flanding.svg&w=640&q=75",
        width: 285,
        height: 167,
        alt: "대학나와 | 실시간 정시 경쟁률 서비스",
      },
    ],
  },
  twitter: {
    handle: "@handle",
    site: "@site",
    cardType: "summary_large_image",
  },
};

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage;
  emotionCache: EmotionCache;
};

const clientSideEmotionCache = createEmotionCache();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      staleTime: 60 * 1000,
      enabled: false,
    },
  },
});

// ** Configure JSS & ClassName
const App = (props: ExtendedAppProps) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // Variables
  const getLayout = Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>);

  return (
    <CacheProvider value={emotionCache}>
      <SettingsProvider>
        <SettingsConsumer>
          {({ settings }) => {
            return (
              <ThemeComponent settings={settings}>
                {getLayout(
                  <QueryClientProvider client={queryClient}>
                    <GoogleAnalytics trackPageViews />
                    <DefaultSeo {...DEFAULT_SEO} />
                    <Head>
                      <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"></meta>
                      <meta name="mobile-web-app-capable" content="yes"></meta>
                      <meta name="apple-mobile-web-app-capable" content="yes"></meta>
                    </Head>
                    <Component {...pageProps} />
                    <ReactQueryDevtools initialIsOpen={false} />
                  </QueryClientProvider>
                )}
              </ThemeComponent>
            );
          }}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  );
};

export default App;
