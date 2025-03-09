"use client";

import { useState } from "react";
import Link from "next/link";
import { UserButton, SignInButton, SignUpButton, useUser } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export function Navbar() {
	const { isSignedIn } = useUser();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<nav className="border-b bg-background">
			<div className="container flex h-16 items-center justify-between px-4">
				{/* Logo and Desktop Navigation */}
				<div className="flex items-center gap-6">
					<Link href="/" className="text-xl font-bold">
						E-Learning
					</Link>
					<div className="hidden md:flex items-center gap-6">
						{isSignedIn && (
							<>
								<Link href="/dashboard" className="text-sm font-medium">
									Dashboard
								</Link>
								<Link href="/materials" className="text-sm font-medium">
									Study Materials
								</Link>
								<Link href="/groups" className="text-sm font-medium">
									Study Groups
								</Link>
							</>
						)}
					</div>
				</div>

				{/* Desktop Authentication */}
				<div className="hidden md:flex items-center gap-4">
					{isSignedIn ? (
						<UserButton afterSignOutUrl="/" />
					) : (
						<>
							<SignInButton mode="modal">
								<Button variant="outline" size="sm">
									Sign In
								</Button>
							</SignInButton>
							<SignUpButton mode="modal">
								<Button size="sm">Sign Up</Button>
							</SignUpButton>
						</>
					)}
				</div>

				{/* Mobile Menu Button */}
				<div className="md:hidden">
					<Button variant="ghost" size="icon" onClick={toggleMenu}>
						{isMenuOpen ? (
							<X className="h-6 w-6" />
						) : (
							<Menu className="h-6 w-6" />
						)}
					</Button>
				</div>
			</div>

			{/* Mobile Menu */}
			{isMenuOpen && (
				<div className="md:hidden border-t">
					<div className="container py-4 px-4 flex flex-col gap-4">
						{isSignedIn ? (
							<>
								<Link
									href="/dashboard"
									className="text-sm font-medium"
									onClick={toggleMenu}
								>
									Dashboard
								</Link>
								<Link
									href="/materials"
									className="text-sm font-medium"
									onClick={toggleMenu}
								>
									Study Materials
								</Link>
								<Link
									href="/groups"
									className="text-sm font-medium"
									onClick={toggleMenu}
								>
									Study Groups
								</Link>
								<div className="pt-4 border-t">
									<UserButton afterSignOutUrl="/" />
								</div>
							</>
						) : (
							<div className="flex flex-col gap-4">
								<SignInButton mode="modal">
									<Button variant="outline" className="w-full">
										Sign In
									</Button>
								</SignInButton>
								<SignUpButton mode="modal">
									<Button className="w-full">Sign Up</Button>
								</SignUpButton>
							</div>
						)}
					</div>
				</div>
			)}
		</nav>
	);
}
