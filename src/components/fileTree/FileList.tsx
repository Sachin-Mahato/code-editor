import useFileContext from "../../hooks/useFileContext";
import FileNameInput from "./FileNameInput";
import { FileListItem } from "./FileListItem";
export const FileList = () => {
    const { isFileClickIcon, fileList} = useFileContext()
    return (
        <section className="mt-4 text-sm ">
            {Array.isArray(fileList) && fileList.length > 0
                ? fileList.map((names) => (
                    <ul key={names.fileId} className="flex justify-center items-center">
                        
                    <FileListItem
                     name={names.fileName} 
                     
                     />
                    </ul>
                  ))
                : []}

            {isFileClickIcon ? <FileNameInput /> : null}
        </section>
    )
}
