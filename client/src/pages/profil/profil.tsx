/* eslint-disable react-hooks/exhaustive-deps */
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { User, userSchema } from "@/utils/schemas";
import { useEffect, useState } from "react";
import { getUser, updateUser } from "@/utils/fetch";

export function Profil() {
	const userId = localStorage.getItem("userId");

	const [user, setUser] = useState<User>({
		username: "",
		email: "",
	});

	const form = useForm<User>({
		mode: "onSubmit",
		resolver: zodResolver(userSchema),
		defaultValues: user,
	});

	const onSubmit = async (user: User) => {
		if (userId !== null) {
			const data = await updateUser(userId, user)

			if (data) {
				form.reset({
					username: data.username,
					email: data.email,
				});

				setUser({
					username: data.username,
					email: data.email,
				});

				window.location.reload();
			}
		}
	};

	useEffect(() => {
		if (userId !== null) {
			getUser(userId).then((data) => {
				setUser({
					username: data.username,
					email: data.email,
				});

				form.reset({
					username: data.username,
					email: data.email,
				});
			});
		}
	}, [userId]);

	return (
		<section className="p-8 h-screen flex flex-col items-center gap-8">
			<div className="w-full">
				<h1 className="text-2xl font-semibold">Profile</h1>
				<p className="text-slate-500">
					Prend en main toutes tes informations sur ton profile.
				</p>
			</div>
			<div className="w-1/3">
				<Button variant="outline" className="w-full mb-8">Modifier Le mot de passe</Button>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="flex flex-col gap-4"
					>
						<FormField
							control={form.control}
							name="username"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Pseudo</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="text"
											name="username"
											value={field.value}
											placeholder="Username"
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
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="email"
											name="email"
											value={field.value}
											placeholder="Email"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button
							type="submit"
							variant="outline"
							className="mt-8 hover:bg-amber-600"
						>
							Mettre à jour
						</Button>
					</form>
				</Form>
			</div>
		</section>
	);
}
