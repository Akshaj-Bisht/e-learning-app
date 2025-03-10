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
	const [materialType, setMaterialType] = useState("");

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setIsLoading(true);

		try {
			const formData = new FormData(e.currentTarget);

			if (file && materialType !== "youtube_playlist") {
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
		<div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
			<div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 sm:mb-8">
				<Link href="/materials">
					<Button variant="outline" size="sm" className="w-auto">
						Back
					</Button>
				</Link>
				<h1 className="text-2xl sm:text-3xl font-bold">
					Upload Study Material
				</h1>
			</div>

			<form
				onSubmit={handleSubmit}
				className="w-full max-w-2xl mx-auto space-y-4 sm:space-y-6"
			>
				<Input
					name="title"
					placeholder="Enter material title"
					required
					disabled={isLoading}
				/>
				<Textarea
					name="description"
					placeholder="Enter material description"
					required
					disabled={isLoading}
				/>

				<Select
					name="type"
					required
					disabled={isLoading}
					onValueChange={setMaterialType}
				>
					<SelectTrigger>
						<SelectValue placeholder="Select material type" />
					</SelectTrigger>
					<SelectContent>
						<SelectItem value="PYQ">Previous Year Question Paper</SelectItem>
						<SelectItem value="notes">Notes</SelectItem>
						<SelectItem value="youtube_playlist">YouTube Playlist</SelectItem>
					</SelectContent>
				</Select>

				<Input
					name="subject"
					placeholder="Enter subject name"
					required
					disabled={isLoading}
				/>
				<Input
					name="course"
					placeholder="Enter course name"
					required
					disabled={isLoading}
				/>

				<Input
					name="year"
					type="number"
					placeholder="Enter year"
					min={2000}
					max={new Date().getFullYear()}
					disabled={isLoading}
				/>
				<Input
					name="semester"
					type="number"
					placeholder="Enter semester"
					min={1}
					max={8}
					disabled={isLoading}
				/>

				{materialType !== "youtube_playlist" && (
					<div>
						<label className="text-sm font-medium block">File</label>
						<Input
							name="file"
							type="file"
							accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
							onChange={(e) => setFile(e.target.files?.[0] || null)}
							disabled={isLoading}
						/>
					</div>
				)}

				{materialType === "youtube_playlist" && (
					<div>
						<label className="text-sm font-medium block">YouTube URL</label>
						<Input
							name="youtubeUrl"
							type="url"
							placeholder="Enter YouTube playlist URL"
							pattern="https?:\\/\\/(www\\.)?youtube\\.com\/.*"
							disabled={isLoading}
						/>
					</div>
				)}

				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Uploading..." : "Upload Material"}
				</Button>
			</form>
		</div>
	);
}
