import type { Metadata, Viewport } from "next";
import "./globals.css";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://penpendayo.github.io/aridagawatyou-population";

const TITLE = "和歌山県有田川町の人口動態｜地区別の人口推移グラフ";
const DESCRIPTION =
  "和歌山県有田郡有田川町の人口データを地区別・期間別に可視化したサイトです。総人口の推移グラフと、地域ごとの増減ランキングを月次で確認できます。出典は有田川町公式の公開人口統計CSV。";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s｜和歌山県有田川町の人口動態",
  },
  description: DESCRIPTION,
  keywords: [
    "有田川町",
    "和歌山県有田川町",
    "有田川町 人口",
    "有田川町 人口推移",
    "有田川町 地区別人口",
    "有田郡",
    "和歌山県 人口",
    "人口統計",
    "人口動態",
    "オープンデータ",
  ],
  applicationName: "有田川町の人口動態",
  authors: [{ name: "penpen_dev", url: "https://twitter.com/penpen_dev" }],
  creator: "penpen_dev",
  publisher: "penpen_dev",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: "/",
    siteName: "和歌山県有田川町の人口動態",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    creator: "@penpen_dev",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  category: "statistics",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: "和歌山県有田川町の人口動態",
      inLanguage: "ja",
      description: DESCRIPTION,
    },
    {
      "@type": "Dataset",
      "@id": `${SITE_URL}/#dataset`,
      name: "和歌山県有田川町 人口統計（地区別・月次）",
      description:
        "和歌山県有田郡有田川町の公式公開CSVを元にした、地区別・月次の人口データセット。総人口・地域別人口の推移を可視化。",
      url: `${SITE_URL}/`,
      keywords: [
        "有田川町",
        "和歌山県",
        "人口統計",
        "人口動態",
        "地区別人口",
        "オープンデータ",
      ],
      inLanguage: "ja",
      isAccessibleForFree: true,
      license: "https://www.town.aridagawa.lg.jp/",
      creator: {
        "@type": "GovernmentOrganization",
        name: "和歌山県有田川町",
        url: "https://www.town.aridagawa.lg.jp/",
      },
      spatialCoverage: {
        "@type": "Place",
        name: "和歌山県有田郡有田川町",
        address: {
          "@type": "PostalAddress",
          addressCountry: "JP",
          addressRegion: "和歌山県",
          addressLocality: "有田郡有田川町",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 34.0764,
          longitude: 135.3022,
        },
      },
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <div className="mx-auto max-w-5xl px-6 md:px-12 py-10 md:py-16">{children}</div>
      </body>
    </html>
  );
}
