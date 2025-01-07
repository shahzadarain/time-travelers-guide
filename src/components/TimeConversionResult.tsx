interface TimeConversionResultProps {
  result: {
    response: string;
  } | null;
}

export const TimeConversionResult = ({ result }: TimeConversionResultProps) => {
  if (!result) return null;

  return (
    <div className="bg-black/30 p-6 rounded-lg border border-white/10">
      <p className="text-lg text-white font-light leading-relaxed">
        {result.response}
      </p>
    </div>
  );
};