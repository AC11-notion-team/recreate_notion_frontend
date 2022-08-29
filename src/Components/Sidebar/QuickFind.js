import React,{useState} from "react";
import { useDetectClickOutside } from 'react-detect-click-outside';
import seach from "../image/seach.png"

export default function QuickFind(){
    const closeDropdown = () => {
        setDisplayDropdown(false);
    }
    const ref = useDetectClickOutside({
        onTriggered: closeDropdown,
        disableClick: true,
      });
    const [displayDropdown,setDisplayDropdown] = useState(false)
    const toggleQuickFind = ({closeDropdown}) => {
        setDisplayDropdown(prveDisplayDropdown=> !prveDisplayDropdown)
    }
    return(
        <div>
            <div className="flex items-center point py-1 px-3" onClick={toggleQuickFind}>
                <img  src={seach} alt="seach" className="w-5 h-5 p-0.5 mr-2"/>
                <p className="text-sm font-semibold text-gray-600">Quick find</p>
            </div>
            {displayDropdown && <div ref={ref} onClick={toggleQuickFind} className="fixed bg-gray-300 bg-opacity-30 w-screen top-0 bottom-0 left-0">
                <div className="fixed w-5/12 m-auto top-40 left-10 right-10 bg-white opacity-100 z-auto">
                    <h1 className="text-opacity-100">hello</h1>
                </div>
             </div>}
        </div>
    )

}