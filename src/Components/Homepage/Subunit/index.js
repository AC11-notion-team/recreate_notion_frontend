import React from "react";
import { IoIosArrowDown } from "react-icons/io";

const  Nav = props => (
    <nav className="  md:flex  items-center max-w-7xl mx-auto  py-5 sticky top-0 left-0 right-0 bg-[#fffefc] z-20">
        <div className="flex item-center flex-wrap items-center max-auto">
            <div className="flex items-center  h-12 w-10 "><img src="/zettel.png" alt="" /></div>
            <span className="text-xl font-bold ml-2">Zettel</span>
        </div>
        <div className="hidden md:block p-1 text-xl">
            <ul className="flex ">
            <NavItem href="/Product" text="Product">
            {/* {isHovered  ?   <Navlist /> : null}    */}
            </NavItem>
            <IoIosArrowDown />
                        
            <NavItem href="/Download" text="Download" /><IoIosArrowDown />
            <NavItem href="/Solitions" text="Solitions" /><IoIosArrowDown />
            <NavItem href="/Resources" text="Resources" /><IoIosArrowDown />
            <NavItem href="/Pricing" text="Pricing" />
    
            </ul>
        </div>
        <div className="flex-1 flex justify-end max-auto">
            <ul className="flex flex-wrap items-center  text-xlg ">
                <NavItem href="/Contact sales" classname="border-r-1 relative after:absolute after:bg-gray-100 after:w-0.5 after:h-6 after:-right-2" text="Contact sales"/>
                <NavItem href="/login-page" text="Log in" />
                <Button type="submit" >Try Zettel free</Button>
            </ul>
        </div>
    </nav>
)

const Button = props => (
    <button 
        type={props} 
        className="bg-red-400 hover:bg-red-500 transition-color duration-200 text-white text-xl p-3 rounded border border-red-100 "
        >
        {props.children}
    </button>
)

const NavItem = props => (
    <li className="mx-2">
        <a 
        href={props.href}
        className={`text-xl font-bold text-gray-700 px-2 py-1 hover:bg-gray-300 rounded transition-colors duration-300 ${props.classname}`}
        >
        {props.text}   
        {props.children}
        </a>
    </li> 
);

export default function EditableBlock () {
    return (
     <>
        <Nav/>
        <div className="max-w-full bg-[#fffefc] ">
            <div className="text-center md:text-left md:flex justify-between max-w-7xl mx-auto  md:mt-28 ">
                <div>
                <h1 className="font-bold text-7xl leading-tight  mb-2 ">One workspace. <br/> Every team.</h1>
                <p className="text-2xl font-light leading-9 mb-4 text-gray-400 ">We’re more than a doc. Or a table. Customize <br/> Notion to work the way you do.</p>
                <Button type="submit" >Try Zettel free</Button>
                </div>
                <form onSubmit={(event) => {
                    event.preventDefault();
                    console.log("TODO submit form")
                    }}
                    className="hidden md:block space-x-1" 
                    >
                    {/* <Button  type="submit">Try Notion free</Button> */}
                </form>
                <div className="md:flex max-w-xl content-start  ">
                    <img src="https://www.notion.so/cdn-cgi/image/format=auto,width=1080,quality=100/front-static/pages/product/home-page-hero-refreshed-v3.png" alt="" />
                </div>
            </div>
            <div className="text-slate-500 max-w-7xl mx-auto text-lg">
                <p>Trusted by teams at</p>
            </div>
            <div className=" mt-4 grayscale max-w-7xl mx-auto md:flex  items-center">
                    <img className="pr-6 w-36  " src="https://images.ctfassets.net/spoqsaf9291f/248lpDOefbem7N1Q6QU9zn/ab900c553ee4e237a5901d799aa465ca/mixpanel.png" alt="" />
                    <img className="pr-6 w-36  " src="https://images.ctfassets.net/spoqsaf9291f/2Z03v7BH2brwtBG2qdA5dp/d6cd228d2f7b6048edcec9f4d5bcce3c/match.png" alt="" />
                    <img className="pr-6 w-36  " src="https://images.ctfassets.net/spoqsaf9291f/6AabaXna2K3eJLtU4k2yeq/9b9e2e7bf029f2cc8047a5b27cac1208/curology.png" alt="" />
                    <img className="pr-6 w-36  " src="https://images.ctfassets.net/spoqsaf9291f/xDZNk5XtOxMEiqsiJ6paq/c9958ceead0fb85872449d26186d62b1/headspace__1_.png" alt="" />
            </div>
        </div>
    </>
    )
}
