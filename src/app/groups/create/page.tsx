import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";

export default async function CreateGroupPage() {
	const session = await auth();

	if (!session?.userId) {
		redirect("/sign-in");
	}

	return (
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
			<div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-6 sm:mb-8">
				<Link href="/groups">
					<Button variant="outline" size="sm" className="w-auto">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="16"
							height="16"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-1"
						>
							<path d="m15 18-6-6 6-6" />
						</svg>
						Back
					</Button>
				</Link>
				<h1 className="text-2xl sm:text-3xl font-bold">Create Study Group</h1>
			</div>

			<Card className="w-full max-w-2xl mx-auto">
				<CardHeader className="sm:pb-6">
					<CardTitle className="text-xl sm:text-2xl">New Study Group</CardTitle>
					<CardDescription className="text-sm">
						Create a study group to collaborate with your peers and share study
						materials.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="space-y-4 sm:space-y-6">
						<div className="space-y-2">
							<label htmlFor="name" className="text-sm font-medium block">
								Group Name
							</label>
							<Input
								id="name"
								placeholder="Enter a name for your group"
								required
								className="w-full"
							/>
						</div>

						<div className="space-y-2">
							<label
								htmlFor="description"
								className="text-sm font-medium block"
							>
								Description
							</label>
							<Textarea
								id="description"
								placeholder="Describe the purpose of your group, what subjects it covers, etc."
								rows={4}
								className="w-full"
							/>
						</div>

						<div className="flex items-start sm:items-center space-x-2 pt-2">
							<Checkbox id="isPublic" defaultChecked className="mt-1 sm:mt-0" />
							<label
								htmlFor="isPublic"
								className="text-sm font-medium leading-tight"
							>
								Make this group public (anyone can join)
							</label>
						</div>

						<div className="pt-2 sm:pt-4">
							<Button type="submit" className="w-full">
								Create Group
							</Button>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
