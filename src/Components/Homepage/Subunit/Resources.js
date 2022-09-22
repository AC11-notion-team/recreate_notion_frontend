import React from "react";
import email from "./img/email.png"
import github from "./img/github-sign.png"


export default function Resources (props) {
    return (
    <>
        <div className="max-w-7xl mx-auto pb-28 border-b-2  border-grey-100 mt-32 mb-20 bg-[#fffefc]"/>
        <div className="max-w-7xl mx-auto">   
            <div className="w-full grid grid-rows-3 grid-cols-3">
                <div >
                    <img className="h-24 w-24 ml-20" src="/zettel.png" alt="Zettel" />
                    <p className="text-lg font-bold ml-24">Zettel</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold ">Vic</h2>
                    <ul className="text-xl font-light leading-9 mb-4 text-gray-400 ">
                        <li className="hover:text-red-500 hover:underline decoration-2 flex items-center" >
                            <img src={email} alt="email" className="w-5 h-5 mr-2"/>
                            <p>72qyrcnxm8@privaterelay.appleid.com</p> 
                        </li>
                        <li className="hover:text-red-500 hover:underline decoration-2 flex items-center" >
                            <img src={github} alt="github" className="w-5 h-5 mr-2"/>
                          <a href="https://github.com/Tsaian">https://github.com/Tsaian</a> 
                        </li>
                    </ul>
                </div>
                <div>
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
                <div>
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
                <div>
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
                <div>
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