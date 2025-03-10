"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SignUpButton, useUser } from "@clerk/nextjs";

export default function Home() {
	const { isSignedIn } = useUser();

	return (
		<div className="flex flex-col min-h-[calc(100vh-4rem)]">
			{/* Hero Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-background"></div>
				<div className="container px-4 md:px-6 relative z-10">
					<div className="flex flex-col items-center space-y-4 text-center">
						<div className="space-y-2">
							<h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
								Your Ultimate E-Learning Platform for College Students
							</h1>
							<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
								Access previous year question papers, notes, and study guidance through curated YouTube playlists.
								Collaborate with peers in study groups to enhance your learning experience.
							</p>
						</div>
						<div className="space-x-4">
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
				</div>
				<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-muted/30"></div>
			</section>

			{/* Features Section */}
			<section id="features" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-muted/30"></div>
				<div className="container px-4 md:px-6 relative z-10">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Key Features</h2>
							<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
								Everything you need to excel in your academic journey.
							</p>
						</div>
					</div>
					<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
						{/* Feature Cards */}
						{[
							{
								title: "Study Materials",
								description: "Access PYQs, notes, and YouTube playlists curated for specific subjects.",
							},
							{
								title: "Study Groups",
								description: "Create and join study groups to collaborate with peers and share materials.",
							},
							{
								title: "Content Upload",
								description: "Contribute to the community by uploading your own study materials.",
							},
						].map((feature, index) => (
							<Card key={index} className="p-6 bg-background/70 backdrop-blur-sm">
								<CardContent className="flex flex-col items-center space-y-2 text-center">
									<h3 className="text-xl font-bold">{feature.title}</h3>
									<p className="text-muted-foreground">{feature.description}</p>
								</CardContent>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-background"></div>
				<div className="container px-4 md:px-6 relative z-10">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
							Ready to Boost Your Academic Performance?
						</h2>
						<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
							Join thousands of students who are already benefiting from our platform.
						</p>
						<div className="space-x-4 mt-6">
							{isSignedIn ? (
								<Link href="/dashboard">
									<Button size="lg">Go to Dashboard</Button>
								</Link>
							) : (
								<SignUpButton mode="modal">
									<Button size="lg">Get Started</Button>
								</SignUpButton>
							)}
						</div>
					</div>
				</div>
			</section>
		</div>
	);
}
