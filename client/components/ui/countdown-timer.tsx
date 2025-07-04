import { useState, useEffect } from "react";

interface CountdownTimerProps {
  targetDate: string;
  className?: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export function CountdownTimer({
  targetDate,
  className = "",
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(targetDate).getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  return (
    <div className={`flex items-center justify-center gap-4 ${className}`}>
      <div className="flex flex-col items-center">
        <div className="bg-gradient-to-r from-neon-purple to-neon-pink text-transparent bg-clip-text text-2xl md:text-3xl font-bold">
          {timeLeft.days.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          Days
        </div>
      </div>
      <div className="text-neon-cyan text-2xl md:text-3xl">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-gradient-to-r from-neon-purple to-neon-pink text-transparent bg-clip-text text-2xl md:text-3xl font-bold">
          {timeLeft.hours.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          Hours
        </div>
      </div>
      <div className="text-neon-cyan text-2xl md:text-3xl">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-gradient-to-r from-neon-purple to-neon-pink text-transparent bg-clip-text text-2xl md:text-3xl font-bold">
          {timeLeft.minutes.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          Min
        </div>
      </div>
      <div className="text-neon-cyan text-2xl md:text-3xl">:</div>
      <div className="flex flex-col items-center">
        <div className="bg-gradient-to-r from-neon-purple to-neon-pink text-transparent bg-clip-text text-2xl md:text-3xl font-bold">
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          Sec
        </div>
      </div>
    </div>
  );
}
