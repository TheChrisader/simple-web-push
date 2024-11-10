self.addEventListener('install', () => {
  console.info('service worker installed.');
});

const sendDeliveryReportAction = () => {
  console.log('Web push delivered.');
};

self.addEventListener('push', function (event) {
  if (!event.data) {
    return;
  }

  const payload = event.data.json();
  const { body, icon, image, badge, url, title } = payload;
  const notificationTitle = title ?? 'Hi';
  const notificationOptions = {
    body,
    icon,
    image,
    data: {
      url,
    },
    badge,
    silent: true,
    actions: [
      {
        action: 'open',
        title: 'Open',
      },
      {
        action: 'close',
        title: 'Close',
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(notificationTitle, notificationOptions).then(() => {
      sendDeliveryReportAction();
    }),
  );
});

self.addEventListener('notificationclick', event => {
  console.log(event.action);
  event.notification.close(); // Close the notification
  switch (event.action) {
    case 'open':
      // Handle action1
      clients.openWindow('https://example.com/action1');
      break;
    case 'close':
      // Handle action2
      clients.openWindow('https://example.com/action2');
      break;
    default:
      // Handle default click
      clients.openWindow('https://example.com/default');
      break;
  }
});
