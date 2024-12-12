interface ProgressProps {
  progress: number;
}

const Progress = ({ progress }: ProgressProps) => {
  return (
    <div className="w-full bg-red-200 rounded-full dark:bg-gray-700">
      <div
        className="bg-red-600 text-xs font-medium text-white-100 text-center p-0.5 leading-none rounded-full"
        style={{ width: `${progress}%` }}
      >
        {progress}%
      </div>
    </div>
  );
};

export default Progress;
