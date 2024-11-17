import { type ReactNode } from "react";

import { checkAuth } from "@/lib/auth";

const Layout = ({ children }: { children: ReactNode }) => {
  checkAuth();

  return children;
};

export default Layout;
