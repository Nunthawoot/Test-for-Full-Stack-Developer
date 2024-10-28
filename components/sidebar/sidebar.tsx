import React from "react";
import { Sidebar } from "./sidebar.styles";
import { Avatar, Tooltip } from "@nextui-org/react";
import { useSidebarContext } from "../layout/layout-context";
import { SidebarItem } from "./sidebar-item";
import { SidebarMenu } from "./sidebar-menu";
import { CollapseItems } from "./collapse-items";

import { usePathname } from "next/navigation";

export const SidebarWrapper = () => {
  const pathname = usePathname();
  const { collapsed, setCollapsed } = useSidebarContext();

  return (
    <aside className="h-screen z-[20] sticky top-0 bg-green-100">
      {/* {collapsed ? (
        <div className={Sidebar.Overlay()} onClick={setCollapsed} />
      ) : null} */}
      <div
        className={Sidebar({
          collapsed: collapsed,
        })}
      >
        <div className={Sidebar.Header()}>{/* <CompaniesDropdown /> */}</div>
        <div className="flex flex-col justify-between h-full">
          <div className={Sidebar.Body()}>
            <SidebarItem title="Home" isActive={pathname === "/"} href="/" />
            <SidebarItem
              title="Our Blog"
              isActive={pathname === "/OurBlog"}
              href="/"
            />
          </div>
        </div>
      </div>
    </aside>
  );
};
