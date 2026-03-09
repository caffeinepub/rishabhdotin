import { useEffect, useRef, useState } from "react";

// Target: March 9, 2031 — exactly 5 years from today (March 9, 2026)
const TARGET_DATE = new Date("2031-03-09T00:00:00");

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isExpired: boolean;
}

function calcTimeLeft(): TimeLeft {
  const diff = TARGET_DATE.getTime() - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };
  }
  const totalSeconds = Math.floor(diff / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds, isExpired: false };
}

function pad(n: number): string {
  return String(n).padStart(2, "0");
}

interface CountdownUnitProps {
  value: number;
  label: string;
  ocid: string;
  delay: string;
}

function CountdownUnit({ value, label, ocid, delay }: CountdownUnitProps) {
  const [prevValue, setPrevValue] = useState(value);
  const [flipping, setFlipping] = useState(false);
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      setPrevValue(value);
      return;
    }
    if (value !== prevValue) {
      setFlipping(true);
      const t = setTimeout(() => {
        setPrevValue(value);
        setFlipping(false);
      }, 350);
      return () => clearTimeout(t);
    }
  }, [value, prevValue]);

  const displayValue = flipping ? prevValue : value;
  const numClass = flipping
    ? "font-body tabular-nums select-none animate-digit-flip"
    : "font-body tabular-nums select-none animate-num-glow";

  return (
    <div
      data-ocid={ocid}
      className="countdown-card animate-fade-in-up animate-card-pulse"
      style={{ animationDelay: delay }}
    >
      {/* Card body */}
      <div className="relative flex flex-col items-center justify-center px-6 py-8 sm:px-10 sm:py-10">
        {/* Top shimmer line */}
        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        {/* Number */}
        <div
          className={numClass}
          style={{
            fontSize: "clamp(3.5rem, 10vw, 7rem)",
            fontWeight: 700,
            lineHeight: 1,
            color: "oklch(0.88 0.155 80)",
            letterSpacing: "-0.02em",
          }}
          aria-live="polite"
          aria-label={`${displayValue} ${label}`}
        >
          {pad(displayValue)}
        </div>

        {/* Label */}
        <div
          className="mt-4 text-xs sm:text-sm font-display tracking-[0.25em] uppercase"
          style={{ color: "oklch(0.50 0.025 260)" }}
        >
          {label}
        </div>

        {/* Bottom shimmer line */}
        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      </div>
    </div>
  );
}

function SiteName() {
  return (
    <header
      className="flex flex-col items-center gap-4 animate-fade-in-up"
      style={{ animationDelay: "0ms" }}
    >
      {/* Decorative line group */}
      <div className="flex items-center gap-4 w-full max-w-sm sm:max-w-md">
        <div
          className="flex-1 h-px animate-line-expand"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.82 0.165 80 / 0.4))",
            animationDelay: "200ms",
          }}
        />
        <div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "oklch(0.82 0.165 80 / 0.7)" }}
        />
        <div
          className="flex-1 h-px animate-line-expand"
          style={{
            background:
              "linear-gradient(to left, transparent, oklch(0.82 0.165 80 / 0.4))",
            animationDelay: "200ms",
          }}
        />
      </div>

      {/* Site name */}
      <h1
        className="font-display tracking-[0.18em] uppercase"
        style={{
          fontSize: "clamp(1.4rem, 5vw, 2.8rem)",
          fontWeight: 300,
          color: "oklch(0.92 0.02 80)",
          letterSpacing: "0.22em",
        }}
      >
        rishabhdotin
      </h1>

      {/* Tagline */}
      <p
        className="font-body text-xs sm:text-sm tracking-[0.12em] uppercase"
        style={{ color: "oklch(0.42 0.02 260)", marginTop: "-4px" }}
      >
        Something is coming.
      </p>

      {/* Bottom decorative line group */}
      <div className="flex items-center gap-4 w-full max-w-sm sm:max-w-md">
        <div
          className="flex-1 h-px animate-line-expand"
          style={{
            background:
              "linear-gradient(to right, transparent, oklch(0.82 0.165 80 / 0.15))",
            animationDelay: "400ms",
          }}
        />
        <div
          className="flex-1 h-px animate-line-expand"
          style={{
            background:
              "linear-gradient(to left, transparent, oklch(0.82 0.165 80 / 0.15))",
            animationDelay: "400ms",
          }}
        />
      </div>
    </header>
  );
}

