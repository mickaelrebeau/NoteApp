/* eslint-disable react-hooks/exhaustive-deps */
import { MoveLeft } from "lucide-react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
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
import { useEffect, useState } from "react";
import { getNote, updateNote } from "@/utils/fetch";
import { ConfirmModalFile } from "@/components/modals/confirmModalFile";

interface ServerFile {
	id: string;
	originalname: string;
	path: string;
}

export function EditNote() {
	const navigate = useNavigate();
	const { id } = useParams();

	const [note, setNote] = useState<Notes>({
		title: "",
		description: "",
		label: "",
	});
	const [files, setFiles] = useState<ServerFile[]>([]);
	const [newFilesList, setNewFilesList] = useState<File[]>([]);

	const form = useForm<Notes>({
		mode: "onSubmit",
		resolver: zodResolver(noteSchema),
		defaultValues: note,
	});


	useEffect(() => {
		if (id !== undefined) {
			getNote(id).then((data) => {
				setFiles(data.files);

				setNote({
					title: data.title,
					description: data.description,
					label: data.label,
				});

				form.reset({
					title: data.title,
					description: data.description,
					label: data.label,
				});
			});
		}
	}, [id]);

	const onSubmit = async (newNote: Notes) => {
		if (id !== undefined) {
			const data = await updateNote(id, newNote, newFilesList);

			if (data) {
				form.reset();
				setFiles([]);
				navigate("/home");
			}
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
					Edition de note
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
											name="title"
											value={field.value}
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
											name="description"
											value={field.value}
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
									<Select onValueChange={field.onChange} value={field.value}>
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

							<div className="flex flex-col gap-2">
								{files.map((file) => (
									<div
										key={file.id}
										className="flex items-center justify-between gap-2"
									>
										<p className="text-slate-500"> - {file.originalname} </p>
										<ConfirmModalFile id={file.id} />
									</div>
								))}
							</div>

							<FileForm files={newFilesList} setFiles={setNewFilesList} />
						</div>

						<div className="flex gap-4">
							<NavLink
								to={"/home"}
								className="mt-8 w-full flex items-center justify-center rounded-md text-2xl text-center font-semibold cursor-pointer hover:text-white dark:hover:text-white bg-transparent hover:bg-slate-200 dark:hover:bg-slate-800 to-yellow-400"
							>
								Annuler
							</NavLink>
							<Button
								type="submit"
								className="mt-8 w-full py-2 rounded-md text-2xl font-semibold text-amber-500 dark:text-amber-600 cursor-pointer hover:text-white dark:hover:text-white bg-transparent hover:bg-amber-600"
							>
								Confirmer
							</Button>
						</div>
					</form>
				</Form>
			</div>
		</section>
	);
}