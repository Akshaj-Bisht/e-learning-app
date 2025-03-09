import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default async function CreateGroupPage() {
	const session = await auth();

	if (!session?.userId) {
		redirect("/sign-in");
	}

	return (
		<div className="container py-8">
			<div className="flex items-center mb-8">
				<Link href="/groups" className="mr-4">
					<Button variant="outline" size="sm">
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
				<h1 className="text-3xl font-bold">Create Study Group</h1>
			</div>

			<Card className="max-w-2xl mx-auto">
				<CardHeader>
					<CardTitle>New Study Group</CardTitle>
					<CardDescription>
						Create a study group to collaborate with your peers and share study
						materials.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form className="space-y-4">
						<div className="space-y-2">
							<label htmlFor="name" className="text-sm font-medium">
								Group Name
							</label>
							<Input
								id="name"
								placeholder="Enter a name for your group"
								required
							/>
						</div>

						<div className="space-y-2">
							<label htmlFor="description" className="text-sm font-medium">
								Description
							</label>
							<Textarea
								id="description"
								placeholder="Describe the purpose of your group, what subjects it covers, etc."
								rows={4}
							/>
						</div>

						<div className="flex items-center space-x-2">
							<input
								type="checkbox"
								id="isPublic"
								className="h-4 w-4 rounded border-gray-300"
								defaultChecked
							/>
							<label htmlFor="isPublic" className="text-sm font-medium">
								Make this group public (anyone can join)
							</label>
						</div>

						<Button type="submit" className="w-full">
							Create Group
						</Button>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
