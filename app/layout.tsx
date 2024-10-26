import type {Metadata} from "next"
import {Plus_Jakarta_Sans} from "next/font/google"
import "./globals.css"
import {cn} from "@/lib/utils"
import ThemeProviders from "@/components/theme-provider";

const fontSans = Plus_Jakarta_Sans({
    subsets: ["latin"],
    weight: ['400', '500', '600', '700'],
    variable: '--font-sans',
})

export const metadata: Metadata = {
    title: "CarePulse",
    description: "A healthcare monitoring app",
}

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body
            className={cn(
                'min-h-screen bg-dark-300 font-sans antialiased',
                fontSans.variable
            )}
        >
        <ThemeProviders attribute="class" defaultTheme="dark" enableSystem>
            {children}
        </ThemeProviders>
        </body>
        </html>
    )
}