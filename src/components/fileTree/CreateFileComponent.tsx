import useFileContext from "../../hooks/useFileContext";

export const CreateFileComponent = ({ name}: { name: string  }) => {
    const {clickedFile} = useFileContext()
    return (
        <>
            <div className="" 
            onClick={() => clickedFile(name)}
            >
                <li className="cursor-pointer">{name}</li>
            </div>
        </>
    );
};