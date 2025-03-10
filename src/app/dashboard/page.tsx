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
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
			<h1 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 lg:mb-8">
				Dashboard
			</h1>

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
				{/* Study Materials Card */}
				<Card className="flex flex-col h-full">
					<CardHeader>
						<CardTitle className="text-lg sm:text-xl">
							Study Materials
						</CardTitle>
						<CardDescription className="text-sm">
							Access and manage your study materials
						</CardDescription>
					</CardHeader>
					<CardContent className="flex-grow">
						<p className="text-xs sm:text-sm text-muted-foreground">
							Browse through PYQs, notes, and YouTube playlists for your
							courses.
						</p>
					</CardContent>
					<CardFooter>
						<Link href="/materials" className="w-full sm:w-auto">
							<Button className="w-full sm:w-auto">View Materials</Button>
						</Link>
					</CardFooter>
				</Card>

				{/* Study Groups Card */}
				<Card className="flex flex-col h-full">
					<CardHeader>
						<CardTitle className="text-lg sm:text-xl">Study Groups</CardTitle>
						<CardDescription className="text-sm">
							Collaborate with peers in study groups
						</CardDescription>
					</CardHeader>
					<CardContent className="flex-grow">
						<p className="text-xs sm:text-sm text-muted-foreground">
							Join existing groups or create your own to share materials and
							study together.
						</p>
					</CardContent>
					<CardFooter>
						<Link href="/groups" className="w-full sm:w-auto">
							<Button className="w-full sm:w-auto">View Groups</Button>
						</Link>
					</CardFooter>
				</Card>

				{/* Upload Materials Card */}
				<Card className="flex flex-col h-full">
					<CardHeader>
						<CardTitle className="text-lg sm:text-xl">
							Upload Materials
						</CardTitle>
						<CardDescription className="text-sm">
							Contribute to the community
						</CardDescription>
					</CardHeader>
					<CardContent className="flex-grow">
						<p className="text-xs sm:text-sm text-muted-foreground">
							Share your notes, PYQs, or YouTube playlists with other students.
						</p>
					</CardContent>
					<CardFooter>
						<Link href="/materials/upload" className="w-full sm:w-auto">
							<Button className="w-full sm:w-auto">Upload</Button>
						</Link>
					</CardFooter>
				</Card>
			</div>
		</div>
	);
}
