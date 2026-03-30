// components/layout/Header.tsx
'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { decodeToken } from "@/lib/auth";
import Logo from "./Logo";
import LogoutButton from "../Logout/LogoutButton";

interface User {
  id: string;
  email: string;
  role: 'student' | 'college' | 'admin';
  name: string;
}

const Header: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      try {
        const token = localStorage.getItem('balaji_token');
        if (token) {
          const decoded = decodeToken<{ sub: string; email: string; role: string; name?: string }>(token);
          if (decoded) {
            setUser({
              id: decoded.sub,
              email: decoded.email,
              role: decoded.role as 'student' | 'college' | 'admin',
              name: decoded.name || 'User'
            });
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [pathname]);

  // Navigation items based on user role
  const getNavigationItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'student':
        return [
          { name: "Dashboard", href: "/dashboard" },
          { name: "Profile", href: "/profile" },
          { name: "Course", href: "/course" },
          { name: "Certificate", href: "/certificate" },
        ];
      case 'admin':
        return [
          { name: "Dashboard", href: "/admin/dashboard" },
          { name: "Students", href: "/admin/students" },
          {name:"Cash Payments", href:"/admin/cash-payments"},
        ];
      case 'college':
        return [
          { name: "Dashboard", href: "/college/dashboard" },
          { name: "Profile", href: "/college/profile" },
          { name: "Students", href: "/college/students" },
        ];
      default:
        return [];
    }
  };

  const isActive = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  if (isLoading) {
    return (
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo/>
            <div className="flex items-center space-x-4">
              <div className="w-20 h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Logo />
          
          {user ? (
            // Authenticated User Header
            <div className="flex items-center space-x-8">
              {/* Navigation */}
              <nav className="hidden md:flex items-center space-x-6">
                {getNavigationItems().map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`font-medium transition-colors duration-200 relative group ${
                      isActive(item.href)
                        ? "text-blue-600"
                        : "text-gray-700 hover:text-blue-600"
                    }`}
                  >
                    {item.name}
                    <span 
                      className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
                        isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                ))}
              </nav>

              {/* User Info and Logout */}
              <div className="flex items-center space-x-4">
                <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-700">
                  <span>Hi,</span>
                  <span className="font-semibold text-gray-900">{user.name}</span>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full font-medium capitalize">
                    {user.role}
                  </span>
                </div>
                <LogoutButton />
              </div>
            </div>
          ) : (
            // Public Header
            <div className="flex items-center space-x-4">
              <PublicNavigation />
              <AuthButtons />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

// Public Navigation Component
const PublicNavigation: React.FC = () => {
  const pathname = usePathname();
  
  const navItems = [
    { name: "Home", href: "/" },
    { name: "For Students", href: "/#students" },
    { name: "For Colleges", href: "/#colleges" },
    { name: "Features", href: "/#features" },
    { name: "Contact", href: "/contact" },
  ];

  const isActive = (href: string): boolean => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      {navItems.map((item) => (
        <Link
          key={item.name}
          href={item.href}
          className={`font-medium transition-colors duration-200 relative group ${
            isActive(item.href)
              ? "text-blue-600"
              : "text-gray-700 hover:text-blue-600"
          }`}
        >
          {item.name}
          <span 
            className={`absolute -bottom-1 left-0 h-0.5 bg-blue-600 transition-all duration-200 ${
              isActive(item.href) ? "w-full" : "w-0 group-hover:w-full"
            }`}
          />
        </Link>
      ))}
    </nav>
  );
};

// Auth Buttons Component (for public header)
const AuthButtons: React.FC = () => {
  return (
    <div className="flex items-center space-x-4">
      <Link
        href="/login"
        className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
      >
        Login
      </Link>
      <Link
        href="/register"
        className="btn btn-primary text-sm"
      >
        Get Started
      </Link>
    </div>
  );
};

export default Header;