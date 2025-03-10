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
								Access previous year question papers, notes, and study guidance
								through curated YouTube playlists. Collaborate with peers in
								study groups to enhance your learning experience.
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
			</section>

			{/* Features Section */}
			<section id="features" className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
				<div className="container px-4 md:px-6 relative z-10">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Key Features
							</h2>
							<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
								Everything you need to excel in your academic journey.
							</p>
						</div>
					</div>
					<div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-3 lg:gap-12 mt-8">
						{/* Feature 1 */}
						<Card>
							<CardContent className="flex flex-col items-center space-y-2 p-6">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
										<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
										<circle cx="9" cy="7" r="4" />
									</svg>
								</div>
								<h3 className="text-xl font-bold">Study Groups</h3>
								<p className="text-muted-foreground text-center">
									Create and join study groups to collaborate with peers and share materials.
								</p>
							</CardContent>
						</Card>
						{/* Feature 2 */}
						<Card>
							<CardContent className="flex flex-col items-center space-y-2 p-6">
								<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
									<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
										<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
									</svg>
								</div>
								<h3 className="text-xl font-bold">Content Upload</h3>
								<p className="text-muted-foreground text-center">
									Contribute to the community by uploading your own study materials.
								</p>
							</CardContent>
						</Card>
					</div>
				</div>
			</section>
		</div>
	);
}
