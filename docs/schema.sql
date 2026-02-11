-- ================================
-- DreamTrips Honeymoon — Supabase Schema
-- ================================

-- IMPORTANT:
-- We do NOT create a users table.
-- Supabase Auth provides: auth.users

-- ================================
-- Destinations Table
-- ================================
CREATE TABLE public.destinations (
    destination_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    climate VARCHAR(20) CHECK (climate IN ('tropical','mild','cold')),
    activity VARCHAR(20) CHECK (activity IN ('relaxation','adventure','culture')),
    description TEXT
);

-- ================================
-- Itineraries Table
-- ================================
CREATE TABLE public.itineraries (
    itinerary_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    title VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- Itinerary Items Table
-- ================================
CREATE TABLE public.itinerary_items (
    item_id SERIAL PRIMARY KEY,
    itinerary_id INT NOT NULL REFERENCES public.itineraries(itinerary_id) ON DELETE CASCADE,
    description VARCHAR(255) NOT NULL
);

-- ================================
-- Reviews Table
-- ================================
CREATE TABLE public.reviews (
    review_id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    rating INT CHECK (rating BETWEEN 1 AND 5),
    review_text TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ================================
-- Optional: Seed destinations
-- ================================
INSERT INTO public.destinations (name, climate, activity, description) VALUES
('Maldives', 'tropical', 'relaxation', 'Overwater villas and turquoise lagoons.'),
('Bali', 'tropical', 'adventure', 'Waterfalls, volcano hikes, and vibrant culture.'),
('Kyoto', 'mild', 'culture', 'Temples, gardens, and traditional charm.'),
('Iceland', 'cold', 'relaxation', 'Hot springs and breathtaking landscapes.'),
('Seychelles', 'tropical', 'relaxation', 'Beaches, nature, and romance.');
