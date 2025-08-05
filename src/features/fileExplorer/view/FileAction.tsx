import { Button } from "@/components/ui/button"
import { Plus, MoreHorizontal } from "lucide-react"

export default function FileActionsBar() {
    return (
        <div className="flex items-center justify-between p-2 border-b border-gray-700">
            <span className="text-xs text-gray-400 uppercase tracking-wide">Files</span>
            <div className="flex gap-1">
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Plus className="h-3 w-3 text-gray-400 hover:text-white" />
                </Button>
                <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <MoreHorizontal className="h-3 w-3 text-gray-400 hover:text-white" />
                </Button>
            </div>
        </div>
    )
}
