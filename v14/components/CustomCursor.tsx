import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 700 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 10);
      cursorY.set(e.clientY - 10);
    };

    window.addEventListener("mousemove", moveCursor);

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      document.querySelectorAll('a, button, [role="button"]').forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return (
    <motion.div
      className={`custom-cursor ${isHovering ? "hover" : ""}`}
      style={{
        translateX: cursorXSpring,
        translateY: cursorYSpring,
        scale: isHovering ? 1.5 : 1,
      }}
      transition={{ scale: { type: "spring", stiffness: 500, damping: 28 } }}
    />
  );
};

export default CustomCursor;
