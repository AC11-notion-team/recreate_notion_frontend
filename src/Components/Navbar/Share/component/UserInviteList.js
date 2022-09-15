import React from "react";
import user from "../../../image/user.png"

export default function UserInviteList(){
    return(
        <div className="flex items-center justify-between point mb-2 p-2 flex-nowrap bg-white">
            <div className="flex items-center">
                <img className="w-7 h-7 mr-2" src={user} alt="userImg" />
                <div className="min-w-max">
                    <p className="mr-1 font-semibold text-sm whitespace-pre"> user</p>
                    <p className="text-xs text-gray-600 whitespace-pre">email@google.com</p>
                </div>
            </div>
        </div>
    )
}