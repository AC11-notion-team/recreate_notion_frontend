import React from "react";

export default function Star({ state }) {
	return (
		<div>
			{state && (
				<div>
					<div className="py-1 px-4">
						<p className="text-xs font-semibold text-gray-500 point">
							FAVORITES
						</p>
					</div>
				</div>
			)}
		</div>
	);
}