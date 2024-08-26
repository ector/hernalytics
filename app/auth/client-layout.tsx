// components/auth/client-auth-layout.tsx
"use client";

import { Provider } from "react-redux";
import AuthHeader from "@/components/auth/header";
import store from "@/store/store";

export default function ClientAuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthHeader />
      <main>{children}</main>
    </Provider>
  );
}
