import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "E-Learning Platform",
	description:
		"Access PYQs, notes, and study guidance for Indian college students",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" className="dark">
			<ClerkProvider>
				<body
					className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
				>
					<Navbar />
					<main className="flex-1">{children}</main>
					<Footer />
					<Toaster />
				</body>
			</ClerkProvider>
		</html>
	);
}
