"use client";

import CtaBand from "@/components/homepage/cta-brand";
import DashboardPreview from "@/components/homepage/dashboard-preview";
import Features from "@/components/homepage/features";
import Footer from "@/components/homepage/footer";
import Hero from "@/components/homepage/hero";
import { HowItWorks } from "@/components/homepage/how-it-works";
import Nav from "@/components/homepage/nav";
import TrustStrip from "@/components/homepage/trust-strip";

export default function Home() {
  return (
    <div className="bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <HowItWorks />
        <DashboardPreview />
        <Features />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
