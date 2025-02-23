import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { SidebarMenu, SidebarMenuItem, SidebarMenuButton } from "../ui/sidebar";
import { useSession, signIn, signOut } from "next-auth/react";
import { ChevronsUpDown } from "lucide-react";
import { SiAnilist } from "react-icons/si";

import {
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuItem,
} from "../ui/dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
} from "../ui/dropdown-menu";

import { User } from "lucide-react";

const UserComponent = ({ userData }) => {
  const { data: session } = useSession();
  // colours profs -> status
  const status = {
    Online: "bg-lime-500",
    Idle: "bg-yellow-500",
    "Do Not disturb": "bg-rose-500",
    Offline: "bg-violet-400",
  };

  const currentStatus = "Offline";

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton size="lg">
              <div className="relative">
                {session ? (
                  <>
                    <Avatar className=" size-8 rounded-lg ">
                      <AvatarImage
                        src={session.user.image}
                        alt={session.user.name}
                      />
                      <AvatarFallback className="rounded-lg">
                        {session.user.name.trim(2)}
                      </AvatarFallback>
                    </Avatar>
                    <span
                      className={`absolute group-data-[collapsible=icon]:hidden size-2 ${status[currentStatus]} bottom-0 right-0 translate-x-0.5 translate-y-0.5 rounded-full `}
                    />
                  </>
                ) : (
                  <User className=" size-8 rounded-lg " strokeWidth={1} />
                )}
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {session?.user?.name || userData.name}
                </span>
                <span className="truncate text-xs">hi</span>
              </div>
              <ChevronsUpDown className="group-data-[collapsible=icon]:hidden" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            side={"right"}
            align="end"
            className="w-40 md:w-48"
          >
            {/*  MENU TITLE*/}
            <DropdownMenuLabel>{userData.userSettings.title}</DropdownMenuLabel>

            <DropdownMenuSeparator />

            {/* PROFILE GROUP */}
            <DropdownMenuGroup>
              {userData.userSettings.account.map((item) => {
                return (
                  <DropdownMenuItem
                    key={item.title}
                    disabled={!session && item.title == "Profile"}
                  >
                    <item.icon size={12} />
                    <h2 className="text-xs font-medium">{item.title}</h2>
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* logout */}
            <DropdownMenuGroup>
              {session ? (
                // LOGOUT
                <button
                  className="w-full"
                  onClick={() => {
                    signOut();
                  }}
                >
                  <DropdownMenuItem>
                    <userData.userSettings.logout.icon size={12} />
                    <h2 className="text-xs font-medium">
                      {userData.userSettings.logout.title}
                    </h2>
                  </DropdownMenuItem>
                </button>
              ) : (
                // LOGIN
                <button className="w-full" onClick={() => signIn()}>
                  <DropdownMenuItem>
                    <SiAnilist />
                    <h2 className="text-xs font-medium">
                      {userData.userSettings.login.title}
                    </h2>
                  </DropdownMenuItem>
                </button>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
};

export default UserComponent;
