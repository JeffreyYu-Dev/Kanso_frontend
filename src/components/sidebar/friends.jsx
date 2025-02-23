import React from "react";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Friends = ({ friendsData }) => {
  return (
    <Dialog>
      <SidebarMenuItem>
        <DialogTrigger asChild>
          <SidebarMenuButton className="group-data-[collapsible=icon]:hover:text-textAccent">
            <friendsData.icon size={16} />
            <span>
              <h2>{friendsData.title}</h2>
            </span>
          </SidebarMenuButton>
        </DialogTrigger>

        {/* notifcations list content */}
        <DialogContent className="font-generalSans">
          {/* header */}
          <DialogHeader>
            <DialogTitle>{friendsData.title}</DialogTitle>
          </DialogHeader>

          {/* Footer */}
          <DialogFooter></DialogFooter>
        </DialogContent>
      </SidebarMenuItem>
    </Dialog>
  );
};

export default Friends;
