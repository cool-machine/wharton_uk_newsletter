import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { User } from '@supabase/supabase-js';

export interface NewsletterTemplate {
  id?: string;
  name: string;
  content: any;
  is_template: boolean;
  last_modified?: string;
  created_at?: string;
}

export const useNewsletterStorage = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    return { data, error };
  };

  const signUp = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    return { data, error };
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    return { error };
  };

  const saveTemplate = async (template: NewsletterTemplate) => {
    if (!user) throw new Error('User not authenticated');

    const templateData = {
      user_id: user.id,
      name: template.name,
      content: template.content,
      is_template: template.is_template,
    };

    if (template.id) {
      // Update existing template
      const { data, error } = await supabase
        .from('newsletter_drafts')
        .update(templateData)
        .eq('id', template.id)
        .eq('user_id', user.id)
        .select()
        .single();
      
      return { data, error };
    } else {
      // Create new template
      const { data, error } = await supabase
        .from('newsletter_drafts')
        .insert(templateData)
        .select()
        .single();
      
      return { data, error };
    }
  };

  const loadTemplates = async () => {
    if (!user) return { data: [], error: null };

    const { data, error } = await supabase
      .from('newsletter_drafts')
      .select('*')
      .eq('user_id', user.id)
      .order('last_modified', { ascending: false });

    return { data: data || [], error };
  };

  const deleteTemplate = async (id: string) => {
    if (!user) throw new Error('User not authenticated');

    const { error } = await supabase
      .from('newsletter_drafts')
      .delete()
      .eq('id', id)
      .eq('user_id', user.id);

    return { error };
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    saveTemplate,
    loadTemplates,
    deleteTemplate,
  };
};