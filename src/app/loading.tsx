import React from "react";
import "./LoadingSkeleton.css"; // Import the CSS file for styling

export default function Loading() {
	return (
		<div className="loading-skeleton">
			<div className="skeleton-header"></div>
			<div className="skeleton-content"></div>
			<div className="skeleton-footer"></div>
		</div>
	);
}
