import { Bell, Search, Settings, User, Moon, Sun, LogOut, HelpCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { Badge } from '../components/ui/badge';
import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

export function Header() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { language, setLanguage } = useLanguage();
  const [notifications] = useState([
    { id: 1, message: 'New order received from Green Valley Distributors', time: '5 min ago', unread: true },
    { id: 2, message: 'Machine maintenance scheduled for tomorrow', time: '1 hour ago', unread: true },
    { id: 3, message: 'Quality control report ready for review', time: '2 hours ago', unread: false },
  ]);

  const unreadCount = notifications.filter(n => n.unread).length;

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    // In a real app, this would toggle dark mode class on document
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'fa' : 'en');
  };

  return (
    <header className="h-16 border-b border-white/20 bg-white/10 backdrop-blur-xl shadow-2xl flex items-center justify-between px-6 z-50 relative">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-rosary/40 w-4 h-4" />
          <Input
            type="text"
            placeholder="Search products, orders, partners..."
            className="pl-10 w-full bg-white/10 backdrop-blur-md border-white/30 text-rosary placeholder-rosary/40 focus:ring-gold focus:border-gold"
          />
        </div>
      </div>

      {/* Right Side Actions */}
      <div className="flex items-center gap-3">
        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleLanguage}
          className="gap-2 text-rosary hover:bg-white/10 hover:text-gold"
        >
          <span className="text-xs font-medium">{language === 'en' ? 'EN' : 'فا'}</span>
        </Button>

        {/* Dark Mode Toggle */}
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleDarkMode}
          className="text-rosary hover:bg-white/10 hover:text-gold"
        >
          {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
        </Button>

        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="relative text-rosary hover:bg-white/10 hover:text-gold">
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-blood text-rosary border-none">
                  {unreadCount}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80 bg-damask/95 backdrop-blur-xl border-white/20 text-rosary">
            <DropdownMenuLabel className="text-gold">Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/20" />
            {notifications.map((notification) => (
              <DropdownMenuItem key={notification.id} className="flex flex-col items-start p-3 hover:bg-white/10 focus:bg-white/10 cursor-pointer">
                <div className="flex items-start justify-between w-full gap-2">
                  <p className="text-sm flex-1">{notification.message}</p>
                  {notification.unread && (
                    <div className="w-2 h-2 bg-gold rounded-full mt-1" />
                  )}
                </div>
                <span className="text-xs text-rosary/60 mt-1">{notification.time}</span>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator className="bg-white/20" />
            <DropdownMenuItem className="text-center justify-center text-gold hover:text-rosary hover:bg-white/10 focus:bg-white/10 cursor-pointer">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Help */}
        <Button variant="ghost" size="sm" className="text-rosary hover:bg-white/10 hover:text-gold">
          <HelpCircle className="w-4 h-4" />
        </Button>

        {/* Settings */}
        <Button variant="ghost" size="sm" className="text-rosary hover:bg-white/10 hover:text-gold">
          <Settings className="w-4 h-4" />
        </Button>

        {/* User Menu */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="sm" className="gap-2 text-rosary hover:bg-white/10">
              <div className="w-8 h-8 bg-blood rounded-full flex items-center justify-center shadow-lg">
                <User className="w-4 h-4 text-rosary" />
              </div>
              <div className="text-left hidden md:block">
                <p className="text-sm font-medium">Admin User</p>
                <p className="text-xs text-rosary/60">admin@company.com</p>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 bg-damask/95 backdrop-blur-xl border-white/20 text-rosary">
            <DropdownMenuLabel className="text-gold">My Account</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/20" />
            <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="hover:bg-white/10 focus:bg-white/10 cursor-pointer">
              <HelpCircle className="mr-2 h-4 w-4" />
              <span>Help & Support</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/20" />
            <DropdownMenuItem className="text-blood hover:bg-blood/20 focus:bg-blood/20 cursor-pointer">
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
