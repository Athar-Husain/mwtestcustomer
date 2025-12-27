import { configureStore } from '@reduxjs/toolkit';

import customizationReducer from './features/customization/customizationSlice'; // Import the slice

// import regionReducer from './features/Region/regionSlice';
// import customerReducer from './features/Customers/customerSlice';
import adminReducer from './features/Admin/adminSlice';
import areaReducer from './features/Area/AreaSlice';
import teamReducer from './features/Team/TeamSlice';
import customerReducer from './features/Customers/CustomerSlice';
import connectionReducer from './features/Connection/ConnectionSlice';
import planReducer from './features/Plan/PlanSlice';
import ticketReducer from './features/Tickets/TicketSlice';

// added from here
import notificationReducer from './features/Notifications/NotificationSlice';
import paymentReducer from './features/Payments/PaymentSlice';
import upcomingPaymentsReducer from './features/Payments/upcomingPaymentsSlice';
import billingAddressReducer from './features/Account/billingAddresslice';
import complaintReducer from './features/Support/ComplaintSlice';

export const store = configureStore({
  reducer: {
    customization: customizationReducer,
    admin: adminReducer,
    area: areaReducer,
    team: teamReducer,
    customer: customerReducer,
    connection: connectionReducer,
    plan: planReducer,
    ticket: ticketReducer,
    // added from here
    notifications: notificationReducer,
    payments: paymentReducer,
    upcomingPayments: upcomingPaymentsReducer,
    billingAddress: billingAddressReducer,
    complaints: complaintReducer
  }
});
