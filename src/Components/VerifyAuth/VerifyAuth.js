import React, {useEffect} from 'react'
import { useLocation, Navigate, Outlet } from 'react-router-dom'
import axios from 'axios'
import { useCurrentPageChange } from "../../Hooks/CurrentPage"
import { usePagesUpdate } from "../../Hooks/Pages"
import { useParams } from "react-router-dom"

const VerifyAuth = () =>{
    const baseUrl = process.env.REACT_APP_BASEURL;
	const token = `Bearer ${localStorage.getItem("zettel_user_token") || null}`;
    const location = useLocation();
    const changeCurrentPage = useCurrentPageChange()
    const params = useParams()
    const changePages = usePagesUpdate()
    useEffect(() => {
		axios({
			method: "get",
			url: `${baseUrl}/users/${localStorage.getItem("zettel_user_id")}`,
			headers: {
				"Content-Type": "application/json",
				Authorization: token,
			},
		}).then((response)=>{
			const return_data = response?.data?.pages
			changePages(return_data);
			const currentPageId = params["page_id"] || localStorage.getItem("currentPageId") || return_data?.[0].id
			const currentPage = return_data.filter(page => page.id === currentPageId)?.[0]
			console.log(currentPage)
			changeCurrentPage(currentPage);
		}).catch(error => console.error(error))
	}, [baseUrl, changeCurrentPage, params, token]);
    return (
        true
            ? < Outlet />
            : < Navigate to="/login-page" state={{ from: location }} replace />
    )
}

export default VerifyAuth