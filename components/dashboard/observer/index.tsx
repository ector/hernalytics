"use client";
import { AppDispatch, RootState } from "@/store/store";
import Footer from "./footer";
import ObserverHome from "./home";
import ObserverNav from "./nav";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchCurrentUser } from "@/store/slices/auth";
import AppLogo from "@/components/shared/app-logo";

export default function Observer(): React.ReactNode {
  const user = useSelector((state: RootState) => state.auth.user);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen p-fixed">
        <div className="loader blinking-logo">
          <AppLogo />
        </div>
      </div>
    );
  }

  return (
    <>
      <ObserverNav />
      <ObserverHome user={user} />
      <Footer />
    </>
  );
}
