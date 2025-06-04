import { CrossIcon } from "./icons"
import useFileContext from "../hooks/useFileContext"

type ModelProps = {
    title: string
}
export default function Model({ title }: ModelProps) {
    const{toggleFileIconClick} = useFileContext();
    return (
        <div className="fixed top-28 left-0 right-0 bottom-0 opacity-100  backdrop-blur-sm flex justify-center items-center">
            <div className="mt-10 flex flex-col gap-5 text-white">

                <div className="bg-indigo-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
                    <h1 className="text-3xl font-extrabold">{title}</h1>
                    <p className="font-bold max-w-md text-center">This feature in development and will be available soon</p>
                    <button
                        onClick={toggleFileIconClick}
                    >
                        <CrossIcon strokeClr="white" fillClr="white" size={24} />
                    </button>
                </div>
            </div>
        </div>
    )
}