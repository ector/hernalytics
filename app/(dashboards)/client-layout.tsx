"use client";

import DashboardHeader from "@/components/dashboard/header";
import VEOProvider from "@/providers/veo-context";
import store from "@/store/store";
import { Suspense } from "react";

import { Provider } from "react-redux";

export default function ObserverClient({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Provider store={store}>
      <Suspense fallback={<div>loading</div>}>
        <VEOProvider>
          <div>
            <DashboardHeader />
            <main> {children}</main>
          </div>
        </VEOProvider>
      </Suspense>
    </Provider>
  );
}
