// Uses: Intersection Observer API
// Docs: https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
import { useEffect, useRef, useState } from 'react';

const LazyImage = ({ src, alt }) => {
  const imgRef = useRef();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );

    if (imgRef.current) observer.observe(imgRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <>
    
      <img
        ref={imgRef}
        src={isVisible ? src : ''}
        alt={alt}
        className="w-full h-auto rounded shadow"
      />
    </>
  );
};

export default LazyImage; 