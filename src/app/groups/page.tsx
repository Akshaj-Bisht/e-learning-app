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
import { db } from "@/db";

export default async function GroupsPage() {
	const session = await auth();

	if (!session?.userId) {
		redirect("/sign-in");
	}

	// Fetch public groups from the database
	const publicGroups = await db.query.studyGroups.findMany({
		where: (groups, { eq }) => eq(groups.isPublic, true),
		with: {
			creator: true,
			members: true,
		},
		orderBy: (groups, { desc }) => [desc(groups.createdAt)],
	});

	// Fetch user's groups
	const userGroups = await db.query.studyGroupMembers.findMany({
		where: (members, { eq }) => eq(members.userId, session.userId),
		with: {
			group: {
				with: {
					creator: true,
					members: true,
				},
			},
		},
	});

	const userGroupIds = new Set(userGroups.map((ug) => ug.groupId));

	// Filter out groups the user is already a member of
	const availableGroups = publicGroups.filter(
		(group) => !userGroupIds.has(group.id)
	);

	return (
		<div className="container py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Study Groups</h1>
				<Link href="/groups/create">
					<Button>Create Group</Button>
				</Link>
			</div>

			{/* User's Groups */}
			<div className="mb-12">
				<h2 className="text-2xl font-bold mb-4">Your Groups</h2>
				{userGroups.length === 0 ? (
					<div className="text-center py-8 border rounded-lg">
						<h3 className="text-xl font-medium mb-2">
							You haven't joined any groups yet
						</h3>
						<p className="text-muted-foreground mb-4">
							Join an existing group or create your own!
						</p>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{userGroups.map(({ group }) => (
							<Card key={group.id}>
								<CardHeader>
									<CardTitle>{group.name}</CardTitle>
									<CardDescription>
										{group.isPublic ? "Public Group" : "Private Group"} •{" "}
										{group.members.length} members
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground line-clamp-3">
										{group.description || "No description provided."}
									</p>
									<div className="mt-4 flex items-center text-sm text-muted-foreground">
										<span>Created by {group.creator.name}</span>
									</div>
								</CardContent>
								<CardFooter>
									<Link href={`/groups/${group.id}`} className="w-full">
										<Button className="w-full">View Group</Button>
									</Link>
								</CardFooter>
							</Card>
						))}
					</div>
				)}
			</div>

			{/* Available Public Groups */}
			<div>
				<h2 className="text-2xl font-bold mb-4">Available Groups</h2>
				{availableGroups.length === 0 ? (
					<div className="text-center py-8 border rounded-lg">
						<h3 className="text-xl font-medium mb-2">
							No available groups found
						</h3>
						<p className="text-muted-foreground mb-4">
							Create your own group to get started!
						</p>
						<Link href="/groups/create">
							<Button>Create Group</Button>
						</Link>
					</div>
				) : (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{availableGroups.map((group) => (
							<Card key={group.id}>
								<CardHeader>
									<CardTitle>{group.name}</CardTitle>
									<CardDescription>
										Public Group • {group.members.length} members
									</CardDescription>
								</CardHeader>
								<CardContent>
									<p className="text-sm text-muted-foreground line-clamp-3">
										{group.description || "No description provided."}
									</p>
									<div className="mt-4 flex items-center text-sm text-muted-foreground">
										<span>Created by {group.creator.name}</span>
									</div>
								</CardContent>
								<CardFooter className="flex gap-2">
									<Link href={`/groups/${group.id}`} className="flex-1">
										<Button variant="outline" className="w-full">
											View Details
										</Button>
									</Link>
									<form
										action={`/api/groups/${group.id}/join`}
										method="POST"
										className="flex-1"
									>
										<Button className="w-full">Join Group</Button>
									</form>
								</CardFooter>
							</Card>
						))}
					</div>
				)}
			</div>
		</div>
	);
}
