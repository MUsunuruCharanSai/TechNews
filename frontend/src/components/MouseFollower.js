import { useEffect, useRef } from 'react';

function MouseFollower() {
  const dotRef = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  const pos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };

    let frameId;

    const animate = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * 0.15;
      pos.current.y += (mouse.current.y - pos.current.y) * 0.15;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${pos.current.x - 5}px, ${pos.current.y - 5}px)`;
      }

      frameId = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMove);
    frameId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      cancelAnimationFrame(frameId);
    };
  }, []);

  return <div ref={dotRef} className="mouse-dot" />;
}

export default MouseFollower;
