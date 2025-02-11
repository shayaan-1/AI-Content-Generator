'use client'

import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CreditCard, AlertCircle, Check } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const billing = () => {
  const [selectedPlan, setSelectedPlan] = useState('pro');

  const plans = [
    {
      name: 'Free',
      price: '0',
      features: ['100 Messages/month', 'Basic Support', 'Standard Response Time'],
      recommended: false
    },
    {
      name: 'Pro',
      price: '29',
      features: ['Unlimited Messages', 'Priority Support', 'Faster Response Time', 'Custom Instructions'],
      recommended: true
    },
    {
      name: 'Enterprise',
      price: '99',
      features: ['All Pro Features', 'Dedicated Support', 'API Access', 'Custom Integration'],
      recommended: false
    }
  ];

  const handlePlanSelection = (planName: string) => {
    setSelectedPlan(planName.toLowerCase());
    // Here you would typically trigger your subscription change logic
  };

  const handleDownloadInvoice = (invoiceId: number) => {
    // Add invoice download logic here
    console.log(`Downloading invoice ${invoiceId}`);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Billing & Subscription</h1>
        <p className="text-gray-600">Manage your subscription and payment methods</p>
      </div>

      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Your current plan: <span className="font-semibold">Pro Plan</span> - Valid until March 12, 2025
        </AlertDescription>
      </Alert>

      <div className="grid md:grid-cols-3 gap-6 mb-8">
        {plans.map((plan) => (
          <Card 
            key={plan.name}
            className={`relative ${
              selectedPlan === plan.name.toLowerCase() 
                ? 'border-primary shadow-lg' 
                : 'border-gray-200'
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary text-primary-foreground text-sm py-1 px-3 rounded-full">
                  Recommended
                </span>
              </div>
            )}
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <span>{plan.name}</span>
                <span className="text-2xl">${plan.price}<span className="text-sm text-muted-foreground">/mo</span></span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="h-4 w-4 text-primary" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button 
                className="w-full mt-6"
                variant={selectedPlan === plan.name.toLowerCase() ? "secondary" : "default"}
                onClick={() => handlePlanSelection(plan.name)}
              >
                {selectedPlan === plan.name.toLowerCase() ? 'Current Plan' : 'Select Plan'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CreditCard className="h-5 w-5" />
            Payment Method
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 p-4 border rounded-lg bg-muted/50">
            <div>
              <p className="font-medium">Visa ending in 4242</p>
              <p className="text-sm text-muted-foreground">Expires 12/2025</p>
            </div>
            <Button variant="outline" className="ml-auto">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Billing History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: 'Jan 12, 2025', amount: '$29.00', status: 'Paid', id: 2025001 },
              { date: 'Dec 12, 2024', amount: '$29.00', status: 'Paid', id: 2025000 },
              { date: 'Nov 12, 2024', amount: '$29.00', status: 'Paid', id: 2024999 }
            ].map((invoice) => (
              <div key={invoice.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                <div>
                  <p className="font-medium">{invoice.date}</p>
                  <p className="text-sm text-muted-foreground">Invoice #{invoice.id}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{invoice.amount}</p>
                  <p className="text-sm text-green-500">{invoice.status}</p>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleDownloadInvoice(invoice.id)}
                >
                  Download
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default billing;