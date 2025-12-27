// Simulate fetching notifications from an API

const dummyNotifications = [
  {
    id: '1',
    type: 'info',
    title: 'Welcome to MW FiberNet!',
    description: 'Thank you for subscribing to our services.',
    timestamp: new Date(Date.now() - 3600 * 1000 * 2).toISOString(), // 2 hours ago
    read: false
  },
  {
    id: '2',
    type: 'warning',
    title: 'Scheduled Maintenance',
    description: 'Service will be down tomorrow from 2 AM to 4 AM.',
    timestamp: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    read: false
  }
  // ... add up to 30 dummy notifications with varied timestamps and types
];

// Generate 30 dummy notifications by repeating and modifying above objects
for (let i = 3; i <= 30; i++) {
  dummyNotifications.push({
    id: i.toString(),
    type: i % 3 === 0 ? 'success' : i % 3 === 1 ? 'info' : 'warning',
    title: `Notification Title ${i}`,
    description: `This is a sample notification description for item ${i}.`,
    timestamp: new Date(Date.now() - 3600 * 1000 * i).toISOString(),
    read: i % 5 === 0 // mark every 5th notification as read
  });
}

const getNotifications = () =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(dummyNotifications);
    }, 500);
  });

export default {
  getNotifications
};
