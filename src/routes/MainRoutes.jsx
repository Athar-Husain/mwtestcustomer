// routes/MainRoutes.js
import MainLayout from '../layout/MainLayout';
import Loadable from '../component/Loadable';
import { lazy } from 'react';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard/Default/index.jsx')));
const Notifications = Loadable(lazy(() => import('../views/Dashboard/Notifications')));
const FaqsHelpCenter = Loadable(lazy(() => import('../views/Complaints/FaqsHelpCenter')));
const LiveChat = Loadable(lazy(() => import('../views/Complaints/LiveChat')));
// const PaymentHistory = Loadable(lazy(() => import('../views/Payments/PaymentHistory')));
const PlansScreen = Loadable(lazy(() => import('../views/Plans/Index')));

// const PersonalInfo = Loadable(lazy(() => import('../views/Account/PersonalInfo')));
// const SecuritySettings = Loadable(lazy(() => import('../views/Account/SecuritySettings')));
// const PaymentMethod = Loadable(lazy(() => import('../views/Account/PaymentMethod')));

// const CurrentPackage = Loadable(lazy(() => import('../views/Packages/CurrentPackage')));
// const ChangePlan = Loadable(lazy(() => import('../views/Packages/ChangePlan')));
// const AvailablePackages = Loadable(lazy(() => import('../views/Packages/AvailablePackages')));
// const PromotionsDiscounts = Loadable(lazy(() => import('../views/Packages/PromotionsDiscounts')));

// const TrackComplaintStatus = Loadable(lazy(() => import('../views/Complaints/TrackComplaintStatus')));
// const UsageStats = Loadable(lazy(() => import('../views/Dashboard/UsageStats')));
// const SubscriptionPlan = Loadable(lazy(() => import('../views/Account/SubscriptionPlan')));
// const Overview = Loadable(lazy(() => import('../views/Dashboard/Overview')));
// const UpcomingPayments = Loadable(lazy(() => import('../views/Payments/UpcomingPayments')));
// const MakePayment = Loadable(lazy(() => import('../views/Payments/MakePayment')));
// const AutoRenewal = Loadable(lazy(() => import('../views/Payments/AutoRenewal')));
// const BillingAddress = Loadable(lazy(() => import('../views/Payments/BillingAddress')));

// const MyComplaints = Loadable(lazy(() => import('../views/Complaints/MyComplaints')));
// const NewComplaint = Loadable(lazy(() => import('../views/Complaints/NewComplaint')));

// const MyDevices = Loadable(lazy(() => import('../views/Devices/MyDevices')));
// const DeviceStatus = Loadable(lazy(() => import('../views/Devices/DeviceStatus')));
// const AssignUnassignDevice = Loadable(lazy(() => import('../views/Devices/AssignUnassignDevice')));
// const SetupGuide = Loadable(lazy(() => import('../views/Devices/SetupGuide')));
// const SetupBoxLists = Loadable(lazy(() => import('../views/SetUpBox/List.jsx')));

// const NetworkSettings = Loadable(lazy(() => import('../views/Wifi/NetworkSettings')));
// const DataUsage = Loadable(lazy(() => import('../views/Wifi/DataUsage')));
// const SpeedTest = Loadable(lazy(() => import('../views/Wifi/SpeedTest')));
// const WifiRange = Loadable(lazy(() => import('../views/Wifi/WifiRange')));

// const AccountSettings = Loadable(lazy(() => import('../views/Settings/AccountSettings.jsx')));
// const NotificationPreferences = Loadable(lazy(() => import('../views/Settings/NotificationPreferences')));
// const LanguageRegion = Loadable(lazy(() => import('../views/Settings/LanguageRegion')));
// const Logout = Loadable(lazy(() => import('../views/Settings/Logout')));

// const RateService = Loadable(lazy(() => import('../views/Feedback/RateService')));
// const ProvideFeedback = Loadable(lazy(() => import('../views/Feedback/ProvideFeedback')));

// ==============================|| MAIN ROUTES ||============================== //

// import HomeScreen from '../views/Dashboard/Home/Home';
// import RegisterComplaintScreen from '../views/Complaints/RegisterComplaintScreen';
// import TrackComplaintScreen from '../views/Complaints/TrackComplaintScreen';
// import ReferScreen from '../views/Refrral/ReferScreen';
// import ReferralTrackingScreen from '../views/Refrral/ReferralTrackingScreen';
// import MakePaymentScreen from '../views/Payment/MakePaymentScreen';
// import PaymentHistoryScreen from '../views/Payment/PaymentHistoryScreen';
// import Complaints from '../views/Complaints/Complaints';
// import Home3 from '../views/Dashboard/Home/Home3';
// import ComplaintDetails from '../views/Complaints/ComplaintDetails';
// import ReferralSection from '../views/Referral/Ref';
// import Home2 from '../views/Dashboard/Home/Home2';
// import TicketsSection from '../views/Complaints/TicketsSection';
// import PackagesScreen from '../views/Packages/Packages2';

import ProfileScreen from '../views/Profile/Profile';
import Connnections from '../views/Connections/Connection.jsx';
import PrivateRoute from './PrivateRoute';
import TicketsList from '../views/Tickets/TicketsList';
import ReferralScreen from '../views/Referral/ReferralScreen';
import Billings from '../views/Billings/Billings';
import TicketDetails from '../views/Tickets/TicketDetails';
// import Billings from '../views/Payments/Billings';

const MainRoutes = [
  {
    path: '/',
    element: <PrivateRoute />,
    children: [
      {
        path: '/',
        element: <MainLayout />,
        children: [
          { path: '/', element: <DashboardDefault /> },
          { path: '/dashboard', element: <DashboardDefault /> },
          { path: '/notifications', element: <Notifications /> },
          { path: '/plans', element: <PlansScreen /> },
          // { path: '/billings', element: <PaymentHistory /> },
          { path: '/billings', element: <Billings /> },
          { path: '/tickets', element: <TicketsList /> },
          // { path: '/complaints', element: <Complaints /> },
          { path: '/ticket/:ticketId', element: <TicketDetails /> },
          // { path: '/ticket2/:ticketId', element: <TicketDetail2 /> },
          // { path: '/complaints', element: <Complaints /> },

          { path: '/complaints/faqs-help-center', element: <FaqsHelpCenter /> },
          { path: '/complaints/live-chat', element: <LiveChat /> },
          { path: '/connections', element: <Connnections /> },
          { path: '/profile', element: <ProfileScreen /> },
          { path: '/referrals', element: <ReferralScreen /> }
        ]
      }
    ]
  }
];

export default MainRoutes;
