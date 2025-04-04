import useFileContext from "../../hooks/useFileContext";

export const FileListItem = ({ name}: { name: string  }) => {
    const {toggleFileActiveState, } = useFileContext()


    return (
        <>
            <div className="" 
            onClick={() => {
                toggleFileActiveState(name)
            }}
            >
                <li className="cursor-pointer">{name}</li>
                
            </div>
        </>
    );
};
