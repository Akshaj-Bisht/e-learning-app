"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function UploadMaterialPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);
	const [file, setFile] = useState<File | null>(null);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const formData = new FormData(e.currentTarget);

			// Add file to formData if it exists
			if (file) {
				formData.append("file", file);
			}

			const response = await fetch("/api/materials/upload", {
				method: "POST",
				body: formData,
			});

			if (!response.ok) {
				throw new Error("Failed to upload material");
			}

			toast.success("Material uploaded successfully!");
			router.push("/materials");
			router.refresh();
		} catch (error) {
			console.error("Upload error:", error);
			toast.error("Failed to upload material");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="container py-8 m-auto">
			<div className="flex items-center mb-8">
				<Link href="/materials" className="mr-4">
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
				<h1 className="text-3xl font-bold">Upload Study Material</h1>
			</div>

			<form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
				<div className="space-y-2">
					<label className="text-sm font-medium">Title</label>
					<Input
						name="title"
						placeholder="Enter material title"
						required
						disabled={isLoading}
					/>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Description</label>
					<Textarea
						name="description"
						placeholder="Enter material description"
						required
						disabled={isLoading}
					/>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Type</label>
					<Select name="type" required disabled={isLoading}>
						<SelectTrigger>
							<SelectValue placeholder="Select material type" />
						</SelectTrigger>
						<SelectContent>
							<SelectItem value="PYQ">Previous Year Question Paper</SelectItem>
							<SelectItem value="notes">Notes</SelectItem>
							<SelectItem value="youtube_playlist">YouTube Playlist</SelectItem>
						</SelectContent>
					</Select>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Subject</label>
					<Input
						name="subject"
						placeholder="Enter subject name"
						required
						disabled={isLoading}
					/>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">Course</label>
					<Input
						name="course"
						placeholder="Enter course name"
						required
						disabled={isLoading}
					/>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="space-y-2">
						<label className="text-sm font-medium">Year</label>
						<Input
							name="year"
							type="number"
							placeholder="Enter year"
							min={2000}
							max={new Date().getFullYear()}
							disabled={isLoading}
						/>
					</div>

					<div className="space-y-2">
						<label className="text-sm font-medium">Semester</label>
						<Input
							name="semester"
							type="number"
							placeholder="Enter semester"
							min={1}
							max={8}
							disabled={isLoading}
						/>
					</div>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">File</label>
					<Input
						name="file"
						type="file"
						accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
						onChange={(e) => setFile(e.target.files?.[0] || null)}
						disabled={isLoading}
					/>
					<p className="text-xs text-muted-foreground">
						Supported formats: PDF, DOC, DOCX, PPT, PPTX, TXT
					</p>
				</div>

				<div className="space-y-2">
					<label className="text-sm font-medium">YouTube URL</label>
					<Input
						name="youtubeUrl"
						type="url"
						placeholder="Enter YouTube playlist URL (optional)"
						pattern="https?:\/\/(www\.)?youtube\.com\/.*"
						disabled={isLoading}
					/>
				</div>

				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Uploading..." : "Upload Material"}
				</Button>
			</form>
		</div>
	);
}
