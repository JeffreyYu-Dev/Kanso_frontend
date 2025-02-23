"use client";

import React, { useState } from "react";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { Button } from "../ui/button";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Inbox } from "lucide-react";

const InviteNotification = ({ data }) => {
  return (
    //Card
    <div className="p-2 rounded-md hover:bg-textAccent duration-150 ease-in-out">
      {/* stuff */}
      <div className="flex items-center gap-2">
        {/* avatar */}
        <Avatar className="size-10">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        {/* details */}
        <div className="flex justify-between w-full grow-0">
          <div>
            <h2 className="text-xs line-clamp-1">
              <span className="font-bold">{data.user}</span> invited you to the
              party!
            </h2>
            <p className="text-xs">6 hours ago</p>
          </div>

          {/* accept */}
          <Button size="sm">Accept</Button>
        </div>
      </div>
    </div>
  );
};

// add friend notification

const Notifications = ({ notificationData }) => {
  const [notifications, setNotifications] = useState([
    {
      user: "Jeff",
    },
    {
      user: "I love BBC",
    },
    {
      user: "Jeff",
    },
    {
      user: "Jeff",
    },
    {
      user: "Jeff",
    },
    {
      user: "Jeff",
    },
    {
      user: "Jeff",
    },
    {
      user: "Jeff",
    },
    {
      user: "Jeff",
    },
    {
      user: "Jeff",
    },
    {
      user: "Jeff",
    },
    {
      user: "Jeff",
    },
  ]);

  function clearNotifications() {
    setNotifications([]);
  }

  return (
    <Dialog>
      <SidebarMenuItem>
        <DialogTrigger asChild>
          <SidebarMenuButton className="group-data-[collapsible=icon]:hover:text-textAccent">
            {/* red dot above the bell */}

            <span
              className={`relative ${
                notifications.length > 0 ? "after:block " : "after:hidden"
              } after:absolute after:-top-0.5 after:-right-0.5 flex items-center justify-center after:size-2 after:bg-rose-500 after:rounded-full`}
            >
              <notificationData.icon size={16} />
            </span>
            <span>
              <h2>{notificationData.title}</h2>
            </span>
          </SidebarMenuButton>
        </DialogTrigger>

        {/* notifcations list content */}
        <DialogContent className="font-generalSans">
          {/* header */}
          <DialogHeader>
            <DialogTitle>{notificationData.title}</DialogTitle>
          </DialogHeader>

          {/* actual notifications */}
          <div className="h-36 xs:h-96 sm:h-36 md:h-96 flex flex-col gap-y-2 overflow-y-auto">
            {/* NOTIFICATIONS */}

            {/* content */}
            {notifications.length == 0 ? (
              <div className=" h-full w-full flex items-center justify-center text-muted-foreground flex-col gap-y-4">
                <Inbox size={100} />
                <h1 className="font-medium">You&lsquo;re All Caught up!</h1>
                <h3 className="text-xs">
                  Individual Notifications Expire After 7 Days
                </h3>
              </div>
            ) : (
              notifications.map((noti, index) => {
                return <InviteNotification key={index} data={noti} />;
              })
            )}
          </div>

          {/* Footer */}
          <DialogFooter>
            <Button
              className="w-full hover:text-textAccent duration-300 ease-in-out"
              onClick={() => {
                // clear notifications
                clearNotifications();
              }}
            >
              Clear
            </Button>
          </DialogFooter>
        </DialogContent>
      </SidebarMenuItem>
    </Dialog>
  );
};

export default Notifications;
