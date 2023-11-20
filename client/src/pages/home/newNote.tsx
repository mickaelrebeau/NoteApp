import { MoveLeft } from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { Notes, noteSchema } from "@/utils/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileForm } from "@/components/fileForm";
import { useState } from "react";
import { postNote } from "@/utils/fetch";

const defaultconfig = {
	title: "",
	description: "",
	label: "",
};
export function NewNote() {
	const navigate = useNavigate();
	const [files, setFiles] = useState<File[]>([]);

	const form = useForm<Notes>({
		mode: "onSubmit",
		resolver: zodResolver(noteSchema),
		defaultValues: defaultconfig,
	});

	const onSubmit = async (note: Notes) => {
		const data = await postNote(note, files);

		if (data) {
			form.reset();
			setFiles([]);
			navigate("/home");
		}
	};

	return (
		<section className="pt-8 pb-12 flex flex-col items-center justify-center gap-8 overflow-hidden">
			<p className="w-[400px] flex items-center gap-2 text-slate-500 hover:text-yellow-400">
				<MoveLeft className="cursor-pointer" />
				<NavLink to={"/home"}>Retour a l'accueil</NavLink>
			</p>
			<div className="w-[400px] flex flex-col gap-4">
				<h2 className="font-bold text-2xl text-center text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-yellow-400">
					Nouvelle note
				</h2>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-[400px] flex flex-col gap-4"
					>
						<FormField
							control={form.control}
							name="title"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Titre</FormLabel>
									<FormControl>
										<Input
											{...field}
											type="text"
											value={field.value || ""}
											placeholder="Titre de la note"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="description"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Description</FormLabel>
									<FormControl>
										<Textarea
											{...field}
											value={field.value || ""}
											placeholder="Description de la note"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<Select
										onValueChange={field.onChange}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue placeholder="Selectionner un label" />
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											<SelectItem value="bug">Bug</SelectItem>
											<SelectItem value="fix">Fix</SelectItem>
											<SelectItem value="feature">Feature</SelectItem>
											<SelectItem value="documentation">
												Documentation
											</SelectItem>
											<SelectItem value="other">Autre</SelectItem>
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>

						<div className="flex flex-col gap-4">
							<Label>Fichiers</Label>
							<FileForm files={files} setFiles={setFiles} />
						</div>

						<Button
							type="submit"
							className="mt-8 w-full py-2 rounded-md text-2xl font-semibold text-amber-500 dark:text-amber-600 cursor-pointer hover:text-white dark:hover:text-white bg-transparent hover:bg-gradient-to-r from-amber-600 to-yellow-400 hover:shadow-2xl hover:shadow-amber-600/50"
						>
							Ajouter
						</Button>
					</form>
				</Form>
			</div>
		</section>
	);
}