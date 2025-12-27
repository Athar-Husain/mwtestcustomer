// assets
import {
  HomeOutlined as HomeIcon,
  HubOutlined as ConnectionIcon,
  ReceiptLongOutlined as BillingIcon,
  ConfirmationNumberOutlined as TicketIcon,
  CardGiftcardOutlined as ReferralIcon,
  AccountCircleOutlined as ProfileIcon,
  SettingsOutlined as SettingsIcon,
  SpeedOutlined as SpeedIcon,
  ExploreOutlined as NavigationIcon
} from '@mui/icons-material';

const icons = {
  NavigationIcon,
  HomeIcon,
  ConnectionIcon,
  BillingIcon,
  TicketIcon,
  ReferralIcon,
  ProfileIcon,
  SettingsIcon,
  SpeedIcon
};

// ==============================|| MENU ITEMS ||============================== //

export default {
  items: [
    {
      id: 'navigation',
      title: 'Main',
      caption: 'FiberNet Management',
      type: 'group',
      children: [
        {
          id: 'dashboard',
          title: 'Dashboard',
          type: 'item',
          icon: icons.HomeIcon,
          url: '/'
        }
      ]
    },
    {
      id: 'pages',
      title: 'Services',
      type: 'group',
      children: [
        {
          id: 'my-connections',
          title: 'My Connections',
          type: 'item',
          icon: icons.ConnectionIcon,
          url: '/connections'
        },
        {
          id: 'plans',
          title: 'Internet Plans',
          type: 'item',
          icon: icons.SpeedIcon,
          url: '/plans'
        },
        {
          id: 'billing',
          title: 'Billings & Invoices',
          type: 'item',
          icon: icons.BillingIcon,
          url: '/billings'
        },
        {
          id: 'tickets',
          title: 'Complaints / Tickets',
          type: 'item',
          icon: icons.TicketIcon,
          url: '/tickets'
        },
        {
          id: 'referrals',
          title: 'Refer & Earn',
          type: 'item',
          icon: icons.ReferralIcon,
          url: '/referrals'
        }
      ]
    },
    {
      id: 'account-settings',
      title: 'Account',
      type: 'group',
      children: [
        {
          id: 'settings',
          title: 'Settings',
          type: 'collapse',
          icon: icons.SettingsIcon,
          children: [
            {
              id: 'profile',
              title: 'My Profile',
              type: 'item',
              icon: icons.ProfileIcon,
              url: '/profile'
            }
          ]
        }
      ]
    }
  ]
};
