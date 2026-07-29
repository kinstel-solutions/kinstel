"use client";

import React, { useState } from "react";
import {
  Briefcase,
  MapPin,
  Clock,
  ArrowRight,
  Sparkles,
  Building2,
  Code2,
  Palette,
  TrendingUp,
  Headphones,
  ChevronRight,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CareerApplicationModal } from "./career-application-modal";

export interface RoleListing {
  id: string;
  title: string;
  category: "admin" | "engineering" | "design" | "marketing";
  categoryLabel: string;
  location: string;
  type: string;
  experience: string;
  shortDescription: string;
  responsibilities: string[];
  requirements: string[];
  icon: React.ReactNode;
}

const rolesData: RoleListing[] = [
  {
    id: "exec-assistant",
    title: "Executive Assistant & Operations Coordinator",
    category: "admin",
    categoryLabel: "Operations & Admin",
    location: "Lucknow Studio / Hybrid",
    type: "Full-Time",
    experience: "1-3 Years",
    shortDescription:
      "Keep studio operations running smoothly by managing executive schedules, client onboarding logistics, and operational workflows.",
    responsibilities: [
      "Manage executive calendars, meeting scheduling, and priority follow-ups.",
      "Coordinate client onboarding logistics, document preparation, and contract administration.",
      "Track internal project timelines and task follow-ups across teams.",
      "Assist in vendor management, billing administration, and operational reporting.",
    ],
    requirements: [
      "Strong written and spoken communication skills in English and Hindi.",
      "Proficiency with Google Workspace, Notion, Slack, and digital office tools.",
      "Exceptional organization, time-management, and problem-solving abilities.",
      "Previous experience as an Executive Assistant, Office Coordinator, or Admin Specialist.",
    ],
    icon: <Building2 className="h-6 w-6 text-accent" />,
  },
  {
    id: "receptionist-host",
    title: "Front Desk Receptionist & Client Host",
    category: "admin",
    categoryLabel: "Operations & Admin",
    location: "Lucknow Studio",
    type: "Full-Time",
    experience: "0-2 Years",
    shortDescription:
      "Be the welcoming face and voice of Kinstel Solutions, greeting clients, managing reception, and coordinating office hospitality.",
    responsibilities: [
      "Welcome studio visitors, clients, and partners with professional warmth.",
      "Manage incoming telephone inquiries and route messages to appropriate leads.",
      "Maintain a clean, organized, and welcoming front desk and meeting room setup.",
      "Handle incoming mail, deliveries, and front-office inventory management.",
    ],
    requirements: [
      "Warm, professional demeanor with excellent interpersonal skills.",
      "Fluent verbal communication skills in Hindi and conversational English.",
      "Punctual, dependable, and detail-oriented personality.",
      "Basic computer literacy (email, spreadsheets, document handling).",
    ],
    icon: <Headphones className="h-6 w-6 text-accent" />,
  },
  {
    id: "virtual-admin-assistant",
    title: "Virtual Administrative Assistant",
    category: "admin",
    categoryLabel: "Operations & Admin",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "1+ Years",
    shortDescription:
      "Provide remote operational and administrative support, managing candidate inquiries, client records, and documentation.",
    responsibilities: [
      "Assist in candidate screening, interview scheduling, and HR documentation.",
      "Organize and maintain client repositories, project proposals, and invoicing logs.",
      "Respond to initial inbound web inquiries and route leads to growth strategists.",
      "Perform research and data compilation for studio leadership.",
    ],
    requirements: [
      "Demonstrated experience in virtual assistance or remote admin support.",
      "Comfort working independently with online task management software.",
      "High attention to detail and reliable internet connection for remote work.",
      "Clear, professional email and written correspondence skills.",
    ],
    icon: <Briefcase className="h-6 w-6 text-accent" />,
  },
  {
    id: "fullstack-engineer",
    title: "Senior Full-Stack Engineer (Next.js / React)",
    category: "engineering",
    categoryLabel: "Engineering & Tech",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "3+ Years",
    shortDescription:
      "Engineer sub-second web applications, platforms, and SaaS products in modern React 19, Next.js 16, TypeScript, and Tailwind CSS.",
    responsibilities: [
      "Architect and build high-performance web applications and custom client platforms.",
      "Implement server actions, API integrations, and database schemas with Firebase / Node.",
      "Optimize core web vitals, animations, and accessibility across all screen sizes.",
      "Collaborate closely with UI designers to bring pixel-perfect Figma designs to life.",
    ],
    requirements: [
      "Deep expertise in TypeScript, React, Next.js (App Router), and Tailwind CSS.",
      "Strong understanding of serverless functions, state management, and web performance.",
      "Familiarity with modern AI coding tools and automated workflows.",
      "Track record of shipping clean, scalable production code.",
    ],
    icon: <Code2 className="h-6 w-6 text-accent" />,
  },
  {
    id: "uiux-designer",
    title: "UI/UX & Web Designer",
    category: "design",
    categoryLabel: "Design & Product",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "2+ Years",
    shortDescription:
      "Design stunning, high-converting digital interfaces, design systems, and brand experiences that wow users at first glance.",
    responsibilities: [
      "Design wireframes, high-fidelity UI mockups, and interactive Figma prototypes.",
      "Develop cohesive brand visual identities, typography guidelines, and design tokens.",
      "Collaborate with front-end engineers to ensure flawless visual implementation.",
      "Conduct user journey mapping and conversion rate optimization reviews.",
    ],
    requirements: [
      "Mastery of Figma, component libraries, and interactive prototyping.",
      "Strong portfolio demonstrating web design, dark mode aesthetics, and micro-interactions.",
      "Keen eye for visual hierarchy, typography, and modern landing page design.",
      "Understanding of responsive layout constraints for modern code.",
    ],
    icon: <Palette className="h-6 w-6 text-accent" />,
  },
  {
    id: "performance-marketer",
    title: "Performance Marketing & Growth Specialist",
    category: "marketing",
    categoryLabel: "Marketing & Growth",
    location: "Remote / Hybrid",
    type: "Full-Time",
    experience: "2+ Years",
    shortDescription:
      "Drive customer acquisition through data-driven Google Ads, Meta campaigns, SEO funnel optimization, and analytics.",
    responsibilities: [
      "Plan, launch, and optimize paid search and paid social campaigns for studio clients.",
      "Conduct SEO audits, keyword strategies, and landing page conversion experiments.",
      "Analyze lead funnels, ROI tracking, and produce clear performance reports.",
      "Collaborate with content creators to develop high-converting ad copy and creatives.",
    ],
    requirements: [
      "Proven track record managing profitable ad spend across Google Ads & Meta.",
      "Proficiency in GA4, Google Tag Manager, and conversion tracking.",
      "Data-driven mindset with strong copy-writing and testing capabilities.",
      "Experience working with B2B services or e-commerce clients.",
    ],
    icon: <TrendingUp className="h-6 w-6 text-accent" />,
  },
];

