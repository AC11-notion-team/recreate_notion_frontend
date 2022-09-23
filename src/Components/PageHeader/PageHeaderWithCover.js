import React from 'react'
import CircleLoader from "react-spinners/CircleLoader";

function PageHeaderWithCover({isChangeCover, cover, loading}){
    const override = {
		display: "block",
		margin: "auto",
		borderColor: "red",
        position: "absolute",
        bottom: "6rem",
        top: "6rem",
        left: "6rem",
        right: "6rem",
	};
    return (
        <div className="relative w-full h-48" >
            {isChangeCover && (
                <label
                    htmlFor="coverImg"
                    className="absolute px-1 py-0.5 text-sm bg-white text-black border rounded right-5 bottom-2 z-10"
                >change cover</label>
            )}
            <img
                src={cover}
                className="object-cover w-full h-full"
                alt="cover"
            />
            <CircleLoader
                color="#d69636"
                loading={loading}
                cssOverride={override}
                size={50}
            />
        </div>
    )
}

export default PageHeaderWithCover