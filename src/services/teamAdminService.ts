
// This file now serves as a facade that re-exports all team services
import { teamMemberService } from './team/teamMemberService';
import { statsService } from './team/statsService';
import { exportService } from './team/exportService';
import { certificationService } from './team/certificationService';
import { surveyService } from './team/surveyService';
export type { TeamMember, SummaryStats, ProcessedSurveyResponse } from './team/types';

// Consolidate all service methods into a single exported object
export const teamAdminService = {
  // Team member management
  getTeamMembers: teamMemberService.getTeamMembers,
  uploadTeamMembers: teamMemberService.uploadTeamMembers,
  sendReminders: teamMemberService.sendReminders,
  
  // Statistics and analytics
  getSummaryStats: statsService.getSummaryStats,
  
  // Export functionality
  exportTeamDataCSV: exportService.exportTeamDataCSV,
  exportToPDF: exportService.exportToPDF,
  
  // Certification
  generateCertification: certificationService.generateCertification,
  sendCertificationEmail: certificationService.sendCertificationEmail,
  generateDepartmentInsights: certificationService.generateDepartmentInsights,
  
  // Survey processing
  processSurveyResponse: surveyService.processSurveyResponse
};
