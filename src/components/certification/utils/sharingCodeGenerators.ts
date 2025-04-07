
/**
 * Utility functions for generating certification sharing codes
 */

/**
 * Generates HTML embed code for certification badge
 */
export const generateHtmlCode = (
  companyName: string,
  tier: string,
  score: number,
  issueDate?: string,
  validUntil?: string,
  badgeSize = 'standard',
  customCta = ''
): string => {
  const baseUrl = 'https://pulseplace.ai/certification/verify';
  const params = new URLSearchParams({
    company: companyName,
    tier: tier,
    score: score.toString(),
    issued: issueDate || '',
    valid: validUntil || '',
    style: badgeSize,
    cta: customCta || ''
  });
  
  return `<!-- PulsePlace Certification Badge -->
<script src="https://cdn.pulseplace.ai/badge.js" defer></script>
<div class="pulseplace-badge" data-badge-url="${baseUrl}?${params.toString()}"></div>
<!-- End PulsePlace Badge -->`;
};

/**
 * Generates Notion embed URL for certification badge
 */
export const generateNotionCode = (
  companyName: string,
  tier: string,
  score: number,
  issueDate?: string,
  validUntil?: string,
  badgeSize = 'standard',
  customCta = ''
): string => {
  const baseUrl = 'https://pulseplace.ai/certification/embed';
  const params = new URLSearchParams({
    company: companyName,
    tier: tier,
    score: score.toString(),
    issued: issueDate || '',
    valid: validUntil || '',
    style: 'notion',
    cta: customCta || ''
  });
  
  return `${baseUrl}?${params.toString()}`;
};

/**
 * Generates LinkedIn post text for certification announcement
 */
export const generateLinkedInText = (companyName: string, score: number): string => {
  return `We're proud to announce that ${companyName} has been officially certified by PulsePlace with a PulseScore™ of ${score}/100! 

This certification reflects our commitment to creating a positive workplace environment where employees can thrive. 

Learn more about what makes us a great place to work: https://pulseplace.ai/certification/${encodeURIComponent(companyName)}

#PulseCertified #WorkplaceCulture #EmployeeExperience`;
};

/**
 * Generates Twitter/X post text for certification announcement
 */
export const generateTwitterText = (companyName: string, score: number): string => {
  return `🎉 ${companyName} is now Pulse Certified™ with a score of ${score}/100! 

We're committed to creating a workplace where people thrive.

Verify our certification: https://pulseplace.ai/c/${encodeURIComponent(companyName)}

#PulseCertified #WorkplaceCulture`;
};
