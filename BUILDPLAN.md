<!--
# FYND PAYMENTS CAPABILITY DASHBOARD BUILD PLAN

## SECTION A: CODEBASE AUDIT

Read/checked in the requested order:

1. data/capabilities.json ❌ Missing — source-of-truth capability data does not exist at the project root. I attempted to open it first and confirmed the `data/` directory is absent.
2. lib/types.ts ❌ Missing — no shared type system exists yet.
3. lib/utils.ts ❌ Missing — no status label/color rendering helpers exist yet.
4. lib/useCapabilities.ts ❌ Missing — no fetch/localStorage mutation hook exists yet.
5. lib/export.ts ❌ Missing — no JSON download helper exists yet.
6. app/layout.tsx ❌ Missing — no Next.js App Router shell exists yet.
7. app/page.tsx ❌ Missing — merchant entry point does not exist.
8. app/admin/layout.tsx ❌ Missing — no current auth gate exists in this checkout. The requested client-side localStorage gate is therefore absent, but the planned build will still implement the replacement cookie/middleware gate.
9. app/admin/page.tsx ❌ Missing — admin config page does not exist.
10. components/merchant/CapabilityHero.tsx ❌ Missing — merchant hero component does not exist.
11. components/merchant/ChannelTabs.tsx ❌ Missing — channel tab component does not exist.
12. components/merchant/CapabilitySection.tsx ❌ Missing — capability section component does not exist.
13. components/merchant/CapabilityCard.tsx ❌ Missing — capability card component does not exist.
14. components/merchant/StatusLegend.tsx ❌ Missing — merchant legend component does not exist.
15. components/admin/AdminHeader.tsx ❌ Missing — admin header component does not exist.
16. components/admin/AdminFilterBar.tsx ❌ Missing — admin filter component does not exist.
17. components/admin/CapabilityTable.tsx ❌ Missing — admin table and drag/drop surface do not exist.
18. components/admin/TableCategoryRow.tsx ❌ Missing — category row component does not exist.
19. components/admin/TableCapabilityRow.tsx ❌ Missing — capability row and inline editing do not exist.
20. components/admin/StatusSelect.tsx ❌ Missing — status select component does not exist.
21. components/admin/AddCapabilityModal.tsx ❌ Missing — add-capability dialog and icon picker do not exist.
22. components/admin/ExportBar.tsx ❌ Missing — export/reset controls do not exist.
23. components/admin/DiffSummary.tsx ❌ Missing — diff display does not exist.
24. tailwind.config.ts ❌ Missing — Tailwind config does not exist.
25. next.config.js ❌ Missing — Next config does not exist.
26. vercel.json ❌ Missing — Vercel config does not exist.
27. .env.local.example ❌ Missing — environment variable example file does not exist.

Additional context discovered:
- package.json 🔧 Needs work — root package exists but is not a Next.js app. It has only `start` and `test` scripts and no React/Next/Tailwind/lucide/dnd-kit dependencies.
- package-lock.json 🔧 Needs work — existing lockfile is minimal and will need dependency resolution after package.json is updated.
- app/globals.css ❌ Missing — needed for Tailwind and global UI rules.
- postcss.config.js ❌ Missing — needed by Tailwind.
- tsconfig.json ❌ Missing — needed by TypeScript/Next.
- next-env.d.ts ❌ Missing — normally generated/maintained by Next.
- app/api/capabilities/route.ts ❌ Missing — needed so client code can fetch the committed JSON while keeping `data/capabilities.json` as source of truth.
- components/ui/tooltip.tsx ❌ Missing — needed for merchant partial/wip notes using a shadcn-style Tooltip primitive.

## SECTION B: MERCHANT VIEW — WHAT NEEDS TO BE BUILT

Because `data/capabilities.json` is missing, the first data task is to create it from the explicit task spec. The counts below are the target source-of-truth dataset that will drive the merchant and admin views.

### B1. Categories

Target categories: 4.

| ID | Name | showOnMerchantView |
| --- | --- | --- |
| methods | Payment methods | true |
| checkout | Checkout experience | true |
| post-payment | Post-payment operations | true |
| gateways | Payment gateways | true |

### B2. Capabilities

Target total capabilities: 21.
Merchant-visible capabilities: 19 (`showOnMerchantView: true` and `internalOnly !== true`).
Internal-only capabilities: 2.

