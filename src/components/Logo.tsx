export default function Logo({ size = 36 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="32" height="32" rx="6" fill="#111" />
      <text
        x="16"
        y="10.5"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="11.5"
        fill="#fff"
      >
        PNG
      </text>
      <line x1="6" y1="16.5" x2="26" y2="16.5" stroke="#fff" strokeWidth="0.5" opacity="0.2" />
      <text
        x="16"
        y="23"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="system-ui, -apple-system, sans-serif"
        fontWeight="900"
        fontSize="11.5"
        fill="#fff"
      >
        PDF
      </text>
    </svg>
  );
}
