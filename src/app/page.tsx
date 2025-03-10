"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
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
				<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-muted/30"></div>
			</section>

			{/* Features Section */}
			<section
				id="features"
				className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden"
			>
				<div className="absolute inset-0 bg-muted/30"></div>
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
						<div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-background/70 backdrop-blur-sm bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-transform duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-6 w-6"
								>
									<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
								</svg>
							</div>
							<h3 className="text-xl font-bold">Study Materials</h3>
							<p className="text-muted-foreground text-center">
								Access PYQs, notes, and YouTube playlists curated for specific
								subjects.
							</p>
						</div>

						{/* Feature 2 */}
						<div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-background/70 backdrop-blur-sm bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-transform duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-6 w-6"
								>
									<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
									<circle cx="9" cy="7" r="4" />
									<path d="M23 21v-2a4 4 0 0 0-3-3.87" />
									<path d="M16 3.13a4 4 0 0 1 0 7.75" />
								</svg>
							</div>
							<h3 className="text-xl font-bold">Study Groups</h3>
							<p className="text-muted-foreground text-center">
								Create and join study groups to collaborate with peers and share
								materials.
							</p>
						</div>

						{/* Feature 3 */}
						<div className="flex flex-col items-center space-y-2 border p-6 rounded-lg bg-background/70 backdrop-blur-sm bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm transition-transform duration-200 hover:shadow-lg hover:scale-[1.02] cursor-pointer">
							<div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="24"
									height="24"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									className="h-6 w-6"
								>
									<path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
									<polyline points="14 2 14 8 20 8" />
									<path d="M12 18v-6" />
									<path d="M8 18v-1" />
									<path d="M16 18v-3" />
								</svg>
							</div>
							<h3 className="text-xl font-bold">Content Upload</h3>
							<p className="text-muted-foreground text-center">
								Contribute to the community by uploading your own study
								materials.
							</p>
						</div>
					</div>
				</div>
				<div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-muted/30 to-transparent"></div>
				<div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-b from-transparent to-background"></div>
			</section>

			{/* CTA Section */}
			<section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
				<div className="absolute inset-0 bg-background"></div>
				<div className="container px-4 md:px-6 relative z-10">
					<div className="flex flex-col items-center justify-center space-y-4 text-center">
						<div className="space-y-2">
							<h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
								Ready to Boost Your Academic Performance?
							</h2>
							<p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
								Join thousands of students who are already benefiting from our
								platform.
							</p>
						</div>
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
				</div>
				<div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-background to-transparent"></div>
			</section>
		</div>
	);
}


