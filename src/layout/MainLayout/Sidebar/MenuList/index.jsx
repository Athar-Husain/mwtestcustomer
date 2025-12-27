import React from 'react';

// material-ui
import { Typography } from '@mui/material';

// project import
import NavGroup from './NavGroup';
// import menuItem from 'menu-items';
import menuItem from '../../../../menu-items';

// ==============================|| MENULIST ||============================== //

const MenuList = () => {
  const navItems = menuItem.items.map((item) => {
    switch (item.type) {
      case 'group':
        return <NavGroup key={item.id} item={item} />;
      default:
        return (
          <Typography key={item.id} variant="h6" color="error" align="center">
            Menu Items Error
          </Typography>
        );
    }
  });

  return navItems;
};

export default MenuList;


// import React from 'react';

// // material-ui
// import { Typography } from '@mui/material';
// import { NavLink } from 'react-router-dom';

// // project import
// import NavGroup from './NavGroup';
// import menuItem from '../../../../menu-items';

// // ==============================|| MENULIST ||============================== //

// const renderMenuItems = (menuItems) => {
//   return menuItems.map((item) => {
//     const { id, title, url, icon, children, active } = item;

//     // If the item has children, it's a collapse group
//     if (children) {
//       return (
//         <div key={id}>
//           <div className="menu-header">
//             <span>{React.createElement(icon)}</span> {title}
//           </div>
//           <div className="submenu">
//             {renderMenuItems(children)}
//           </div>
//         </div>
//       );
//     }

//     // Render a single item with active class if it's active
//     return (
//       <NavLink
//         key={id}
//         to={url}
//         className={`menu-item ${active ? 'active' : ''}`}
//         activeClassName="active"
//       >
//         <span>{React.createElement(icon)}</span> {title}
//       </NavLink>
//     );
//   });
// };

// const MenuList = () => {
//   const navItems = menuItem.items.map((item) => {
//     switch (item.type) {
//       case 'group':
//         return <NavGroup key={item.id} item={item} />;
//       case 'collapse':
//         return (
//           <div key={item.id}>
//             <div className="menu-header">
//               <span>{React.createElement(item.icon)}</span> {item.title}
//             </div>
//             <div className="submenu">{renderMenuItems(item.children)}</div>
//           </div>
//         );
//       case 'item':
//         return (
//           <NavLink
//             key={item.id}
//             to={item.url}
//             className={`menu-item ${item.active ? 'active' : ''}`}
//             activeClassName="active"
//           >
//             <span>{React.createElement(item.icon)}</span> {item.title}
//           </NavLink>
//         );
//       default:
//         return (
//           <Typography key={item.id} variant="h6" color="error" align="center">
//             Menu Items Error
//           </Typography>
//         );
//     }
//   });

//   return <nav>{navItems}</nav>;
// };

// export default MenuList;
