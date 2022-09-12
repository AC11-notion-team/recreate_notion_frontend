import React from "react";
import PageList from "./PageList";

export default function Share ({state}){
    return(
        <div>
            {state && <div>
                <div className="py-1 px-4">
                    <p className="text-xs font-semibold text-gray-500 point">SHARED</p>
                </div>
                
            </div>}
        </div>
    )
}