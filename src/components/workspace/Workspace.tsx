const Workspace = ({title}: {title:string}) => {
    return (
        <section className="max-w-full bg-[#1f1f1f] text-white">
            <h2>{title}</h2>
            <input type="text" autoFocus  placeholder="type of text..."
            className="block w-full h-full border-none outline-none"
            />    
        </section>
    )
}

export default Workspace;