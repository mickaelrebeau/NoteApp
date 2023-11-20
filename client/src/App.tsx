import { Navigate, Outlet, Route, Routes, useLocation} from "react-router-dom";
import "./App.css";
import { Home } from "./pages/home/home";
import { ThemeProvider } from "./components/theme-provider";
import { HeroPage } from "./pages/auth/hero";
import { Signin } from "./pages/auth/login";
import { NewNote } from "./pages/home/newNote";
import { Header } from "./components/header";
import { EditNote } from "./pages/home/editNote";

function App() {
	return (
		<>
			<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
				<Routes>
					<Route path="/" element={<Layout />}>
						{/* Auth pages */}
						<Route index element={<HeroPage />} />
						<Route path="/login" element={<Signin />} />

						{/* Website pages */}
						<Route path="/home" element={<Home />} />
						<Route path="/new" element={<NewNote />} />
						<Route path="/edit/:id" element={<EditNote />} />
					</Route>
				</Routes>
			</ThemeProvider>
		</>
	);
}

function Layout() {
	const { pathname } = useLocation();
	const authPages = ["/", "/login"];
	const isAuthPage = authPages.includes(pathname);
	const access_token = localStorage.getItem("access_token");
	const auth = { access_token: access_token };

	if (isAuthPage) return <Outlet />;

	return auth.access_token ? (
		<>
			<div className="h-full overflow-hidden">
				<Header />
				<div className="overflow-y-auto">
					<Outlet />
				</div>
			</div>
		</>
	) : (
		<Navigate to="/" />
	);
}

export default App;
