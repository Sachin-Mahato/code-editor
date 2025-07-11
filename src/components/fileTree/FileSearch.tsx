import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

interface FileSearchProps {
    value: string
    onChange: (term: string) => void
}

export default function FileSearch({ value, onChange }: FileSearchProps) {
    return (
        <div className="p-2 border-b border-gray-700">
            <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                    placeholder="Search files..."
                    value={value}
                    onChange={(e) => onChange(e.currentTarget.value)}
                    className="pl-8 bg-[#3e3e42] border-gray-600 text-gray-300 placeholder-gray-500 h-8"
                />
            </div>
        </div>
    )
}
