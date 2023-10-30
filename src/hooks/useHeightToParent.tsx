import React, { useEffect, useRef, useState } from 'react';

export default function useHeightToParent(): {
  componentRef: React.RefObject<HTMLDivElement>;
} {
  const componentRef = useRef<HTMLDivElement>(null);

  const [heightChange, setHeightChange] = useState(0);

  // height 변경 감지
  useEffect(() => {
    if (componentRef.current) resizeObserver.observe(componentRef.current);
  }, [componentRef]);

  // height 바뀔 때마다 자동으로 부모에게 height값 전송
  useEffect(() => {
    sendHeightToParent();
  }, [heightChange]);

  const resizeObserver = new ResizeObserver((entries) => {
    for (const entry of entries) {
      const { height } = entry.contentRect;
      setHeightChange(height + 30);
    }
  });

  const sendHeightToParent = () => {
    if (!componentRef.current) return;
    window.parent.postMessage({ type: 'height', message: heightChange }, '*');
  };

  return { componentRef };
}
