import React, { useEffect, useRef, useState } from 'react';

interface messageType {
  type?: string;
  message: string;
}

export default function useMessageToParent(): {
  componentRef: React.RefObject<HTMLDivElement>;
  setHeightChange: React.Dispatch<React.SetStateAction<number>>;
  heightChange: number;
  sendMessageToParent: ({ type, message }: messageType) => void;
} {
  const componentRef = useRef<HTMLDivElement>(null);

  const [heightChange, setHeightChange] = useState(0);

  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data.type) return;
      if (e.data.type === 'loaded') sendHeightToParent();
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  // 부모에게 메시지 전송
  const sendMessageToParent = ({ type = 'success', message }: messageType) => {
    if (!message) return;
    window.parent.postMessage({ type: type, message: message }, '*');
  };

  // height 바뀔 때마다 자동으로 부모에게 height값 전송
  const sendHeightToParent = () => {
    if (!componentRef.current) return;
    const message = componentRef.current?.offsetHeight + 30;
    window.parent.postMessage({ type: 'height', message: message }, '*');
  };

  useEffect(() => {
    sendHeightToParent();
  }, [heightChange]);

  return { componentRef, setHeightChange, heightChange, sendMessageToParent };
}
