
import React from 'react';
import { Helmet } from 'react-helmet';

interface MetaTagsProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  url?: string;
}

const MetaTags: React.FC<MetaTagsProps> = ({
  title = "PulsePlace.ai - AI-powered workplace culture certification",
  description = "PulsePlace.ai is an AI-powered certification engine for workplace culture and people-first organizations.",
  imageUrl = "/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png",
  url = "https://pulseplace.ai"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={imageUrl} />
      
      {/* Favicon */}
      <link rel="icon" href="/lovable-uploads/ee0c2973-edcf-4589-a4c9-d4c8ca66dee8.png" type="image/png" />
    </Helmet>
  );
};

export default MetaTags;
