
interface StepperProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const Stepper = ({ currentStep, totalSteps, steps }: StepperProps) => {
  return (
    <div className="w-full py-8">
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center">
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold ${
                index + 1 <= currentStep
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-600'
              }`}
            >
              {index + 1}
            </div>
            <div className="ml-3 text-sm font-medium text-gray-700 hidden sm:block">
              {step}
            </div>
            {index < totalSteps - 1 && (
              <div
                className={`w-16 h-1 mx-4 ${
                  index + 1 < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stepper;
