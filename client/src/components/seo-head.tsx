import { useEffect } from 'react';

interface SEOHeadProps {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  structuredData?: Record<string, any>;
}

export default function SEOHead({
  title = "UCL EdTech Labs — Evidence-driven EdTech Accelerator",
  description = "Evidence-driven accelerator programme for AI-first education startups at University College London.",
  ogTitle,
  ogDescription,
  twitterTitle,
  twitterDescription,
  structuredData
}: SEOHeadProps) {
  useEffect(() => {
    // Update document title
    document.title = title;
    
    // Update meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', description);
    
    // Update Open Graph tags
    const ogTags = [
      { property: 'og:title', content: ogTitle || title },
      { property: 'og:description', content: ogDescription || description },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: window.location.href },
      { property: 'og:image', content: 'https://ucledtechlabs.com/og-image.jpg' }
    ];
    
    ogTags.forEach(tag => {
      let element = document.querySelector(`meta[property="${tag.property}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('property', tag.property);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });
    
    // Update Twitter tags
    const twitterTags = [
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: twitterTitle || title },
      { name: 'twitter:description', content: twitterDescription || description },
      { name: 'twitter:image', content: 'https://ucledtechlabs.com/og-image.jpg' }
    ];
    
    twitterTags.forEach(tag => {
      let element = document.querySelector(`meta[name="${tag.name}"]`);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute('name', tag.name);
        document.head.appendChild(element);
      }
      element.setAttribute('content', tag.content);
    });
    
    // Add structured data if provided
    if (structuredData) {
      let scriptElement = document.querySelector('script[type="application/ld+json"]');
      if (scriptElement) {
        scriptElement.remove();
      }
      
      scriptElement = document.createElement('script');
      scriptElement.type = 'application/ld+json';
      scriptElement.innerHTML = JSON.stringify(structuredData);
      document.head.appendChild(scriptElement);
    }
  }, [title, description, ogTitle, ogDescription, twitterTitle, twitterDescription, structuredData]);

  return null;
}