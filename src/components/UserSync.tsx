"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export function UserSync() {
	const { isSignedIn, isLoaded } = useAuth();

	useEffect(() => {
		// Only run if the user is signed in and clerk has loaded
		if (isLoaded && isSignedIn) {
			// Call our API to sync the user to our database
			fetch("/api/auth/sync-user", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error("Failed to sync user");
					}
					return response.json();
				})
				.then((data) => {
					console.log("User synced successfully", data);
				})
				.catch((error) => {
					console.error("Error syncing user:", error);
				});
		}
	}, [isSignedIn, isLoaded]);

	// This component doesn't render anything
	return null;
}
