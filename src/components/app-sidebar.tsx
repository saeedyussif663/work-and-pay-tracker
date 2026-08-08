import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/use-auth";
import {
  ChartLineUpIcon,
  CreditCardIcon,
  HouseIcon,
  SignOutIcon,
} from "@phosphor-icons/react";
import { NavLink } from "react-router-dom";
import { UserChip } from "./ui/user-chip";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: HouseIcon },
  { to: "/vehicles", label: "Vehicle", icon: ChartLineUpIcon },
  { to: "/payments", label: "Payments", icon: CreditCardIcon },
];

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const { user, logout } = useAuth();

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2.5 px-2 py-3">
          <img src="/icon.png" alt="Work&Pay icon" className="size-6" />
          <div className="flex items-center gap-1 font-mono text-[15px] font-semibold tracking-wide text-foreground">
            <span className="text-primary">[</span>
            WORK / PAY
            <span className="text-primary">]</span>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1.5">
            {navItems.map(({ to, label, icon: Icon }) => (
              <SidebarMenuItem key={to}>
                <NavLink to={to} onClick={() => setOpenMobile(false)}>
                  {({ isActive }) => (
                    <SidebarMenuButton
                      isActive={isActive}
                      className="rounded-lg"
                    >
                      <Icon className={isActive ? "text-primary" : ""} />
                      <span>{label}</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center gap-3 px-2 py-3">
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full  text-xs font-semibold">
            <UserChip user={user} />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">{user?.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user?.email}
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon-sm"
            aria-label="Log out"
            onClick={logout}
            className="cursor-pointer rounded-sm"
          >
            <SignOutIcon />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
