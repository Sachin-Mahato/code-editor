import { FileIcon, FolderIcon } from "../icons/index";
import { FileList } from "./FileList";

export default function FileExplorer() {
    return (
        <>
            <aside className="bg-[#181818] max-w-full h-[100dvh] text-white ">
                <div className="flex justify-around align-center ">
                    <h1 className="mt-4">code editor</h1>
                    <div className="flex justify-around align-center mt-4 cursor-pointer">
                        <FileIcon />
                        <FolderIcon />
                    </div>
                </div>
                <FileList />
            </aside>
        </>
    );
}
