import React from "react";

const Button = props => (
    <button 
        type={props} 
        className="bg-red-400 hover:bg-red-500 transition-color duration-200 text-white text-xl p-3 rounded border border-red-100 "
        >
        {props.children}
    </button>
);

export default function Features (props) {
    return (
    <>
        <div className="mx-auto max-w-6xl bg-[#fffefc] "> 
            <div className="md:flex mt-20 items-center">
                <div className="w-8/12  drop-shadow-2xl rounded">
                    <img className="rounded-xl" src={require('./img/features1.png')} alt="" />
                </div>
                <div className=" w-4/12 ml-6 ">
                    <img className="w-32" src="https://www.notion.so/cdn-cgi/image/format=auto,width=256,quality=100/front-static/pages/product/spot/spot-team-up.png" alt="" />
                    <br />
                    <h2 className="text-4xl font-bold mb-12">Team up without the chaos</h2>
                    <p className="text-xl text-gray-400">Connect your teams, projects, and docs in Notion — so you can bust silos and move as one.</p>
                </div>
            </div>

            <div className="md:flex mt-20 items-center">
                <div className="w-8/12  drop-shadow-2xl rounded">
                    <img className="rounded-xl" src={require('./img/features2.png')} alt="" />
                </div>
                <div className=" w-4/12 ml-6">
                    <img className="w-32" src="https://www.notion.so/cdn-cgi/image/format=auto,width=256,quality=100/front-static/pages/product/spot/spot-context.png" alt="" />
                    <br />
                    <h2 className="text-4xl font-bold mb-12">Never ask “What’s the context?” again</h2>
                    <p className="text-xl text-gray-400">Stale wikis aren't helpful. Neither are floating docs. In Notion, your daily work and knowledge live side by side — so you never lose context.</p>
                </div>
            </div>

            <div className="md:flex mt-20 items-center">
                <div className="w-8/12  drop-shadow-2xl  rounded">
                    <img className="rounded-xl" src={require('./img/features3.png')} alt="" />
                </div>
                <div className=" w-4/12 ml-6 ">
                    <img className="w-32" src="https://www.notion.so/cdn-cgi/image/format=auto,width=384,quality=100/front-static/pages/product/spot/spot-workflow.png" alt="" />
                    <br />
                    <h2 className="text-4xl font-bold mb-12">Build the workflow you want</h2>
                    <p className="text-xl text-gray-400">Customize Notion to make it work the way you want it to. Just drag and drop to craft the dashboard, website, doc, or system you need.</p>
                </div>
            </div>

            <div className="md:flex mt-20 items-center">
                <div className="w-8/12  drop-shadow-2xl rounded">
                    <img className="rounded-xl" src={require('./img/features4.png')} alt="" />
                </div>
                <div className=" w-4/12 ml-6">
                    <img className="w-32" src="https://www.notion.so/cdn-cgi/image/format=auto,width=128,quality=100/front-static/pages/product/spot/spot-ecosystem.png" alt="" />
                    <br />
                    <h2 className="text-3xl font-bold mb-6">Benefit from a global ecosystem of creators</h2>
                    <p className="text-xl text-gray-400">Get inspiration from thousands of community-made templates, integrations, and events.You'll never want for resources or support..</p>
                </div>
            </div>
            <div className="pb-28 border-b-2  border-grey-100 bg-[#fffefc] "/>
        </div>    
        <div className="max-w-6xl mx-auto md:flex justify-between mb-14 bg-[#fffefc]">
            <div className="mt-20 ">
                <h2 className="font-bold text-5xl leading-tight  mb-2">Built for endless uses.<br/>Across all teams.</h2>
                <h3 className="text-2xl font-light leading-9 mb-4 text-gray-400 ">Notion solves problems common and unique to<br/> every team. These are just a few.</h3>
                <a href="/app"> <Button>Try Zettel free</Button></a>
            </div>
            <div className="md:flex  content-start mt-20">
                <img className="w-72" src="https://www.notion.so/cdn-cgi/image/format=auto,width=3840,quality=100/front-static/pages/product/bookshelf-spot.png" alt="" />
            </div>
        </div>
    </>
    )
}   