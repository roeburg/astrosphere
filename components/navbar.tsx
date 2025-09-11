"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { LogOut, Menu, X } from "lucide-react";

interface User {
  email: string;
  role: "user" | "admin";
}

export function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check for token on component mount
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decodedUser = jwtDecode<User>(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken");
      }
    }

    // Close mobile menu on window resize to desktop
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUser(null);
    setIsMenuOpen(false); // Close menu on logout
    window.location.href = "/login";
  };

  // A component to render the navigation links to avoid repetition
  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
    const linkClass = mobile
      ? "text-lg font-medium w-full p-3 rounded-md hover:bg-muted"
      : "text-sm font-medium transition-colors hover:text-primary";
    
    const handleLinkClick = () => {
      if (mobile) setIsMenuOpen(false);
    };

    return (
      <>
        {/* GUEST LINKS */}
        {!user && (
          <>
            <Link href="/" className={linkClass} onClick={handleLinkClick}>Home</Link>
            <Link href="/about" className={linkClass} onClick={handleLinkClick}>About</Link>
            <Link href="/manglic" className={linkClass} onClick={handleLinkClick}>Manglik</Link>
            <Link href="/login" className={linkClass} onClick={handleLinkClick}>Login</Link>
          </>
        )}

        {/* USER LINKS */}
        {user?.role === "user" && (
          <>
            <Link href="/" className={linkClass} onClick={handleLinkClick}>Home</Link>
            <Link href="/about" className={linkClass} onClick={handleLinkClick}>About</Link>
            <Link href="/numerology" className={linkClass} onClick={handleLinkClick}>Numerology</Link>
            <Link href="/kundli" className={linkClass} onClick={handleLinkClick}>Vedic Kundli</Link>
            <Link href="/appointments" className={linkClass} onClick={handleLinkClick}>Book Session</Link>
            <Link href="/chat" className={linkClass} onClick={handleLinkClick}>WhatsApp</Link>
            <Link href="/planetresult" className={linkClass} onClick={handleLinkClick}>Planet Report</Link>
          </>
        )}

        {/* ADMIN LINKS */}
        {user?.role === "admin" && (
          <>
            <Link href="/" className={linkClass} onClick={handleLinkClick}>Home</Link>
            <Link href="/about" className={linkClass} onClick={handleLinkClick}>About</Link>
            <Link href="/admin/appointments" className={linkClass} onClick={handleLinkClick}>Manage Appointments</Link>
          </>
        )}

        {/* LOGOUT BUTTON - Appears for both user and admin */}
        {user && (
           <Button variant={mobile ? "destructive" : "ghost"} size="sm" onClick={handleLogout} className={mobile ? "w-full text-lg p-3" : ""}>
             <LogOut className="mr-2 h-4 w-4" /> Logout
           </Button>
        )}
      </>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="relative mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="text-xl font-semibold" onClick={() => setIsMenuOpen(false)}>
          AstroSphere
        </Link>
        
        {/* DESKTOP NAVIGATION */}
        <nav className="hidden items-center gap-4 md:flex">
          <NavLinks />
          <ThemeToggle />
        </nav>

        {/* MOBILE MENU BUTTON */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* MOBILE MENU */}
        {isMenuOpen && (
          <div 
            className="absolute top-full left-0 w-full border-b bg-background/95 backdrop-blur-sm md:hidden animate-in fade-in-20 slide-in-from-top-2"
          >
            <nav className="flex flex-col space-y-2 p-4 pt-2">
              <NavLinks mobile />
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}