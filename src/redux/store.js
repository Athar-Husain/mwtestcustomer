import { configureStore, combineReducers, createListenerMiddleware } from '@reduxjs/toolkit';

// --- Import All Your Reducers ---
import customizationReducer from './features/customization/customizationSlice';
import adminReducer from './features/Admin/adminSlice';
import areaReducer from './features/Area/AreaSlice';
import teamReducer from './features/Team/TeamSlice';
import customerReducer from './features/Customers/CustomerSlice';
import connectionReducer from './features/Connection/ConnectionSlice';
import planReducer from './features/Plan/PlanSlice';
import ticketReducer from './features/Tickets/TicketSlice';
import notificationReducer from './features/Notifications/NotificationSlice';
import paymentReducer from './features/Payments/PaymentSlice';
import upcomingPaymentsReducer from './features/Payments/upcomingPaymentsSlice';
import billingAddressReducer from './features/Account/billingAddresslice';
import complaintReducer from './features/Support/ComplaintSlice';
import leadReducer from './features/Leads/LeadSlice';

// --- Import Actions for the Middleware ---
// (Ensure these paths/names match your actual slice exports)
import { getNotifications } from './features/Notifications/NotificationSlice';
import { getActiveConnection } from './features/Connection/ConnectionSlice';

// 1. Setup Listener Middleware (The "Global useEffect")
const listenerMiddleware = createListenerMiddleware();

listenerMiddleware.startListening({
  // This listens for your login success action
  type: 'customer/login/fulfilled',
  effect: async (action, listenerApi) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      // Auto-fetch data once logged in
      listenerApi.dispatch(getNotifications());
      listenerApi.dispatch(getActiveConnection());
    }
  }
});

// 2. Combine All Reducers
const appReducer = combineReducers({
  customization: customizationReducer,
  admin: adminReducer,
  area: areaReducer,
  team: teamReducer,
  customer: customerReducer,
  connection: connectionReducer,
  plan: planReducer,
  ticket: ticketReducer,
  notifications: notificationReducer,
  payments: paymentReducer,
  upcomingPayments: upcomingPaymentsReducer,
  billingAddress: billingAddressReducer,
  complaints: complaintReducer,
  lead: leadReducer
});

// 3. Root Reducer logic for Logout State Reset
const rootReducer = (state, action) => {
  if (action.type === 'customer/logout/fulfilled') {
    // This clears the entire Redux state
    state = undefined;
  }
  return appReducer(state, action);
};

// 4. Configure Store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().prepend(listenerMiddleware.middleware)
});
