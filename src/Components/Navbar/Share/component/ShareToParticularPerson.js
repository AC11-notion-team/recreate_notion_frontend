import React,{useState} from "react";
import UserInviteList from "./UserInviteList";
import axios from "axios";
import { useCurrentPageId } from "../../../../CurrentPageId";
import {useInviteUsers,useInviteUpdate} from "../../../../InviteUser"

const ShareToParticularPerson = () => {
	const currentPageId = useCurrentPageId();
	const baseUrl = process.env.REACT_APP_BASEURL;
	const [searchUser,setSearchUser] =useState()
	const [userInformation,setUserInformation] = useState([])
	const searchUserToggle =(e)=>{
		setSearchUser(e.target.value)
		if (currentPageId) {
			axios({
				method: "get",
				url: `${baseUrl}/users/search_user.json`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
				},
				params:{
					"search": e.target.value
				}
			}).then((res)=>{
				setUserInformation(res.data.users)
			}).catch((err) => {
				console.log(err);
			});
		}
	}
	const inviteUsers = useInviteUsers()
	const changeInviteUser = useInviteUpdate()
	const submitInvite = () => {
		axios({
			method: "post",
			url: `${baseUrl}/share_page`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
			},
			params:{
				"currentPageId": currentPageId,
				"inviteUsers":inviteUsers
			}
		}).then((res)=>{
			changeInviteUser([])
		}).catch((err) => {
			console.log(err);
		});

	}

	return (
		<div className="p-1 m-2 relative">
			<div className="flex items-center justify-between flex-nowrap mb-3" >
				<input
					type="text"
					className="flex-nowrap share-Universal text-left boredr-1 mr-2 share-like-input point min-w-min overflow-x-hidden w-full"
					placeholder="Add emails,people,integratons..."
					onChange={searchUserToggle}
					value={searchUser}
				/>
				<button className="share-Universal button-bg"  onClick={submitInvite }>
					<p className="leading-5 text-white whitespace-nowra overflow-x-hidden">
						Invite
					</p>
				</button>
			</div>
			{userInformation != "" ?<div >
				{userInformation.map((item,i) => 
					<UserInviteList 
						username = {item.username}
						email = {item.email}
						picture = {item.picture}
						key = {i}
					/>
				)}
			</div>:null}
		</div>
	);
};

export default ShareToParticularPerson;
