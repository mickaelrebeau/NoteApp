import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deleteNote } from "@/utils/fetch";

export function ConfirmModalNote({ id }: { id: string }) {
	return (
		<AlertDialog>
			<AlertDialogTrigger className="mt-8 w-full py-2 border rounded-md text-md font-semibold cursor-pointer hover:text-white bg-transparent hover:bg-slate-200 dark:hover:bg-slate-800">
				Supprimer
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>En êtes vous vraiment sur?</AlertDialogTitle>
					<AlertDialogDescription>
						Cette action n'est pas reversible. Vous ne pourrez pas récupérer cette note. Voulez-vous continuer?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Annuler</AlertDialogCancel>
					<AlertDialogAction
						className="hover:bg-amber-600 hover:text-white"
						onClick={() => {
							deleteNote(id);
							window.location.reload();
						}}
					>
						Confirmer
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
