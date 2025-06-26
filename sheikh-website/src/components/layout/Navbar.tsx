'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, BookOpen, User, Phone, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface NavItem {
  name: string;
  path: string;
  icon: string;
}

interface NavbarProps {
  navigation: NavItem[];
  siteTitle: string;
  adminMode: boolean;
}

const iconMap = {
  BookOpen,
  User,
  Phone,
  Settings,
};

export default function Navbar({ navigation, siteTitle, adminMode }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-3 space-x-reverse cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="flex items-center space-x-3 space-x-reverse">
              <div className="w-12 h-12 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-secondary)] rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">ع</span>
              </div>
              <div className="text-white">
                <h1 className="font-bold text-xl">{siteTitle}</h1>
                <p className="text-sm text-white/70">معلم القرآن الكريم</p>
              </div>
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navigation.map((item, index) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap] || BookOpen;
              const isActive = pathname === item.path;

              return (
                <motion.div key={item.path} className="relative">
                  <Link
                    href={item.path}
                    className={`flex items-center space-x-2 space-x-reverse px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                      isActive
                        ? 'text-[var(--color-primary)] bg-white/10'
                        : 'text-white hover:text-[var(--color-primary)]'
                    }`}
                  >
                    <IconComponent size={18} />
                    <span>{item.name}</span>
                  </Link>

                  {isActive && (
                    <motion.div
                      className="absolute inset-0 border-2 border-[var(--color-primary)] rounded-full"
                      layoutId="activeTab"
                      transition={{ type: 'spring', duration: 0.6 }}
                    />
                  )}
                </motion.div>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden text-white p-2"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.9 }}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="md:hidden mt-4 pb-4"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col space-y-2">
                {navigation.map((item, index) => {
                  const IconComponent = iconMap[item.icon as keyof typeof iconMap] || BookOpen;
                  const isActive = pathname === item.path;

                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Link
                        href={item.path}
                        onClick={() => setIsOpen(false)}
                        className={`flex items-center space-x-3 space-x-reverse px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                          isActive
                            ? 'text-[var(--color-primary)] bg-white/10 border border-[var(--color-primary)]/30'
                            : 'text-white hover:text-[var(--color-primary)] hover:bg-white/5'
                        }`}
                      >
                        <IconComponent size={20} />
                        <span>{item.name}</span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
}
