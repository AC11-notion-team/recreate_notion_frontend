import React, { useEffect, useMemo, useContext, useState, useCallback } from 'react'
import ActionCable from 'actioncable'
import { useCurrentPageId } from "./CurrentPageId";
import jwt_decode from "jwt-decode";

const WsReceivedContext = React.createContext();

export function useWsReceivedData() {
	return useContext(WsReceivedContext);
}

export function WsReceivedProvider({ children }){
    const [wsReceivedData, setWsReceivedData] = useState(() => "");
    const currentPageId = useCurrentPageId()
    const socketUrl = `ws://localhost:3001/cable`;
    const {user_id} = jwt_decode(localStorage.getItem("zettel_user_token"))
    const actionCable = useMemo(() => ActionCable.createConsumer(socketUrl), [socketUrl])
    useEffect(() => {
        actionCable.subscriptions.create({"channel": "PageChannel", "id": currentPageId }, 
        {
            connected: () => console.log("Connect to Acontion Cable"), 
            received: (data) => {
                if(data.user_id !== user_id){
                    setWsReceivedData(data.blocks)
                }
            }
        })
        console.log(`subscribed: ${currentPageId}`)
        return () => {
            console.log('Disconnect to Action Cable')
            actionCable.disconnect()
            setWsReceivedData("")
        } 
    }, [currentPageId, actionCable, user_id])

    return (
        <WsReceivedContext.Provider value={wsReceivedData}>
			{ children }
		</WsReceivedContext.Provider>
    )
    
}