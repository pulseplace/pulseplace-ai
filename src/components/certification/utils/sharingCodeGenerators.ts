
import { BadgeStyle } from '@/types/badge.types';
import { PulseScoreTier } from '@/types/scoring.types';

/**
 * Generates HTML embed code for the certification badge
 */
export const generateHtmlCode = (
  companyName: string,
  tier: PulseScoreTier,
  score: number,
  issueDate?: string,
  validUntil?: string,
  badgeStyle: BadgeStyle = 'standard',
  customCta?: string
): string => {
  const baseUrl = 'https://pulseplace.ai/certification/verify';
  const params = new URLSearchParams({
    company: companyName,
    tier: tier,
    score: score.toString(),
    style: badgeStyle,
  });
  
  if (issueDate) params.append('issued', issueDate);
  if (validUntil) params.append('valid', validUntil);
  if (customCta) params.append('cta', customCta);
  
  return `<!-- PulsePlace Certification Badge -->
<script src="https://cdn.pulseplace.ai/badge.js" defer></script>
<div class="pulseplace-badge" data-badge-url="${baseUrl}?${params.toString()}"></div>
<!-- End PulsePlace Badge -->`;
};

/**
 * Generates a LinkedIn post text for sharing certification
 */
export const generateLinkedInText = (companyName: string, score: number): string => {
  return `🎉 Proud to announce that ${companyName} has earned PulsePlace Certification™ with a score of ${score}/100!

This certification validates our commitment to creating a workplace built on trust and transparency.

The PulsePlace assessment evaluated key trust metrics across our organization, and we're thrilled to have received this recognition.

What does this mean for our team members and partners?
• Enhanced workplace satisfaction and engagement
• Better communication and collaboration
• A culture where innovation can thrive

We're committed to maintaining and improving our workplace culture, and this certification is just the beginning of our journey.

#PulseCertified #WorkplaceCulture #EmployeeTrust #OrganizationalExcellence

Learn more about PulsePlace: https://pulseplace.ai`;
};

/**
 * Generates a Twitter post text for sharing certification
 */
export const generateTwitterText = (companyName: string, score: number): string => {
  return `🎉 We're excited to announce that ${companyName} has earned PulsePlace Certification™ with a score of ${score}/100!

This certification recognizes our commitment to creating a trustworthy workplace culture.

#PulseCertified #WorkplaceTrust`;
};

/**
 * Generates a Notion embed URL for the certification badge
 */
export const generateNotionCode = (
  companyName: string,
  tier: PulseScoreTier,
  score: number,
  issueDate?: string,
  validUntil?: string,
  badgeStyle: BadgeStyle = 'standard',
  customCta?: string
): string => {
  const baseUrl = 'https://pulseplace.ai/embed/badge';
  const params = new URLSearchParams({
    company: companyName,
    tier: tier,
    score: score.toString(),
    style: badgeStyle,
  });
  
  if (issueDate) params.append('issued', issueDate);
  if (validUntil) params.append('valid', validUntil);
  if (customCta) params.append('cta', customCta);
  
  return `${baseUrl}?${params.toString()}`;
};
