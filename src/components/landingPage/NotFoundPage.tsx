import { Link } from "react-router";

export default function NotFoundPage() {
    return <div className="flex flex-col gap-4">404 Not Found
        <Link to="/">Home</Link>
    </div>
}