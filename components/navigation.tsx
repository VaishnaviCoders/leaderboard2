'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Trophy, PlusCircle, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const navItems = [
  {
    href: '/dashboard',
    label: 'Dashboard',
    icon: Home,
    description: 'View your main dashboard',
  },
  {
    href: '/dashboard/scores',
    label: 'Scores',
    icon: Trophy,
    description: 'Check all cube scores',
  },
  {
    href: '/dashboard/add-score',
    label: 'Add Score',
    icon: PlusCircle,
    description: 'Add a new cube score',
  },
];

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Close mobile menu when window is resized to desktop view
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300',
        scrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-md'
      )}
    >
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 transition-opacity hover:opacity-80"
          >
            <Image
              src="/header_logo-transformed-1.png"
              alt="Cube Timer Logo"
              width={140}
              height={40}
              className="h-10 w-auto object-contain"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-2 rounded-md text-sm font-medium transition-colors',
                  'hover:bg-gray-100',
                  pathname === item.href
                    ? 'text-gray-900 bg-gray-100'
                    : 'text-gray-600 hover:text-gray-900'
                )}
                title={item.description}
              >
                <item.icon className="h-4 w-4 mr-2" />
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={cn(
            'fixed inset-x-0 top-16 bg-white md:hidden transition-all duration-300 ease-in-out',
            isOpen
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 -translate-y-2 pointer-events-none'
          )}
        >
          <div className="border-t border-gray-200 py-2 px-4 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center px-4 py-3 rounded-md text-sm font-medium transition-colors',
                  pathname === item.href
                    ? 'text-gray-900 bg-gray-100'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4 mr-3" />
                <div>
                  <div>{item.label}</div>
                  <div className="text-xs text-gray-500 font-normal">
                    {item.description}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>
    </header>
  );
}
