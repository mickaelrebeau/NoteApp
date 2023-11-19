import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

export function ModeToggle() {
	const { setTheme } = useTheme();

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button className="hover:bg-amber-600" variant="outline" size="icon">
					<Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
					<Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
					<span className="sr-only">Toggle theme</span>
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem
					className="cursor-pointer focus:bg-amber-600"
					onClick={() => setTheme("light")}
				>
					Claire
				</DropdownMenuItem>
				<DropdownMenuItem
					className="cursor-pointer focus:bg-amber-600"
					onClick={() => setTheme("dark")}
				>
					Sombre
				</DropdownMenuItem>
				<DropdownMenuItem
					className="cursor-pointer focus:bg-amber-600"
					onClick={() => setTheme("system")}
				>
					Système
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
