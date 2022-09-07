import React,{useState} from "react";
import trash from "../image/trash.png"

export default function Trash (){
    const [isTrash, setIsTrash] = useState(false)
    const toggleTrash = () => {setIsTrash(prevTrash => !prevTrash)}
    
    return(
        <div>
            <div className="flex items-center point py-1 px-3" onClick={toggleTrash}>
                <img className="w-5 h-5 mr-2" src={trash} alt="templates" />
                <p className="text-sm font-semibold text-gray-600">Trash</p>
            </div>
            {isTrash && <div>
                
            </div>}
        </div>
        
    )
}