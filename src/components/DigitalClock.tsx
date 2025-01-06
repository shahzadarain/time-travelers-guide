interface DigitalClockProps {
  timezone: string;
  currentTime: Date;
  hour12?: boolean;
}

export const DigitalClock = ({ timezone, currentTime, hour12 = false }: DigitalClockProps) => {
  const time = currentTime.toLocaleTimeString(undefined, {
    timeZone: timezone,
    hour12: hour12,
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