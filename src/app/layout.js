"use client";

import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/utils/AuthProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import LoadingPage from "./loading";
import { RecordProvider } from "@/components/utils/recordContext";
import { CategoryProvider } from "@/components/utils/CategoryContext";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [token, setToken] = useState(null);
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);
  const home = dynamic(() => import("../app/page"), {
    ssr: true,
    loading: () => <LoadingPage />,
  });

  const getData = async () => {};
  return (
    <html lang="en">
      <body>
        <RecordProvider value={{ token }}>
          <CategoryProvider>
            <AuthProvider>{children}</AuthProvider>
          </CategoryProvider>
        </RecordProvider>
        <ToastContainer />
      </body>
    </html>
  );
}
