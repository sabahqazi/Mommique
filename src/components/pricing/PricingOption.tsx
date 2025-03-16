
import React from 'react';
import { Check } from 'lucide-react';

interface PricingFeature {
  text: string;
}

interface PricingOptionProps {
  title: string;
  price: string;
  period: string;
  description: string;
  features: PricingFeature[];
  buttonText: string;
  buttonColor: string;
  onClick: () => void;
  isMostPopular?: boolean;
}

const PricingOption: React.FC<PricingOptionProps> = ({
  title,
  price,
  period,
  description,
  features,
  buttonText,
  buttonColor,
  onClick,
  isMostPopular,
}) => {
  return (
    <div className="bg-white rounded-xl p-6 shadow-md border border-gray-100 relative">
      {isMostPopular && (
        <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold py-1 px-3 rounded-tl-lg rounded-br-lg">
          Most Popular
        </div>
      )}
      <h3 className="text-xl font-bold mb-3">{title}</h3>
      <div className="mb-4">
        <span className="text-3xl font-bold">{price}</span>
        <span className="text-gray-600">{period}</span>
        {isMostPopular && <span className="ml-2 text-green-600 text-sm font-medium">Save 33%</span>}
      </div>
      <p className="text-gray-600 mb-6">{description}</p>
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <div className="text-red-500 mt-1">
              <Check className="w-4 h-4" />
            </div>
            <span className="text-gray-700">{feature.text}</span>
          </li>
        ))}
      </ul>
      <button
        className={`w-full ${buttonColor} font-medium py-3 rounded-lg hover:bg-opacity-80 transition-colors`}
        onClick={onClick}
      >
        {buttonText}
      </button>
    </div>
  );
};

export default PricingOption;