Internal-only capabilities that must never appear on the merchant page:
- Webhooks (`id: "webhooks"`)
- Settlement reports (`id: "settlement-reports"`)

### B3. Channel Status Summary

Counts are for the 19 merchant-visible capabilities.

| Channel | Supported | Partial or WIP | Planned | Not-supported or N/A |
| --- | ---: | ---: | ---: | ---: |
| Online store (`storefront`) | 16 | 1 | 0 | 2 |
| Store OS / POS (`storeOS`) | 5 | 2 | 0 | 12 |
| Agentic checkout (`agenticCheckout`) | 3 | 3 | 2 | 11 |

### B4. Merchant Tooltip Notes

The target data should expose these notes on partial/wip merchant cards:

- UPI — Store OS — "QR scan only — intent, collect, and autopay flows are not available in Store OS."
- Cards — Agentic checkout — "Via payment link redirect — embedded card entry is not available in Agentic checkout."
- International payments — Online store — "Gateway-gated — availability depends on configured payment gateway and merchant enablement."
- Checkout extensions — Agentic checkout — "COD availability field only — full extensions not supported"
- Customer verification — Store OS — "Counter staff can attach customer details, but online checkout identity flows are not used."
- Refunds — Agentic checkout — "Payment-link payments can be refunded through Razorpay; conversational refund management is not built yet."

### B5. Channel Merchant Meaning

Online store: This is the richest channel. It supports the full payments stack: UPI, cards, net banking, wallets, COD, COD surcharge, EMI/pay later, international payments, checkout extensions, saved instruments, payment links, refunds, and all listed online gateways.

Store OS / POS: This is focused on in-store counter collection. Merchants should understand that cards, cash, UPI QR, and split tender are available, while online-only methods such as wallets, net banking, EMI, and COD are not applicable.

Agentic checkout: This is the newest and most constrained channel. Merchants should understand that payment links work today, cards are available through link redirect, and UPI/wallets are on the roadmap.

### B6. Merchant View Gaps

Existing implementation gaps are total because the merchant files are missing:
- No merchant page entry point.
- No data loading from capabilities source of truth.
- No active channel state.
- No channel tabs.
- No channel-specific subtext.
- No hero copy.
- No merchant visibility filtering.
- No suppression of internal-only capabilities.
- No method-only rendering rule for `na`.
- No rendering of `wip` as merchant-safe "Available with conditions".
- No icon map.
- No status-specific icon containers.
- No supported/partial/planned/not-supported/na status rendering.
- No tooltip behavior for partial/wip notes.
- No muted not-supported styling.
- No violet "Soon" pill for planned.
- No category headers with descriptions.
- No responsive capability grid.
- No bottom status legend.
- No mobile single-column layout.
- No guarantee that "WIP", "webhooks", or "settlement-reports" stay off merchant-facing UI.

## SECTION C: AUTH DECISION — ADMIN PANEL

There is no `app/admin/layout.tsx` in this checkout, so the previously described localStorage gate is not present here. If it existed, these would be its weaknesses:

- Password exposed to client bundle: yes, any client-side hardcoded password or `NEXT_PUBLIC_*` password would be inspectable.
- Access by clearing localStorage: clearing localStorage would usually log a user out, not grant access, but localStorage-based gates are still client-controlled and can be bypassed by modifying client state.
- Session persistent across browser tabs: localStorage is shared across tabs, so persistence would work, but without server verification.
- Brute-force resistance: client-side gates do not meaningfully prevent brute-force or scripted attempts.

CHOSEN APPROACH: Next.js Middleware + HttpOnly Cookie + HMAC Session Token

