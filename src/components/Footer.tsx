import React from "react";
import { Layout, Menu } from "antd";
import { Link } from "react-router";

const { Footer } = Layout;
const currentYear = new Date().getFullYear();
const footerItems = [
  {
    key: "contact",
    label: <Link to="/contact">Liên hệ</Link>,
  },
  {
    key: "docs",
    label: <Link to="/docs">Docs</Link>,
  },
];

const AppFooter: React.FC = () => {
  return (
    <Footer
      className="px-20"
      style={{
        background: "#fff",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: "64px",
        }}
      >
        <div style={{ color: "rgba(0, 0, 0, 0.65)" }}>
          © {currentYear} KiteApps. All rights reserved.
        </div>
        <Menu
          mode="horizontal"
          theme="light"
          items={footerItems}
          style={{ borderBottom: "none" }}
        />
      </div>
    </Footer>
  );
};

export default AppFooter;
