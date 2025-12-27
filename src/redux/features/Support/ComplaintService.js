const dummyComplaints = [
  {
    id: '1',
    date: '2023-10-01',
    status: 'Open',
    description: 'Internet is not working at all.',
    technician: 'John Doe',
    actionTaken: '',
    comments: [
      { author: 'Customer', text: 'My internet is completely down, please fix it.', date: '2023-10-01 10:30' },
      { author: 'Technician', text: 'We are investigating the issue, please stay tuned.', date: '2023-10-01 12:15' }
    ]
  },
  {
    id: '2',
    date: '2023-10-03',
    status: 'In Progress',
    description: 'Slow internet speed.',
    technician: 'Jane Smith',
    actionTaken: 'Checking line quality',
    comments: [
      { author: 'Customer', text: 'The speed is below expected levels, please fix this.', date: '2023-10-03 08:00' },
      { author: 'Technician', text: 'We are currently testing the line speed and investigating.', date: '2023-10-03 10:15' }
    ]
  },
  {
    id: '3',
    date: '2023-10-05',
    status: 'Resolved',
    description: 'Router replacement required.',
    technician: 'Mike Johnson',
    actionTaken: 'Router replaced and tested.',
    comments: [{ author: 'Customer', text: 'The router was working fine after the replacement. Thank you!', date: '2023-10-05 14:00' }]
  }
];

export const fetchComplaints = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ data: dummyComplaints });
    }, 1000);
  });
};

export const updateComplaintStatus = async (complaintId, status) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedComplaints = dummyComplaints.map((complaint) => (complaint.id === complaintId ? { ...complaint, status } : complaint));
      resolve({ data: updatedComplaints.find((complaint) => complaint.id === complaintId) });
    }, 1000);
  });
};

export const addCommentToComplaint = async (complaintId, comment) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const updatedComplaints = dummyComplaints.map((complaint) =>
        complaint.id === complaintId
          ? { ...complaint, comments: [...complaint.comments, { author: 'Technician', text: comment, date: new Date().toLocaleString() }] }
          : complaint
      );
      resolve({ data: updatedComplaints.find((complaint) => complaint.id === complaintId) });
    }, 1000);
  });
};
