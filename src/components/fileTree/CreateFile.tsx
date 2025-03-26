import useFileContext from "../../hooks/useFileContext";

const CreateFile = () => {
  const {inputValues, inputHandler, handleFileNames, handleFileClick} = useFileContext()

  const onEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      handleFileNames(inputValues)
      handleFileClick()
    }
  }

  return (
    <section className="max-w-full">
      <input
      autoFocus
        type="text"
        value={inputValues}
        className="focus:outline-sky-600 border-none outline-1  text-white"
        onChange={inputHandler}
        onKeyDown={onEnter}
      />
    </section>
  );
};

export default CreateFile;
