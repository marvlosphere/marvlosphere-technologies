// Geometric "sphere" mark — no stock imagery, built from clean shapes.
export default function Logo({ className = "h-9 w-9" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="10" fill="#1B3A6B" />
      <circle cx="24" cy="24" r="13" stroke="#F5A623" strokeWidth="2.5" />
      <path
        d="M11 24h26M24 11c5 4 5 22 0 26M24 11c-5 4-5 22 0 26"
        stroke="#FFFFFF"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
