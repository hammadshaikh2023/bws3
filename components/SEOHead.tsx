import React from 'react';
import { Helmet } from 'react-helmet-async';
import { MetaTags } from '../types';

interface SEOHeadProps {
  meta: MetaTags;
  schema?: any;
}

const SEOHead: React.FC<SEOHeadProps> = ({ meta, schema }) => {
  const siteUrl = 'https://bigwallsolutions.com'; // Placeholder domain
  const currentUrl = typeof window !== 'undefined' ? window.location.href : siteUrl;

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Big Wall Solutions",
    "url": siteUrl,
    "logo": `${siteUrl}/logo.png`,
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-0199",
      "contactType": "Customer Service"
    }
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords.join(', ')} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:site_name" content="Big Wall Solutions" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:type" content={meta.type || 'website'} />
      {meta.ogImage && <meta property="og:image" content={meta.ogImage} />}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@bigwallsolutions" />
      <meta name="twitter:creator" content="@bigwallsolutions" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      {meta.ogImage && <meta name="twitter:image" content={meta.ogImage} />}

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
};

export default SEOHead;