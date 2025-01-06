interface TimeConversionResultProps {
  result: {
    sourceLocation: string;
    sourceTime: string;
    targetLocation: string;
    convertedTime: string;
  } | null;
}

export const TimeConversionResult = ({ result }: TimeConversionResultProps) => {
  if (!result) return null;

  return (
    <div className="bg-secondary p-4 rounded-lg">
      <p className="text-lg">
        {result.sourceTime} in {result.sourceLocation} is{" "}
        {result.convertedTime} in {result.targetLocation}
      </p>
    </div>
  );
};