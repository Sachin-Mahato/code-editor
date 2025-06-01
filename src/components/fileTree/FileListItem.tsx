import useFileContext from "../../hooks/useFileContext";

type FileListItemProps = {
    name: string;
}

export const FileListItem = ({ name }: FileListItemProps) => {
    const { toggleFileActiveState, } = useFileContext()


    return (
        <>
            <div className=""
                role="button"
                aria-label={`Open file ${name}`}
                data-testid={`file-list-item-${name}`}
                onClick={(e) => {
                    toggleFileActiveState(e, name)

                }}
            >
                <li
                    data-testid={`file-list-item-label-${name}`}
                    className="cursor-pointer">{name}</li>

            </div>
        </>
    );
};
