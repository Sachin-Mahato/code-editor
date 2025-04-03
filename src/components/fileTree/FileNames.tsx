import useFileContext from "../../hooks/useFileContext";
import CreateFile from "./CreateFile";
import { CreateFileComponent } from "./CreateFileComponent";

export const FileNames = () => {
    const { isFileClickIcon, fileNames } = useFileContext()
    const id = crypto.randomUUID()

    return (
        <section className="mt-4 text-sm ">
            {Array.from(fileNames) && fileNames.length > 0
                ? fileNames.map((names) => (
                    <ul key={id} className="flex justify-center items-center">

                    <CreateFileComponent name={names} />
                    </ul>
                  ))
                : []}

            {isFileClickIcon ? <CreateFile /> : null}
        </section>
    )
}
