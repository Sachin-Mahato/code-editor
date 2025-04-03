import useFileContext from "../../hooks/useFileContext";

export const CreateFileComponent = ({ name}: { name: string  }) => {
    const {handleFileActive, isFileActive} = useFileContext()

    console.log("isFileActive",isFileActive) 

    return (
        <>
            <div className="" 
            onClick={() => {
                handleFileActive(name)
            }}
            >
                <li className="cursor-pointer">{name}</li>
                
            </div>
        </>
    );
};
