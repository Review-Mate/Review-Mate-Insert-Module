interface messageType {
  type?: string;
  message: string;
}

export default function useMessageToParent(): {
  sendMessageToParent: ({ type, message }: messageType) => void;
} {
  // 부모에게 메시지 전송
  const sendMessageToParent = ({ type = 'success', message }: messageType) => {
    if (!message) return;
    window.parent.postMessage({ type: type, message: message }, '*');
  };

  return { sendMessageToParent };
}
