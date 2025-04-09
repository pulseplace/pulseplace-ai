
import React from 'react';

export const TypographySystem: React.FC = () => {
  return (
    <div className="p-8 bg-background-light rounded-xl">
      <h2 className="text-3xl font-display font-bold mb-8">Typography System</h2>
      
      <div className="grid gap-10">
        <div>
          <h3 className="text-xl font-medium mb-4">Font Families</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-6 bg-white shadow-sm rounded-lg">
              <h4 className="text-lg font-medium mb-2">Display Font</h4>
              <p className="font-display text-2xl">Neue Haas Grotesk Display Pro</p>
              <div className="mt-4 text-text-muted text-sm">
                <p><code className="bg-gray-100 px-2 py-1 rounded">font-display</code> - for headlines and important text</p>
              </div>
            </div>
            
            <div className="p-6 bg-white shadow-sm rounded-lg">
              <h4 className="text-lg font-medium mb-2">Body Font</h4>
              <p className="font-body text-2xl">Inter</p>
              <div className="mt-4 text-text-muted text-sm">
                <p><code className="bg-gray-100 px-2 py-1 rounded">font-body</code> or <code className="bg-gray-100 px-2 py-1 rounded">font-sans</code> - for body text and general interface</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">Typography Scale</h3>
          <div className="space-y-6">
            <div className="p-4 border-l-4 border-secondary">
              <span className="text-sm text-text-muted block mb-1">Display/Heading 1</span>
              <h1 className="text-5xl font-display font-bold">Headline Text</h1>
              <div className="mt-2 text-text-muted text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">text-5xl font-display font-bold</code>
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-secondary">
              <span className="text-sm text-text-muted block mb-1">Heading 2</span>
              <h2 className="text-4xl font-display font-bold">Headline Text</h2>
              <div className="mt-2 text-text-muted text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">text-4xl font-display font-bold</code>
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-secondary">
              <span className="text-sm text-text-muted block mb-1">Heading 3</span>
              <h3 className="text-3xl font-display font-semibold">Headline Text</h3>
              <div className="mt-2 text-text-muted text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">text-3xl font-display font-semibold</code>
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-secondary">
              <span className="text-sm text-text-muted block mb-1">Heading 4</span>
              <h4 className="text-2xl font-display font-medium">Headline Text</h4>
              <div className="mt-2 text-text-muted text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">text-2xl font-display font-medium</code>
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-secondary">
              <span className="text-sm text-text-muted block mb-1">Paragraph</span>
              <p className="text-base font-body">This is standard paragraph text for PulsePlace interfaces. It should be easily readable with appropriate line height and spacing.</p>
              <div className="mt-2 text-text-muted text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">text-base font-body</code>
              </div>
            </div>
            
            <div className="p-4 border-l-4 border-secondary">
              <span className="text-sm text-text-muted block mb-1">Small Text / Caption</span>
              <p className="text-sm font-body text-text-muted">This is small text used for captions, labels, and supporting information.</p>
              <div className="mt-2 text-text-muted text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">text-sm font-body text-text-muted</code>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-xl font-medium mb-4">Letter Spacing</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white shadow-sm rounded-lg">
              <h4 className="text-lg font-medium mb-2">Standard</h4>
              <p className="text-xl">Normal letter spacing</p>
              <div className="mt-2 text-text-muted text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">tracking-normal</code>
              </div>
            </div>
            
            <div className="p-4 bg-white shadow-sm rounded-lg">
              <h4 className="text-lg font-medium mb-2">Wide</h4>
              <p className="text-xl tracking-wider">Wider letter spacing</p>
              <div className="mt-2 text-text-muted text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">tracking-wider</code>
              </div>
            </div>
            
            <div className="p-4 bg-white shadow-sm rounded-lg">
              <h4 className="text-lg font-medium mb-2">Widest</h4>
              <p className="text-xl tracking-widest">Widest letter spacing</p>
              <div className="mt-2 text-text-muted text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">tracking-widest</code>
              </div>
            </div>
            
            <div className="p-4 bg-white shadow-sm rounded-lg">
              <h4 className="text-lg font-medium mb-2">Uppercase + Wide</h4>
              <p className="text-lg uppercase tracking-wider">Brand text styles</p>
              <div className="mt-2 text-text-muted text-sm">
                <code className="bg-gray-100 px-2 py-1 rounded">uppercase tracking-wider</code>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
