# VEILCLUB Official Website

GitHub Pages site for VEILCLUB.

## Environments

- Production repository: `veilclub/veilclub.github.io`
- Supabase project: `ilkkjooemtqkquvkdtgk` (VEILCLUB only)
- Supabase URL: `https://ilkkjooemtqkquvkdtgk.supabase.co`
- Source project `izayoiseiten/crystal` and original Supabase must not be modified.

## Deployment

GitHub repository **Settings → Pages → Build and deployment → Deploy from a branch**. Select `main` and `/(root)`.

## Integration safety

This landing page is intentionally static. The Supabase schema is initialized, but backend endpoints, RPC authorization, staff accounts, and public RLS policies are **not yet deployed**. Do not embed Supabase secret/service-role keys or Discord bot tokens into this public repository.

Before activating orders or administration, add authenticated backend endpoints and explicit, reviewed RLS policies; validate inputs, enforce rate limits, and test access as anonymous and authenticated users. No customer data or operating records are copied from the source project.
