import React, { useEffect } from "react";
import "./MagicCursor.css";

// Match animation duration
const SPARKLE_ANIMATION_DURATION = 700;

const MagicCursor: React.FC = () => {
  useEffect(() => {
    const wand = document.createElement("div");
    wand.className = "magic-wand";
    document.body.appendChild(wand);

    let lastX = 0, lastY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      // Offset to align the wand's tip with the mouse
      wand.style.left = `${e.clientX + 25}px`;
      wand.style.top = `${e.clientY + 25}px`;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance > 10) {
          for (let i = 0; i < 5; i++) {
              const sparkle = document.createElement('div');
              sparkle.className = 'sparkle';
              sparkle.style.left = `${e.clientX - 10 + (Math.random() * 10 + 25)}px`;
              sparkle.style.top = `${e.clientY - 10 + (Math.random() * 10 + 25)}px`;
              document.body.appendChild(sparkle);
              setTimeout(() => sparkle.remove(), SPARKLE_ANIMATION_DURATION);
          }
          lastX = e.clientX;
          lastY = e.clientY;
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      wand.remove();
    };
  }, []);

  return null;
};

export default MagicCursor;
