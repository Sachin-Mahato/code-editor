interface EmptyStateProps {
    readonly icon: string;
    readonly title: string;
    readonly subtitle: string
}
const EmptyState: React.FC<EmptyStateProps> = ({
    icon,
    title,
    subtitle,
}) => (
    <div className="flex items-center justify-center h-full text-gray-400 bg-gray-50">
        <div className="text-center">
            <div className="text-4xl mb-4">{icon}</div>
            <p className="text-lg mb-2">{title}</p>
            <p className="text-sm">{subtitle}</p>
        </div>
    </div>
);

export default EmptyState;