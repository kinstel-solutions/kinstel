"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface AnimatedKLogoProps {
  className?: string;
  size?: number;
  duration?: number;
}

export function AnimatedKLogo({
  className,
  size = 120,
  duration = 1.8,
}: AnimatedKLogoProps) {
  return (
    <div className={cn("inline-flex items-center justify-center relative", className)}>
      <svg
        width={size}
        height={size * 0.85}
        viewBox="0 0 240 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-auto overflow-visible"
      >
        {/* Glow backdrop behind stroke */}
        <motion.path
          d="M156.346 31.4818L93.8215 102.279C92.7316 103.513 90.8365 103.639 89.5886 102.562L73.0188 88.2494C71.7709 87.1715 71.6428 85.297 72.7328 84.0628L124.918 24.9713C125.488 24.3262 126.312 23.9561 127.178 23.9561H156.389C158.965 23.9561 160.343 26.9558 158.648 28.8748L156.346 31.4818Z"
          fill="none"
          stroke="#EAA221"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration, ease: "easeInOut" }}
        />
        <motion.path
          d="M156.337 187.976L93.8127 117.179C92.7228 115.945 90.8277 115.819 89.5798 116.896L73.0101 131.208C71.7621 132.286 71.634 134.161 72.724 135.396L124.91 194.487C125.479 195.132 126.303 195.502 127.169 195.502H156.38C158.956 195.502 160.334 192.502 158.64 190.583L156.337 187.976Z"
          fill="none"
          stroke="#EAA221"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration, delay: 0.3, ease: "easeInOut" }}
        />
        <motion.path
          d="M82.2725 111.695C83.6864 110.526 83.7099 108.384 82.3219 107.184L69.8126 96.3758C67.8839 94.7093 64.8667 96.0454 64.839 98.5782L64.6057 119.924C64.5781 122.457 67.5653 123.858 69.53 122.233L82.2725 111.695Z"
          fill="none"
          stroke="#EAA221"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: duration * 0.8, delay: 0.6, ease: "easeInOut" }}
        />

        {/* Filled gold shapes fading in after laser stroke */}
        <motion.path
          d="M156.346 31.4818L93.8215 102.279C92.7316 103.513 90.8365 103.639 89.5886 102.562L73.0188 88.2494C71.7709 87.1715 71.6428 85.297 72.7328 84.0628L124.918 24.9713C125.488 24.3262 126.312 23.9561 127.178 23.9561H156.389C158.965 23.9561 160.343 26.9558 158.648 28.8748L156.346 31.4818Z"
          fill="#EAA221"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: duration + 0.2 }}
        />
        <motion.path
          d="M156.337 187.976L93.8127 117.179C92.7228 115.945 90.8277 115.819 89.5798 116.896L73.0101 131.208C71.7621 132.286 71.634 134.161 72.724 135.396L124.91 194.487C125.479 195.132 126.303 195.502 127.169 195.502H156.38C158.956 195.502 160.334 192.502 158.64 190.583L156.337 187.976Z"
          fill="#EAA221"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: duration + 0.4 }}
        />
        <motion.path
          d="M82.2725 111.695C83.6864 110.526 83.7099 108.384 82.3219 107.184L69.8126 96.3758C67.8839 94.7093 64.8667 96.0454 64.839 98.5782L64.6057 119.924C64.5781 122.457 67.5653 123.858 69.53 122.233L82.2725 111.695Z"
          fill="#EAA221"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: duration + 0.5 }}
        />
      </svg>
    </div>
  );
}
