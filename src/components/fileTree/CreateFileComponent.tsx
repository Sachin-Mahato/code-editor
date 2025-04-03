import React from "react";
import useFileContext from "../../hooks/useFileContext";

export const CreateFileComponent = ({ name}: { name: string  }) => {

    const {clickedFile, handleFileActive} = useFileContext()

    return (
        <>
            <div className="" 
            onClick={(e:React.MouseEvent) => {
                handleFileActive(e,name)
                clickedFile(name)
            }}
            >
                <li className="cursor-pointer">{name}</li>
                
            </div>
        </>
    );
};
