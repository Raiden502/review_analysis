// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/label';
import Iconify from '../../../components/iconify';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const ICONS = {
  blog: icon('ic_blog'),
  cart: icon('ic_cart'),
  chat: icon('ic_chat'),
  mail: icon('ic_mail'),
  user: icon('ic_user'),
  file: icon('ic_file'),
  lock: icon('ic_lock'),
  label: icon('ic_label'),
  blank: icon('ic_blank'),
  kanban: icon('ic_kanban'),
  folder: icon('ic_folder'),
  banking: icon('ic_banking'),
  booking: icon('ic_booking'),
  invoice: icon('ic_invoice'),
  calendar: icon('ic_calendar'),
  disabled: icon('ic_disabled'),
  external: icon('ic_external'),
  menuItem: icon('ic_menu_item'),
  ecommerce: icon('ic_ecommerce'),
  analytics: icon('ic_analytics'),
  dashboard: icon('ic_dashboard'),
  profile: icon('ic_profile'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'Admin Management',
    items: [
      { title: 'Dashboard', path: PATH_DASHBOARD.general.ecommerce, icon: ICONS.dashboard },
      { title: 'Add product', path: PATH_DASHBOARD.eCommerce.new, icon: ICONS.lock },
      { title: 'Product List', path: PATH_DASHBOARD.eCommerce.list, icon: ICONS.menuItem },
    ],
  },

  {
    subheader: 'Accounts & Settings',
    items: [
      { title: 'account', path: PATH_DASHBOARD.user.account, icon: ICONS.user },
    ],
  },
  {
    subheader: 'Shopping',
    items: [
      // E-COMMERCE
      { title: 'Shop', path: PATH_DASHBOARD.eCommerce.shop, icon: ICONS.booking },
      { title: 'Checkout', path: PATH_DASHBOARD.eCommerce.checkout, icon: ICONS.cart },
      // { title: 'Orders list', path: PATH_DASHBOARD.invoice.list, icon: ICONS.menuItem },
    ],
  },
];
export default navConfig;
