
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';

const MetaTags = () => {
  useEffect(() => {
    document.title = "PulsePlace.ai – AI-Powered Workplace Certification";
  }, []);

  return (
    <Helmet>
      <title>PulsePlace.ai – AI-Powered Workplace Certification</title>
      <meta name="description" content="AI-Powered Workplace Culture Analysis and Certification" />
    </Helmet>
  );
};

export default MetaTags;
