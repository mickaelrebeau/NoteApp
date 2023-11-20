import { cn } from "@/lib/utils";
import { Trash2, UploadCloud } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FileForm({files, setFiles}: {files: File[], setFiles: (files: File[]) => void}) {
    const [dragOver, setDragOver] = useState<boolean>(false);
    const [fileDropError, setFileDropError] = useState<string>("");

    const onDragOver = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const onDragLeave = () => setDragOver(false);

    const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
        e.preventDefault();
        setDragOver(false);

        const selectedFiles = Array.from(e.dataTransfer.files);

        if (
            selectedFiles.some((file) => !file.name.toLowerCase().endsWith(".zip"))
        ) {
            return setFileDropError("Seuls les fichiers ZIP sont acceptés !");
        }

        setFiles([...files, ...selectedFiles]);
        setFileDropError("");
    };
    const fileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files as FileList);

        if (selectedFiles.some((file) => !file.name.toLowerCase().endsWith(".zip"))) {
            return setFileDropError("Seuls les fichiers ZIP sont acceptés !");
        }

        setFiles([...files, ...selectedFiles]);
        setFileDropError("");
    };

    const handleDelete = (fileName: string) => {
        setFiles(files.filter((file) => file.name !== fileName));
    };

    const formatNumberWithDots = (number: number): string => {
        const numStr = number.toString();
        const reversedStr = numStr.split("").reverse().join("");
        const withDots = reversedStr.replace(/(\d{3})(?=\d)/g, "$1.");
        return withDots.split("").reverse().join("");
    };
    return (
        <div className="flex flex-col gap-4 border border-input p-3 rounded">
            <div className="flex flex-col gap-4">
                <Label
                    htmlFor="file"
                    onDragOver={onDragOver}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <div
                        className={cn(
                            "px-4 py-2 border-[1.5px] border-dashed dark:border-input rounded-xl flex flex-col justify-start items-center hover:cursor-pointer",
                            dragOver && "border-blue-600 bg-blue-50"
                        )}
                    >
                        <div className="flex flex-col justify-start items-center">
                            <UploadCloud
                                className={cn(
                                    "h-5 w-5 text-neutral-600 my-4",
                                    dragOver && "text-blue-500"
                                )}
                            />
                            <p className="font-semibold">Drag & Drop tes fichiers ici</p>
                            <p className="text-neutral-500 text-sm">
                                le format doit être .zip
                            </p>
                            <div className="px-3 py-1 rounded-md mt-4 mb-2 drop-shadow-sm hover:drop-shadow hover:cursor-pointer bg-white dark:bg-input hover:border-ambre-600">
                                Selectionner des fichiers
                            </div>
                        </div>
                    </div>
                </Label>
                <Input
                    type="file"
                    name="files"
                    id="file"
                    className="hidden"
                    onChange={fileSelect}
                    multiple
                />
            </div>
            <div className="flex flex-col gap-2">
                {files.length > 0 && (
                    <div className="w-full gap-2 flex flex-col justify-start items-center max-h-52 overflow-auto">
                        {files.map((file, index) => {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-row justify-between items-center border dark:border-input rounded-lg px-2 py-1 w-full group"
                                >
                                    <div className="flex flex-row justify-start items-center gap-2">
                                        <div className="flex flex-col justify-start items-start gap-1">
                                            <div className="flex flex-row justify-start items-center gap-2">
                                                <p>{file.name}</p>
                                                <div className="flex flex-row justify-start items-center text-xs rounded-full px-2 py-[0.5px] gap-1">
                                                    <div className="h-2 w-2 bg-green-400 rounded-full" />
                                                    <p className="text-neutral-500">Uploaded</p>
                                                </div>
                                            </div>
                                            <p className="text-xs text-neutral-500">
                                                {formatNumberWithDots(file.size)} Bytes
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex flex-row justify-end items-center gap-2">
                                        <button
                                            className="text-neutral-400 hidden group-hover:flex flex-row justify-end bg-neutral-100 p-1 rounded-lg hover:text-black transition-all hover:cursor-pointer"
                                            onClick={() => handleDelete(file.name)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
                {fileDropError && <p style={{ color: "red" }}>{fileDropError}</p>}
            </div>
        </div>
    );
}