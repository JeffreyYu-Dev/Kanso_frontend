"use client";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarGroupLabel,
  SidebarGroup,
} from "@/components/ui/sidebar";

import Link from "next/link";
import Notifications from "./notifications";
import UserComponent from "./user";
import {
  Bell,
  LogOut,
  UserPen,
  Computer,
  Sun,
  Moon,
  Users,
  Keyboard,
  Settings,
  Milk,
  History,
  Flame,
  Calendar,
  Plus,
  Crown,
} from "lucide-react";
import Miscellaneous from "./miscellaneous";
import Friends from "./friends";

const data = {
  personal: {
    title: "Personal",

    notifications: {
      title: "Notifications",
      icon: Bell,
    },
    watchList: {
      title: "Watch List",
      url: "/watch-list",
      icon: History,
    },
    friends: {
      title: "Friends",
      icon: Users,
    },
  },

  user: {
    name: "no user",

    userSettings: {
      title: "My Account",
      account: [
        {
          title: "Profile",
          icon: UserPen,
        },
        {
          title: "Keyboard shortcuts",
          icon: Keyboard,
        },
      ],
      logout: {
        title: "Logout",
        icon: LogOut,
      },
      login: {
        title: "Login With Anilist",
      },
    },
  },

  discover: {
    title: "Discover",
    url: "/Discover",
    icon: "search icon",
    items: [
      {
        title: "Just Aired",
        url: "/latest-aired",
        icon: Plus,
      },
      {
        title: "Popular",
        url: "/Popular",
        icon: Flame,
      },
      {
        title: "Top Rated",
        url: "/top-rated",
        icon: Crown,
      },
      {
        title: "Schedule",
        url: "/schedule",
        icon: Calendar,
      },
    ],
  },

  miscellaneous: {
    title: "Miscellaneous",
    items: [
      {
        // modes
        modes: [
          { mode: "Light", theme: "light", icon: Sun },
          { mode: "Dark", theme: "dark", icon: Moon },
          { mode: "System ", theme: "system", icon: Computer },
        ],
      },
      {
        title: "Settings",
        icon: Settings,
      },
    ],
  },
};

export function AppSidebar() {
  return (
    <Sidebar
      collapsible="icon"
      variant="inset"
      className="font-satoshi overflow-y-auto"
    >
      <SidebarHeader>
        {/* temp logo */}
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground group-data-[collapsible=icon]:hover:text-textAccent duration-300 ease-in-out">
                  <Milk size={16} />
                </div>
                <span className="font-generalSans font-bold tracking-wide text-lg">
                  Kanso
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold">Personal</SidebarGroupLabel>
          <SidebarMenu>
            <Notifications notificationData={data.personal.notifications} />
            <Friends friendsData={data.personal.friends} />
          </SidebarMenu>
        </SidebarGroup>
        <Miscellaneous
          className="mt-auto mb-2"
          miscellaneousData={data.miscellaneous}
        />
      </SidebarContent>
      <SidebarFooter>
        <UserComponent userData={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
