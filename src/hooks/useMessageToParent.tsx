import React, { useEffect, useState } from 'react';

export default function useMessageToParent(): {
  componentRef: React.RefObject<HTMLDivElement>;
  setHeightChange: React.Dispatch<React.SetStateAction<number>>;
  heightChange: number;
} {
  const componentRef = React.useRef<HTMLDivElement>(null);

  const [heightChange, setHeightChange] = useState(0);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data.type) return;
      if (e.data.type === 'loaded') sendHeightToParent();
      console.log('부모로 부터 온 메세지:', e.data);
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // height 바뀔 때마다 자동으로 부모에게 height값 전송
  const sendHeightToParent = () => {
    if (!componentRef.current) return;
    const message = componentRef.current?.offsetHeight + 30;
    window.parent.postMessage({ type: 'height', message: message }, '*');
  };

  useEffect(() => {
    sendHeightToParent();
  }, [heightChange]);

  return { componentRef, setHeightChange, heightChange };
}
