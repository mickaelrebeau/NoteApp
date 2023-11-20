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
import { deleteFile } from "@/utils/fetch";

export function ConfirmModalFile({ id }: { id: string }) {
    return (
		<AlertDialog>
			<AlertDialogTrigger className="p-2 border rounded-md hover:bg-slate-800">
				Supprimer
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>En êtes vous vraiment sur?</AlertDialogTitle>
					<AlertDialogDescription>
						Cette action n'est pas reversible. Vous ne pourrez pas récupérer
						ce fichier. Voulez-vous continuer?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
				<AlertDialogCancel>Annuler</AlertDialogCancel>
				<AlertDialogAction
					className="hover:bg-amber-600 hover:text-white"
					onClick={() => {
						deleteFile(id);
						window.location.reload();
					}}>
						Confirmer
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
