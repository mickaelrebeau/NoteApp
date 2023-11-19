import { Signup, signupSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { signup } from "@/utils/fetch";

const defaultconfig = {
	pseudo: "",
	email: "",
	password: "",
};

export function HeroPage() {
	const navigate = useNavigate();

	const form = useForm<Signup>({
		mode: "onSubmit",
		resolver: zodResolver(signupSchema),
		defaultValues: defaultconfig,
	});

	const onSubmit = async (user: Signup) => {
		const data = await signup(user);
		if (data) {
			form.reset();
			navigate("/login");
		}
	};

	return (
		<section className="h-screen flex items-center justify-center gap-8">
			<div className="text-center">
				<span className="font-bold text-8xl text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-400">
					NoteApp{" "}
				</span>
				<p className="text-3xl">prise de notes</p>
				<p className="max-w-[700px] my-16 text-slate-500 text-center text-2xl">
					La prise de note n'auras jamais été aussi facile ! Ne perd plus de
					temps ! Retrouve tes notes rapidement et facilement !
				</p>
				<p className="mt-8 text-slate-500">
					Tu as deja un compte ?
					<NavLink
						className="text-amber-500 dark:text-amber-600 ml-2 hover:text-yellow-400"
						to={"/login"}
					>
						Connecte-toi !
					</NavLink>
				</p>
			</div>
			<div className="flex flex-col items-center gap-4">
				<h2 className="font-bold text-2xl text center text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-400">
					Créer un compte
				</h2>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-[400px] flex flex-col gap-4"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Nom d'utilisateur</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="text"
											value={field.value || ""}
											placeholder="ExempleUser123"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

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
							S'inscrire
						</Button>
					</form>
				</Form>
			</div>
		</section>
	);
}