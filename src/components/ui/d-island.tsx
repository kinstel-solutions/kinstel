"use client";

import { createContext, useContext } from "react";
import {
  ArrowUpLeftSquareIcon,
  Loader,
  Mail,
  MessageCircle,
  MousePointerClickIcon,
  User,
  Waves,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DynamicContainer,
  DynamicDescription,
  DynamicDiv,
  DynamicIsland,
  DynamicIslandProvider,
  DynamicTitle,
  SizePresets,
  useDynamicIslandSize,
  useScheduledAnimations,
} from "@/components/ui/dynamic-island";
import { InquiryForm } from "@/components/sections/inquiry-form";

const DynamicAction = () => {
  const { state: blobState, setSize } = useDynamicIslandSize();

  const blobStates: SizePresets[] = [
    "compact",
    "large",
    "tall",
    "long",
    "medium",
  ];

  const cycleBlobStates = () => {
    const currentIndex = blobStates.indexOf(blobState.size);
    const nextIndex = (currentIndex + 1) % blobStates.length;
    setSize(blobStates[nextIndex]);
  };

  useScheduledAnimations([
    { size: "compact", delay: 1000 },
    { size: "large", delay: 1200 },
    { size: "tall", delay: 1600 },
    { size: "long", delay: 1800 },
    { size: "medium", delay: 2200 },
  ]);

  // Provide dynamic detail in such a beautiful small place :)
  const renderCompactState = () => (
    <DynamicContainer className="flex items-center justify-center h-full w-full">
      <div className="relative w-full flex items-center">
        <DynamicDescription className="absolute left-4  my-auto text-lg font-medium tracking-tighter text-white ">
          <MessageCircle className=" h-5 w-5 text-accent" />
        </DynamicDescription>

        <DynamicDescription className="absolute text-white right-4  my-auto text-lg font-bold tracking-tighter ">
          Hola
        </DynamicDescription>
      </div>
    </DynamicContainer>
  );

  // Great for call to action, popping up in users face :)
  const renderLargeState = () => (
    <DynamicContainer className="flex items-center justify-center h-full w-full">
      <div className="relative  flex w-full items-center justify-between gap-6 px-4">
        <Loader className="animate-spin h-12 w-12  text-accent" />

        <DynamicTitle className="my-auto text-2xl font-black tracking-tighter text-white ">
          Namaste...
        </DynamicTitle>
      </div>
    </DynamicContainer>
  );

  // Great for user onboarding, forms, etc
  const renderTallState = () => (
    <DynamicContainer className="  flex flex-col mt-6 w-full items-start  gap-1 px-8 font-semibold">
      <DynamicDescription className="bg-accent rounded-2xl tracking-tight leading-5  p-2">
        Modern Web Design
      </DynamicDescription>
      <DynamicDescription className="bg-accent rounded-2xl tracking-tight leading-5  p-2 text-left">
        We build high-performance websites that help your business grow and
        succeed online.
      </DynamicDescription>

      <DynamicTitle className=" text-4xl font-black tracking-tighter text-cyan-100 ">
        Ready to start?
      </DynamicTitle>
    </DynamicContainer>
  );

  const renderLongState = () => (
    <DynamicContainer className="flex items-center justify-center h-full w-full">
      <DynamicDiv className="relative  flex w-full items-center justify-between gap-6 px-4">
        <div>
          <Waves className=" text-accent h-8 w-8" />
        </div>

        <DynamicTitle className="my-auto text-xl font-black tracking-tighter text-white ">
          Kinstel Solutions
        </DynamicTitle>
      </DynamicDiv>
    </DynamicContainer>
  );

  const renderMediumState = () => (
    <DynamicContainer className="flex flex-col justify-between px-2 pt-4 text-left text-white h-full">
      <DynamicTitle className="text-2xl pl-3 font-black tracking-tighter">
        Elevate Your Business
      </DynamicTitle>
      <DynamicDescription className="leading-5 text-neutral-500 pl-3">
        Professional web design services tailored to your needs.
      </DynamicDescription>

      <DynamicDiv className="flex flex-col mt-auto space-y-1 mb-2 bg-neutral-700 p-2 rounded-b-2xl">
        <Button className="mt-1 w-full bg-accent text-accent-foreground hover:bg-accent/90">
          <User className="mr-2 h-4 w-4 text-neutral-900" /> View
          Portfolio
        </Button>
      </DynamicDiv>
    </DynamicContainer>
  );

  // Render function for other states
  const renderOtherStates = () => (
    <div className="flex items-center justify-center h-full w-full">
      <div>
        <ArrowUpLeftSquareIcon className="text-accent" />
      </div>
      <p className="text-white"> Hello</p>
    </div>
  );

  // Main render logic based on size
  function renderState() {
    switch (blobState.size) {
      case "compact":
        return renderCompactState();
      case "large":
        return renderLargeState();
      case "tall":
        return renderTallState();
      case "medium":
        return renderMediumState();
      case "long":
        return renderLongState();
      // Optionally add cases for other states as necessary
      default:
        return renderOtherStates();
    }
  }

  return (
    <div className=" h-full">
      <div className="flex flex-col gap-4  h-full">
        <div className="absolute top-12 left-1">
          {/* {!blobState.isAnimating ? ( */}
          {/* <Button
            onClick={cycleBlobStates}
            disabled={blobState.isAnimating}
            className="mt-4 p-2 border rounded-md max-w-[200px] ">
            Click
            <MousePointerClickIcon className="ml-2 h-4 w-4" />
          </Button> */}
          {/* ) : null} */}
        </div>
        {/* <div className="absolute top-1 right-2">
          <div>
            <Badge variant="outline">prev - {blobState.previousSize}</Badge>
            <Badge variant="outline">cur -{blobState.size}</Badge>
          </div>
        </div> */}

        <DynamicIsland id="dynamic-blob">{renderState()}</DynamicIsland>
      </div>
    </div>
  );
};

export function DynamicIslandDemo() {
  return (
    <DynamicIslandProvider initialSize={"default"}>
      <div>
        <DynamicAction />
      </div>
    </DynamicIslandProvider>
  );
}

const FadeInStaggerContext = createContext(false);

const viewport = { once: true, margin: "0px 0px -200px" };

export function FadeIn(props: any) {
  let shouldReduceMotion = useReducedMotion();
  let isInStaggerGroup = useContext(FadeInStaggerContext);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      {...(isInStaggerGroup
        ? {}
        : {
            initial: "hidden",
            whileInView: "visible",
            viewport,
          })}
      {...props}
    />
  );
}

export function FadeInStagger({ faster = false, ...props }) {
  return (
    <FadeInStaggerContext.Provider value={true}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={viewport}
        transition={{ staggerChildren: faster ? 0.12 : 0.2 }}
        {...props}
      />
    </FadeInStaggerContext.Provider>
  );
}
