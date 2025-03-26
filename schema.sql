DROP TABLE IF EXISTS invites;

CREATE TABLE invites (
  code TEXT PRIMARY KEY,
  email TEXT UNIQUE,                 -- email is paired later
  name TEXT NOT NULL,                -- guest name
  rsvp_status INTEGER DEFAULT 0,     -- 0 = false, 1 = true
  rsvp_rsvp_total INTEGER DEFAULT 0, -- total RSVPs including guest
  rsvp_additional_guests_allowed INTEGER DEFAULT 0, -- allowed extra guests
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
