'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FileText, AlertCircle, ArrowRight } from 'lucide-react';
import { LiquidCard, CardContent } from "@/components/ui/liquid-glass-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from '@/lib/utils';

/**
 * Direct Pay Section
 * Removed PDF parsing for now, focused on manual entry
 */
export function DirectPaySection() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  
  // Manual entry state
  const [manualInvoice, setManualInvoice] = useState('');
  const [manualAmount, setManualAmount] = useState('');
  const [manualPid, setManualPid] = useState('');

  const handleManualSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!manualInvoice || !manualAmount) {
      setError('Please enter at least the Invoice ID and Amount.');
      return;
    }

    const params = new URLSearchParams();
    params.set('amount', manualAmount);
    params.set('purpose', manualInvoice);
    if (manualPid) params.set('pid', manualPid);
    
    router.push(`/pay?${params.toString()}`);
  };

  return (
    <div className="max-w-xl mx-auto">
      <LiquidCard className="h-full">
        <CardContent className="py-8">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" />
            Fast Track Payment
          </h3>
          
          <form onSubmit={handleManualSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invoice-id">Invoice / Quotation ID</Label>
                <Input 
                  id="invoice-id" 
                  placeholder="KS/23-24/001" 
                  value={manualInvoice}
                  onChange={(e) => setManualInvoice(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (INR)</Label>
                <Input 
                  id="amount" 
                  placeholder="₹ 5000" 
                  type="number"
                  value={manualAmount}
                  onChange={(e) => setManualAmount(e.target.value)}
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="project-id">Project ID (Optional)</Label>
              <Input 
                id="project-id" 
                placeholder="P-12345" 
                value={manualPid}
                onChange={(e) => setManualPid(e.target.value)}
              />
            </div>

            {error && (
              <div className="flex items-start gap-2 text-sm text-destructive bg-destructive/10 p-3 rounded-lg border border-destructive/20 mt-2">
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}

            <Button type="submit" className="w-full mt-4 group">
              Proceed to Secure Payment
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </form>
        </CardContent>
      </LiquidCard>
      
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Enter your invoice details above to be redirected to our secure gateway.
      </p>
    </div>
  );
}
