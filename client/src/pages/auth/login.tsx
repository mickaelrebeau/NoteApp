import { Login, loginSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { MoveLeft } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { login } from "@/utils/fetch";


const defaultconfig = {
	email: "",
	password: "",
};

export function Signin() {
	const navigate = useNavigate();
	
	const form = useForm<Login>({
		mode: "onSubmit",
		resolver: zodResolver(loginSchema),
		defaultValues: defaultconfig,
	});

	const onSubmit = async (user: Login) => {
		const data = await login(user);
		if (data) {
			const access_token = data.access_token;
			localStorage.setItem("access_token", access_token);

			const userId = data.userId;
			localStorage.setItem("userId", userId);
			
			form.reset();
			navigate("/home");
		}
	};

	return (
		<section className="h-screen flex flex-col items-center justify-center gap-12">
			<p className="w-[400px] flex items-center gap-2 text-slate-500 hover:text-yellow-400">
				<MoveLeft className="cursor-pointer" />
				<NavLink to={"/"}>Retour a l'accueil</NavLink>
			</p>
			<h1 className="font-bold text-5xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-400">
				Connexion
			</h1>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className="w-[400px] flex flex-col gap-4"
				>
					<FormField
						control={form.control}
						name="email"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Adresse email</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="email"
										value={field.value || ""}
										placeholder="exemple@email.com"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<FormField
						control={form.control}
						name="password"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Mot de passe</FormLabel>
								<FormControl>
									<Input
										{...field}
										type="password"
										value={field.value || ""}
										placeholder="@1exemplePassword"
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					<Button
						type="submit"
						className="mt-8 w-full py-2 rounded-md text-2xl font-semibold text-amber-500 dark:text-amber-600 cursor-pointer hover:text-white dark:hover:text-white bg-transparent hover:bg-gradient-to-r from-amber-600 to-yellow-400 hover:shadow-2xl hover:shadow-amber-600/50"
					>
						Se connecter
					</Button>
				</form>
			</Form>
		</section>
	);
}
