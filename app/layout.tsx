import type {Metadata} from "next";
import {Plus_Jakarta_Sans} from "next/font/google";
import "./globals.css";
import {cn} from "@/lib/utils";
import Providers from "./providers";

const fontSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ['400', '500', '600', '700'],
    variable: '--font-sans',
});

export const metadata: Metadata = {
    title: "CarePulse",
    description: "A healthcare monitoring app",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={cn('min-h-screen bg-dark-300 font-sans', fontSans.variable)}
        >
        <Providers>{children}</Providers>
        </body>
        </html>
    );
}
