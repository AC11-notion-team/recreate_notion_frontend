import React from "react";
import email from "./img/email.png"
import github from "./img/github-sign.png"


export default function Resources (props) {
    return (
    <>
        <div className="max-w-7xl mx-auto pb-28 border-b-2  border-grey-100 mt-32 mb-20 bg-[#fffefc] pt-64 md:pt-44"/>
        <div className="max-w-8xl mx-auto w-11/12">   
            <div className="w-full grid lg:grid-rows-3 lg:grid-cols-3 md:grid-row-2 md:grid-cols-2 grid-row-1 grid-cols-1">
                <div className="mx-auto md:mx-0">
                    <img className="h-24 w-24 md:ml-20 " src="/zettel.png" alt="Zettel" />
                    <p className="text-lg font-bold ml-4 md:ml-24">Zettel</p>
                </div >
                <div className="mx-auto md:mx-0">
                    <h2 className="text-2xl font-semibold ">Vic</h2>
                    <ul className="text-xl font-light leading-9 mb-4 text-gray-400 ">
                        <li className="hover:text-red-500 hover:underline decoration-2 flex items-center" >
                            <img src={email} alt="email" className="w-5 h-5 mr-2"/>
                            <p>kkss886@yahoo.com.tw</p> 
                        </li>
                        <li className="hover:text-red-500 hover:underline decoration-2 flex items-center" >
                            <img src={github} alt="github" className="w-5 h-5 mr-2"/>
                          <a href="https://github.com/Tsaian">https://github.com/Tsaian</a> 
                        </li>
                    </ul>
                </div>
                <div className="mx-auto md:mx-0">
                    <h2 className="text-2xl font-semibold ">Alviz</h2>
                    <ul className="text-xl font-light leading-9 mb-4 text-gray-400 ">
                        <li className="hover:text-red-500 hover:underline decoration-2 flex items-center" >
                            <img src={email} alt="email" className="w-5 h-5 mr-2"/>
                            <p>109363053@nccu.edu.tw</p> 
                        </li>
                        <li className="hover:text-red-500 hover:underline decoration-2 flex items-center" >
                            <img src={github} alt="github" className="w-5 h-5 mr-2"/>
                          <a href="https://github.com/Tsaian">https://github.com/Juttiz</a> 
                        </li>
                    </ul>
                </div>
                <div className="mx-auto md:mx-0">
                    <h2 className="text-2xl font-semibold ">Ted</h2>
                    <ul className="text-xl font-light leading-9 mb-4 text-gray-400 ">
                        <li className="hover:text-red-500 hover:underline decoration-2 flex items-center " >
                            <img src={email} alt="email" className="w-5 h-5 mr-2"/>
                            <p>wodf410@gmail.com</p> 
                        </li>
                        <li className="hover:text-red-500 hover:underline decoration-2 flex items-center" >
                            <img src={github} alt="github" className="w-5 h-5 mr-2"/>
                          <a href="https://github.com/Tsaian">https://github.com/TedxTed</a> 
                        </li>
                    </ul>
                </div>
                <div className="mx-auto md:mx-0">
                    <h2 className="text-2xl font-semibold ">Gingko</h2>
                    <ul className="text-xl font-light leading-9 mb-4 text-gray-400 ">
                        <li className="hover:text-red-500 hover:underline decoration-2 flex items-center" >
                            <img src={email} alt="email" className="w-5 h-5 mr-2"/>
                            <p>ginkgochang@gmail.com</p> 
                        </li>
                        <li className="hover:text-red-500 hover:underline decoration-2 flex items-center" >
                            <img src={github} alt="github" className="w-5 h-5 mr-2"/>
                          <a href="https://github.com/Tsaian">https://github.com/YinHsing</a> 
                        </li>
                    </ul>
                </div>
                <div className="mx-auto md:mx-0 pl-8 md:pl-0">
                    <h2 className="text-2xl font-semibold ">Luna</h2>
                    <ul className="text-xl font-light leading-9 mb-4 text-gray-400 ">
                        <li className="hover:text-red-500 hover:underline decoration-2 flex items-center" >
                            <img src={email} alt="email" className="w-5 h-5 mr-2"/>
                            <p>ruxuanzhuang@gmail.com</p> 
                        </li>
                        <li className="hover:text-red-500 hover:underline decoration-2 flex items-center" >
                            <img src={github} alt="github" className="w-5 h-5 mr-2"/>
                          <a href="https://github.com/Tsaian">https://github.com/LunaZhuang</a> 
                        </li>
                    </ul>
                </div>
            </div>
        </div> 
    </>
    )
}