import React, { useContext, useState } from "react";

const EmojiContext = React.createContext();
const EmojiUpdateContext = React.createContext();

export function useEmoji() {
	return useContext(EmojiContext);
}

export function useEmojiUpdate() {
	return useContext(EmojiUpdateContext);
}

export function EmojiStateProvider({ children }) {
	const [Emoji, setIsEmoji] = useState(false);
	function changeEmoji() {
		setIsEmoji((prevIsEmoji) => !prevIsEmoji);
	}
	return (
		<EmojiContext.Provider value={Emoji}>
			<EmojiUpdateContext.Provider value={changeEmoji}>
				{children}
			</EmojiUpdateContext.Provider>
		</EmojiContext.Provider>
	);
}
