import React,{useState} from "react";
import UserInviteList from "./UserInviteList";
import axios from "axios";
import { useCurrentPageId } from "../../../../CurrentPageId";

const ShareToParticularPerson = () => {
	const [userInvite,setUserInvite] = useState(false)
	const userInviteToggle = () => {
		setUserInvite(prevUserInvite => !prevUserInvite)
	}
	const currentPageId = useCurrentPageId();
	const baseUrl = process.env.REACT_APP_BASEURL;
	const [userEmail,setUserEmail] = useState("")
	const seachUser =()=>{
		setUserEmail(prev =>)
	}

	if (currentPageId) {
		axios({
			method: "get",
			url: `${baseUrl}/users/${userEmail}.json`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
			},
		}).then((res) => {
			
		});
	}


	return (
		<div className="p-1 m-2">
			<div className="flex items-center justify-between flex-nowrap mb-3" 
				 onClick={userInviteToggle}>
				<input
					type="text"
					className="flex-nowrap share-Universal text-left boredr-1 mr-2 share-like-input point min-w-min overflow-x-hidden w-full"
					placeholder="Add emails,people,integratons..."
					onChange={seachUser}
				/>
				<button className="share-Universal button-bg">
					<p className="leading-5 text-white whitespace-nowra overflow-x-hidden">
						Invite
					</p>
				</button>
			</div>
			{userInvite &&<div >
				
				<UserInviteList />

			</div>}
		</div>
	);
};

export default ShareToParticularPerson;
