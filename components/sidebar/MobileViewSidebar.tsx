"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/router";
import { ROUTES } from "@/constants/routes";
import { Items, SideNavMain } from "./SideNavMain";
import { useUserStore } from "@/store";

export function MobileViewSidebar() {
  const { pathname } = useRouter();
  const routePermissions = useUserStore(
    React.useCallback((state) => state.meta.permissions.routePermissions, [])
  );

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
        shouldRender: routePermissions?.[value.pathName],
        isActive: pathname.includes(value.pathName),
      };
      acc.push(route);

      return acc;
    }, []);
  }, [pathname]);
  return (
    <Drawer direction="left">
      <DrawerTrigger asChild>
        <div className="flex justify-between items-center gap-3 cursor-pointer">
          <Button
            variant="ghost"
            className="flex items-center gap-3 text-lg p-0"
          >
            <Menu size={28} />
          </Button>
        </div>
      </DrawerTrigger>
      <DrawerContent className="w-2/3 h-screen">
        <div className="bg-background px-2 py-4 h-full">
          <DrawerHeader className="p-0 mb-6 justify-end">
            <DrawerClose asChild>
              <X className="text-primary" size={28} />
            </DrawerClose>
          </DrawerHeader>
          <SideNavMain items={navMain} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
