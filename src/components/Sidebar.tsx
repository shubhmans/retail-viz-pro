import { LayoutDashboard, Database, FileText, Users, Bell, Menu } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useState } from 'react';

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Datasets', href: '/datasets', icon: Database },
  { name: 'Reports', href: '/reports', icon: FileText },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Admin', href: '/admin', icon: Users },
];

export function Sidebar() {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <div
        className={cn(
          'fixed left-0 top-0 z-40 h-screen border-r bg-background transition-all duration-300',
          collapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          {!collapsed && (
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              SmartAnalytics
            </h1>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCollapsed(!collapsed)}
            className={cn(collapsed && 'mx-auto')}
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>

        <nav className="flex-1 space-y-1 p-2 pt-4">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
                title={collapsed ? item.name : undefined}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="border-t p-4">
          <div className={cn('flex items-center gap-2', collapsed && 'justify-center')}>
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className={cn('transition-all duration-300', collapsed ? 'ml-16' : 'ml-64')} />
    </>
  );
}
