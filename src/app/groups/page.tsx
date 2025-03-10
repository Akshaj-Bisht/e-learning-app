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
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold">Study Groups</h1>
        <Link href="/groups/create">
          <Button className="w-full sm:w-auto">Create Group</Button>
        </Link>
      </div>

      {/* User's Groups */}
      <div className="mb-8 sm:mb-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Your Groups</h2>
        {userGroups.length === 0 ? (
          <div className="text-center py-6 sm:py-8 border rounded-lg">
            <h3 className="text-lg sm:text-xl font-medium mb-2">
              You haven't joined any groups yet
            </h3>
            <p className="text-sm text-muted-foreground mb-4 px-4">
              Join an existing group or create your own!
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {userGroups.map(({ group }) => (
              <Card key={group.id} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">{group.name}</CardTitle>
                  <CardDescription>
                    {group.isPublic ? "Public Group" : "Private Group"} •{" "}
                    {group.members.length} members
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
                    {group.description || "No description provided."}
                  </p>
                  <div className="mt-3 flex items-center text-xs sm:text-sm text-muted-foreground">
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
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Available Groups</h2>
        {availableGroups.length === 0 ? (
          <div className="text-center py-6 sm:py-8 border rounded-lg">
            <h3 className="text-lg sm:text-xl font-medium mb-2">
              No available groups found
            </h3>
            <p className="text-sm text-muted-foreground mb-4 px-4">
              Create your own group to get started!
            </p>
            <Link href="/groups/create">
              <Button className="w-auto">Create Group</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {availableGroups.map((group) => (
              <Card key={group.id} className="flex flex-col h-full">
                <CardHeader>
                  <CardTitle className="text-lg sm:text-xl">{group.name}</CardTitle>
                  <CardDescription>
                    Public Group • {group.members.length} members
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
                    {group.description || "No description provided."}
                  </p>
                  <div className="mt-3 flex items-center text-xs sm:text-sm text-muted-foreground">
                    <span>Created by {group.creator.name}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-2">
                  <Link href={`/groups/${group.id}`} className="w-full sm:flex-1">
                    <Button variant="outline" className="w-full">
                      View Details
                    </Button>
                  </Link>
                  <form
                    action={`/api/groups/${group.id}/join`}
                    method="POST"
                    className="w-full sm:flex-1"
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