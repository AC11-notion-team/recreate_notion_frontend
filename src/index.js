import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import HomePage from "./Components/Homepage";
import LoginPage from "./Components/Loginpage/LoginPage.js";
import RequireAuth from "./Components/RequireAuth/RequireAuth";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { CurrentPageIdProvider } from "./Hooks/CurrentPageId";
import { PagesProvider } from "./Hooks/Pages";
import { InviteProvider } from "./Hooks/InviteUser";
import {EmojiStateProvider} from "./Hooks/EmojiState"
import {TrashPagesProvider}from "./Hooks/TrashPages"
import {FavoriteProvider} from "./Hooks/Favorite"

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
											<Route path="/app" element={<App />} />
											<Route path="/app/:page_id" element={<App />} />
										</Route>
										<Route path="/" element={<HomePage />} />
										<Route path="login-page" element={<LoginPage />} />
										<Route path="*" element={<Navigate to="/" replace />} />
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
