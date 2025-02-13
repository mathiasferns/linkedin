import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

const plans = [
  { title: "Basic", price: 42, features: ["Monthly subscription", "Direct LinkedIn share", "unlimited prompts"] },
  { title: "Pro", price: 62, features: ["All features of Basic plan", "Add upto 3 people", "unlimited prompts"] },
  { title: "Premium", price: 68, features: ["Monthly subscription","maximum benefits","Suitable for Coperations","Add members upto 10 people"] }
];

export default function PaymentPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map((plan, index) => (
          <Card key={index} className="bg-gray-800 border-gray-700 rounded-2xl shadow-lg p-6">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">{plan.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-extrabold">${plan.price}</p>
              <ul className="mt-4 space-y-2">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <Check className="text-green-400" size={18} /> {feature}
                  </li>
                ))}
              </ul>
              <Button className="mt-6 w-full bg-red-600 hover:bg-red-700">Choose Plan</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
