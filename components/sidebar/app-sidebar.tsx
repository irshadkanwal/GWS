import * as React from "react";
import { Sidebar, SidebarContent, SidebarRail } from "@/components/ui/sidebar";
import { useRouter } from "next/router";
import { Items, SideNavMain } from "./SideNavMain";
import { ROUTES } from "@/constants/routes";
import { useUserStore } from "@/store";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const routePermissions = useUserStore(
    React.useCallback((state) => state.meta.permissions.routePermissions, [])
  );
  const { pathname } = useRouter();

  const navMain: Items[] = React.useMemo(() => {
    return Object.values(ROUTES).reduce<Items[]>((acc, value) => {
      const { hasChildRoutes } = value;
      if (hasChildRoutes) {
        const childrenRoutes: Items[] = Object.values(ROUTES)
          .filter((item) => item.parentRoute === value.pathName)
          .map((item) => ({
            title: item.title,
            icon: item.icon,
            url: item.pathName,
            shouldRender: routePermissions?.[item.pathName],
            isActive: pathname.includes(item.pathName),
          }));

        const route = {
          title: value.title,
          icon: value.icon,
          url: value.pathName,
          shouldRender: routePermissions?.[value.pathName],
          isActive: pathname.includes(value.pathName),
          items: childrenRoutes,
        };
        acc.push(route);
        return acc;
      }
      if (value.parentRoute || !value.showInSideBar) {
        return acc;
      }

      const route = {
        title: value.title,
        icon: value.icon,
        url: value.pathName,
        shouldRender: routePermissions?.[value.pathName] ?? false,
        isActive: pathname.includes(value.pathName),
      };
      acc.push(route);

      return acc;
    }, []);
  }, [pathname, routePermissions]);

  return (
    <Sidebar collapsible="icon" className="h-[calc(100vh-14)]" {...props}>
      <SidebarContent className="bg-white p-3">
        <SideNavMain items={navMain} />
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
