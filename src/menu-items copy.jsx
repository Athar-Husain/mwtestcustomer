// assets
import NavigationOutlinedIcon from '@mui/icons-material/NavigationOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import ChromeReaderModeOutlinedIcon from '@mui/icons-material/ChromeReaderModeOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import FeedbackOutlinedIcon from '@mui/icons-material/FeedbackOutlined';
import DeviceHubOutlinedIcon from '@mui/icons-material/DeviceHubOutlined';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SpeedOutlinedIcon from '@mui/icons-material/SpeedOutlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined';

const icons = {
  NavigationOutlinedIcon: NavigationOutlinedIcon,
  HomeOutlinedIcon: HomeOutlinedIcon,
  ChromeReaderModeOutlinedIcon: ChromeReaderModeOutlinedIcon,
  HelpOutlineOutlinedIcon: HelpOutlineOutlinedIcon,
  SecurityOutlinedIcon: SecurityOutlinedIcon,
  AccountTreeOutlinedIcon: AccountTreeOutlinedIcon,
  BlockOutlinedIcon: BlockOutlinedIcon,
  AppsOutlinedIcon: AppsOutlinedIcon,
  ContactSupportOutlinedIcon: ContactSupportOutlinedIcon,
  SettingsOutlinedIcon: SettingsOutlinedIcon,
  FeedbackOutlinedIcon: FeedbackOutlinedIcon,
  DeviceHubOutlinedIcon: DeviceHubOutlinedIcon,
  SignalCellularAltOutlinedIcon: SignalCellularAltOutlinedIcon,
  AccountCircleOutlinedIcon: AccountCircleOutlinedIcon,
  SpeedOutlinedIcon: SpeedOutlinedIcon,
  GroupOutlinedIcon: GroupOutlinedIcon
};

// ==============================|| MENU ITEMS ||============================== //

