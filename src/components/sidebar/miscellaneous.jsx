"use client";
import React, { useState } from "react";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
} from "../ui/dropdown-menu";
import { useTheme } from "next-themes";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import Link from "next/link";

const Miscellaneous = ({ miscellaneousData, className }) => {
  const { setTheme } = useTheme();

  const [currentTheme, setCurrentTheme] = useState({
    theme: "system",
    icon: miscellaneousData.items[0].modes[2].icon,
    mode: miscellaneousData.items[0].modes[2].mode,
  });

  const handleThemeChange = (theme, icon, mode) => {
    setTheme(theme);
    setCurrentTheme({
      theme: theme,
      icon: icon,
      mode: mode,
    });
  };

  const settings = miscellaneousData.items[1];

  return (
    <SidebarGroup className={`${className} `}>
      <SidebarGroupLabel className="font-bold">
        {miscellaneousData.title}
      </SidebarGroupLabel>
      {/* content */}
      <SidebarMenu>
        <DropdownMenu>
          <SidebarMenuItem>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton className="group-data-[collapsible=icon]:hover:text-textAccent">
                <currentTheme.icon size={16} />
                <span>{currentTheme.mode}</span>
              </SidebarMenuButton>
            </DropdownMenuTrigger>

            {/* content */}
            <DropdownMenuContent align="start" side={"top"}>
              {miscellaneousData.items[0].modes.map((item) => {
                return (
                  <DropdownMenuItem
                    className="w-full"
                    onClick={() =>
                      handleThemeChange(item.theme, item.icon, item.mode)
                    }
                    key={item.mode}
                  >
                    <item.icon size={16} />
                    {item.mode}
                  </DropdownMenuItem>
                );
              })}
            </DropdownMenuContent>
          </SidebarMenuItem>
          {/*  settings*/}
          <SidebarMenuItem>
            <SidebarMenuButton className="group-data-[collapsible=icon]:hover:text-textAccent">
              <settings.icon size={16} />
              <Link href="/">{settings.title}</Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </DropdownMenu>
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default Miscellaneous;