Rationale:
- Password comparison happens in `middleware.ts`/server-side auth flow, never in the client bundle.
- On successful login, set an `httpOnly`, `sameSite: "strict"`, `path: "/admin"` cookie containing an HMAC-signed session token signed with `ADMIN_SESSION_SECRET`.
- Middleware verifies the cookie on every `/admin/*` request before rendering protected admin pages.
- No JWT library needed. Use Node's built-in `crypto.createHmac("sha256", secret)`.
- Session expires after 8 hours (`maxAge: 60 * 60 * 8`).
- Brute-force mitigation: add a 1-second artificial delay on wrong username/password.
- No per-user accounts. One universal username + password credential.
- Credentials are set via `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
- Session secret is set via `ADMIN_SESSION_SECRET` and should be a random 32+ character value.

Files to create/modify for auth:
- middleware.ts — intercept `/admin/*`, allow `/admin/login`, validate cookie, redirect unauthenticated users.
- app/admin/login/page.tsx — login form with username/password and POST to API route.
- app/api/admin/login/route.ts — validate credentials, set cookie, return redirect target.
- app/api/admin/logout/route.ts — clear cookie and redirect to login.
- app/admin/layout.tsx — no localStorage gate; render server shell for protected admin pages.
- .env.local.example — add `ADMIN_USERNAME`, `ADMIN_PASSWORD`, `ADMIN_SESSION_SECRET`, `NEXT_PUBLIC_BASE_URL`.

## SECTION D: COMPLETE BUILD TASK LIST

AUTH
1. [NEW FILE] middleware.ts — cookie validation on `/admin/*`, `/admin/login` bypass, `from` preservation.
2. [NEW FILE] app/api/admin/login/route.ts — credential check, 1-second invalid-login delay, HMAC token, cookie set.
3. [NEW FILE] app/api/admin/logout/route.ts — clear admin cookie and redirect to login.
4. [NEW FILE] app/admin/login/page.tsx — centered login UI with loading/error states.
5. [NEW FILE] app/admin/layout.tsx — server admin shell; no localStorage gate; sign-out form.
6. [NEW FILE] .env.local.example — document admin credentials/session/base-url env vars.

MERCHANT VIEW
7. [NEW FILE] data/capabilities.json — source-of-truth categories/capabilities/channel statuses/notes.
8. [NEW FILE] app/layout.tsx — root metadata and global app shell.
9. [NEW FILE] app/page.tsx — merchant page entry with channel state and data loading.
10. [NEW FILE] components/merchant/CapabilityHero.tsx — compact merchant hero with final copy.
11. [NEW FILE] components/merchant/ChannelTabs.tsx — three channel tabs with labels/icons.
12. [NEW FILE] components/merchant/CapabilitySection.tsx — category header and responsive grid.
13. [NEW FILE] components/merchant/CapabilityCard.tsx — icon map, status styling, planned pill, partial/wip tooltip.
14. [NEW FILE] components/merchant/StatusLegend.tsx — bottom legend with four merchant statuses.
15. [NEW FILE] components/ui/tooltip.tsx — shadcn-style Radix tooltip wrapper.

ADMIN VIEW
16. [NEW FILE] app/admin/page.tsx — admin config page using `useCapabilities`.
17. [NEW FILE] components/admin/AdminHeader.tsx — title, dirty state, unsaved count badge.
18. [NEW FILE] components/admin/AdminFilterBar.tsx — search, channel filter, gaps-only toggle.
19. [NEW FILE] components/admin/CapabilityTable.tsx — grouped table with dnd-kit drag/drop.
20. [NEW FILE] components/admin/TableCategoryRow.tsx — category header row.
21. [NEW FILE] components/admin/TableCapabilityRow.tsx — capability rows, drag handle, inline name/description editing.
22. [NEW FILE] components/admin/StatusSelect.tsx — controlled status select with live color class.
23. [NEW FILE] components/admin/AddCapabilityModal.tsx — add modal with all icon tiles and selected ring.
24. [NEW FILE] components/admin/ExportBar.tsx — export/reset controls and diff slot.
25. [NEW FILE] components/admin/DiffSummary.tsx — accurate summary from current vs committed JSON.

DATA/LIB
26. [NEW FILE] lib/types.ts — SupportStatus, ChannelKey, ChannelSupport, Capability, CapabilityCategory, CapabilitiesData, diff types.
27. [NEW FILE] lib/utils.ts — status dot colors, merchant/admin labels and colors, channel labels/descriptions.
28. [NEW FILE] lib/export.ts — Blob-based `downloadJSON`.
29. [NEW FILE] lib/useCapabilities.ts — fetch committed data, localStorage fallback, mutations, deep diff, export, reset.
30. [NEW FILE] app/api/capabilities/route.ts — serve committed `data/capabilities.json` to client hook.

CONFIG
31. [MODIFY] package.json — turn root package into a Next-capable app while preserving existing metadata where possible.
32. [NEW FILE] tsconfig.json — TypeScript config with `@/*` path alias.
33. [NEW FILE] next-env.d.ts — Next TypeScript declarations.
34. [NEW FILE] app/globals.css — Tailwind directives and global styles.
35. [NEW FILE] postcss.config.js — Tailwind PostCSS setup.
36. [NEW FILE] tailwind.config.ts — Tailwind content/theme config.
37. [NEW FILE] next.config.js — Next config.
38. [NEW FILE] vercel.json — Vercel build config.
39. [MODIFY] package-lock.json — update dependency lockfile after package changes, if install can run.

## SECTION E: MERCHANT VIEW DESIGN DECISIONS

### E1. Page Structure
Top to bottom:
1. Root app background.
2. Compact hero with eyebrow, headline, subtext, and small stats.
3. Bordered dashboard surface.
4. Channel tabs.
5. Channel-specific one-line subtext.
6. Capability sections in source data order.
7. Bottom status legend.

### E2. Hero Copy
Eyebrow: "Fynd Payments"
Headline: "Capability dashboard"
Subtext: "See which payment methods, checkout features, post-payment flows, and gateways are available across Online store, Store OS, and Agentic checkout."

### E3. Channel Tabs
Labels/icons/default:
- Online store — `MonitorSmartphone` — default active tab (`storefront`)
- Store OS — `Store` — `storeOS`
- Agentic — `Bot` — `agenticCheckout`

### E4. Capability Card Layout
Each card renders:
- Left icon container using the capability `icon` key and status-specific colors.
- Middle content with name and description.
- Right status indicator: dot, tooltip dot, or "Soon" pill.
- No admin/internal labels on merchant cards.

### E5. Not-supported Styling
Not-supported cards render with white card background, zinc icon container, zinc dot, muted name, and lower-contrast description. They remain visible to build merchant trust.

### E6. Partial Communication
Partial and wip both render as amber. Merchant label is "Available with conditions". If the channel support has `note`, the amber dot is wrapped in a tooltip whose content is exactly the note text.

### E7. Planned Communication
Planned renders as a violet "Soon" pill instead of a dot. The card remains readable, but less final than supported capabilities.

### E8. N/A Handling
`na` cards render only in the Methods category because they explain why channel-specific payment methods do not apply. In all other categories, `na` cards are hidden.

### E9. Internal-only Suppression
Merchant sections filter with `showOnMerchantView === true && internalOnly !== true`. `webhooks` and `settlement-reports` therefore never render on merchant pages even if a future admin edit changes channel statuses.

### E10. StatusLegend Placement
The legend sits at the bottom of the dashboard surface. It explains exactly four merchant statuses: Available, Available with conditions, Coming soon, Not available. It does not include WIP or N/A.

### E11. Mobile Rules
Below 640px:
- Capability grid becomes one column.
- Hero text and stat row stack naturally.
- Tabs remain horizontal but can scroll without text overflow.
- Cards keep fixed icon/status dimensions to prevent layout shift.

### E12. Merchant Actions
The page is explore-only in this build. There is no contact CTA or settings deep link because no destination exists in the current codebase. The admin panel is the configuration surface.

## SECTION F: OPEN QUESTIONS YOU RESOLVED

- The requested source files were absent. Decision: create the dashboard app at the project root using the exact paths in the task, and document the missing state in this plan before implementation.
- `capabilities.json` was missing. Decision: create a 4-category, 21-capability dataset from the task's explicit capability summary and final-check requirements.
- `webhooks` and `settlement-reports` are named as internal-only. Decision: include them in `data/capabilities.json` for admin completeness, set `internalOnly: true`, set `showOnMerchantView: false`, and filter them out of merchant rendering.
- The task says there are 18 icon tiles but lists 19 icon keys. Decision: implement every listed icon key so no provided icon is omitted.
- The task mandates no merchant-facing "WIP". Decision: support `wip` in types/admin labels, but map it to the same merchant rendering as `partial`.
- `na` rendering could be noisy outside methods. Decision: implement the exact requested rule: show `na` in Methods only, hide it elsewhere.
- Login is under `/admin/login`, which normally shares `app/admin/layout.tsx`. Decision: middleware will pass the pathname as a request header so the server layout can render the login page without the protected admin top bar.
-->