export function CareersRoles() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRoleTitle, setSelectedRoleTitle] = useState("General Application");

  const filteredRoles =
    activeTab === "all"
      ? rolesData
      : rolesData.filter((r) => r.category === activeTab);

  const handleApplyClick = (roleTitle: string) => {
    setSelectedRoleTitle(roleTitle);
    setModalOpen(true);
  };

  return (
    <section id="open-roles" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="px-3.5 py-1 text-xs font-semibold text-accent border-accent/30 bg-accent/10 rounded-full mb-3">
            Opportunities
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Explore Open <span className="text-accent">Positions</span>
          </h2>
          <p className="mt-3 text-muted-foreground text-base sm:text-lg">
            Find the role that matches your skills and join us in building exceptional digital products.
          </p>
        </div>

        {/* Category Filters */}
        <div className="mt-10 flex justify-center">
          <Tabs
            defaultValue="all"
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full max-w-3xl">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-5 bg-card/80 p-1 border border-border/50 h-auto gap-1">
              <TabsTrigger value="all" className="text-xs sm:text-sm py-2">
                All ({rolesData.length})
              </TabsTrigger>
              <TabsTrigger value="admin" className="text-xs sm:text-sm py-2">
                Ops & Admin
              </TabsTrigger>
              <TabsTrigger value="engineering" className="text-xs sm:text-sm py-2">
                Engineering
              </TabsTrigger>
              <TabsTrigger value="design" className="text-xs sm:text-sm py-2">
                Design
              </TabsTrigger>
              <TabsTrigger value="marketing" className="text-xs sm:text-sm py-2">
                Growth
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        {/* Roles Cards Grid */}
        <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredRoles.map((role) => (
            <Card
              key={role.id}
              className="flex flex-col justify-between bg-card border-border/60 hover:border-accent/50 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="p-6 pb-4">
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                    {role.icon}
                  </div>
                  <Badge
                    variant="secondary"
                    className="text-xs font-medium bg-accent/10 text-accent border-accent/20">
                    {role.categoryLabel}
                  </Badge>
                </div>

                <CardTitle className="text-xl font-bold text-foreground leading-snug">
                  {role.title}
                </CardTitle>

                <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md">
                    <MapPin className="h-3.5 w-3.5 text-accent" />
                    {role.location}
                  </span>
                  <span className="flex items-center gap-1 bg-muted px-2.5 py-1 rounded-md">
                    <Clock className="h-3.5 w-3.5 text-accent" />
                    {role.type}
                  </span>
                </div>
              </CardHeader>

              <CardContent className="p-6 pt-0 flex-grow flex flex-col justify-between">
                <div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {role.shortDescription}
                  </p>

                  <div className="mt-4 pt-4 border-t border-border/40">
                    <span className="text-xs font-semibold uppercase tracking-wider text-foreground block mb-2">
                      Key Focus Areas:
                    </span>
                    <ul className="space-y-1.5 text-xs text-muted-foreground">
                      {role.responsibilities.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ChevronRight className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-border/40 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    Exp: <span className="font-semibold text-foreground">{role.experience}</span>
                  </span>
                  <Button
                    onClick={() => handleApplyClick(role.title)}
                    size="sm"
                    className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-sm">
                    Apply Now
                    <ArrowRight className="h-3.5 w-3.5 ml-1.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* General Application Banner */}
        <div className="mt-16 rounded-2xl bg-gradient-to-r from-accent/10 via-purple-500/10 to-accent/10 border border-accent/20 p-8 text-center max-w-4xl mx-auto">
          <Sparkles className="h-8 w-8 text-accent mx-auto mb-3 animate-pulse" />
          <h3 className="text-2xl font-bold text-foreground">
            Don't see your specific role listed?
          </h3>
          <p className="mt-2 text-muted-foreground max-w-xl mx-auto text-sm sm:text-base">
            We are always excited to connect with talented engineers, designers, front-desk administrators, and creators. Send us a general application!
          </p>
          <div className="mt-6">
            <Button
              onClick={() => handleApplyClick("General Application")}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-md">
              Submit General Application
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Application Dialog Modal */}
      <CareerApplicationModal
        isOpen={modalOpen}
        onOpenChange={setModalOpen}
        selectedRole={selectedRoleTitle}
      />
    </section>
  );
}
