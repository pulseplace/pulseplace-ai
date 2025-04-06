
import React from 'react';
import { Check, CircleDollarSign, BadgeCheck, FileText, ChartBar } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PricingTabs = () => {
  const { toast } = useToast();
  
  const handleSubscribe = (plan: string) => {
    toast({
      title: "Subscription Request Received",
      description: `We'll contact you about the ${plan} plan soon.`,
    });
  };
  
  return (
    <Tabs defaultValue="monthly" className="w-full max-w-5xl mx-auto">
      <div className="flex justify-center mb-8">
        <TabsList className="grid w-[400px] grid-cols-2">
          <TabsTrigger value="monthly">Monthly</TabsTrigger>
          <TabsTrigger value="annual">Annual (Save 20%)</TabsTrigger>
        </TabsList>
      </div>
      
      <TabsContent value="monthly" className="grid gap-8 md:grid-cols-3">
        <PricingCard
          title="Starter"
          price="$499"
          description="Perfect for small teams just beginning their culture journey."
          features={[
            "PulseScore™ for up to 50 employees",
            "Monthly Culture Reports",
            "Basic AI recommendations",
            "Email support"
          ]}
          iconColor="text-blue-500"
          icon={<CircleDollarSign className="h-6 w-6" />}
          onSubscribe={() => handleSubscribe("Starter")}
          mostPopular={false}
        />
        
        <PricingCard
          title="Growth"
          price="$999"
          description="Ideal for growing organizations ready to invest in their culture."
          features={[
            "PulseScore™ for up to 200 employees",
            "Weekly Culture Reports",
            "Advanced AI recommendations",
            "Culture Compass™ benchmarking",
            "Certification eligibility",
            "Priority support"
          ]}
          iconColor="text-pulse-600"
          icon={<BadgeCheck className="h-6 w-6" />}
          onSubscribe={() => handleSubscribe("Growth")}
          mostPopular={true}
        />
        
        <PricingCard
          title="Enterprise"
          price="Custom"
          description="For organizations seeking deep cultural transformation at scale."
          features={[
            "PulseScore™ for unlimited employees",
            "Daily Culture Insights",
            "Premium AI recommendations",
            "Advanced benchmarking",
            "Priority certification",
            "Custom integrations",
            "Dedicated success manager"
          ]}
          iconColor="text-teal-600"
          icon={<ChartBar className="h-6 w-6" />}
          onSubscribe={() => handleSubscribe("Enterprise")}
          mostPopular={false}
          buttonText="Contact Sales"
        />
      </TabsContent>
      
      <TabsContent value="annual" className="grid gap-8 md:grid-cols-3">
        <PricingCard
          title="Starter"
          price="$399"
          period="per month, billed annually"
          description="Perfect for small teams just beginning their culture journey."
          features={[
            "PulseScore™ for up to 50 employees",
            "Monthly Culture Reports",
            "Basic AI recommendations",
            "Email support"
          ]}
          iconColor="text-blue-500"
          icon={<CircleDollarSign className="h-6 w-6" />}
          onSubscribe={() => handleSubscribe("Starter Annual")}
          mostPopular={false}
        />
        
        <PricingCard
          title="Growth"
          price="$799"
          period="per month, billed annually"
          description="Ideal for growing organizations ready to invest in their culture."
          features={[
            "PulseScore™ for up to 200 employees",
            "Weekly Culture Reports",
            "Advanced AI recommendations",
            "Culture Compass™ benchmarking",
            "Certification eligibility",
            "Priority support"
          ]}
          iconColor="text-pulse-600"
          icon={<BadgeCheck className="h-6 w-6" />}
          onSubscribe={() => handleSubscribe("Growth Annual")}
          mostPopular={true}
        />
        
        <PricingCard
          title="Enterprise"
          price="Custom"
          period="Annual contract"
          description="For organizations seeking deep cultural transformation at scale."
          features={[
            "PulseScore™ for unlimited employees",
            "Daily Culture Insights",
            "Premium AI recommendations",
            "Advanced benchmarking",
            "Priority certification",
            "Custom integrations",
            "Dedicated success manager"
          ]}
          iconColor="text-teal-600"
          icon={<ChartBar className="h-6 w-6" />}
          onSubscribe={() => handleSubscribe("Enterprise Annual")}
          mostPopular={false}
          buttonText="Contact Sales"
        />
      </TabsContent>
    </Tabs>
  );
};

interface PricingCardProps {
  title: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  iconColor: string;
  icon: React.ReactNode;
  onSubscribe: () => void;
  mostPopular: boolean;
  buttonText?: string;
}

