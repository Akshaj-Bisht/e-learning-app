"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SignUpButton, useUser } from "@clerk/nextjs";

export default function Home() {
	const { isSignedIn } = useUser();

	return (
		<div className="flex flex-col min-h-[calc(100vh-4rem)]">
			{/* Hero Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
				<div className="container px-4 md:px-6 text-center">
					<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
						Your Ultimate E-Learning Platform for College Students
					</h1>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
						Access previous year question papers, notes, and study guidance through
						curated YouTube playlists. Collaborate with peers in study groups to
						enhance your learning experience.
					</p>
					<div className="space-x-4 mt-6">
						{isSignedIn ? (
							<Link href="/dashboard">
								<Button size="lg">Go to Dashboard</Button>
							</Link>
						) : (
							<>
								<SignUpButton mode="modal">
									<Button size="lg">Get Started</Button>
								</SignUpButton>
								<Link href="#features">
									<Button variant="outline" size="lg">
										Learn More
									</Button>
								</Link>
							</>
						)}
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section id="features" className="w-full py-12 md:py-24 lg:py-32">
				<div className="container px-4 md:px-6 text-center">
					<h2 className="text-3xl font-bold sm:text-4xl md:text-5xl">Key Features</h2>
					<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
						Everything you need to excel in your academic journey.
					</p>
					<div className="grid max-w-5xl mx-auto grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
						{[
							{ title: "Study Materials", desc: "Access PYQs, notes, and YouTube playlists curated for specific subjects." },
							{ title: "Study Groups", desc: "Create and join study groups to collaborate with peers and share materials." },
							{ title: "Content Upload", desc: "Contribute to the community by uploading your own study materials." }
						].map((feature, index) => (
							<Card key={index} className="p-6">
								<CardHeader>
									<CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
								</CardHeader>
								<CardContent>
									<p className="text-muted-foreground text-center">{feature.desc}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
