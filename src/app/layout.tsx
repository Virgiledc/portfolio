import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

export const metadata: Metadata = {
	title: "Portfolio - Virgile Fouché",
	description: "Full Stack developer portfolio showcasing projects and experience",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	if (typeof window !== "undefined") {
		window.history.scrollRestoration = "manual";
	}

	return (
		<html lang="en" className="scroll-smooth">
			<body className="bg-slate-900">
				{children}
			</body>
		</html>
	);
}