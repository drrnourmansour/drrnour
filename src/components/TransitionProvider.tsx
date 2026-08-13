"use client";

import { createContext, useContext, useState, useCallback, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

type TransitionContextType = { navigateTo: (href: string) => void };

const TransitionContext = createContext<TransitionContextType>({ navigateTo: () => {} });

export const useTransitionNav = () => useContext(TransitionContext);

export default function TransitionProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const prevPathname = useRef(pathname);

  // "covering" = white overlay fading IN (before nav), "revealing" = fading OUT (after nav)
  const [phase, setPhase] = useState<"idle" | "covering" | "revealing">("idle");
  const pendingHref = useRef("");
  const busy = useRef(false);

  const navigateTo = useCallback((href: string) => {
    if (busy.current || href === window.location.pathname) return;
    busy.current = true;
    pendingHref.current = href;
    setPhase("covering");
  }, []);

  // When overlay fully covers the screen → push new route
  const onCoverComplete = () => {
    router.push(pendingHref.current);
  };

  // When pathname changes (new page rendered) → reveal it
  useEffect(() => {
    if (pathname !== prevPathname.current) {
      prevPathname.current = pathname;
      if (phase === "covering") {
        // Small tick so new page has time to paint before we reveal
        setTimeout(() => setPhase("revealing"), 60);
      }
    }
  }, [pathname, phase]);

  const onRevealComplete = () => {
    setPhase("idle");
    busy.current = false;
  };

  return (
    <TransitionContext.Provider value={{ navigateTo }}>
      {children}

      <AnimatePresence>
        {phase !== "idle" && (
          <motion.div
            key={phase}
            className="fixed inset-0 z-[9999] bg-white pointer-events-none"
            initial={{ opacity: phase === "covering" ? 0 : 1 }}
            animate={{ opacity: phase === "covering" ? 1 : 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
            onAnimationComplete={phase === "covering" ? onCoverComplete : onRevealComplete}
          />
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
