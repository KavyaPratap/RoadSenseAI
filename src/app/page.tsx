"use client";

import { Navbar } from '@/components/layout/Navbar';
import { Button } from '@/components/ui/button';
import { Shield, MapPin, Search, Bell, ArrowRight, Zap, PlusSquare, Car } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { PlaceHolderImages } from '@/app/lib/placeholder-images';

export default function Home() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-24 md:py-32">
          <div className="container relative z-10 mx-auto px-4">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div className="flex flex-col gap-6">
                <div className="inline-flex w-fit items-center gap-2 rounded-full bg-accent/10 px-4 py-1.5 text-sm font-semibold text-primary ring-1 ring-accent/20">
                  <Zap className="h-4 w-4" />
                  <span>Now Live across 12 Indian Metro Cities</span>
                </div>
                <h1 className="font-headline text-5xl font-extrabold tracking-tight text-primary md:text-7xl">
                  Digital Vigilance for <br />
                  <span className="text-accent">Indian Roads.</span>
                </h1>
                <p className="max-w-[600px] text-lg text-muted-foreground md:text-xl">
                  CivicMinds empowers citizens to report traffic violations like no-helmet riding, triple riding, and wrong-side driving. Together, let's make our streets safe and disciplined.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Link href="/login">
                    <Button size="lg" className="h-12 px-8 text-base shadow-lg transition-transform hover:scale-105 font-bold">
                      Enter Portal
                    </Button>
                  </Link>
                  <Link href="/dashboard/map">
                    <Button variant="outline" size="lg" className="h-12 px-8 text-base shadow-sm font-bold">
                      Explore Live Map
                    </Button>
                  </Link>
                </div>
                <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted overflow-hidden relative">
                        <Image src={`https://picsum.photos/seed/user${i}/32/32`} fill alt="user" className="object-cover" />
                      </div>
                    ))}
                  </div>
                  <span>Trusted by 50,000+ Indian Sentinels</span>
                </div>
              </div>
              
              <div className="relative aspect-square w-full lg:aspect-video">
                <div className="absolute -inset-4 rounded-3xl bg-accent/20 blur-3xl" />
                <div className="relative overflow-hidden rounded-2xl border bg-card shadow-2xl transition-all hover:scale-[1.02] aspect-video">
                  <Image 
                    src={heroImage?.imageUrl || "https://picsum.photos/seed/hero/800/600"} 
                    alt="Hero" 
                    fill
                    className="object-cover"
                    data-ai-hint="india traffic"
                  />
                  <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/80 p-4 backdrop-blur shadow-lg border">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white">
                        <Car className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-primary">Mumbai Incident Reported</p>
                        <p className="text-xs text-muted-foreground">Wrong-side driving at Juhu Circle • 1 min ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* India-Centric Features Section */}
        <section className="bg-secondary/50 py-24">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight text-primary md:text-4xl">Built for Bharat</h2>
            <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground">
              Addressing unique road safety challenges in Indian urban landscapes.
            </p>
            
            <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {[
                {
                  icon: <Shield className="h-8 w-8 text-accent" />,
                  title: "Helmet Detection",
                  description: "Snap and report riders without safety gear instantly."
                },
                {
                  icon: <Zap className="h-8 w-8 text-accent" />,
                  title: "Smart AI Triage",
                  description: "Auto-categorize triple riding and wrong-way violations."
                },
                {
                  icon: <MapPin className="h-8 w-8 text-accent" />,
                  title: "City Heatmaps",
                  description: "Live mapping of traffic hotspots in Delhi, Mumbai, and beyond."
                },
                {
                  icon: <Bell className="h-8 w-8 text-accent" />,
                  title: "Authority Integration",
                  description: "Verified reports are shared directly with local Traffic Police portals."
                }
              ].map((feature, idx) => (
                <div key={idx} className="group relative flex flex-col items-center rounded-2xl border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md">
                  <div className="mb-4 rounded-full bg-secondary p-4 transition-colors group-hover:bg-accent/10">
                    {feature.icon}
                  </div>
                  <h3 className="font-headline text-xl font-bold text-primary">{feature.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t bg-card py-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
            <div className="flex items-center gap-2 font-bold text-primary">
              <Shield className="h-6 w-6 text-accent" />
              <span className="text-xl font-headline tracking-tight">CivicMinds India</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 CivicMinds. Making Indian roads safer, one report at a time.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Safety Laws</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
