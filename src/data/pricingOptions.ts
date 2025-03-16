
export interface PricingOptionData {
  id: string;
  title: string;
  price: string;
  period: string;
  description: string;
  features: { text: string }[];
  buttonText: string;
  buttonColor: string;
  isMostPopular?: boolean;
}

export const pricingOptions: PricingOptionData[] = [
  {
    id: "monthly",
    title: "Monthly Subscription",
    price: "$9.99",
    period: "/month",
    description: "Unlimited access to AI support at a price less than a coffee a week.",
    features: [
      { text: "Unlimited AI answers and conversations" },
      { text: "Access to knowledge library" },
      { text: "Personalized recommendations" },
      { text: "Cancel anytime" }
    ],
    buttonText: "Would Pay This Price",
    buttonColor: "bg-blue-100 text-blue-800"
  },
  {
    id: "annual",
    title: "Annual Subscription",
    price: "$79.99",
    period: "/year",
    description: "Best value for your entire postpartum journey.",
    features: [
      { text: "Everything in monthly plan" },
      { text: "2 months free compared to monthly" },
      { text: "Priority support" },
      { text: "Early access to new features" }
    ],
    buttonText: "Would Pay This Price",
    buttonColor: "bg-pink-100 text-pink-700",
    isMostPopular: true
  }
];
