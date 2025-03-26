import { FileIcon, FolderIcon } from "../icons/index";
import FileTreeContextProvider from "../../context/FileContext";
import { FileNames } from "./FileNames";

export default function FileTree() {
  return (
    <FileTreeContextProvider>
      <main className="bg-[#181818] max-w-56 text-white min-h-screen">
        <div className="flex justify-around align-center ">
          <h1 className="mt-4">code editor</h1>
          <div className="flex justify-around align-center mt-4 cursor-pointer">
            <FileIcon />
            <FolderIcon />
          </div>
        </div>
        <FileNames />
      </main>
    </FileTreeContextProvider>
  );
}
