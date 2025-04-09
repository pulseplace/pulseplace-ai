
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

export const UIElements: React.FC = () => {
  const isMobile = useIsMobile();
  
  return (
    <div className="p-4 sm:p-8 bg-background-light rounded-xl">
      <h2 className="text-2xl sm:text-3xl font-display font-bold mb-6 sm:mb-8">UI Elements</h2>
      
      <div className="space-y-8">
        {/* Buttons Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Buttons</h3>
          <div className="p-4 sm:p-6 bg-white rounded-lg">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <button className="btn-primary w-full">Primary Button</button>
                <p className="text-xs text-text-muted text-center">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">btn-primary</code>
                </p>
              </div>
              
              <div className="space-y-2">
                <button className="btn-secondary w-full">Secondary Button</button>
                <p className="text-xs text-text-muted text-center">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">btn-secondary</code>
                </p>
              </div>
              
              <div className="space-y-2">
                <button className="btn-success w-full">Success Button</button>
                <p className="text-xs text-text-muted text-center">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">btn-success</code>
                </p>
              </div>
              
              <div className="space-y-2">
                <button className="btn-outline w-full">Outline Button</button>
                <p className="text-xs text-text-muted text-center">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">btn-outline</code>
                </p>
              </div>
              
              <div className="space-y-2">
                <button className="bg-gradient-to-r from-pulse-blue to-soulful-midnight text-white font-medium rounded-lg px-4 py-2 w-full">
                  Gradient Button
                </button>
                <p className="text-xs text-text-muted text-center">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">bg-gradient-to-r from-pulse-blue to-soulful-midnight</code>
                </p>
              </div>
              
              <div className="space-y-2">
                <button disabled className="btn-primary opacity-50 cursor-not-allowed w-full">
                  Disabled Button
                </button>
                <p className="text-xs text-text-muted text-center">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">opacity-50 cursor-not-allowed</code>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Badges Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Badges</h3>
          <div className="p-4 sm:p-6 bg-white rounded-lg">
            <div className="flex flex-wrap gap-4">
              <div className="space-y-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary text-white">
                  Default Badge
                </span>
                <p className="text-xs text-text-muted">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">bg-primary text-white</code>
                </p>
              </div>
              
              <div className="space-y-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary text-white">
                  Secondary Badge
                </span>
                <p className="text-xs text-text-muted">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">bg-secondary text-white</code>
                </p>
              </div>
              
              <div className="space-y-2">
                <span className="certified-badge inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium">
                  Certified
                </span>
                <p className="text-xs text-text-muted">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">certified-badge</code>
                </p>
              </div>
              
              <div className="space-y-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-ember-coral text-white">
                  Accent Badge
                </span>
                <p className="text-xs text-text-muted">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">bg-ember-coral text-white</code>
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Alerts Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Alerts</h3>
          <div className="p-4 sm:p-6 bg-white rounded-lg">
            <div className="space-y-4">
              <div className="bg-secondary/10 border border-secondary/30 text-secondary p-4 rounded-lg">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium">Information</h4>
                    <p className="text-xs mt-1">This is an information alert</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-success/10 border border-success/30 text-success p-4 rounded-lg">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium">Success</h4>
                    <p className="text-xs mt-1">This is a success alert</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-ember-coral/10 border border-ember-coral/30 text-ember-coral p-4 rounded-lg">
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <div>
                    <h4 className="text-sm font-medium">Warning</h4>
                    <p className="text-xs mt-1">This is a warning alert</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Form Elements Section */}
        <div>
          <h3 className="text-lg sm:text-xl font-medium mb-3 sm:mb-4">Form Elements</h3>
          <div className="p-4 sm:p-6 bg-white rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary">Input Field</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary" 
                  placeholder="Enter text"
                />
                <p className="text-xs text-text-muted">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">focus:ring-2 focus:ring-secondary/50</code>
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary">Select Field</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-secondary/50 focus:border-secondary">
                  <option>Option 1</option>
                  <option>Option 2</option>
                  <option>Option 3</option>
                </select>
                <p className="text-xs text-text-muted">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">border-gray-300 focus:border-secondary</code>
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary">Checkbox</label>
                <div className="flex items-center">
                  <input 
                    type="checkbox" 
                    className="h-4 w-4 text-secondary focus:ring-secondary/50 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-text-primary">
                    I agree to terms
                  </label>
                </div>
                <p className="text-xs text-text-muted">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">text-secondary focus:ring-secondary/50</code>
                </p>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-medium text-text-primary">Radio Button</label>
                <div className="space-y-1">
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="radio-group" 
                      className="h-4 w-4 text-secondary focus:ring-secondary/50 border-gray-300"
                      checked
                    />
                    <label className="ml-2 block text-sm text-text-primary">
                      Option A
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input 
                      type="radio" 
                      name="radio-group" 
                      className="h-4 w-4 text-secondary focus:ring-secondary/50 border-gray-300"
                    />
                    <label className="ml-2 block text-sm text-text-primary">
                      Option B
                    </label>
                  </div>
                </div>
                <p className="text-xs text-text-muted">
                  <code className="bg-gray-100 px-1 py-0.5 rounded">text-secondary focus:ring-secondary/50</code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
