import React from "react";

const Product = [
    'Overview',
    'Pricing',
    'Customer stories',
    'Integrations',
    'Desktop apps',
    'Mobile apps',
    'Web Clipper',
    'Security',
    'Terms & privacy',
]
const Notionfor = [
    'Enterprise',
    'Small business',
    'Personal use',
    'Remote work',
    'Startups',
    'Education',
    'Engineering',
    'Product',
    'Design',
    'Managers',
] 
const Resource = [
    'Blog',
    'Guides & tutorials',
    'Help center',
    'Webinars',
    'Template gallery',
    'Community',
    'What’s new',
    'Find a consultant',
    'API docs',
    'Switch from Evernote',
    'Switch from Confluence',
]
const Templates = [
    'Company home',
    'Meeting notes',
    'To-dos',
    'Weekly agenda',
    'Docs',
    'Roadmap',
    'Design system',
    'New hire onboarding',
    'Product wiki',
    'Content calendar',
]
const Company = [
    'About us',
    'Careers',
    'Media kit',
    'Contact sales',
    'Contact support',
    'Email us',
]
export default function Resources (props) {
    return (
    <>
        <div className="max-w-7xl mx-auto pb-28 border-b-2  border-grey-100 mt-32 mb-20 bg-[#fffefc]"/>
        <div className="max-w-7xl mx-auto  flex ">   
             <div className=" w-full justify-between md:flex">
                <div className="flex mr-5">
                    <img className="h-12 w-12 mr-3 " src="/zittel1.png" alt="" />
                    <p className="text-lg font-bold mt-2 ">Zittel</p>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold ">Product</h2>
                    <ul className="text-xl font-light leading-9 mb-4 text-gray-400 ">{Product.map((item , index)=><a href="#"><li className="hover:text-red-500 hover:underline decoration-2" id={index} >{item}</li></a>)}</ul>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold ">Notion for</h2>
                    <ul className="text-xl font-light leading-9 mb-4 text-gray-400 ">{Notionfor.map((item , index)=><a href="#"><li className="hover:text-red-500 hover:underline decoration-2" id={index} >{item}</li></a>)}</ul>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold ">Resource</h2>
                    <ul className="text-xl font-light leading-9 mb-4 text-gray-400 ">{Resource.map((item , index)=><a href="#"><li className="hover:text-red-500 hover:underline decoration-2" id={index} >{item}</li></a>)}</ul>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold ">Templates</h2>
                    <ul className="text-xl font-light leading-9 mb-4 text-gray-400 ">{Templates.map((item , index)=><a href="#"><li className="hover:text-red-500 hover:underline decoration-2" id={index} >{item}</li></a>)}</ul>
                </div>
                <div>
                    <h2 className="text-2xl font-semibold ">Company</h2>
                    <ul className="text-xl font-light leading-9 mb-4 text-gray-400 ">{Company.map((item , index)=><a href="#"><li className="hover:text-red-500 hover:underline decoration-2" id={index} >{item}</li></a>)}</ul>
                </div>
            </div>
        </div> 
    </>
    )
}