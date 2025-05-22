import  { FC, SVGProps } from 'react';

export interface DoubleHeadArrowIconProps extends SVGProps<SVGSVGElement> {
  /** Width and height of the icon (square). */
  size?: number | string;
  /** Stroke color of the arrow. */
  color?: string;
}

export const DoubleHeadArrowIcon: FC<DoubleHeadArrowIconProps> = ({
  size = 24,
  color = 'currentColor',
  ...props
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {/* Smaller left arrow head */}
    <path
      d="M5 12 L7 10 M5 12 L7 14"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    {/* Extended central shaft */}
    <path
      d="M7 12 H17"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Smaller right arrow head */}
    <path
      d="M19 12 L17 10 M19 12 L17 14"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default DoubleHeadArrowIcon;
