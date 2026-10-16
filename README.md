# WatanCraft

An English-language, responsive React + TypeScript website for WatanCraft. Dark emerald visual design, real player screenshots, two season galleries, accessible fullscreen viewer, world downloads, community recognition, team profiles, rules, and joining instructions.

## Develop and deploy

- `npm ci`
- `npm run dev`
- `npm run build` — type-checks and builds `dist`, preserving the custom domain and legacy `/season/1` and `/season/2` links through the Pages fallback.
- `npm run test:discord`
- `npm run deploy` — publishes the build to the existing `gh-pages` branch. This changes the live website.

The existing `watancraft.fun` custom domain uses root-relative assets. For hosting beneath a repository subpath, change the Vite base and routing before deployment.

## Content

- `src/App.tsx`: English copy, links, current team, and interactions.
- `src/App.css`, `src/index.css`: responsive styles.
- `src/gallery.json`: curated galleries (12 Season 1 and 23 Season 2 images).
- `public/gallery`: compressed WebP display images and thumbnails from the two supplied archives. The original archives are unchanged. Not every uploaded screenshot is published; the Season 1 archive also contains desktop/interface captures and repeated views.
- Existing Season 1 world and full gallery download URLs are preserved.

## Discord avatars — required setup

This version requests `/staff` on the existing Worker and keeps the existing photos as fallbacks if Discord is unavailable. The five staff Discord user IDs supplied by the owner are configured in `server/discord-worker.mjs`. Ali is now displayed as MompAli (Senior Admin). **Live avatars will not activate until the Worker is deployed with its bot token and guild ID.** Identity is matched by Discord ID, never guessed from display names.

1. Deploy `server/discord-worker.mjs` to the existing `purple-rice-956f.mozamelsaber.workers.dev` Cloudflare Worker. The existing Worker source is not in this repository; review and preserve any unrelated routes before replacing it.
2. Set the Worker secret `DISCORD_BOT_TOKEN` to the bot token. Never place a bot token in the frontend or commit it.
3. Set `DISCORD_GUILD_ID` to the Discord server ID.
4. Staff IDs are already configured (see table below). No `STAFF_IDS` environment variable is needed. If an old `STAFF_IDS` variable exists, remove it to use the configured defaults, or update it with the exact keys shown below.
5. Enable the bot's Server Members Intent for the Season 1 role-member list. The bot must belong to the guild.
6. Verify `/staff` and `/1470843290307006588` return HTTP 200. Check the deployed site's avatars and hall of fame.

The Worker keeps the existing role endpoint, scans all guild member pages, preserves the prior hidden-user list, prefers server-specific avatars, falls back to account/default avatars, and caches successful responses for five minutes. Only public display fields are returned. Allowlisted browser origins are in `server/discord-worker.mjs`.

Discord references: https://docs.discord.com/developers/resources/guild and https://docs.discord.com/developers/reference#image-formatting

## Verification limits

Production build, type checking, gallery asset validation, and mocked Discord-worker tests can run locally. Live Discord integration requires the configuration above. Browser visual QA and live endpoint verification must be performed in a permitted browser environment before publishing.

### Verified staff mapping

| Display name | Discord user ID |
| --- | --- |
| TuraChi | 1175892534812221454 |
| Zako | 868364926002036776 |
| MompAli | 1421757876048756858 |
| MrRubik | 1220254727862747144 |
| Madisa | 1530227842816806973 |
