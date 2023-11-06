const createIframe = ($widgetContainer, type) => {
  let iframeSrc = '';
  if (type === 'list') iframeSrc = reviewListIframeSrc($widgetContainer);
  else if (type === 'write') iframeSrc = reviewWriteIframeSrc($widgetContainer);

  const iframe = document.createElement('iframe');

  iframe.src = iframeSrc;
  iframe.style.width = '100%';
  iframe.style.height = '0';
  iframe.style.border = 'none';

  return iframe;
};

const reviewListIframeSrc = ($widgetContainer) => {
  const domain = $widgetContainer.getAttribute('domain');
  const productId = $widgetContainer.getAttribute('product-id');
  const iframeSrc = `https://widget.reviewmate.co.kr/review/list?partner_domain=${domain}&product_id=${productId}`;
  return iframeSrc;
};

const reviewWriteIframeSrc = ($widgetContainer) => {
  const domain = $widgetContainer.getAttribute('domain');
  const reservationId = $widgetContainer.getAttribute('reservation-id');
  const iframeSrc = `https://widget.reviewmate.co.kr/review/write?partner_domain=${domain}&reservation_id=${reservationId}`;
  return iframeSrc;
};

const initializeWidget = () => {
  const $widgetContainer = document.querySelector('#review-mate-widget');

  if (!$widgetContainer) {
    alert('id가 review-mate-widget인 컨테이너 요소가 필요합니다.');
    return;
  }

  const type = $widgetContainer.getAttribute('type');
  const $widgetIframe = createIframe($widgetContainer, type);

  $widgetContainer.appendChild($widgetIframe);

  setHeight($widgetIframe);
};

const setHeight = ($widgetIframe) => {
  const handleHeightMessage = (e) => {
    if (!e.data.type) return;
    if (e.data.type === 'height') {
      $widgetIframe.style.height = `${e.data.message}px`;
    }
  };

  window.addEventListener('message', handleHeightMessage);
};

const getMessage = () => {
  let message = '';

  const handleMessage = (e) => {
    if (!e.data.type) return;
    if (e.data.type === 'success') {
      message = e.data.message;
    }
  };

  window.addEventListener('message', handleMessage);

  return message;
};

window.addEventListener('load', initializeWidget);
