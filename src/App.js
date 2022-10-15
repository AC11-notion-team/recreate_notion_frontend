import React, { useState, useLayoutEffect, useCallback } from "react";
import "./App.css";
import Editor from "./Components/Editor/Editor";
import Header from "./Components/Navbar/Header";
import Sidebar from "./Components/Sidebar/Sidebar";
import Split from "split.js";
import PageHeader from "./Components/PageHeader/PageHeader.js";
import { CurrentPageProvider } from "./Hooks/CurrentPage";
import { PagesProvider } from "./Hooks/Pages";
import { InviteProvider } from "./Hooks/InviteUser";
import { TrashPagesProvider }from "./Hooks/TrashPages"

function App() {
	// 控制sidebar 出現跟消失
	const [isSide, setIsSide] = useState(true);
	const toggleSide = useCallback(() => setIsSide((prevSide) => !prevSide), []);

	//  側邊欄拖拉
	useLayoutEffect(() => {
		if (isSide) {
			Split(["#split-0", "#split-1"], {
				sizes: [20, 80],
				maxSize: [500, Infinity],
				minSize: [200, 200],
				gutterSize: 2,
				dragInterval: 2,
				gutterAlign: "start",
			});
		}
	}, [isSide]);

	return (
		<PagesProvider>
			<CurrentPageProvider>
				<TrashPagesProvider>
					<InviteProvider>
						<div>
							<div className="flex w-full h-screen split">
								{isSide && (
									<div id="split-0" className="relative flex-grow-0 side-minW">
										<Sidebar
											toggleSide={toggleSide}
										/>
									</div>
								)}

								<div id="split-1" className="flex-grow overflow-hidden">
									<Header
										isSide={isSide}
										toggleSide={toggleSide}
									/>
									<div className="relative overflow-auto content ">
										<PageHeader />
										<Editor />
									</div>
								</div>
							</div>
						</div>
					</InviteProvider>
				</TrashPagesProvider>
			</CurrentPageProvider>
		</PagesProvider>
	);
}
export default App;
