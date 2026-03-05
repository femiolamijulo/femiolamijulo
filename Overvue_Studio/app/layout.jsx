import './globals.css';

export const metadata = {
  title: 'Groundmap — Spatial Storytelling for African Newsrooms',
  description: 'A two-mode spatial storytelling platform: build story flows backstage, present on a wall display.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=Playfair+Display:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
