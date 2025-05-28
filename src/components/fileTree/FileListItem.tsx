import useFileContext from "../../hooks/useFileContext";

export const FileListItem = ({ name}: { name: string  }) => {
    const {toggleFileActiveState,fileList,tabs } = useFileContext()

    
    return (
        <>
            <div className="" 
            onClick={(e) => {
                toggleFileActiveState(e,name)
                console.log(fileList);
                console.log(tabs);
                
                
            }}
            >
                <li className="cursor-pointer">{name}</li>
                
            </div>
        </>
    );
};
