/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

interface File {
	id: string;
	path: string;
	originalname: string;
}

export function ListeNotes({ label, datas }: { label: { value: string, label: string }; datas: any[] }) {
	const link = "http://localhost:3000/";

	return (
		<div className="w-full p-4 flex flex-col gap-4 bg-gray-100/50 dark:bg-gray-800/20 rounded-sm">
			<h2 className="text-xl font-semibold">Notes - {label.label}</h2>
			<div className="w-[95%] p-4 grid grid-flow-col gap-4 overflow-x-auto">
				{datas.map((data) => (
					<Card key={data.id}>
						<CardHeader>
							<CardTitle>
								{data.title}
							</CardTitle>
						</CardHeader>
						<CardContent className="flex flex-col gap-4">
							<p className="max-h-[150px] text-slate-500 overflow-auto">
								{data.description}
							</p>
							<div className="flex flex-col gap-4">
								{data.files.map((file: File) => (
									<a
										key={file.path}
										href={link + file.path}
										className="text-slate-500 hover:text-yellow-400"
										download
									>
										- {file.originalname}
									</a>
								))}
							</div>
						</CardContent>
						<CardFooter className="flex justify-between gap-4">
							<Button className="mt-8 w-full py-2 rounded-md text-lg font-semibold text-red-500 cursor-pointer hover:text-white bg-transparent hover:bg-gradient-to-r from-amber-600 to-yellow-400 hover:shadow-2xl hover:shadow-amber-600/50">
								Supprimer
							</Button>
							<Button className="mt-8 w-full py-2 rounded-md text-lg font-semibold text-black dark:text-white cursor-pointer hover:text-white dark:hover:text-white bg-transparent hover:bg-gradient-to-r from-amber-600 to-yellow-400 hover:shadow-2xl hover:shadow-amber-600/50">
								Editer
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>
		</div>
	);
}