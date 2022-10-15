import React, { useState, useEffect } from "react";
import UserInviteList from "./UserInviteList";
import axios from "axios";
import { useCurrentPage } from "../../../../Hooks/CurrentPage";
import { usePages } from "../../../../Hooks/Pages";
import { Checkbox, useCheckboxState } from "pretty-checkbox-react";

const ShareToParticularPerson = () => {
	const currentPageId = useCurrentPage();
	const baseUrl = process.env.REACT_APP_BASEURL;
	const [searchUser, setSearchUser] = useState();
	const [userInformation, setUserInformation] = useState([]);
	const pages = usePages();
	const [invistList, setInvistList] = useState([]);

	const searchUserToggle = (e) => {
		setSearchUser(e.target.value);
		if (currentPageId) {
			axios({
				method: "get",
				url: `${baseUrl}/users/search_user.json`,
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
				},
				params: {
					page_id: currentPageId,
					search: e.target.value,
				},
			})
				.then((res) => {
					setUserInformation(res.data.users);
				})
				.catch((err) => {
					console.error(err);
				});
		}
	};
	useEffect(() => {
		let aa =
			pages?.filter((item) => {
				return item.id === currentPageId;
			})[0]?.shareuser || [];
		setInvistList(aa);
	}, [currentPageId]);
	const checkbox = useCheckboxState({ state: [] });
	const submitInvite = () => {
		axios({
			method: "put",
			url: `${baseUrl}/sharepages/invite_to_others`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
			},
			params: {
				currentPageId: currentPageId,
				inviteUsers: checkbox.state,
			},
		}).then((res) => {
			setSearchUser("");
			setInvistList((prev) => {
				return [...prev, ...res.data];
			});
			setUserInformation([]);
		})
		.catch((err) => {
			console.error(err);
		});
	};
	const removeInvite = (email) => {
		axios({
			method: "delete",
			url: `${baseUrl}/sharepages/remove_invite`,
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${localStorage.getItem("zettel_user_token")}`,
			},
			params: {
				currentPageId: currentPageId,
				email: email,
			},
		}).then((res) => {
			setInvistList((prev) => {
				return prev?.filter((item) => {
					return item.email !== email;
				});
			});
		});
	};

	return (
		<div className="relative p-1 m-2 max-h-96 overflow-y-auto">
			<div className="flex items-center justify-between mb-3 flex-nowrap">
				<input
					type="text"
					className="w-full mr-2 overflow-x-hidden text-left border-b-4 flex-nowrap share-Universal boredr-1 input point min-w-min"
					placeholder="Add emails,people,integratons..."
					onChange={searchUserToggle}
					value={searchUser}
				/>
				<button className="share-Universal button-bg border-b-4 border-blue-400 hover:bg-blue-400 hover:border-blue-500" onClick={submitInvite}>
					<p className="overflow-x-hidden leading-5 text-white whitespace-nowra">
						Invite
					</p>
				</button>
			</div>
			{userInformation.length >0 ? (
				<div>
					{userInformation.map((item, i) => (
						<div key={i}>
							<div className="w-full">
								<Checkbox value={item.email} {...checkbox} className="flex w-full">
									<UserInviteList
										username={item.username}
										email={item.email}
										picture={item.picture}
									/>
								</Checkbox>
							</div>
						</div>
					))}
				</div>
			) : null}

			{invistList?.length >= 1 ? (
				<>
					<div>
						{userInformation?.length >= 1 && <hr />}
						<div className="p-2 text-lg font-semibold ext-center leading-5 rounded">Invite:</div>
						{invistList?.map((item, i) => (
							<div className="relative flex content-center">
								<UserInviteList
									username={item.username}
									email={item.email}
									picture={item.picture}
									key={i}
								/>
								<button
									data-email={item.email}
									onClick={(item) => {
										removeInvite(item.target.dataset.email);
									}}
									className="absolute right-0 inline-block px-3 text-base font-bold text-center text-white button-bg border-b-4 border-blue-400 rounded top-3 py-1/2 hover:bg-blue-400 hover:border-blue-500 mr-2"
								>
									X
								</button>
							</div>
						))}
					</div>
				</>
			) : null}
		</div>
	);
};

export default React.memo(ShareToParticularPerson);