const PricingCard = ({
  title,
  price,
  period = "per month",
  description,
  features,
  iconColor,
  icon,
  onSubscribe,
  mostPopular,
  buttonText = "Subscribe"
}: PricingCardProps) => {
  return (
    <Card className={`flex flex-col h-full transition-all duration-200 ${
      mostPopular ? "border-pulse-500 shadow-lg scale-105" : "border-gray-200 hover:border-pulse-300 hover:shadow-md"
    }`}>
      {mostPopular && (
        <div className="w-full bg-pulse-500 text-white py-1 px-4 text-center text-sm font-medium rounded-t-lg">
          Most Popular
        </div>
      )}
      <CardHeader>
        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
          mostPopular ? "bg-pulse-100" : "bg-gray-100"
        }`}>
          <div className={iconColor}>{icon}</div>
        </div>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <div className="mt-2">
          <span className="text-3xl font-bold">{price}</span>
          {price !== "Custom" && <span className="text-gray-500 ml-2">{period}</span>}
        </div>
        <CardDescription className="mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <ul className="space-y-3">
          {features.map((feature, i) => (
            <li key={i} className="flex items-start gap-2">
              <div className={`${mostPopular ? "bg-pulse-100 text-pulse-600" : "bg-gray-100 text-gray-600"} rounded-full p-1 mt-1`}>
                <Check className="h-3 w-3" />
              </div>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onSubscribe} 
          className={`w-full ${
            mostPopular ? "bg-pulse-gradient hover:opacity-90" : "bg-white text-pulse-600 border border-pulse-300 hover:bg-pulse-50"
          }`}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
};

const EnterpriseSection = () => {
  return (
    <section className="py-16 bg-pulse-50">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Enterprise Solutions</h2>
              <p className="text-lg text-gray-600 mb-6">
                Need a custom solution for your large organization? Our enterprise plans include:
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <div className="bg-pulse-100 rounded-full p-2 mt-1">
                    <FileText className="h-5 w-5 text-pulse-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Custom Implementation</h3>
                    <p className="text-gray-600">Tailored to your organizational structure and needs</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-pulse-100 rounded-full p-2 mt-1">
                    <BadgeCheck className="h-5 w-5 text-pulse-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">HR System Integration</h3>
                    <p className="text-gray-600">Connect with your existing HR platforms</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <div className="bg-pulse-100 rounded-full p-2 mt-1">
                    <ChartBar className="h-5 w-5 text-pulse-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Advanced Analytics</h3>
                    <p className="text-gray-600">Deep insights across departments and locations</p>
                  </div>
                </li>
              </ul>
              <Button className="bg-pulse-gradient px-8">Schedule Consultation</Button>
            </div>
            <div className="relative h-full flex items-center justify-center">
              <div className="absolute -z-10 w-72 h-72 bg-pulse-100 rounded-full opacity-50"></div>
              <img
                src="/lovable-uploads/da2df9b1-afa2-4019-be42-cbfdedf8740b.png"
                alt="Enterprise Solutions"
                className="relative z-10 max-w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-pulse-50 to-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Transparent Pricing for Every Stage
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Invest in your workplace culture with plans designed to scale with your organization.
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center mb-8">
              <Badge className="bg-pulse-100 text-pulse-700 hover:bg-pulse-200 px-4 py-2 text-sm">
                No hidden fees
              </Badge>
              <Badge className="bg-pulse-100 text-pulse-700 hover:bg-pulse-200 px-4 py-2 text-sm">
                Cancel anytime
              </Badge>
              <Badge className="bg-pulse-100 text-pulse-700 hover:bg-pulse-200 px-4 py-2 text-sm">
                Free onboarding
              </Badge>
            </div>
          </div>
        </section>
        
        {/* Pricing Cards Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <PricingTabs />
            
            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">
                All plans include basic features like the PulseScore™ dashboard, employee surveys, and trend analysis.
              </p>
              <Link to="/join-beta">
                <Button variant="outline" className="border-pulse-300 text-pulse-700 hover:bg-pulse-50">
                  Join Beta for Special Pricing
                </Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Enterprise Section */}
        <EnterpriseSection />
        
        {/* FAQ Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
            
            <div className="space-y-6">
              {[
                {
                  question: "Can I change plans as my organization grows?",
                  answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
                },
                {
                  question: "Is there a setup fee?",
                  answer: "No, there are no setup fees. We offer free onboarding to help you get started quickly."
                },
                {
                  question: "Do you offer discounts for nonprofits?",
                  answer: "Yes, we offer special pricing for nonprofit organizations. Please contact our sales team for details."
                },
                {
                  question: "What payment methods do you accept?",
                  answer: "We accept all major credit cards, as well as invoicing for enterprise customers."
                },
                {
                  question: "Can I get certified with the Starter plan?",
                  answer: "Certification eligibility starts with the Growth plan, which includes the necessary measurement tools and benchmarking."
                }
              ].map((item, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-6">
                  <h3 className="text-lg font-semibold mb-2">{item.question}</h3>
                  <p className="text-gray-600">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Pricing;
