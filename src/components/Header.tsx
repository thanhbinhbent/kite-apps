import React from "react";
import { Menu } from "antd";
import { Link } from "react-router";

const menuItems = [
  {
    key: "home",
    label: <Link to="/">Ứng dụng</Link>,
  },
  {
    key: "features",
    label: <Link to="https://github.com/thanhbinhbent/kite-apps">Github</Link>,
  },
];

const AppHeader: React.FC = () => {
  return (
    <div className="flex items-center px-20 bg-white border-b border-[rgba(0,0,0,0.08)]">
      <Link to="/">KiteApps</Link>
      <div className="ml-auto">
        <Menu
          theme="light"
          mode="horizontal"
          defaultSelectedKeys={["home"]}
          items={menuItems}
          style={{ borderBottom: "none" }}
        />
      </div>
    </div>
  );
};

export default AppHeader;
