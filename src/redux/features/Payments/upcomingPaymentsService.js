export const fetchUpcomingPaymentsAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: '1',
            dueDate: '2025-08-01T00:00:00Z',
            amount: 588,
            planName: 'Monthly 40 Mbps Plan',
            status: 'Due Soon'
          },
          {
            id: '2',
            dueDate: '2025-08-10T00:00:00Z',
            amount: 3999,
            planName: '7-Month 60 Mbps Package',
            status: 'Scheduled'
          },
          {
            id: '3',
            dueDate: '2025-12-01T00:00:00Z',
            amount: 5999,
            planName: '12-Month 40 Mbps Package',
            status: 'Scheduled'
          }
        ]
      });
    }, 1000);
  });
};
