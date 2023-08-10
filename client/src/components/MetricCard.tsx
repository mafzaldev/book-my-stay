interface MetricCardProps {
  metric: string;
  value: number;
  unit?: string;
}

const MetricCard = ({ metric, value, unit }: MetricCardProps) => {
  return (
    <div className="h-32 rounded-lg bg-indigo-400">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-center text-white">
          <p className="inline-block text-3xl font-bold">{value}</p>{" "}
          {unit && <span className="inline-block font-medium">{unit}</span>}
          <p className="text-lg font-medium">{metric}</p>
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
