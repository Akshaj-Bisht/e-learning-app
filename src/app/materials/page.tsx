"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";

export default function MaterialsPage() {
	const { isSignedIn, isLoaded } = useUser();
	const [materials, setMaterials] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		// Fetch materials when the component mounts
		const fetchMaterials = async () => {
			try {
				const response = await fetch("/api/materials");
				if (response.ok) {
					const data = await response.json();
					setMaterials(data.materials);
				}
			} catch (error) {
				console.error("Error fetching materials:", error);
			} finally {
				setIsLoading(false);
			}
		};

		fetchMaterials();
	}, []);

	return (
		<div className="container py-8">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Study Materials</h1>
				{isLoaded && isSignedIn && (
					<Link href="/materials/upload">
						<Button>Upload Material</Button>
					</Link>
				)}
			</div>

			{isLoading ? (
				<div className="flex justify-center items-center h-64">
					<p>Loading materials...</p>
				</div>
			) : materials.length > 0 ? (
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{materials.map((material: any) => (
						<div
							key={material.id}
							className="border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
						>
							<h2 className="text-xl font-semibold mb-2">{material.title}</h2>
							<p className="text-muted-foreground mb-4 line-clamp-2">
								{material.description}
							</p>
							<div className="flex flex-wrap gap-2 mb-4">
								<span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
									{material.subject}
								</span>
								<span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
									{material.course}
								</span>
								{material.type && (
									<span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
										{material.type}
									</span>
								)}
							</div>
							<div className="flex justify-between items-center">
								<Link href={`/materials/${material.id}`}>
									<Button variant="outline" size="sm">
										View Details
									</Button>
								</Link>
								{material.fileUrl && (
									<a
										href={material.fileUrl}
										target="_blank"
										rel="noopener noreferrer"
									>
										<Button variant="ghost" size="sm">
											Download
										</Button>
									</a>
								)}
							</div>
						</div>
					))}
				</div>
			) : (
				<div className="text-center py-12">
					<p className="text-muted-foreground mb-4">
						No study materials found. Be the first to upload!
					</p>
					{isLoaded && isSignedIn && (
						<Link href="/materials/upload">
							<Button>Upload Material</Button>
						</Link>
					)}
				</div>
			)}
		</div>
	);
}