export default {
  items: [
    {
      id: 'navigation',
      title: 'MW FiberNet',
      caption: 'Customer Dashboard',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard (Home)',
          type: 'item',
          icon: icons['HomeOutlinedIcon'],
          // url: '/dashboard/overview',
          url: '/'
        }
      ]
    },
    {
      id: 'pages',
      title: 'Pages',
      type: 'group',
      icon: icons['NavigationOutlinedIcon'],
      children: [
        {
          id: 'my-connections',
          title: 'My Connections',
          type: 'item',
          icon: icons['DeviceHubOutlinedIcon'],
          url: '/connections'
        },
        {
          id: 'plans',
          title: 'Plans',
          type: 'item',
          icon: icons['ChromeReaderModeOutlinedIcon'],
          url: '/plans'
        },
        {
          id: 'billing',
          title: 'Billings',
          type: 'item',
          icon: icons['SecurityOutlinedIcon'],
          // url: '/payments/payment-history'
          url: '/billings'
        },
        {
          id: 'tickets',
          title: 'Complaints - Tickets',
          type: 'item',
          icon: icons['ContactSupportOutlinedIcon'],
          url: '/tickets'
        },
        {
          id: 'referrals',
          title: 'Referrals',
          type: 'item',
          icon: icons['GroupOutlinedIcon'],
          url: '/referrals'
        },

        // {
        //   id: 'my-connections',
        //   title: 'My Connections',
        //   type: 'collapse',
        //   icon: icons['DeviceHubOutlinedIcon'],
        //   children: [
        //     {
        //       id: 'connections',
        //       title: 'Connections',
        //       type: 'item',
        //       icon: icons['DeviceHubOutlinedIcon'],
        //       url: '/connections'
        //     }
        //     // {
        //     //     id: 'connection-history',
        //     //     title: 'Connection History',
        //     //     type: 'item',
        //     //     icon: icons['DeviceHubOutlinedIcon'],
        //     //     url: '/connections/connection-history',
        //     // },
        //     // {
        //     //     id: 'real-time-monitoring',
        //     //     title: 'Real-Time Monitoring',
        //     //     type: 'item',
        //     //     icon: icons['SignalCellularAltOutlinedIcon'],
        //     //     url: '/connections/real-time-monitoring',
        //     // },
        //   ]
        // },
        // {
        //   id: 'Plans-subscriptions',
        //   title: 'Plans & Subscriptions',
        //   type: 'collapse',
        //   icon: icons['AppsOutlinedIcon'],
        //   children: [
        //     {
        //       id: 'current-package',
        //       title: 'Current Package',
        //       type: 'item',
        //       icon: icons['ChromeReaderModeOutlinedIcon'],
        //       url: '/packages/current-package'
        //     },
        //     {
        //       id: 'change-plan',
        //       title: 'Change Plan',
        //       type: 'item',
        //       icon: icons['ChromeReaderModeOutlinedIcon'],
        //       url: '/packages/change-plan'
        //     },
        //     {
        //       id: 'plans',
        //       title: 'Plans',
        //       type: 'item',
        //       icon: icons['ChromeReaderModeOutlinedIcon'],
        //       url: '/plans'
        //     },
        //     {
        //       id: 'available-packages',
        //       title: 'Available Packages',
        //       type: 'item',
        //       icon: icons['ChromeReaderModeOutlinedIcon'],
        //       url: '/packages/available-packages'
        //     },
        //     {
        //       id: 'promotions-discounts',
        //       title: 'Promotions & Discounts',
        //       type: 'item',
        //       icon: icons['ChromeReaderModeOutlinedIcon'],
        //       url: '/packages/promotions-discounts'
        //     }
        //   ]
        // },
        // {
        //   id: 'billing-payments',
        //   title: 'Billing & Payments',
        //   type: 'collapse',
        //   icon: icons['SecurityOutlinedIcon'],
        //   children: [
        //     {
        //       id: 'payment-history',
        //       title: 'Payment History',
        //       type: 'item',
        //       icon: icons['SecurityOutlinedIcon'],
        //       url: '/payments/payment-history'
        //     },
        //     {
        //       id: 'upcoming-payments',
        //       title: 'Upcoming Payments',
        //       type: 'item',
        //       icon: icons['SecurityOutlinedIcon'],
        //       url: '/payments/upcoming-payments'
        //     },
        //     {
        //       id: 'make-payment',
        //       title: 'Make Payment',
        //       type: 'item',
        //       icon: icons['SecurityOutlinedIcon'],
        //       url: '/payments/make-payment'
        //     }
        //   ]
        // },
        // {
        //   id: 'complaints-support',
        //   title: 'Complaints & Support',
        //   type: 'collapse',
        //   icon: icons['ContactSupportOutlinedIcon'],
        //   children: [
        //     {
        //       id: 'complaints',
        //       title: 'Complaints',
        //       type: 'item',
        //       icon: icons['ContactSupportOutlinedIcon'],
        //       url: '/complaints'
        //     },
        //     {
        //       id: 'tickets',
        //       title: 'Complaints - Tickets',
        //       type: 'item',
        //       icon: icons['ContactSupportOutlinedIcon'],
        //       url: '/tickets'
        //     },
        //     {
        //       id: 'new-complaint',
        //       title: 'New Complaint',
        //       type: 'item',
        //       icon: icons['ContactSupportOutlinedIcon'],
        //       url: '/complaints/new-complaint'
        //     }
        //   ]
        // },
        // {
        //   id: 'feedback-ratings',
        //   title: 'Feedback & Ratings',
        //   type: 'collapse',
        //   icon: icons['FeedbackOutlinedIcon'],
        //   children: [
        //     {
        //       id: 'rate-service',
        //       title: 'Rate Service',
        //       type: 'item',
        //       icon: icons['FeedbackOutlinedIcon'],
        //       url: '/feedback/rate-service'
        //     },
        //     {
        //       id: 'provide-feedback',
        //       title: 'Provide Feedback',
        //       type: 'item',
        //       icon: icons['FeedbackOutlinedIcon'],
        //       url: '/feedback/provide-feedback'
        //     }
        //   ]
        // },
        {
          id: 'settings',
          title: 'Settings',
          type: 'collapse',
          icon: icons['SettingsOutlinedIcon'],
          children: [
            {
              id: 'profile',
              title: 'My Profile',
              type: 'item',
              icon: icons['SettingsOutlinedIcon'],
              url: '/profile'
            }
          ]
        }
      ]
    }
  ]
};
