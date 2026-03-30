// components/layout/Navigation.tsx
'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
  external?: boolean;
}

const Navigation: React.FC = () => {
  const pathname = usePathname();
  
  const navItems: NavItem[] = [
    { name: "Home", href: "/" },
    { name: "For Students", href: "/#students" },
    { name: "For Colleges", href: "/#colleges" },
    { name: "Features", href: "/#features" },
    { name: "Contact", href: "/#contact" },
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

export default Navigation;