import { Button } from "../ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "../ui/dialog"
import { Lock } from "lucide-react"
import { Link } from "react-router"

interface TryWithoutLoginDialogProps {
    open: boolean
    onOpenChange: (open: boolean) => void
}

export default function TryWithoutLoginDialog({ open, onOpenChange }: TryWithoutLoginDialogProps) {
    return (
        <Dialog
            open={open}
            onOpenChange={onOpenChange}
        >
            <DialogContent
                data-testid="try-dialog"
                className="sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                        <Lock className="h-5 w-5 text-blue-600" />
                        Storage Requires Account
                    </DialogTitle>
                    <DialogDescription className="text-left space-y-3">
                        <span>You can try the code editor without logging in, but your work won't be saved.</span>
                        <span className="font-medium text-gray-900">
                            To save your projects and access them later, please create a free account.
                        </span>
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-col gap-3 mt-4">
                    <Button className="w-full">
                        <Link to="/signup">
                            Create Free Account
                        </Link>
                    </Button>
                    <Button
                        variant="outline"
                        onClick={() => {
                            onOpenChange(false)
                            // Here you would redirect to the editor
                            console.log("Redirecting to editor without login...")
                        }}
                        className="w-full cursor-pointer"
                    >
                        <Link to={"/code"}>
                            Continue Without Saving
                        </Link>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}