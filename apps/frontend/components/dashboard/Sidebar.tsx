"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { 
  BookOpen, 
  LayoutDashboard, 
  FileText, 
  BarChart3, 
  User, 
  Settings, 
  HelpCircle, 
  ChevronLeft,
  Trophy,
  Clock,
  Star,
  Target,
  CreditCard,
  Bell
} from "lucide-react";

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    description: 'Overview & Analytics'
  },
  {
    name: 'Tests',
    href: '/tests',
    icon: FileText,
    description: 'Browse & Take Tests'
  },
  {
    name: 'Results',
    href: '/results',
    icon: BarChart3,
    description: 'Performance Analysis'
  },
  {
    name: 'Practice',
    href: '/practice',
    icon: Target,
    description: 'Topic-wise Practice'
  },
  {
    name: 'Achievements',
    href: '/achievements',
    icon: Trophy,
    description: 'Badges & Milestones'
  },
  {
    name: 'Schedule',
    href: '/schedule',
    icon: Clock,
    description: 'Study Planning'
  }
];

const bottomNavigation = [
  {
    name: 'Profile',
    href: '/profile',
    icon: User,
    description: 'Account Settings'
  },
  {
    name: 'Subscription',
    href: '/subscription',
    icon: CreditCard,
    description: 'Manage Plan'
  },
  {
    name: 'Settings',
    href: '/settings',
    icon: Settings,
    description: 'App Preferences'
  },
  {
    name: 'Help',
    href: '/help',
    icon: HelpCircle,
    description: 'Support & FAQ'
  }
];

interface SidebarProps {
  onMobileClose?: () => void;
}

export const Sidebar = ({ onMobileClose }: SidebarProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { user } = useAuth();

  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return pathname === href;
    }
    return pathname.startsWith(href);
  };

  const handleLinkClick = () => {
    if (onMobileClose) {
      onMobileClose();
    }
  };

  return (
    <>
      {/* Sidebar */}
      <div className={`h-full bg-white border-r border-gray-200 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-64'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          {!isCollapsed && (
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">PrernaTest</span>
            </Link>
          )}
          
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors hidden lg:block"
          >
            <ChevronLeft className={`h-5 w-5 text-gray-500 transition-transform ${
              isCollapsed ? 'rotate-180' : ''
            }`} />
          </button>
        </div>

        {/* User Info */}
        {!isCollapsed && user && (
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">
                  {user.name?.charAt(0).toUpperCase() || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user.name}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user.subscription?.plan || 'Free Plan'}
                </p>
              </div>
            </div>
            
            {/* Quick Stats */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-blue-600">Tests Taken</span>
                  <Star className="h-3 w-3 text-blue-500" />
                </div>
                <p className="text-lg font-bold text-blue-900 mt-1">
                  {user.stats?.testsCompleted || 0}
                </p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-green-600">Avg Score</span>
                  <Trophy className="h-3 w-3 text-green-500" />
                </div>
                <p className="text-lg font-bold text-green-900 mt-1">
                  {user.stats?.averageScore ? `${user.stats.averageScore}%` : 'N/A'}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          {navigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-blue-100 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                }`}
                title={isCollapsed ? item.name : ''}
              >
                <Icon className={`flex-shrink-0 h-5 w-5 ${
                  active ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'
                }`} />
                {!isCollapsed && (
                  <div className="ml-3 flex-1">
                    <span className="block">{item.name}</span>
                    <span className="text-xs text-gray-500 block">{item.description}</span>
                  </div>
                )}
                
                {!isCollapsed && active && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Navigation */}
        <div className="border-t border-gray-200 p-4 space-y-2">
          {bottomNavigation.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleLinkClick}
                className={`group flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                  active
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
                title={isCollapsed ? item.name : ''}
              >
                <Icon className="flex-shrink-0 h-5 w-5 text-gray-400 group-hover:text-gray-600" />
                {!isCollapsed && (
                  <span className="ml-3">{item.name}</span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Upgrade Banner */}
        {!isCollapsed && user?.subscription?.plan === 'free' && (
          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-4 text-white">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Upgrade to Pro</span>
                <Star className="h-4 w-4" />
              </div>
              <p className="text-xs opacity-90 mb-3">
                Get unlimited tests, detailed analytics & more
              </p>
              <Link
                href="/subscription"
                onClick={handleLinkClick}
                className="block w-full bg-white bg-opacity-20 text-center py-2 rounded-md text-sm font-medium hover:bg-opacity-30 transition-all"
              >
                Upgrade Now
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
};
