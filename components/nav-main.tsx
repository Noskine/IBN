import { IconCirclePlusFilled, type Icon } from "@tabler/icons-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon?: React.ElementType;
    variant: boolean;
  }[];
}) {
  return (
    <SidebarGroup>
      <SidebarGroupContent className='flex flex-col gap-2'>
        <SidebarMenu>
          <SidebarMenuItem className='flex items-center gap-2'>
            <Link href='/dashboard/book' className='w-full'>
              <SidebarMenuButton
                tooltip='Quick Create'
                className='bg-emerald-700  text-background hover:bg-emerald-800 dark:bg-emerald-500 dark:hover:bg-emerald-600 rounded-xl font-bold hover:text-background w-full transition-colors duration-200 cursor-pointer'
              >
                <IconCirclePlusFilled />
                <span>Cadrastrar Livro</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <Link href={item.url} key={item.title}>
              <SidebarMenuItem>
                <SidebarMenuButton
                  tooltip={item.title}
                  className={
                    item.variant
                      ? "opacity-50 cursor-not-allowed text-red-600 hover:text-red-600 dark:bg-zinc-950/80"
                      : "cursor-pointer"
                  }
                >
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
