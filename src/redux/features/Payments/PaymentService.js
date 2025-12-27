// Simulating API call with dummy data
export const fetchPaymentsAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: '1',
            date: '2025-07-01T10:30:00Z',
            amount: 588,
            method: 'Credit Card',
            transactionId: 'TXN123456',
            status: 'Success'
          },
          {
            id: '2',
            date: '2025-06-01T09:20:00Z',
            amount: 699,
            method: 'UPI',
            transactionId: 'TXN654321',
            status: 'Success'
          },
          {
            id: '3',
            date: '2025-05-01T11:15:00Z',
            amount: 999,
            method: 'Net Banking',
            transactionId: 'TXN987654',
            status: 'Failed'
          },
          {
            id: '4',
            date: '2025-04-01T08:00:00Z',
            amount: 699,
            method: 'Credit Card',
            transactionId: 'TXN112233',
            status: 'Pending'
          }
        ]
      });
    }, 1000);
  });
};
