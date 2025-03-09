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

export default async function DashboardPage() {
	const session = await auth();

	if (!session?.userId) {
		redirect("/sign-in");
	}

	return (
		<div className="container py-8">
			<h1 className="text-3xl font-bold mb-8">Dashboard</h1>

			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{/* Study Materials Card */}
				<Card>
					<CardHeader>
						<CardTitle>Study Materials</CardTitle>
						<CardDescription>
							Access and manage your study materials
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							Browse through PYQs, notes, and YouTube playlists for your
							courses.
						</p>
					</CardContent>
					<CardFooter>
						<Link href="/materials">
							<Button>View Materials</Button>
						</Link>
					</CardFooter>
				</Card>

				{/* Study Groups Card */}
				<Card>
					<CardHeader>
						<CardTitle>Study Groups</CardTitle>
						<CardDescription>
							Collaborate with peers in study groups
						</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							Join existing groups or create your own to share materials and
							study together.
						</p>
					</CardContent>
					<CardFooter>
						<Link href="/groups">
							<Button>View Groups</Button>
						</Link>
					</CardFooter>
				</Card>

				{/* Upload Materials Card */}
				<Card>
					<CardHeader>
						<CardTitle>Upload Materials</CardTitle>
						<CardDescription>Contribute to the community</CardDescription>
					</CardHeader>
					<CardContent>
						<p className="text-sm text-muted-foreground">
							Share your notes, PYQs, or YouTube playlists with other students.
						</p>
					</CardContent>
					<CardFooter>
						<Link href="/materials/upload">
							<Button>Upload</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
