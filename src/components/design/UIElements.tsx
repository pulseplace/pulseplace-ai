
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { CheckCircle, AlertTriangle, Info, X, AlertCircle } from 'lucide-react';

export const UIElements: React.FC = () => {
  return (
    <div className="p-8 bg-background-light rounded-xl">
      <h2 className="text-3xl font-display font-bold mb-8">UI Elements</h2>
      
      <div className="grid gap-12">
        <section>
          <h3 className="text-xl font-medium mb-6">Buttons</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
              <h4 className="text-lg font-medium">Primary</h4>
              <div className="space-y-4">
                <Button variant="default">Primary Button</Button>
                <div className="text-sm space-y-1">
                  <p className="text-text-muted">Used for primary actions</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs block mt-2 mb-2">
                    {`<Button variant="default">Primary Button</Button>`}
                  </code>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
              <h4 className="text-lg font-medium">Secondary</h4>
              <div className="space-y-4">
                <Button variant="secondary">Secondary Button</Button>
                <div className="text-sm space-y-1">
                  <p className="text-text-muted">Used for secondary actions</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs block mt-2 mb-2">
                    {`<Button variant="secondary">Secondary Button</Button>`}
                  </code>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
              <h4 className="text-lg font-medium">Outline</h4>
              <div className="space-y-4">
                <Button variant="outline">Outline Button</Button>
                <div className="text-sm space-y-1">
                  <p className="text-text-muted">Used for tertiary actions</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs block mt-2 mb-2">
                    {`<Button variant="outline">Outline Button</Button>`}
                  </code>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
              <h4 className="text-lg font-medium">Accent</h4>
              <div className="space-y-4">
                <Button variant="accent">Accent Button</Button>
                <div className="text-sm space-y-1">
                  <p className="text-text-muted">Used for emphasizing important actions</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs block mt-2 mb-2">
                    {`<Button variant="accent">Accent Button</Button>`}
                  </code>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
              <h4 className="text-lg font-medium">Success</h4>
              <div className="space-y-4">
                <Button variant="success">Success Button</Button>
                <div className="text-sm space-y-1">
                  <p className="text-text-muted">Used to indicate successful actions</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs block mt-2 mb-2">
                    {`<Button variant="success">Success Button</Button>`}
                  </code>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
              <h4 className="text-lg font-medium">Ghost</h4>
              <div className="space-y-4">
                <Button variant="ghost">Ghost Button</Button>
                <div className="text-sm space-y-1">
                  <p className="text-text-muted">Used for subtle actions</p>
                  <code className="bg-gray-100 px-2 py-1 rounded text-xs block mt-2 mb-2">
                    {`<Button variant="ghost">Ghost Button</Button>`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-medium mb-6">Badges</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
              <h4 className="text-base font-medium">Default</h4>
              <Badge>Default</Badge>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {`<Badge>Default</Badge>`}
              </code>
            </div>
            
            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
              <h4 className="text-base font-medium">Secondary</h4>
              <Badge variant="secondary">Secondary</Badge>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {`<Badge variant="secondary">Secondary</Badge>`}
              </code>
            </div>
            
            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
              <h4 className="text-base font-medium">Success</h4>
              <Badge variant="success">Success</Badge>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {`<Badge variant="success">Success</Badge>`}
              </code>
            </div>
            
            <div className="flex flex-col gap-4 p-6 bg-white rounded-lg shadow-sm">
              <h4 className="text-base font-medium">Certified</h4>
              <Badge variant="certified">Certified</Badge>
              <code className="bg-gray-100 px-2 py-1 rounded text-xs">
                {`<Badge variant="certified">Certified</Badge>`}
              </code>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-medium mb-6">Alerts</h3>
          <div className="grid grid-cols-1 gap-6">
            <Alert className="bg-secondary/10 border-secondary/30 text-secondary">
              <Info className="h-4 w-4" />
              <AlertTitle>Information</AlertTitle>
              <AlertDescription>
                This is an information alert — check it out!
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-success/10 border-success/30 text-success">
              <CheckCircle className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>
                Your action was completed successfully.
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-accent/10 border-accent/30 text-accent">
              <AlertTriangle className="h-4 w-4" />
              <AlertTitle>Warning</AlertTitle>
              <AlertDescription>
                This is a warning alert — pay attention!
              </AlertDescription>
            </Alert>
            
            <Alert className="bg-destructive/10 border-destructive/30 text-destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                There was a problem with your request.
              </AlertDescription>
            </Alert>
            
            <div className="bg-white p-4 rounded-lg">
              <code className="bg-gray-100 px-4 py-3 rounded text-xs block whitespace-pre">
{`<Alert className="bg-secondary/10 border-secondary/30 text-secondary">
  <Info className="h-4 w-4" />
  <AlertTitle>Information</AlertTitle>
  <AlertDescription>
    This is an information alert — check it out!
  </AlertDescription>
</Alert>`}
              </code>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-medium mb-6">Form Elements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h4 className="text-lg font-medium mb-4">Input</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input type="email" id="email" placeholder="Enter your email" />
                </div>
                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                  <code className="text-xs whitespace-pre">
{`<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input type="email" id="email" placeholder="Enter your email" />
</div>`}
                  </code>
                </div>
              </div>
            </div>
            
            <div className="p-6 bg-white rounded-lg shadow-sm">
              <h4 className="text-lg font-medium mb-4">Input with Button</h4>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="subscribe">Subscribe to Newsletter</Label>
                  <div className="flex gap-2">
                    <Input type="email" id="subscribe" placeholder="Enter your email" className="flex-1" />
                    <Button>Subscribe</Button>
                  </div>
                </div>
                <div className="bg-gray-100 p-4 rounded-lg mt-4">
                  <code className="text-xs whitespace-pre">
{`<div className="space-y-2">
  <Label htmlFor="subscribe">Subscribe to Newsletter</Label>
  <div className="flex gap-2">
    <Input type="email" id="subscribe" placeholder="Enter your email" className="flex-1" />
    <Button>Subscribe</Button>
  </div>
</div>`}
                  </code>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section>
          <h3 className="text-xl font-medium mb-6">Cards</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Feature Highlight</CardTitle>
                <CardDescription>This card showcases a key product feature</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Cards can be used to group related content and actions, providing a clean interface for users to interact with.</p>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline">Cancel</Button>
                <Button>Continue</Button>
              </CardFooter>
            </Card>
            
            <div className="bg-white p-4 rounded-lg">
              <code className="bg-gray-100 px-4 py-3 rounded text-xs block whitespace-pre">
{`<Card>
  <CardHeader>
    <CardTitle>Feature Highlight</CardTitle>
    <CardDescription>This card showcases a key product feature</CardDescription>
  </CardHeader>
  <CardContent>
    <p>Cards can be used to group related content and actions, providing a clean interface for users to interact with.</p>
  </CardContent>
  <CardFooter className="flex justify-between">
    <Button variant="outline">Cancel</Button>
    <Button>Continue</Button>
  </CardFooter>
</Card>`}
              </code>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
