import React, { useRef, useEffect, useImperativeHandle, forwardRef } from "react";

const SketchCanvas = forwardRef(({ heightVh = 60 }, ref) => {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const drawing = useRef(false);
  const lastPos = useRef({ x: 0, y: 0 });

  // Dynamically set canvas size to match container
  useEffect(() => {
    function resizeCanvas() {
      const container = containerRef.current;
      const canvas = canvasRef.current;
      if (container && canvas) {
        const rect = container.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
      }
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, []);

  // Expose canvas ref to parent
  useImperativeHandle(ref, () => canvasRef.current);

  // Drawing logic
  const startDrawing = (e) => {
    drawing.current = true;
    lastPos.current = {
      x: (e.touches ? e.touches[0].clientX : e.nativeEvent.offsetX),
      y: (e.touches ? e.touches[0].clientY : e.nativeEvent.offsetY),
    };
  };

  const draw = (e) => {
    if (!drawing.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const rect = canvas.getBoundingClientRect();
    const x = e.touches ? e.touches[0].clientX - rect.left : e.nativeEvent.offsetX;
    const y = e.touches ? e.touches[0].clientY - rect.top : e.nativeEvent.offsetY;
    ctx.strokeStyle = "#2563eb";
    ctx.lineWidth = 3;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(lastPos.current.x, lastPos.current.y);
    ctx.lineTo(x, y);
    ctx.stroke();
    lastPos.current = { x, y };
  };

  const stopDrawing = () => {
    drawing.current = false;
  };

  // Prevent scrolling on touch devices when drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    const preventScroll = (e) => e.preventDefault();
    canvas.addEventListener("touchmove", preventScroll, { passive: false });
    return () => {
      canvas.removeEventListener("touchmove", preventScroll);
    };
  }, []);

  // Clear the canvas
  const handleClearCanvas = () => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  return (
    <div ref={containerRef} className={`flex-1 min-w-0 h-[${heightVh}vh] bg-white rounded-2xl shadow-lg border-2 border-blue-200 flex flex-col items-center justify-center overflow-hidden`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-2xl cursor-crosshair bg-white"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseLeave={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      <button
        className="px-6 -mt-16 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 transition"
        onClick={handleClearCanvas}
      >
        Clear your work
      </button>
    </div>
  );
});

export default SketchCanvas; 