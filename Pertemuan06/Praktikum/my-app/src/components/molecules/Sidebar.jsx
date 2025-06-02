import { Card, List, ListItem, ListItemPrefix, Typography } from "@material-tailwind/react";
import { HomeIcon, UsersIcon, Cog6ToothIcon } from "@heroicons/react/24/solid";
import { Link, useLocation } from "react-router-dom";

export function Sidebar({ open, onLinkClick }) {
  const location = useLocation();

  const menus = [
    { name: "Home", path: "/", icon: HomeIcon },
    { name: "Mahasiswa", path: "/mahasiswa", icon: UsersIcon },
    { name: "Settings", path: "/settings", icon: Cog6ToothIcon },
  ];

  return (
    <aside
      className={`fixed top-0 left-0 z-50 h-screen bg-gradient-to-br from-green-500 to-emerald-600 shadow-2xl transform ${
        open ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 w-64`}
    >
      <Card className="h-full p-4 bg-transparent">
        <div className="mb-6 flex justify-center">
          <Typography variant="h5" color="white" className="font-bold text-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-300">Dashboard</span>
          </Typography>
        </div>
        <List>
          {menus.map((menu, idx) => {
            const Icon = menu.icon;
            const active = location.pathname === menu.path;

            return (
              <Link
                to={menu.path}
                key={idx}
                onClick={() => {
                  if (onLinkClick) onLinkClick();
                }}
              >
                <ListItem
                  className={`text-white flex items-center px-4 py-3 rounded-xl cursor-pointer transition-all duration-300 ${
                    active
                      ? "bg-gradient-to-r from-green-700 to-emerald-700 transform scale-105"
                      : "hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-500 hover:scale-105"
                  }`}
                >
                  <ListItemPrefix>
                    <Icon className="h-6 w-6 text-white transition-transform duration-300" />
                  </ListItemPrefix>
                  <Typography className="ml-3 font-medium transition-colors duration-300">
                    {menu.name}
                  </Typography>
                </ListItem>
              </Link>
            );
          })}
        </List>
      </Card>
    </aside>
  );
}
