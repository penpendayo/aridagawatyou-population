import "./globals.css";

export const metadata = {
  title: "和歌山県有田川町の人口動態",
  description: "和歌山県有田川町の人口推移などをグラフにしてまとめたサイト",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <div className="mx-auto max-w-5xl px-6 md:px-12 py-10 md:py-16">{children}</div>
      </body>
    </html>
  );
}
