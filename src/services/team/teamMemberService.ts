
import { supabase } from '@/integrations/supabase/client';
import { TeamMember } from './types';

export const teamMemberService = {
  async getTeamMembers(departmentFilter?: string): Promise<TeamMember[]> {
    try {
      let query = supabase
        .from('team_members')
        .select('*');
      
      if (departmentFilter && departmentFilter !== 'All Departments') {
        query = query.eq('department', departmentFilter);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      
      // Map database fields to our TeamMember interface
      return (data || []).map(member => ({
        id: member.id,
        name: member.name,
        email: member.email,
        department: member.department || 'Unassigned',
        surveyStatus: member.surveyStatus as 'completed' | 'pending' | 'not_sent',
        lastActive: member.lastActive ? new Date(member.lastActive).toLocaleString() : 'Never'
      }));
    } catch (error) {
      console.error('Error fetching team members:', error);
      return [];
    }
  },
  
  async uploadTeamMembers(teamMembers: Omit<TeamMember, 'id' | 'lastActive'>[]): Promise<{success: boolean, count: number, error?: string}> {
    try {
      console.log(`Uploading ${teamMembers.length} team members to database`);
      
      // Format for database insertion
      const membersToInsert = teamMembers.map(member => ({
        name: member.name,
        email: member.email,
        department: member.department,
        surveyStatus: member.surveyStatus || 'not_sent'
      }));
      
      const { data, error } = await supabase
        .from('team_members')
        .upsert(membersToInsert, { 
          onConflict: 'email',
          ignoreDuplicates: false 
        });
      
      if (error) throw error;
      
      console.log(`Successfully uploaded ${membersToInsert.length} team members`);
      return {
        success: true,
        count: membersToInsert.length
      };
    } catch (error: any) {
      console.error('Error uploading team members:', error);
      return {
        success: false,
        count: 0,
        error: error.message || 'Failed to upload team members'
      };
    }
  },
  
  async sendReminders(memberIds: string[]): Promise<{success: boolean, count: number, error?: string}> {
    try {
      // Get member data for emails
      const { data: members, error: fetchError } = await supabase
        .from('team_members')
        .select('id, name, email')
        .in('id', memberIds);
      
      if (fetchError) throw fetchError;
      
      // Update status to pending
      const { error: updateError } = await supabase
        .from('team_members')
        .update({ surveyStatus: 'pending' })
        .in('id', memberIds);
      
      if (updateError) throw updateError;
      
      // Here we would normally call an edge function to send emails
      // For now, we'll just update the status and return success
      
      return {
        success: true,
        count: members?.length || 0
      };
    } catch (error: any) {
      console.error('Error sending reminders:', error);
      return {
        success: false,
        count: 0,
        error: error.message || 'Failed to send reminders'
      };
    }
  }
};
