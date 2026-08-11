-- Virtual Cards Table
CREATE TABLE public.cards (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    on_main INTEGER DEFAULT 0,
    apply_url TEXT,
    rank INTEGER,
    name TEXT NOT NULL,
    geo TEXT,
    color TEXT,
    score NUMERIC,
    reviews INTEGER,
    issue_rub NUMERIC,
    monthly_rub NUMERIC,
    topup TEXT,
    topup_fee NUMERIC,
    fx NUMERIC,
    tx_fee_usd NUMERIC,
    term TEXT,
    term_short BOOLEAN DEFAULT false,
    kyc TEXT,
    applepay BOOLEAN,
    three_ds BOOLEAN DEFAULT true,
    currencies TEXT[] DEFAULT '{}',
    categories TEXT[] DEFAULT '{}',
    services TEXT[] DEFAULT '{}',
    bonus TEXT,
    display_json JSONB DEFAULT '{}',
    detail_json JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Blog Posts Table
CREATE TABLE public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    published BOOLEAN DEFAULT false,
    rank INTEGER,
    hero_variant TEXT,
    gradient TEXT,
    tag TEXT,
    publish_date DATE,
    read_time TEXT,
    title TEXT NOT NULL,
    excerpt TEXT,
    intro TEXT,
    source_url TEXT,
    sections_json JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Countries Table
CREATE TABLE public.countries (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    published BOOLEAN DEFAULT false,
    rank INTEGER,
    gradient TEXT,
    flag TEXT,
    category TEXT,
    title TEXT NOT NULL,
    list_text TEXT,
    count_text TEXT,
    pill_text TEXT,
    quick_facts JSONB DEFAULT '[]',
    card_note TEXT,
    hero_title TEXT,
    summary TEXT,
    sections_json JSONB DEFAULT '[]',
    tips TEXT[] DEFAULT '{}',
    faq_json JSONB DEFAULT '[]',
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- Site Settings Table (Global Config)
CREATE TABLE public.site_settings (
    key TEXT PRIMARY KEY,
    value_json JSONB NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- RLS & Grants
ALTER TABLE public.cards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.cards TO anon, authenticated;
GRANT ALL ON public.cards TO authenticated;
GRANT ALL ON public.cards TO service_role;

GRANT SELECT ON public.blog_posts TO anon, authenticated;
GRANT ALL ON public.blog_posts TO authenticated;
GRANT ALL ON public.blog_posts TO service_role;

GRANT SELECT ON public.countries TO anon, authenticated;
GRANT ALL ON public.countries TO authenticated;
GRANT ALL ON public.countries TO service_role;

GRANT SELECT ON public.site_settings TO anon, authenticated;
GRANT ALL ON public.site_settings TO authenticated;
GRANT ALL ON public.site_settings TO service_role;

CREATE POLICY "Public Read Cards" ON public.cards FOR SELECT USING (true);
CREATE POLICY "Public Read Blog" ON public.blog_posts FOR SELECT USING (true);
CREATE POLICY "Public Read Countries" ON public.countries FOR SELECT USING (true);
CREATE POLICY "Public Read Settings" ON public.site_settings FOR SELECT USING (true);

CREATE POLICY "Admins can update cards" ON public.cards FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can update blog" ON public.blog_posts FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can update countries" ON public.countries FOR ALL TO authenticated USING (true);
CREATE POLICY "Admins can update settings" ON public.site_settings FOR ALL TO authenticated USING (true);
