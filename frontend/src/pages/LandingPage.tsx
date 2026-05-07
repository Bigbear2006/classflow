import { useState, useEffect } from 'react';
import { Features } from '../components/landing/Features.tsx';
import { Roles } from '../components/landing/Roles.tsx';
import { HowItWorks } from '../components/landing/HowItWorks.tsx';
import { CallToAction } from '../components/landing/CallToAction.tsx';
import { Stats } from '../components/landing/Stats.tsx';
import { ReadyToStart } from '../components/landing/ReadyToStart.tsx';
import { Footer } from '../components/landing/Footer.tsx';
import { DesktopNav } from '../components/landing/DesktopNav.tsx';
import { useAppContext } from '../context.tsx';
import { Navigate } from 'react-router';

export default function LandingPage() {
  const { user, organization } = useAppContext();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 350);
  };

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
      <DesktopNav scrolled={scrolled} scrollTo={scrollTo} />
      <CallToAction scrollTo={scrollTo} />
      <Stats />
      <Features />
      <Roles />
      <HowItWorks />
      <ReadyToStart />
      <Footer scrollTo={scrollTo} />
    </div>
  );
}
