
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const MetaTags = () => {
  useEffect(() => {
    document.title = "PulsePlace.ai | AI-Powered Workplace Certification";
  }, []);

  return (
    <Helmet>
      <title>PulsePlace.ai | AI-Powered Workplace Certification</title>
      <meta name="description" content="PulsePlace is the AI platform ranking the most loved workplaces based on real-time employee sentiment and trust." />
      <link rel="icon" type="image/png" href="/public/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" />
    </Helmet>
  );
};

export default MetaTags;
