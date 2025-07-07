import { JSX } from "react";
import useFileContext from "@/hooks/useFileContext"
import { CrossIcon } from "../icons"

export default function Tabs(): JSX.Element {
    const { tabs, onTabClick, tabCloseHandler } = useFileContext();

    return (
        <section className="flex gap-6 items-center bg-[#1f1f1f] ">
            {
                tabs.map(file => (
                    <div key={file.fileId}
                        className="flex gap-2 items-center"
                    >
                        <p
                            className={`cursor-pointer bg-[#1f1f1f] ml-4 ${file.isOpen ? "text-[#ddc190]" : "text-white"}`}
                            onClick={onTabClick}
                        >{file.fileName}</p>
                        <div className=" cursor-pointer"
                            onClick={() => tabCloseHandler(file.fileName)}

                        >
                            <CrossIcon strokeClr="" fillClr="white" size={20} />
                        </div>

                    </div>
                ))
            }
        </section>
    )
}