"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Shield, ArrowUpRight, TrendingUp, AlertCircle, MapPin, Clock, Helmet, Car, Smartphone, User, History, Eye } from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import Link from 'next/link';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const INDIA_DATA = [
  { name: 'No Helmet', count: 421 },
  { name: 'Wrong Side', count: 286 },
  { name: 'Red Light', count: 185 },
  { name: 'Triple Riding', count: 132 },
  { name: 'Illegal Park', count: 98 },
];

const RECENT_REPORTS_INDIA = [
  { id: '1', type: 'No Helmet', location: 'MG Road, Bangalore', time: '5m ago', status: 'Verified' },
  { id: '2', type: 'Wrong Side Driving', location: 'Marine Drive, Mumbai', time: '15m ago', status: 'Pending' },
  { id: '3', type: 'Triple Riding', location: 'Connaught Place, Delhi', time: '1h ago', status: 'Verified' },
];

export default function UserDashboardPage() {
  const challanImage = "/demo.png";

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary font-headline">Sentinel Overview</h1>
          <p className="text-muted-foreground">Track your contributions and monitor your traffic health on CivicMinds.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/profile">
            <Button variant="outline" className="font-bold border-2">
              <User className="h-4 w-4 mr-2" />
              My Profile
            </Button>
          </Link>
          <Link href="/dashboard/reports/new">
            <Button className="font-bold shadow-md bg-accent text-primary hover:bg-accent/80">
              Submit New Violation
            </Button>
          </Link>
        </div>
      </div>

      {/* Specific Challan Alert for user1 */}
      <Alert variant="destructive" className="border-2 shadow-lg animate-in fade-in slide-in-from-top-4 duration-500 overflow-hidden">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-5 w-5" />
              <AlertTitle className="font-bold text-lg m-0">Active Challan Issued</AlertTitle>
            </div>
            <AlertDescription className="space-y-4">
              <p>You have <strong>1 pending challan</strong> for a violation detected by the automated system.</p>
              <div className="flex flex-wrap gap-4 bg-destructive/10 p-3 rounded-lg">
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  <span className="text-xs font-semibold">Violation: No Helmet</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span className="text-xs font-semibold">Location: Kashmiri Gate, Delhi</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-xs font-semibold">Detection Date: Mar 10, 2026</span>
                </div>
              </div>
              <div className="flex gap-3 mt-4">
                <Link href="/dashboard/profile">
                  <Button variant="destructive" size="sm" className="font-bold">Pay Fine Now</Button>
                </Link>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="sm" className="font-bold gap-2">
                      <Eye className="h-4 w-4" />
                      View Proof
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Violation Evidence: CH-1029</DialogTitle>
                    </DialogHeader>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2 border-destructive/20 shadow-inner">
                      <Image 
                        src={challanImage} 
                        alt="Violation Proof" 
                        fill 
                        className="object-cover"
                        data-ai-hint="helmet violation"
                        unoptimized
                      />
                      <div className="absolute top-4 right-4">
                        <Badge variant="destructive" className="uppercase font-mono">Violation Detected</Badge>
                      </div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg text-xs space-y-1">
                      <p><strong>Device ID:</strong> SENTINEL-NODE-DL-0921</p>
                      <p><strong>Timestamp:</strong> Mar 10, 2026 - 14:42:12 IST</p>
                      <p><strong>Accuracy:</strong> 99.8% (AI Confirmed)</p>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </AlertDescription>
          </div>
          <div className="hidden md:block w-48 shrink-0">
             <div className="relative h-full w-full rounded-lg border-2 border-destructive/20 overflow-hidden grayscale group hover:grayscale-0 transition-all">
                <Image 
                  src={challanImage} 
                  alt="Quick Preview" 
                  fill 
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-destructive/20" />
                <div className="absolute bottom-2 left-2 right-2">
                  <Badge className="w-full justify-center bg-destructive text-[8px]">PROOFS ATTACHED</Badge>
                </div>
             </div>
          </div>
        </div>
      </Alert>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'My Total Reports', value: '142', trend: '+8%', icon: <Shield className="h-4 w-4 text-accent" /> },
          { label: 'Points Earned', value: '1,250', trend: '+150', icon: <TrendingUp className="h-4 w-4 text-accent" /> },
          { label: 'Verified Cases', value: '128', trend: '90%', icon: <AlertCircle className="h-4 w-4 text-accent" /> },
          { label: 'Current Level', value: 'Sentinel Lvl 4', trend: 'Gold Tier', icon: <Smartphone className="h-4 w-4 text-accent" /> },
        ].map((stat, i) => (
          <Card key={i} className="border-2 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase text-muted-foreground">{stat.label}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
              <p className="text-xs font-medium text-green-600 flex items-center gap-1 mt-1">
                {stat.trend} growth
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-7">
        {/* Chart Column */}
        <Card className="lg:col-span-4 border-2">
          <CardHeader>
            <CardTitle className="text-primary font-headline">City-wide Violation Trends</CardTitle>
            <CardDescription>Most reported incidents in your vicinity (As of Mar 10, 2026).</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={INDIA_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                <XAxis dataKey="name" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis fontSize={12} tickLine={false} axisLine={false} />
                <ChartTooltip 
                  contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                />
                <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                  {INDIA_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={index % 2 === 0 ? 'hsl(var(--primary))' : 'hsl(var(--accent))'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* List Column */}
        <Card className="lg:col-span-3 border-2">
          <CardHeader>
            <CardTitle className="text-primary font-headline">Live Local Feed</CardTitle>
            <CardDescription>Real-time reports from fellow Sentinels.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {RECENT_REPORTS_INDIA.map((report) => (
                <div key={report.id} className="flex items-center justify-between border-b pb-4 last:border-0 last:pb-0">
                  <div className="flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      {report.type === 'No Helmet' ? <Shield className="h-5 w-5 text-primary" /> : <Car className="h-5 w-5 text-primary" />}
                    </div>
                    <div>
                      <p className="text-sm font-bold text-primary">{report.type}</p>
                      <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {report.location}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={report.status === 'Verified' ? 'default' : 'outline'} className="text-[10px]">
                      {report.status}
                    </Badge>
                    <p className="text-[10px] text-muted-foreground mt-1">{report.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/reports">
              <Button variant="ghost" className="w-full mt-6 text-xs text-accent font-bold hover:text-primary">
                Expand Area Activity
                <ArrowUpRight className="h-3 w-3 ml-1" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
