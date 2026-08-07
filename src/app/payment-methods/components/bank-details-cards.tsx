'use client';

import React, { useState } from 'react';
import { Copy, Check, Building2, ShieldCheck, Zap, Globe, ArrowRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface CopyState {
  [key: string]: boolean;
}

const regionPills = [
  { id: 'usd-ach', label: '🇺🇸 USD (US & Global)', badge: 'ACH Direct / Wire' },
  { id: 'gbp-bacs', label: '🇬🇧 GBP (UK)', badge: 'FPS / BACS' },
  { id: 'eur-sepa', label: '🇪🇺 EUR (Europe)', badge: 'SEPA Instant' },
  { id: 'aud-npp', label: '🇦🇺 AUD (Australia)', badge: 'Osko / NPP / BECS' },
  { id: 'cad-eft', label: '🇨🇦 CAD (Canada)', badge: 'EFT Direct' },
  { id: 'swift-global', label: '🌐 SWIFT (Global)', badge: 'Multi-Currency SWIFT' },
  { id: 'dkk-local', label: '🇩🇰 DKK (Denmark)', badge: 'DKK Local' },
  { id: 'inr-local', label: '🇮🇳 INR (India)', badge: 'Bank of Baroda / UPI' },
];

export function BankDetailsCards() {
  const [copiedKeys, setCopiedKeys] = useState<CopyState>({});

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKeys((prev) => ({ ...prev, [key]: true }));
    setTimeout(() => {
      setCopiedKeys((prev) => ({ ...prev, [key]: false }));
    }, 2000);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div className="space-y-10">
      {/* Sticky Region Navigation Bar */}
      <div className="sticky top-20 z-30 bg-background/95 backdrop-blur-md border border-border/60 rounded-2xl p-3 shadow-md">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2 flex items-center justify-between">
          <span>Jump to your currency / region</span>
          <span className="text-[11px] text-accent flex items-center gap-1">
            <Zap className="w-3 h-3" /> Official Razorpay Verified Accounts
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {regionPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => scrollToSection(pill.id)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl bg-secondary/80 hover:bg-accent hover:text-accent-foreground transition-all duration-200 border border-border/40 shadow-sm"
            >
              <span>{pill.label}</span>
              <span className="text-[10px] opacity-75">({pill.badge})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Bank Account Cards List */}
      <div className="space-y-8">
        {/* 🇺🇸 USD Card */}
        <Card id="usd-ach" className="scroll-mt-36 border-2 border-accent/20 hover:border-accent/40 transition-colors shadow-lg">
          <CardHeader className="bg-accent/5 pb-4 border-b border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇺🇸</span>
                <div>
                  <CardTitle className="text-xl font-headline flex items-center gap-2">
                    United States Dollar (USD)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    USD (ACH) Payment Service (Community Federal Savings Bank)
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs py-1">
                ⚡ $0 Intermediary SWIFT Wire Fee
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <DetailRow
                label="Account Holder Name"
                value="KINSTEL SOLUTIONS"
                copyKey="usd-name"
                copied={copiedKeys['usd-name']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="ACH Routing Number"
                value="026073150"
                copyKey="usd-routing"
                copied={copiedKeys['usd-routing']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Account Number"
                value="8306449012"
                copyKey="usd-account"
                copied={copiedKeys['usd-account']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Bank Name"
                value="Community Federal Savings Bank"
                copyKey="usd-bank"
                copied={copiedKeys['usd-bank']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Bank Address"
                value="5 Penn Plaza, 14th Floor, New York, NY 10001, US"
                copyKey="usd-address"
                copied={copiedKeys['usd-address']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Routing Type"
                value="ach_routing_number (Domestic US ACH / FedWire)"
                copyKey="usd-type"
                copied={copiedKeys['usd-type']}
                onCopy={handleCopy}
              />
            </div>
          </CardContent>
        </Card>

        {/* 🇬🇧 GBP Card */}
        <Card id="gbp-bacs" className="scroll-mt-36 border-border/80 hover:border-accent/30 transition-colors shadow-md">
          <CardHeader className="bg-muted/30 pb-4 border-b border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇬🇧</span>
                <div>
                  <CardTitle className="text-xl font-headline">
                    Great British Pound (GBP)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    UK Local FPS / BACS / CHAPS Payment Service (Banking Circle S.A. UK Branch)
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs py-1">
                ⚡ Instant BACS / FPS Clearing
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <DetailRow
                label="Account Holder Name"
                value="KINSTEL SOLUTIONS"
                copyKey="gbp-name"
                copied={copiedKeys['gbp-name']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Sort Code"
                value="608382"
                copyKey="gbp-sort"
                copied={copiedKeys['gbp-sort']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Account Number"
                value="48042482"
                copyKey="gbp-account"
                copied={copiedKeys['gbp-account']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Bank Name"
                value="Banking Circle S.A. UK Branch"
                copyKey="gbp-bank"
                copied={copiedKeys['gbp-bank']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Bank Address"
                value="68 King William Street, London, EC4N 7HR, United Kingdom"
                copyKey="gbp-address"
                copied={copiedKeys['gbp-address']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Routing Type"
                value="Sort_Code (Local UK Domestic)"
                copyKey="gbp-type"
                copied={copiedKeys['gbp-type']}
                onCopy={handleCopy}
              />
            </div>
          </CardContent>
        </Card>

        {/* 🇪🇺 EUR Card */}
        <Card id="eur-sepa" className="scroll-mt-36 border-border/80 hover:border-accent/30 transition-colors shadow-md">
          <CardHeader className="bg-muted/30 pb-4 border-b border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇪🇺</span>
                <div>
                  <CardTitle className="text-xl font-headline">
                    Euro (EUR)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    European Union SEPA & SEPA Instant Payment Service (Banking Circle Germany)
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs py-1">
                ⚡ SEPA / SEPA Instant
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <DetailRow
                label="Account Holder Name"
                value="KINSTEL SOLUTIONS"
                copyKey="eur-name"
                copied={copiedKeys['eur-name']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="IBAN (Account Number)"
                value="DE67202208000048042482"
                copyKey="eur-iban"
                copied={copiedKeys['eur-iban']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="BIC / SWIFT Routing Code"
                value="SXPYDEHH"
                copyKey="eur-bic"
                copied={copiedKeys['eur-bic']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Bank Name"
                value="Banking Circle Germany"
                copyKey="eur-bank"
                copied={copiedKeys['eur-bank']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Bank Address"
                value="Banking Circle S.A. – German Branch, Maximilianstraße 54, 80538 München"
                copyKey="eur-address"
                copied={copiedKeys['eur-address']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Clearing Network"
                value="SEPA / SEPA Instant"
                copyKey="eur-network"
                copied={copiedKeys['eur-network']}
                onCopy={handleCopy}
              />
            </div>
          </CardContent>
        </Card>

        {/* 🇦🇺 AUD Card */}
        <Card id="aud-npp" className="scroll-mt-36 border-border/80 hover:border-accent/30 transition-colors shadow-md">
          <CardHeader className="bg-muted/30 pb-4 border-b border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇦🇺</span>
                <div>
                  <CardTitle className="text-xl font-headline">
                    Australian Dollar (AUD)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    AUD (NPP / BECS / Osko) Payment Service (BC Payments Australia Pty Ltd)
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs py-1">
                ⚡ Instant NPP / Osko / BECS
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <DetailRow
                label="Account Holder Name"
                value="KINSTEL SOLUTIONS"
                copyKey="aud-name"
                copied={copiedKeys['aud-name']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="BSB Number (Routing Code)"
                value="252000"
                copyKey="aud-bsb"
                copied={copiedKeys['aud-bsb']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Account Number"
                value="048042483"
                copyKey="aud-account"
                copied={copiedKeys['aud-account']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Bank Name"
                value="BC Payments Australia Pty Ltd"
                copyKey="aud-bank"
                copied={copiedKeys['aud-bank']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Bank Address"
                value="Level 11/10 Carrington St, Sydney NSW 2000, Australia"
                copyKey="aud-address"
                copied={copiedKeys['aud-address']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Routing Type"
                value="BSB Number (Domestic Australia NPP/Osko)"
                copyKey="aud-type"
                copied={copiedKeys['aud-type']}
                onCopy={handleCopy}
              />
            </div>
          </CardContent>
        </Card>

        {/* 🇨🇦 CAD Card */}
        <Card id="cad-eft" className="scroll-mt-36 border-border/80 hover:border-accent/30 transition-colors shadow-md">
          <CardHeader className="bg-muted/30 pb-4 border-b border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇨🇦</span>
                <div>
                  <CardTitle className="text-xl font-headline">
                    Canadian Dollar (CAD)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Canadian Domestic EFT Payment Service (Digital Commerce Bank)
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs py-1">
                ⚡ Domestic EFT Transfer
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <DetailRow
                label="Account Holder Name"
                value="KINSTEL SOLUTIONS"
                copyKey="cad-name"
                copied={copiedKeys['cad-name']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Account Number"
                value="942404138"
                copyKey="cad-account"
                copied={copiedKeys['cad-account']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Routing Code"
                value="035210009"
                copyKey="cad-routing"
                copied={copiedKeys['cad-routing']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Bank Name"
                value="Digital Commerce Bank"
                copyKey="cad-bank"
                copied={copiedKeys['cad-bank']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Bank Address"
                value="736 Meridian Road N.E, Calgary, Alberta, CA"
                copyKey="cad-address"
                copied={copiedKeys['cad-address']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Payment Service"
                value="CAD (EFT) Payment Service"
                copyKey="cad-service"
                copied={copiedKeys['cad-service']}
                onCopy={handleCopy}
              />
            </div>
          </CardContent>
        </Card>

        {/* 🌐 Global SWIFT Card */}
        <Card id="swift-global" className="scroll-mt-36 border-border/80 hover:border-accent/30 transition-colors shadow-md">
          <CardHeader className="bg-muted/30 pb-4 border-b border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🌐</span>
                <div>
                  <CardTitle className="text-xl font-headline">
                    Global SWIFT Payment Service (USD, EUR, Multi-Currency)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    International SWIFT Collection Account (The Currency Cloud Limited)
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-accent/10 text-accent border-accent/20 text-xs py-1">
                🌐 Global SWIFT Transfer
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <DetailRow
                label="Account Holder Name"
                value="KINSTEL SOLUTIONS"
                copyKey="swift-name"
                copied={copiedKeys['swift-name']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Account Number (IBAN)"
                value="GB64TCCL04143468198853"
                copyKey="swift-account"
                copied={copiedKeys['swift-account']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Routing Code (BIC / SWIFT)"
                value="TCCLGB3L"
                copyKey="swift-bic"
                copied={copiedKeys['swift-bic']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Bank Name"
                value="The Currency Cloud Limited"
                copyKey="swift-bank"
                copied={copiedKeys['swift-bank']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Bank Address"
                value="1 Sheldon Square, London, W2 6TT, United Kingdom"
                copyKey="swift-address"
                copied={copiedKeys['swift-address']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Service Type"
                value="SWIFT Payment Service"
                copyKey="swift-service"
                copied={copiedKeys['swift-service']}
                onCopy={handleCopy}
              />
            </div>
          </CardContent>
        </Card>

        {/* 🇩🇰 DKK Card */}
        <Card id="dkk-local" className="scroll-mt-36 border-border/80 hover:border-accent/30 transition-colors shadow-md">
          <CardHeader className="bg-muted/30 pb-4 border-b border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇩🇰</span>
                <div>
                  <CardTitle className="text-xl font-headline">
                    Danish Krone (DKK)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    DKK Local Payment Service (Banking Circle Denmark)
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs py-1">
                ⚡ DKK Local Transfer
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <DetailRow
                label="Account Holder Name"
                value="KINSTEL SOLUTIONS"
                copyKey="dkk-name"
                copied={copiedKeys['dkk-name']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Account Number"
                value="DK8789000048042482"
                copyKey="dkk-account"
                copied={copiedKeys['dkk-account']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Routing Code (BIC / SWIFT)"
                value="SXPYDKKK"
                copyKey="dkk-routing"
                copied={copiedKeys['dkk-routing']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Bank Name"
                value="Banking Circle Denmark"
                copyKey="dkk-bank"
                copied={copiedKeys['dkk-bank']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Bank Address"
                value="Lautrupsgade 13-15 2100 Copenhagen"
                copyKey="dkk-address"
                copied={copiedKeys['dkk-address']}
                onCopy={handleCopy}
              />
            </div>
          </CardContent>
        </Card>

        {/* 🇮🇳 INR Card */}
        <Card id="inr-local" className="scroll-mt-36 border-border/80 hover:border-accent/30 transition-colors shadow-md">
          <CardHeader className="bg-muted/30 pb-4 border-b border-border/50">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="text-3xl">🇮🇳</span>
                <div>
                  <CardTitle className="text-xl font-headline">
                    Indian Rupee (INR - Domestic Account)
                  </CardTitle>
                  <CardDescription className="text-xs">
                    Indian Current Account (Bank of Baroda / NEFT / RTGS / IMPS / UPI)
                  </CardDescription>
                </div>
              </div>
              <Badge variant="outline" className="bg-emerald-500/10 text-emerald-600 border-emerald-500/20 text-xs py-1">
                ⚡ Instant NEFT / RTGS / IMPS
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="pt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <DetailRow
                label="Account Holder Name"
                value="KINSTEL SOLUTIONS"
                copyKey="inr-name"
                copied={copiedKeys['inr-name']}
                onCopy={handleCopy}
              />
              <DetailRow
                label="Account Number"
                value="66070200001546"
                copyKey="inr-account"
                copied={copiedKeys['inr-account']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="IFSC Code (5th char is Zero '0')"
                value="BARB0VJLAUL"
                copyKey="inr-ifsc"
                copied={copiedKeys['inr-ifsc']}
                onCopy={handleCopy}
                highlight
              />
              <DetailRow
                label="Bank Name"
                value="Bank of Baroda"
                copyKey="inr-bank"
                copied={copiedKeys['inr-bank']}
                onCopy={handleCopy}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instant Card Payment Callout Box */}
      <div className="p-6 rounded-2xl bg-accent/5 border border-accent/20 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="space-y-1">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            💳 Prefer to Pay via Credit Card, Debit Card or PayPal?
          </h3>
          <p className="text-xs text-muted-foreground">
            You can complete instant card checkout via our secure online payment page.
          </p>
        </div>
        <Button asChild size="sm" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold flex-shrink-0">
          <Link href="/pay" className="flex items-center gap-1.5">
            Go to Quick Pay <ArrowRight className="w-4 h-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

interface DetailRowProps {
  label: string;
  value: string;
  copyKey: string;
  copied?: boolean;
  highlight?: boolean;
  onCopy: (key: string, val: string) => void;
}

function DetailRow({ label, value, copyKey, copied, highlight, onCopy }: DetailRowProps) {
  return (
    <div className={`p-3 rounded-xl border transition-colors flex items-center justify-between gap-3 ${highlight ? 'bg-accent/10 border-accent/30 font-medium' : 'bg-muted/20 border-border/40'}`}>
      <div className="min-w-0 flex-1">
        <div className="text-[11px] text-muted-foreground uppercase tracking-wider font-semibold">
          {label}
        </div>
        <div className="text-sm font-mono text-foreground truncate mt-0.5 select-all">
          {value}
        </div>
      </div>
      <Button
        type="button"
        size="sm"
        variant="ghost"
        onClick={() => onCopy(copyKey, value)}
        className="h-8 px-2 text-xs hover:bg-background/80 flex-shrink-0"
        title={`Copy ${label}`}
      >
        {copied ? (
          <span className="flex items-center gap-1 text-emerald-600 font-semibold">
            <Check className="w-3.5 h-3.5" /> Copied
          </span>
        ) : (
          <span className="flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <Copy className="w-3.5 h-3.5" /> Copy
          </span>
        )}
      </Button>
    </div>
  );
}
