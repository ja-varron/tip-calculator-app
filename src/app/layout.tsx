import "./globals.css"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-[#c5e4e7] justify-center items-start md:items-center flex min-h-screen py-10 md:py-0">
        {children}
      </body>
    </html>
  );
}
