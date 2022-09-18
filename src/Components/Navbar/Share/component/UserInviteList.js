import React,{useState} from "react";
import userImg from "../../../image/user.png"
import check from "../../../image/check.png"
import {useInviteUsers,useInviteUpdate} from "../../../../InviteUser"

export default function UserInviteList({username,email,picture}){
    
    const inviteUsers = useInviteUsers()
    const changeInviteUser = useInviteUpdate()
    const callback = () => {
		changeInviteUser(username)
	}
    const user = inviteUsers.map(item => item)

    return(
        <div>
            <div className="flex items-center justify-between point mb-2 p-2 flex-nowrap bg-white" onClick={callback}>
                <div className="flex items-center">
                    <img className="w-7 h-7 mr-2" src={picture? picture:userImg} alt="userImg" />
                    <div className="min-w-max">
                        <p className="mr-1 font-semibold text-sm whitespace-pre">{username}</p>
                        <p className="text-xs text-gray-600 whitespace-pre">{email}</p>
                    </div>
                </div>
            </div>
            
        </div>
    )
}