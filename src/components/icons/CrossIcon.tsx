type CrossIconProps = {
    strokeClr: string,
    fillClr: string,
    size?: number,
}
export default function CrossIcon({strokeClr, fillClr, size=24}: CrossIconProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill={strokeClr ? strokeClr : "none"}
             viewBox="0 0 24 24"
            strokeWidth={1.2} stroke={fillClr ? fillClr : "currentColor"}
            className="cursor-pointer"
            width={size}
            height={size}
            >
            <path 
            strokeLinecap="round" 
            strokeLinejoin="round" d="M6 18 18 6M6 6l12 12"
             />
        </svg>
    )

}