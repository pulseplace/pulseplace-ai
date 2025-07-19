
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Check, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "$12",
      period: "per employee/month",
      description: "Perfect for small teams getting started with culture measurement",
      features: [
        "Basic pulse surveys",
        "Culture dashboard",
        "Email support",
        "Up to 50 employees"
      ]
    },
    {
      name: "Professional",
      price: "$24",
      period: "per employee/month",
      description: "Advanced features for growing organizations",
      features: [
        "All Starter features",
        "AI-powered insights",
        "PulseBot assistant",
        "Custom surveys",
        "Priority support",
        "Up to 500 employees"
      ],
      popular: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      period: "contact for pricing",
      description: "Tailored solutions for large organizations",
      features: [
        "All Professional features",
        "White-label options",
        "Custom integrations",
        "Dedicated success manager",
        "SLA guarantees",
        "Unlimited employees"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>Pricing | PulsePlace.ai</title>
        <meta name="description" content="Choose the right PulsePlace.ai plan for your organization. Transparent pricing with no hidden fees." />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Simple, Transparent Pricing
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your organization's needs. All plans include our core culture measurement features.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <div key={index} className={`bg-white rounded-lg p-8 shadow-sm border ${plan.popular ? 'border-pulse-300 relative' : ''}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-pulse-gradient text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Most Popular
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <div className="text-4xl font-bold text-pulse-600 mb-1">{plan.price}</div>
                  <div className="text-gray-600 text-sm">{plan.period}</div>
                  <p className="text-gray-600 mt-4">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <Check className="h-5 w-5 text-green-600 mr-3" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button className={`w-full ${plan.popular ? 'bg-pulse-gradient' : ''}`} variant={plan.popular ? 'default' : 'outline'}>
                  {plan.name === 'Enterprise' ? 'Contact Sales' : 'Start Free Trial'}
                </Button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">All plans include a 14-day free trial. No credit card required.</p>
            <Button variant="outline">
              Compare All Features
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pricing;
