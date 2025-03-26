import useFileContext from "../../hooks/useFileContext";
import CreateFolder from "./CreateFile";

export const CreateFileComponent = ({ name, idx }: { name: string; idx: number }) => {
    return (
        <>
            <div className="mr-4" key={idx}
            onClick={() => console.log("Hello")}
            >
                <li className="cursor-pointer">{name}</li>
            </div>
        </>
    );
};

export const FileNames = () => {
    const { isFileClick, fileNames } = useFileContext();
    return (
        <ul className="mt-4 text-sm ">
            {Array.from(fileNames) && fileNames.length > 0
                ? fileNames.map((names, idx) => (
                    <CreateFileComponent name={names} idx={idx} />
                  ))
                : []}

            {isFileClick ? <CreateFolder /> : null}
        </ul>
    );
};
