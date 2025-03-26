import { ReactNode, useState } from "react";
import { fileTreeContext } from "./fileTreeContext";

const FileTreeContextProvider = ({ children }: { children: ReactNode }) => {
  const [inputValues, setInputValues] = useState("")
  const [isFileClick, setIsFileClick] = useState(false)
  const [fileNames, setFileNames] = useState<string[]>([])

  const handleFileClick = () => setIsFileClick((prev) => !prev)

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement>) => 
    setInputValues(e.target.value.trim())
  
  const handleFileNames = (input: string) => {
    if (input.trim() && input.length > 0) {
      setFileNames((prev) => [...prev, input.trim()])
      setInputValues("");
    }
  }

  return (
    <fileTreeContext.Provider
      value={{
        inputValues,
        inputHandler,
        fileNames,
        isFileClick,
        handleFileClick,
        handleFileNames
      }}
    >
      {children}
    </fileTreeContext.Provider>
  );
};

export default FileTreeContextProvider;
