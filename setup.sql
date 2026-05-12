-- =============================================
-- PawDocs — Supabase Database Setup
-- Run this in your Supabase SQL Editor
-- =============================================

CREATE TABLE IF NOT EXISTS dogs (
  id                      UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at              TIMESTAMPTZ DEFAULT NOW(),
  updated_at              TIMESTAMPTZ DEFAULT NOW(),

  -- Identity
  name                    TEXT NOT NULL,
  id_tag                  TEXT,
  breed                   TEXT,
  mix                     TEXT,
  sex                     TEXT,
  age_years               INTEGER,
  age_months              INTEGER,
  weight_lbs              NUMERIC(6,2),
  color                   TEXT,
  markings                TEXT,
  microchip               TEXT,

  -- Status
  status                  TEXT DEFAULT 'available',
  -- Values: available | adopted | fostered | medical | hold | deceased

  -- Intake
  intake_date             DATE,
  intake_reason           TEXT,
  owner_name              TEXT,
  owner_phone             TEXT,
  owner_email             TEXT,

  -- Veterinary
  vet_name                TEXT,
  vet_phone               TEXT,
  spayed_neutered         TEXT,
  heartworm_test_date     DATE,
  heartworm_result        TEXT,
  flea_tick_treatment     TEXT,
  flea_tick_date          DATE,

  -- Vaccinations
  vaccine_rabies_date     DATE,
  vaccine_rabies_expiry   DATE,
  vaccine_distemper_date  DATE,
  vaccine_distemper_expiry DATE,
  vaccine_bordetella_date DATE,
  vaccine_bordetella_expiry DATE,
  vaccine_leptospira_date DATE,
  vaccine_leptospira_expiry DATE,

  -- Medical
  medications             TEXT,
  medical_notes           TEXT,

  -- Diet
  diet                    TEXT,
  feeding_schedule        TEXT,
  allergies               TEXT,

  -- Behavior
  behavior_notes          TEXT,
  training_notes          TEXT,
  good_with_kids          TEXT,
  good_with_dogs          TEXT,
  good_with_cats          TEXT,

  -- Adoption/Foster
  adoption_date           DATE,
  adopter_name            TEXT,
  adopter_phone           TEXT,
  adopter_email           TEXT,

  -- General
  notes                   TEXT
);

-- Auto-update updated_at on any row change
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON dogs;
CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON dogs
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Enable Row Level Security (allow all for now — add auth later if needed)
ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow all" ON dogs;
CREATE POLICY "Allow all"
  ON dogs FOR ALL
  USING (true)
  WITH CHECK (true);

-- Helpful indexes
CREATE INDEX IF NOT EXISTS idx_dogs_name   ON dogs (name);
CREATE INDEX IF NOT EXISTS idx_dogs_status ON dogs (status);

-- =============================================
-- Done! Your PawDocs database is ready.
-- =============================================
