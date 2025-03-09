"use client";
import { useState, useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "@/components/ui/button";

type Material = {
	id: string;
	title: string;
	description: string;
	subject: string;
};

export default function MaterialsPage() {
	const { isLoaded, isSignedIn } = useAuth();
	const [materials, setMaterials] = useState<Material[]>([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchMaterials = async () => {
			try {
				const response = await fetch("/api/materials");
				const data: Material[] = await response.json();
				setMaterials(data);
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
					{materials.map((material: Material) => (
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
							</div>
						</div>
					))}
				</div>
			) : (
				<p>No materials found.</p>
			)}
		</div>
	);
}
