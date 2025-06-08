import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';

import { theme } from '@/services/theme';
import "@/styles/globals.css";
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "MediCare - Your Health, Our Priority",
  description: "MediCare is your trusted healthcare partner, providing top-notch medical services and expert care for a healthier you.",
  icons: {
    icon: "/medicare_logo.png"
  }
};

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${poppins.variable} antialiased`}
      >
        <MantineProvider
          theme={theme}
        >
          <Notifications
            position="top-center"
            autoClose={3000}
            zIndex={9999}
          />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
