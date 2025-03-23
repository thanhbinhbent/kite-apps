import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { getMicroAppMetaData, MicroAppMetaData } from "../module-app.config";
import "./index.css";
import Header from "./components/Header.tsx";
import Footer from "./components/Footer.tsx";
import Application from "./components/pages/Application";

const App = () => {
  const [microApps, setMicroApps] = useState<MicroAppMetaData[]>([]);

  useEffect(() => {
    console.log("App mounted!");

    const fetchMicroApps = async () => {
      const data = await getMicroAppMetaData();
      console.log("Fetched micro apps:", data);

      if (!data || typeof data !== "object") {
        console.error(
          "getMicroAppMetaData() trả về dữ liệu không hợp lệ:",
          data
        );
        return;
      }

      setMicroApps(Object.values(data));
    };

    fetchMicroApps();
  }, []);

  return (
    <BrowserRouter>
      <Header />
      <main className="p-10">
        <Routes>
          <Route path="" element={<Application />} />
          {Array.isArray(microApps) && microApps.length > 0 ? (
            microApps.map((app) =>
              app.component ? (
                <Route key={app.id} path={app.id} element={<app.component />} />
              ) : (
                <p key={app.id} className="text-red-500">
                  App {app.id} không có component!
                </p>
              )
            )
          ) : (
            <p className="text-gray-500">Không có ứng dụng nào được tải.</p>
          )}
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(<App />);
