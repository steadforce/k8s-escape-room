import React from "react";
import type { ReactNode } from "react";
import "./Tooltip.css";

type TooltipPosition = "top" | "right" | "bottom" | "left";

interface TooltipProps {
  text: string;
  children: ReactNode;
  position?: TooltipPosition; // optional, default is "top"
}

const Tooltip: React.FC<TooltipProps> = ({ text, children, position = "top" }) => {
  return (
    <div className="tooltip-container">
      {children}
      <span className={`tooltip-text tooltip-${position}`}>{text}</span>
    </div>
  );
};

export default Tooltip;
