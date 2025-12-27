export const fetchBillingAddressAPI = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: {
          fullName: 'Rahul Sharma',
          streetAddress: '123, Green Park',
          city: 'New Delhi',
          state: 'Delhi',
          postalCode: '110016',
          country: 'India'
        }
      });
    }, 800);
  });
};

export const updateBillingAddressAPI = (address) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: address
      });
    }, 800);
  });
};
