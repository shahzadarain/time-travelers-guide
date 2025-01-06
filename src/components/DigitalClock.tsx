interface DigitalClockProps {
  timezone: string;
  currentTime: Date;
}

export const DigitalClock = ({ timezone, currentTime }: DigitalClockProps) => {
  const time = currentTime.toLocaleTimeString(undefined, {
    timeZone: timezone,
    hour12: false,
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  });

  return (
    <div className="text-4xl md:text-5xl font-mono font-bold tracking-wider text-primary">
      {time}
    </div>
  );
};