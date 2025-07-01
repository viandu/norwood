"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineMenu, HiOutlineX } from "react-icons/hi";
import { LogIn, UserCircle, LayoutDashboard, LogOut } from "lucide-react";

interface SessionData {
  userId: string;
  username: string;
  expires?: Date;
}

const Navbar = ({ session: initialSession }: { session: SessionData | null }) => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);
  const [session, setSession] = useState<SessionData | null>(initialSession);

  const isAuthenticated = !!session?.userId;

  // Fetch session client-side
  useEffect(() => {
    const fetchSession = async () => {
      try {
        const response = await fetch("/api/session");
        if (!response.ok) {
          throw new Error("Failed to fetch session");
        }
        const data = await response.json();
        setSession(data.session);
      } catch (error) {
        console.error("Failed to fetch session:", error);
        setSession(null);
      }
    };

    fetchSession();
  }, []); // Run once on mount to sync with server-side session

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (menuOpen) setMenuOpen(false);
      if (adminMenuOpen) setAdminMenuOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [menuOpen, adminMenuOpen]);

  // Handle body overflow for mobile menu
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  const handleSignOut = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });
      if (response.ok) {
        setSession(null); // Clear session client-side to update UI
        setAdminMenuOpen(false); // Close admin menu
        // No need to call router.push here since /api/logout redirects server-side
        router.refresh(); // Refresh to ensure UI updates
      } else {
        console.error("Logout failed:", await response.json());
      }
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  const navLinks = [
    { path: "/", label: "HOME" },
    { path: "/Products", label: "PRODUCTS" },
    { path: "/Our-Story", label: "OUR STORY" },
    { path: "/Our-Companies", label: "OUR COMPANIES" },
    { path: "/Careers", label: "CAREERS" },
    { path: "/Contact-Us", label: "CONTACT US" },
  ];

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6 }}
      className={`fixed top-0 left-0 w-full z-50 px-6 sm:px-10 flex items-center transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-8xl mx-auto flex items-center justify-between w-full h-20">
        {/* Logo */}
        <div className="flex items-center space-x-5">
          <Link href="/">
            <Image
              src="/logo.png"
              alt="Norwood Empire Logo"
              width={60}
              height={50}
              priority
            />
          </Link>
          <span className="font-bold text-2xl sm:text-3xl text-green-700">
            NORWOOD EMPIRE
          </span>
        </div>

        {/* Right-side container */}
        <div className="hidden md:flex items-center gap-6">
          {/* Main Navigation Links */}
          <div className="flex items-center gap-10">
            {navLinks.map((link, i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.05 }}
                className="relative group"
              >
                <Link
                  href={link.path}
                  className="text-lg font-medium text-green-700 hover:text-green-600 transition-colors"
                >
                  {link.label}
                </Link>
                <span className="absolute left-0 -bottom-1 h-0.5 w-0 bg-green-500 group-hover:w-full transition-all duration-300" />
              </motion.div>
            ))}
          </div>

          {/* Admin Section */}
          <div className="relative">
            {isAuthenticated ? (
              <button
                onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                className="flex items-center justify-center h-10 w-10 bg-green-100 rounded-full text-green-700 hover:bg-green-200 transition-colors"
                aria-label="User Profile"
              >
                <UserCircle size={24} />
              </button>
            ) : (
              <motion.button
                onClick={() => router.push("/login")}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-full shadow-md hover:bg-green-700 hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                aria-label="Login"
              >
                <LogIn size={18} />
                <span>Login</span>
              </motion.button>
            )}

            {/* Admin Dropdown Menu */}
            <AnimatePresence>
              {adminMenuOpen && isAuthenticated && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 origin-top-right"
                >
                  <Link
                    href="/dashboard"
                    onClick={() => setAdminMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LayoutDashboard size={18} />
                    Dashboard
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut size={18} />
                    Sign Out
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile Hamburger */}
        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            className="text-3xl text-green-700"
            aria-label="Toggle Menu"
          >
            {menuOpen ? <HiOutlineX /> : <HiOutlineMenu />}
          </button>
        </div>

        {/* Mobile Slide-Out */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              key="mobile-menu"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}
              className="fixed top-0 right-0 h-full w-64 bg-white shadow-2xl flex flex-col p-8 space-y-6 z-50 md:hidden"
            >
              <div className="flex justify-end">
                <button
                  onClick={closeMenu}
                  aria-label="Close Menu"
                  className="text-3xl text-green-700"
                >
                  <HiOutlineX />
                </button>
              </div>
              {navLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.path}
                  onClick={closeMenu}
                  className="text-green-700 font-semibold text-xl hover:text-green-900 transition"
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-6 border-t border-gray-200 space-y-4">
                {isAuthenticated ? (
                  <>
                    <Link
                      href="/dashboard"
                      onClick={closeMenu}
                      className="flex items-center gap-3 text-green-700 font-semibold text-xl"
                    >
                      <LayoutDashboard size={24} />
                      Dashboard
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-3 text-green-700 font-semibold text-xl"
                    >
                      <LogOut size={24} />
                      Sign Out
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => {
                      router.push("/login");
                      closeMenu();
                    }}
                    className="flex items-center gap-3 text-green-700 font-semibold text-xl"
                  >
                    <LogIn size={24} />
                    Admin Login
                  </button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  );
};

export default Navbar;