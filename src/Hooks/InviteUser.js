import React, { useContext, useState } from "react";

const InviteUserContext = React.createContext();
const InviteUpdateContext = React.createContext();

export function useInviteUsers() {
	return useContext(InviteUserContext);
}

export function useInviteUpdate() {
	return useContext(InviteUpdateContext);
}

export function InviteProvider({ children }) {
	const [inviteUsers,setInviteUser] = useState([])

	function changeInviteUser(username){
        if(!inviteUsers.includes(username)){
            setInviteUser(prev =>[...prev,username])
        }
	}

	return (
		<InviteUserContext.Provider value={inviteUsers}>
			<InviteUpdateContext.Provider value={changeInviteUser}>
				{children}
			</InviteUpdateContext.Provider>
		</InviteUserContext.Provider>
	);
}
