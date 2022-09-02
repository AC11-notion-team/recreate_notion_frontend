import React from "react";
import updata2 from "../image/updata2.png"
import setting from "../image/settings.png"
import Star from "./Star"
import Private from "./Private";
import Share from "./Share";
import Templates from "./Templates";
import Import from "./Import";
import Trash from "./Trash"
import User from "./User"
import QuickFind from "./QuickFind";
import newPage from "../image/plus.png"



export default function Sidebar({isFavorite,toggleFavorite,toggle}){

  return(
      <div className="relative inset-0 h-screen side-minW bg-gray-50 z-30"> 
          <User toggle={toggle}/>
          <div className="mb-2 px-1 py-2">
              <QuickFind />
              
              <div className="flex items-center point py-1 px-3">
                  <img src={updata2} alt="seach" className="w-5 h-5 p-0.5 mr-2"/>
                  <p className="text-sm font-semibold text-gray-600">Updates</p>
              </div>
              <div className="flex items-center point py-1 px-3">
                  <img src={setting} alt="seach" className="w-5 h-5 p-0.5 mr-2"/>
                  <p className="text-sm font-semibold text-gray-600">Settings & members</p>
              </div>

          </div>
          <div className="h-3/4 overflow-x-hidden overflow-y-auto">
              <div className="mb-4">
                  <Star state = {isFavorite} toggle = {toggleFavorite}/>
              </div>
              <div className="mb-4">
                  <Share />
              </div>
              <div className="mb-4">
                  <div className="py-1 px-4">
                      <p className="text-xs font-semibold text-gray-500 point">PRIVATE</p>
                  </div>
                  <Private />
              </div>
              <div className="px-1 py-2">
                  <Templates />
                  <Import/>
                  <Trash/>
              </div>
          </div>
          <div className="w-full bottom-0 flex items-center py-3 px-2 shadow-inner point mt-auto">

              <img className="w-5 h-5 p-0.5 mr-2" src={newPage} alt="newPage" />
              <p className="text-sm font-semibold text-gray-600">New page</p>
          </div>
      </div>
  )
}
