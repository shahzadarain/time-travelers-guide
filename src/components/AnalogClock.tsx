interface AnalogClockProps {
  timezone: string;
  currentTime: Date;
}

export const AnalogClock = ({ timezone, currentTime }: AnalogClockProps) => {
  const time = new Date(currentTime.toLocaleString("en-US", { timeZone: timezone }));
  const hours = time.getHours() % 12;
  const minutes = time.getMinutes();
  const seconds = time.getSeconds();

  const hourDegrees = (hours * 30) + (minutes / 2);
  const minuteDegrees = minutes * 6;
  const secondDegrees = seconds * 6;

  return (
    <div className="relative w-80 h-80">
      <div className="absolute inset-0 rounded-full border-4 border-primary">
        {/* Hour markers */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-4 bg-primary"
            style={{
              transform: `rotate(${i * 30}deg) translateY(10px)`,
              transformOrigin: "50% 150px",
            }}
          />
        ))}

        {/* Clock hands */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-16 bg-primary rounded-full origin-bottom"
          style={{ transform: `rotate(${hourDegrees}deg)` }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-24 bg-primary rounded-full origin-bottom"
          style={{ transform: `rotate(${minuteDegrees}deg)` }}
        />
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-0.5 h-28 bg-destructive rounded-full origin-bottom"
          style={{ transform: `rotate(${secondDegrees}deg)` }}
        />
        
        {/* Center dot */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-primary rounded-full" />
      </div>
    </div>
  );
};