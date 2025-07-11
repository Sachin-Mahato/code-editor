import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import type { FileTab } from "../../hooks/useFileContext"
import TabItem from "@/components/workspace/TabItems"

interface TabsContainerProps {
    tabs: FileTab[]
    activeTabId: string
    onSwitch: (id: string) => void
    onClose: (id: string) => void
}

export default function TabsContainer({
    tabs,
    activeTabId,
    onSwitch,
    onClose,
}: TabsContainerProps) {
    return (
        <div className="flex items-center bg-[#2d2d30] h-8">
            <ScrollArea className="flex-1">
                <div className="flex items-center min-w-max">
                    {tabs.map((t) => (
                        <TabItem
                            key={t.fileId}
                            fileId={t.fileId}
                            fileName={t.fileName}
                            language={t.language}
                            isModified={t.isModified}
                            isActive={t.fileId === activeTabId}
                            onActivate={onSwitch}
                            onClose={onClose}
                        />
                    ))}
                </div>
                <ScrollBar orientation="horizontal" className="h-1" />
            </ScrollArea>
        </div>
    )
}
