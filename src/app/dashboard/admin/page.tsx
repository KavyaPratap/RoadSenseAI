"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ShieldCheck, AlertCircle, Users, FileText, CheckCircle, XCircle, Clock, Eye, Info, MapPin, Camera } from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Image from 'next/image';

const ADMIN_TREND_DATA = [
  { date: 'Mar 1', reports: 1400 },
  { date: 'Mar 3', reports: 1600 },
  { date: 'Mar 5', reports: 1550 },
  { date: 'Mar 7', reports: 1900 },
  { date: 'Mar 8', reports: 2100 },
  { date: 'Mar 9', reports: 2300 },
  { date: 'Mar 10', reports: 2542 },
];

const FULL_VIOLATION_INFO = [
  { 
    id: 'V-901', 
    type: 'Triple Riding', 
    vehicle: 'DL-3S-CN-1234', 
    reporter: 'S. Kumar', 
    location: 'Hauz Khas, Delhi', 
    time: '2026-03-10 14:30', 
    confidence: 0.98,
    proofImage: "/demo.png"
  },
  { 
    id: 'V-902', 
    type: 'Wrong Side', 
    vehicle: 'MH-01-AB-9876', 
    reporter: 'M. Rao', 
    location: 'Marine Drive, Mumbai', 
    time: '2026-03-10 15:12', 
    confidence: 0.92,
    proofImage: "/demo.png"
  },
  { 
    id: 'V-903', 
    type: 'No Helmet', 
    vehicle: 'KA-03-JK-5544', 
    reporter: 'A. Singh', 
    location: 'MG Road, Bangalore', 
    time: '2026-03-10 16:45', 
    confidence: 0.95,
    proofImage: "/demo.png"
  },
  { 
    id: 'V-904', 
    type: 'Illegal Parking', 
    vehicle: 'UP-16-ZZ-0001', 
    reporter: 'R. Verma', 
    location: 'Noida Sec 18', 
    time: '2026-03-10 17:05', 
    confidence: 0.88,
    proofImage: "/demo.png"
  }
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-primary font-headline">Admin Control Center</h1>
          <p className="text-muted-foreground">Manage city-wide violations and verify community reports for CivicMinds.</p>
        </div>
        <Badge variant="outline" className="w-fit border-2 px-3 py-1 font-bold">
          <ShieldCheck className="h-4 w-4 mr-2 text-green-500" />
          Systems: Operational
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Active Sentinels', value: '12,450', icon: <Users className="h-4 w-4 text-accent" /> },
          { label: 'Pending Verifications', value: '84', icon: <Clock className="h-4 w-4 text-orange-500" /> },
          { label: 'Verified Violations', value: '45,891', icon: <ShieldCheck className="h-4 w-4 text-green-500" /> },
          { label: 'Fines Collected (Est)', value: '₹42.8L', icon: <AlertCircle className="h-4 w-4 text-accent" /> },
        ].map((stat, i) => (
          <Card key={i} className="border-2 shadow-md">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase text-muted-foreground">{stat.label}</CardTitle>
              {stat.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-primary font-headline">Detailed Violation Ledger</CardTitle>
              <CardDescription>Comprehensive view of recent reports with vehicle and reporter details.</CardDescription>
            </div>
            <Button variant="outline" size="sm" className="font-bold">
              Export Ledger
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border-2">
            <Table>
              <TableHeader className="bg-muted/50">
                <TableRow>
                  <TableHead className="font-bold">ID</TableHead>
                  <TableHead className="font-bold">Violation Type</TableHead>
                  <TableHead className="font-bold">Vehicle No.</TableHead>
                  <TableHead className="font-bold">Location</TableHead>
                  <TableHead className="font-bold text-center">AI Confidence</TableHead>
                  <TableHead className="font-bold text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {FULL_VIOLATION_INFO.map((violation) => (
                  <TableRow key={violation.id}>
                    <TableCell className="font-mono text-xs">{violation.id}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-bold">{violation.type}</span>
                        <span className="text-[10px] text-muted-foreground">{violation.time}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono uppercase tracking-wider">{violation.vehicle}</Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-xs">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        {violation.location}
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="flex flex-col items-center gap-1">
                        <div className="h-1.5 w-16 bg-muted rounded-full overflow-hidden">
                          <div 
                            className={`h-full ${violation.confidence > 0.9 ? 'bg-green-500' : 'bg-orange-500'}`} 
                            style={{ width: `${violation.confidence * 100}%` }} 
                          />
                        </div>
                        <span className="text-[10px] font-bold">{(violation.confidence * 100).toFixed(0)}%</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="icon" variant="ghost" className="h-8 w-8 text-primary">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-2xl">
                            <DialogHeader>
                              <DialogTitle>Admin Review: Violation Proof ({violation.id})</DialogTitle>
                            </DialogHeader>
                            <div className="relative aspect-video w-full overflow-hidden rounded-lg border-2">
                              <Image 
                                src={violation.proofImage} 
                                alt="Violation Evidence" 
                                fill 
                                className="object-cover"
                                unoptimized
                              />
                            </div>
                            <div className="p-4 bg-muted rounded-lg text-xs space-y-2">
                              <div className="grid grid-cols-2 gap-2">
                                <p><strong>Vehicle:</strong> {violation.vehicle}</p>
                                <p><strong>Reporter:</strong> {violation.reporter}</p>
                                <p><strong>Location:</strong> {violation.location}</p>
                                <p><strong>Detected At:</strong> {violation.time}</p>
                              </div>
                              <p className="border-t pt-2 italic text-muted-foreground">AI Verification suggests {violation.type} with {(violation.confidence * 100).toFixed(1)}% certainty.</p>
                            </div>
                            <div className="flex justify-end gap-3 mt-4">
                              <Button variant="outline" className="text-destructive border-destructive hover:bg-destructive/10">Reject</Button>
                              <Button className="bg-green-600 hover:bg-green-700">Approve & Issue Challan</Button>
                            </div>
                          </DialogContent>
                        </Dialog>
                        <Button size="icon" variant="outline" className="h-8 w-8 text-green-600 hover:bg-green-50">
                          <CheckCircle className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="h-8 w-8 text-destructive hover:bg-red-50">
                          <XCircle className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-8 lg:grid-cols-7">
        <Card className="lg:col-span-4 border-2">
          <CardHeader>
            <CardTitle className="text-primary font-headline">National Reporting Trends (2026)</CardTitle>
            <CardDescription>Daily report volume across all integrated cities for March.</CardDescription>
          </CardHeader>
          <CardContent className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={ADMIN_TREND_DATA}>
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.2} />
                <XAxis dataKey="date" fontSize={10} axisLine={false} tickLine={false} />
                <YAxis fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="reports" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorReports)" 
                  strokeWidth={3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-3 border-2">
          <CardHeader>
            <CardTitle className="text-primary font-headline">Audit Logs</CardTitle>
            <CardDescription>Recent administrative actions taken by moderators.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { user: 'Admin-01', action: 'Verified V-901', time: '2m ago' },
                { user: 'Admin-03', action: 'Rejected R-882', time: '12m ago' },
                { user: 'System', action: 'Flagged DL-4S-XX-0012', time: '1h ago' },
                { user: 'Admin-01', action: 'Updated Threshold Settings', time: 'Mar 10, 10:42' },
              ].map((log, i) => (
                <div key={i} className="p-3 rounded-lg border bg-muted/20 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <Info className="h-4 w-4 text-accent" />
                    <div>
                      <span className="font-bold text-primary">{log.user}</span>
                      <p className="text-muted-foreground">{log.action}</p>
                    </div>
                  </div>
                  <span className="text-muted-foreground italic">{log.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
