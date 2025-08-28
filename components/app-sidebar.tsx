"use client";
import * as React from "react";
import {
  IconChartBar,
  IconDashboard,
  IconHelp,
  IconUsers,
} from "@tabler/icons-react";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Archive, Barcode, Clipboard, DoorClosedLocked } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconDashboard,
      variant: false,
    },
    {
      title: "Consultas",
      url: "/dashboard/loans",
      icon: IconChartBar,
      variant: false,
    },
    {
      title: "Arquivados",
      url: "#",
      icon: Archive,
      variant: true,
    },
    {
      title: "Leitores",
      url: "/dashboard/readers",
      icon: IconUsers,
      variant: false,
    },
    {
      title: "Entrada/Saída",
      url: "/dashboard/register",
      icon: DoorClosedLocked,
      variant: false,
    },
    {
      title: "Procura rápida",
      url: "/dashboard/consult",
      icon: Barcode,
      variant: false,
    },
  ],
  navSecondary: [
    {
      title: "Preciso de ajuda!",
      url: "#",
      icon: IconHelp,
    },
    {
      title: "Relatório",
      url: "/dashboard/report",
      icon: Clipboard,
    },
  ],
};

type AppSidebarProps = {
  user: {
    name: string;
    email: string;
    image: string;
  };
} & React.ComponentProps<typeof Sidebar>;

import icon from "@/assets/icon.png";

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible='offcanvas' {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className='data-[slot=sidebar-menu-button]:!p-1.5 print:hidden'
            >
              <Link href='/dashboard'>
                <Image
                  src={icon}
                  alt='icon ibn'
                  className='size-5! dark:brightness-200'
                />
                <span className='text-base font-semibold'>
                  IPB - Instituto Bíblico do Norte
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className='mt-auto' />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
