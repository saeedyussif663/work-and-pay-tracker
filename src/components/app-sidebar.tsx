import { Button } from '@/components/ui/button';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
import {
  ChartLineUpIcon,
  CreditCardIcon,
  HouseIcon,
  SignOutIcon,
} from '@phosphor-icons/react';
import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: HouseIcon },
  { to: '/investment', label: 'Investment', icon: ChartLineUpIcon },
  { to: '/payments', label: 'Payments', icon: CreditCardIcon },
];

const user = {
  name: 'Saeed Yussif',
  email: 'saeedyussif663@gmail.com',
};

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2.5 px-2 py-3">
          <img src="/icon.png" alt="Work&Pay icon" className="size-6" />
          <span className="font-ayuga text-lg text-[#333333]">Work&Pay</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-1.5">
            {navItems.map(({ to, label, icon: Icon }) => (
              <SidebarMenuItem key={to}>
                <NavLink to={to}>
                  {({ isActive }) => (
                    <SidebarMenuButton
                      isActive={isActive}
                      className="rounded-lg"
                    >
                      <Icon className={isActive ? 'text-brand-start' : ''} />
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
          <div className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
            {getInitials(user.name)}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-medium">{user.name}</p>
            <p className="truncate text-xs text-muted-foreground">
              {user.email}
            </p>
          </div>
          <Button variant="ghost" size="icon-sm" aria-label="Log out">
            <SignOutIcon />
          </Button>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
