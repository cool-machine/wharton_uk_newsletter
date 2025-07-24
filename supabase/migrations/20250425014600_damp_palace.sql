/*
  # Add newsletter drafts and templates storage

  1. New Tables
    - `newsletter_drafts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `name` (text)
      - `content` (jsonb)
      - `last_modified` (timestamptz)
      - `is_template` (boolean)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `newsletter_drafts` table
    - Add policies for authenticated users to:
      - Read their own drafts
      - Create new drafts
      - Update their own drafts
      - Delete their own drafts
*/

CREATE TABLE newsletter_drafts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  name text NOT NULL,
  content jsonb NOT NULL,
  last_modified timestamptz DEFAULT now(),
  is_template boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE newsletter_drafts ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own drafts
CREATE POLICY "Users can read own drafts" 
  ON newsletter_drafts
  FOR SELECT 
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own drafts
CREATE POLICY "Users can create drafts" 
  ON newsletter_drafts
  FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own drafts
CREATE POLICY "Users can update own drafts" 
  ON newsletter_drafts
  FOR UPDATE 
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to delete their own drafts
CREATE POLICY "Users can delete own drafts" 
  ON newsletter_drafts
  FOR DELETE 
  TO authenticated
  USING (auth.uid() = user_id);

-- Function to update last_modified timestamp
CREATE OR REPLACE FUNCTION update_last_modified()
RETURNS TRIGGER AS $$
BEGIN
  NEW.last_modified = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update last_modified
CREATE TRIGGER update_newsletter_draft_timestamp
  BEFORE UPDATE ON newsletter_drafts
  FOR EACH ROW
  EXECUTE FUNCTION update_last_modified();