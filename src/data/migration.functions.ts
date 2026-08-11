import { createServerFn } from "@tanstack/react-start";
import { supabaseAdmin } from "@/integrations/supabase/client.server";
import { CARDS } from "./cards";
import homeData from "../data/home.json";
import ratingData from "../data/rating.json";
import { BLOG_POSTS } from "./blog/index";
import { COUNTRIES } from "./countries/index";

export const migrateData = createServerFn({ method: "POST" })
  .handler(async () => {
    console.log("Starting migration...");

    // 1. Cards
    for (const card of CARDS) {
      const { error } = await supabaseAdmin.from("cards").upsert({
        slug: card.slug,
        on_main: card["on-main"] || 0,
        apply_url: card.applyUrl,
        rank: card.rank,
        name: card.name,
        geo: card.geo,
        color: card.color,
        score: card.score,
        reviews: card.reviews,
        issue_rub: card.issueRub,
        monthly_rub: card.monthlyRub,
        topup: card.topup,
        topup_fee: card.topupFee,
        fx: card.fx,
        tx_fee_usd: card.txFeeUsd,
        term: card.term,
        term_short: card.termShort,
        kyc: card.kyc,
        applepay: card.applepay,
        three_ds: card.threeDs ?? true,
        currencies: card.cur,
        categories: card.cats,
        services: card.services,
        bonus: card.bonus,
        display_json: card.display || {},
        detail_json: card.detail || {},
      }, { onConflict: 'slug' });
      if (error) console.error(`Error migrating card ${card.slug}:`, error);
    }

    // 2. Blog Posts
    for (const post of BLOG_POSTS) {
      const { error } = await supabaseAdmin.from("blog_posts").upsert({
        slug: post.slug,
        published: post.published,
        rank: post.rank,
        hero_variant: post.heroVariant,
        gradient: post.gradient,
        tag: post.tag,
        publish_date: post.date, // Note: needs conversion if not YYYY-MM-DD
        read_time: post.readTime,
        title: post.title,
        excerpt: post.excerpt,
        intro: post.intro,
        source_url: post.sourceUrl,
        sections_json: post.sections,
      }, { onConflict: 'slug' });
      if (error) console.error(`Error migrating post ${post.slug}:`, error);
    }

    // 3. Countries
    for (const country of COUNTRIES) {
      const { error } = await supabaseAdmin.from("countries").upsert({
        slug: country.slug,
        published: country.published,
        rank: country.rank,
        gradient: country.gradient,
        flag: country.flag,
        category: country.cat,
        title: country.title,
        list_text: country.list,
        count_text: country.count,
        pill_text: country.pill,
        quick_facts: country.quickFacts,
        card_note: country.cardNote,
        hero_title: country.heroTitle,
        summary: country.summary,
        sections_json: country.sections,
        tips: country.tips,
        faq_json: country.faq,
      }, { onConflict: 'slug' });
      if (error) console.error(`Error migrating country ${country.slug}:`, error);
    }

    // 4. Site Settings
    await supabaseAdmin.from("site_settings").upsert({
      key: "home",
      value_json: homeData,
    });
    await supabaseAdmin.from("site_settings").upsert({
      key: "rating",
      value_json: ratingData,
    });

    return { success: true };
  });
