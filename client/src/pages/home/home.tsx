import { ListeNotes } from "@/components/listeNotes";
import { NavLink } from "react-router-dom";
import { labels } from "@/utils/labels";
import { useEffect, useState } from "react";
import { getNotes } from "@/utils/fetch";

interface Notes {
	title: string;
	description: string;
	label: string;
	[key: string]: string;
}

export function Home() {
	const [datas, setDatas] = useState<Notes[]>([]);

	useEffect(() => {
		getNotes().then(setDatas);
	}, []);

	const filterLabel = (label: string) => {
		return datas.filter((data) => data.label === label);
	};

	console.log(datas);

	return (
		<section className="p-8 flex flex-col items-center justify-center gap-8 overflow-hidden">
			<div className="w-full flex">
				<h1 className="text-2xl font-semibold uppercase">Liste de notes</h1>
				<NavLink
					to={"/new"}
					className="ml-auto text-slate-500 hover:text-yellow-400"
				>
					Ajouter une nouvelle note
				</NavLink>
			</div>

			{datas.length > 0 ? (
				labels.map((label) => (
					<div key={label.value} className="w-full">
						{filterLabel(label.value).length > 0 && (
							<ListeNotes label={label} datas={filterLabel(label.value)} />
						)}
					</div>
				))
			) : (
				<div className="w-full p-4 flex flex-col gap-4 bg-gray-100/50 dark:bg-gray-800/20 rounded-sm">
					<p className="text-slate-500">Aucune note n'a encore été créée</p>
				</div>
			)}
		</section>
	);
}
