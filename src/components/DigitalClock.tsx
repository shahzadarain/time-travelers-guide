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
    <div className="text-8xl font-mono font-bold tracking-wider">
      {time}
    </div>
  );
};