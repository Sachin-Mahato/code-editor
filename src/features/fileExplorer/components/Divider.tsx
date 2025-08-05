import React from "react"

interface DividerProps {
    onMouseDown: React.MouseEventHandler
    onDoubleClick: () => void
}

const Divider: React.FC<DividerProps> = ({ onMouseDown, onDoubleClick }) => (
    <div
        className="w-1 bg-gray-700 hover:bg-blue-500 cursor-col-resize flex-shrink-0 transition-colors duration-200 relative group"
        onMouseDown={onMouseDown}
        onDoubleClick={onDoubleClick}
    >
        <div className="absolute inset-y-0 -left-2 -right-2 group-hover:bg-blue-500/10" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="w-1 h-8 bg-blue-400 rounded-full" />
        </div>
    </div>
)

export default Divider
