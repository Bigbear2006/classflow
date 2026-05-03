import { useState, useEffect } from 'react';
import { Features } from '../components/landing/Features.tsx';
import { Roles } from '../components/landing/Roles.tsx';
import { HowItWorks } from '../components/landing/HowItWorks.tsx';
import { Reviews } from '../components/landing/Reviews.tsx';
import { CallToAction } from '../components/landing/CallToAction.tsx';
import { Stats } from '../components/landing/Stats.tsx';
import { ReadyToStart } from '../components/landing/ReadyToStart.tsx';
import { Footer } from '../components/landing/Footer.tsx';
import { DesktopNav } from '../components/landing/DesktopNav.tsx';
import { MobileNav } from '../components/landing/MobileNav.tsx';
import { useAppContext } from '../context.tsx';
import { Navigate } from 'react-router';
import { Loading } from '../components/common/Loading.tsx';

export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const { user, isLoading, organization } = useAppContext();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setMenuVisible(true));
    } else {
      setMenuVisible(false);
      const t = setTimeout(() => {
        document.body.style.overflow = '';
      }, 350);
      return () => clearTimeout(t);
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const openMenu = () => setMobileMenuOpen(true);
  const closeMenu = () => setMobileMenuOpen(false);

  const scrollTo = (id: string) => {
    closeMenu();
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

  if (isLoading) {
    return <Loading />;
  }

  if (organization) {
    if (user) {
      return <Navigate to="/dashboard" replace />;
    } else {
      return <Navigate to="/courses" replace />;
    }
  } else {
    if (user) {
      return <Navigate to="/orgs" replace />;
    }
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <DesktopNav scrolled={scrolled} openMenu={openMenu} scrollTo={scrollTo} />
      {mobileMenuOpen && (
        <MobileNav menuVisible={menuVisible} closeMenu={closeMenu} scrollTo={scrollTo} />
      )}
      <CallToAction scrollTo={scrollTo} />
      <Stats />
      <Features />
      <Roles />
      <HowItWorks />
      <Reviews />
      <ReadyToStart />
      <Footer scrollTo={scrollTo} />
    </div>
  );
}
