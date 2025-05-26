import { JSX } from "react";
import useFileContext from "../../hooks/useFileContext"
import { CrossIcon } from "../icons"

export default function Tabs(): JSX.Element {
    const { fileList, onTabClick } = useFileContext();

    console.log(fileList)
    return (
        <section className="flex gap-6 items-center bg-[#1f1f1f] ">
            {
                fileList.map(file => (
                    <div key={file.fileId}
                    className="flex gap-2 items-center"
                    >
                        <p
                            style={{ backgroundColor: "#1f1f1f" }}
                            className="cursor-pointer, text-white ml-4   "
                            onClick={onTabClick}
                        >{file.fileName}</p>
                        <CrossIcon strokeClr="" fillClr="white" size={20} />

                    </div>
                ))
            }
        </section>
    )
}