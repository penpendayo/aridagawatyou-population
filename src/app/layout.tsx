import "./globals.css"
export const metadata = {
  title: "和歌山県有田川町の人口動態",
  description: "和歌山県有田川町の人口推移などをグラフにしてまとめたサイト",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
        <body>{children}</body>
    </html>
  );
}