function CompletionMessage() {
  return (
    <div className="flex flex-col items-center gap-6 animate-fade-in-up">
      <div
        className="font-display tracking-[0.1em] text-center"
        style={{
          fontSize: "clamp(2rem, 8vw, 5rem)",
          fontWeight: 200,
          color: "oklch(0.88 0.155 80)",
          textShadow:
            "0 0 40px oklch(0.82 0.165 80 / 0.5), 0 0 80px oklch(0.82 0.165 80 / 0.2)",
          letterSpacing: "0.08em",
        }}
      >
        The wait is over.
      </div>
      <p
        className="font-body text-sm tracking-[0.15em] uppercase"
        style={{ color: "oklch(0.52 0.025 260)" }}
      >
        March 9, 2031
      </p>
    </div>
  );
}

export default function App() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calcTimeLeft);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft(calcTimeLeft());
    }, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Radial background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, oklch(0.14 0.02 80 / 0.35) 0%, transparent 70%)",
        }}
      />

      {/* Deep vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 40%, oklch(0.04 0.005 260 / 0.8) 100%)",
        }}
      />

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center gap-12 sm:gap-16 px-4 py-12 sm:py-20 w-full">
        <SiteName />

        {timeLeft.isExpired ? (
          <CompletionMessage />
        ) : (
          <>
            {/* Countdown label */}
            <div
              className="font-body text-xs tracking-[0.25em] uppercase animate-fade-in-up"
              style={{
                color: "oklch(0.38 0.018 260)",
                animationDelay: "200ms",
              }}
            >
              Counting down to March 9, 2031
            </div>

            {/* Countdown grid */}
            <section
              data-ocid="countdown.section"
              className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full max-w-xs sm:max-w-2xl lg:max-w-3xl"
              aria-label="Countdown timer"
            >
              <CountdownUnit
                value={timeLeft.days}
                label="Days"
                ocid="countdown.days_card"
                delay="300ms"
              />
              <CountdownUnit
                value={timeLeft.hours}
                label="Hours"
                ocid="countdown.hours_card"
                delay="400ms"
              />
              <CountdownUnit
                value={timeLeft.minutes}
                label="Minutes"
                ocid="countdown.minutes_card"
                delay="500ms"
              />
              <CountdownUnit
                value={timeLeft.seconds}
                label="Seconds"
                ocid="countdown.seconds_card"
                delay="600ms"
              />
            </section>

            {/* Target date label */}
            <div
              className="font-display text-xs tracking-[0.2em] uppercase animate-fade-in-up"
              style={{
                color: "oklch(0.32 0.015 260)",
                animationDelay: "700ms",
              }}
            >
              09 · 03 · 2031
            </div>
          </>
        )}
      </main>

      {/* Footer */}
      <footer
        className="relative z-10 w-full text-center pb-6 px-4 animate-fade-in-up"
        style={{ animationDelay: "900ms" }}
      >
        <p
          className="font-body text-xs tracking-wide"
          style={{ color: "oklch(0.28 0.012 260)" }}
        >
          © {new Date().getFullYear()}.{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200 hover:text-primary/70"
            style={{ color: "oklch(0.30 0.015 260)" }}
          >
            Built with love using caffeine.ai
          </a>
        </p>
      </footer>

      {/* Inline card styles */}
      <style>{`
        .countdown-card {
          background: oklch(0.11 0.008 255);
          border-radius: 12px;
          overflow: hidden;
          box-shadow:
            0 0 0 1px oklch(0.82 0.165 80 / 0.12),
            0 8px 32px oklch(0 0 0 / 0.5),
            inset 0 1px 0 oklch(0.82 0.165 80 / 0.08);
          position: relative;
        }
      `}</style>
    </div>
  );
}
