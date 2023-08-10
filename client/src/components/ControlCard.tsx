interface ControlCardProps {
  control: string;
  icon: any;
  shortDescription: string;
  onClick: () => void;
}

const ControlCard = ({
  control,
  icon,
  onClick,
  shortDescription,
}: ControlCardProps) => {
  return (
    <div
      className="flex h-36 cursor-pointer items-center gap-4 rounded-lg bg-gray-100 p-10 transition-shadow duration-300 hover:shadow-md"
      onClick={onClick}
    >
      {icon}
      <div>
        <h2 className="text-2xl font-bold leading-tight tracking-tight text-gray-800">
          {control}
        </h2>
        <p className="mt-1">{shortDescription}</p>
      </div>
    </div>
  );
};

export default ControlCard;
