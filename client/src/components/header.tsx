import { NavLink, useNavigate } from "react-router-dom";
import { ModeToggle } from "./mode-toggle";
import { Button } from "@/components/ui/button";
import { getUsername } from "@/utils/fetch";
import { useEffect, useState } from "react";

export function Header() {
	const navigate = useNavigate();
	const userId = localStorage.getItem("userId");
	const [username, setUsername] = useState("");

	useEffect(() => {
		if (userId) {
			getUsername(userId).then(setUsername);
		}
	}, [userId]);

	const handleLogout = () => {
		localStorage.removeItem("access_token");
		localStorage.removeItem("userId");
		navigate("/");
	}

	return (
		<header className="py-4 px-8 flex items-center justify-between">
			<NavLink
				to={"/home"}
				className="font-bold text-3xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-400 hover:opacity-80 hover:cursor-pointer"
			>
				NoteApp
			</NavLink>
			<div className="flex items-center gap-4">
				<p>Bienvenue, {username}</p>
				<ModeToggle />
				<NavLink to={"/profil"} className="py-2 px-3 border rounded-md hover:bg-amber-600">Profile</NavLink>
				<Button
					variant="outline"
					onClick={handleLogout}
					className="hover:bg-amber-600"
				>
					Déconnexion
				</Button>
			</div>
		</header>
	);
}
