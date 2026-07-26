export function Card({ className = "", children, ...props }) {
  return (
    <div className={["card", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}

export function CardContent({ className = "", children, ...props }) {
  return (
    <div className={["card-content", className].filter(Boolean).join(" ")} {...props}>
      {children}
    </div>
  );
}
