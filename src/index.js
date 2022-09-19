import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./Components/Homepage";
import LoginPage from "./Components/Loginpage/LoginPage.js";
import RequireAuth from "./Components/RequireAuth";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CurrentPageIdProvider } from "./CurrentPageId";
import { PagesProvider } from "./Pages";
import { InviteProvider } from "./InviteUser";
import {EmojiStateProvider} from "./EmojiState"
import {TrashPagesProvider}from "./TrashPages"
import {FavoriteProvider} from "./Favorite"

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<>
		<PagesProvider>
			<CurrentPageIdProvider>
				<FavoriteProvider>
					<TrashPagesProvider>
						<InviteProvider>
							<EmojiStateProvider>
								<BrowserRouter>
									<Routes>
										<Route element={< RequireAuth />}>
											<Route path="/" element={<App />} />
											<Route path="/:page_id" element={<App />} />
										</Route>
										<Route path="homepage" element={<HomePage />} />
										<Route path="login-page" element={<LoginPage />} />
									</Routes>
								</BrowserRouter>
							</EmojiStateProvider>
						</InviteProvider>
					</TrashPagesProvider>
				</FavoriteProvider>
			</CurrentPageIdProvider>
		</PagesProvider>
	</>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
