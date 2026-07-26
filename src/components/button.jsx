import React from "react";

export function Button({ asChild, variant, className = "", children, ...props }) {
  const classes = [
    "btn",
    variant === "outline" ? "btn-outline" : "btn-primary",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (asChild) {
    const child = React.Children.only(children);
    return React.cloneElement(child, {
      className: [classes, child.props.className || ""].filter(Boolean).join(" "),
      ...props,
    });
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
