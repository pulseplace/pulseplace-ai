
import { supabase } from './utils.ts';
import { MailchimpTag } from './types.ts';

// Helper function to process subscription events
export async function processSubscriberOptIn(email: string, isConfirmed: boolean): Promise<void> {
  if (!email) {
    return;
  }

  try {
    console.log(`Processing ${isConfirmed ? 'confirmed' : 'unconfirmed'} opt-in for subscriber: ${email}`);

    // Check if we have a profiles table with this user
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', email)
      .maybeSingle();

    if (profileError) {
      console.error("Error finding user profile:", profileError);
      return;
    }

    if (profileData) {
      // Update the user's profile with the opt-in status
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          confirmed_opt_in: isConfirmed,
          updated_at: new Date().toISOString() 
        })
        .eq('id', profileData.id);

      if (updateError) {
        console.error("Error updating user profile with opt-in status:", updateError);
      } else {
        console.log(`Successfully updated profile with opt-in status (${isConfirmed}) for user: ${email}`);
      }
    } else {
      console.log(`No profile found for email: ${email}, opt-in status won't be stored`);
    }
  } catch (error) {
    console.error("Error processing subscriber opt-in:", error);
  }
}

// Helper function to process tags for a subscriber
export async function processSubscriberTags(email: string, tags?: MailchimpTag[]): Promise<void> {
  if (!tags || tags.length === 0 || !email) {
    return;
  }

  try {
    console.log(`Processing ${tags.length} tags for subscriber: ${email}`);

    // Check if we have a profiles table with this user
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('id, email')
      .eq('email', email)
      .maybeSingle();

    if (profileError) {
      console.error("Error finding user profile:", profileError);
      return;
    }

    if (profileData) {
      // Update the user's profile with the new tags
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ 
          mailchimp_tags: tags.map(tag => tag.name),
          updated_at: new Date().toISOString() 
        })
        .eq('id', profileData.id);

      if (updateError) {
        console.error("Error updating user profile with tags:", updateError);
      } else {
        console.log(`Successfully updated profile with tags for user: ${email}`);
      }
    } else {
      console.log(`No profile found for email: ${email}, tags won't be stored`);
    }
  } catch (error) {
    console.error("Error processing subscriber tags:", error);
  }
}
