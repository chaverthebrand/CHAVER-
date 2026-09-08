# CHAVÉR — Shopify Import & Pre-launch Handoff

This is the operational handoff for the CHAVÉR Foundations Shopify theme. Use it to prepare the theme package, import it into Shopify as a draft, complete the store-specific setup, and decide whether the pre-launch storefront is safe to publish.

> **Current decision:** imported into Shopify as a **draft theme** on 8 September 2026; draft-theme QA is now the next step. The theme is not yet approved for public pre-launch publication.
>
> **Store mode:** PRE-LAUNCH. Ordering remains closed while products, samples, fit, quality, final specifications, and production are being approved. Current storefront messaging points to Q1 2027.
>
> **Reviewed baseline:** `main` at `3b113115c3d0e35c744e141eff2ec096fd8905e4` (7 September 2026).

## 1. Status at handoff

| Area | Status | Handoff note |
| --- | --- | --- |
| Theme file structure | Complete | Required Shopify theme folders and `layout/theme.liquid` are present. |
| JSON and section references | Checked | Theme JSON, section schema JSON, template-to-section references, asset references, and JavaScript syntax passed local static checks on 8 September 2026. |
| Shopify-hosted import | Confirmed | The theme has been imported into Shopify as a draft; preview and Liquid/runtime QA are still pending. |
| Store content and admin data | Pending | Pages, products, policies, domain, email, privacy, and store settings live in Shopify and are not supplied by this repository. |
| Public pre-launch safety | Pending | The storefront removes normal purchase controls, but Shopify inventory and sales-channel settings must also prevent orders. |
| Commerce launch | Not ready by design | Purchasing, final product data, payments, shipping, taxes, and order-flow testing belong to a later commerce-launch pass. |

> **Current next checkpoint:** complete `IMP-02` in the Shopify draft preview by opening the home, collection, product, standard page, search, cart, and 404 templates and confirming that none shows a Liquid error.

### Included in the repository

- Home page
- All-products collection page
- Product template with pre-launch messaging
- Founder Story page template
- Contact page and Shopify contact form
- FAQ page with editable question blocks
- Size Guide page
- Customer Care page
- Search results and empty state
- Cart and empty-cart states
- Branded 404 page
- Newsletter popup using Shopify's customer form
- Desktop and responsive mobile navigation
- Footer navigation and standard Shopify policy URLs
- Theme color settings and announcement-bar text setting
- English default locale
- Storefront-level pre-launch purchase protection

### Deliberately not included or not yet connected

- Final Shopify product records, media, prices, variants, SKUs, barcodes, weights, inventory, SEO fields, or product metafields
- Final legal policies and business/contact/return-address details
- A dedicated Foundations collection link; built-in collection links currently use Shopify's `/collections/all` catalog
- Payment, shipping, tax, market, domain, notification, analytics, consent, or email-marketing configuration
- A normal add-to-cart form, variant picker, cart checkout button, or completed purchase flow
- Blog, article, customer-account, gift-card, and list-collections templates
- An uploaded image logo or favicon; the current storefront logo is text

## 2. Validation already completed

The following repository-only checks passed against the reviewed baseline:

- [x] Required theme directories are present: `assets`, `config`, `layout`, `locales`, `sections`, and `templates`.
- [x] `layout/theme.liquid`, `config/settings_schema.json`, and the core JSON templates are present.
- [x] All JSON files parse successfully.
- [x] Every `{% schema %}` block contains valid JSON.
- [x] Every section referenced by a JSON template exists.
- [x] CSS and JavaScript assets referenced from `theme.liquid` exist.
- [x] `assets/chaver.js` passes JavaScript syntax validation.
- [x] No unresolved `TODO`, `FIXME`, example-domain, or business-detail placeholder was found in storefront source.

These checks do **not** prove that Shopify will accept the ZIP, that Liquid renders correctly with real store data, that forms deliver, or that purchasing is blocked at the Shopify platform level. Those items must be verified in the draft theme.

## 3. Create the Shopify import ZIP

Use the latest approved `main` commit. The ZIP must open directly into the theme folders; do not put the complete theme inside an extra `CHAVER-` parent folder.

Include these folders at the ZIP root:

```text
assets/
config/
layout/
locales/
sections/
templates/
```

Do not include `.git/`, operating-system files, screenshots, or working files. `SHOPIFY_SETUP.md` can remain in GitHub and does not need to be in the import package.

Example from the repository root:

```bash
zip -r CHAVER-Foundations-Prelaunch.zip assets config layout locales sections templates
```

Recommended archive name: `CHAVER-Foundations-Prelaunch-2026-09-08.zip`.

## 4. Import as a draft theme

> **Status:** completed and confirmed on 8 September 2026. Keep the theme unpublished while the remaining checks are completed. The steps below remain the controlled re-import procedure if a new ZIP is uploaded.

1. In Shopify Admin, open **Online Store > Themes**.
2. In **Draft themes**, choose **Import theme > Upload zip file**.
3. Upload the prepared ZIP.
4. Keep the imported theme unpublished.
5. Rename the draft clearly, for example `CHAVÉR Foundations — Prelaunch QA`.
6. Open **Preview** and record the draft preview URL in the completion record at the end of this file.
7. Stop and resolve every Shopify import or Liquid error before continuing.

Do not replace or publish the current live theme until all PRE-01 through PRE-09 go/no-go gates below pass.

## 5. Required Shopify Admin configuration

Complete these items in order. Check a box only after saving the setting and verifying the result in the imported draft theme.

### A. Store identity and core settings

- [ ] Confirm the store name, legal business name, business address, customer-facing email, and phone number where applicable.
- [ ] Confirm store currency, time zone, weight unit, and order-ID format.
- [ ] Confirm the Netherlands and only the intended customer regions are enabled in **Markets**.
- [ ] Review store language. Theme storefront copy is currently English.
- [ ] Add CHAVÉR contact details without exposing a private address unnecessarily; use the correct business/returns address in required legal locations.

### B. Pages and exact template assignments

Create the following pages in **Online Store > Pages**. Keep the exact handles because header, footer, product, and customer-care links are hard-coded to them.

| Page title | Required handle | Theme template | Page content field |
| --- | --- | --- | --- |
| Founder Story | `founder-story` | `page.founder-story` | May stay blank; the current copy is in the theme section. |
| Contact | `contact` | `page.contact` | May stay blank; the form and introduction are in the theme section. |
| FAQ | `faq` | `page.faq` | May stay blank; edit FAQ blocks in the theme editor. |
| Size Guide | `size-guide` | `page.size-guide` | May stay blank; current development measurements are in the theme section. |
| Customer Care | `customer-care` | `page.customer-care` | May stay blank; current guidance is in the theme section. |

- [ ] Every page is created and visible on the Online Store channel.
- [ ] Every handle exactly matches the table.
- [ ] Every page has the matching template assigned.
- [ ] All five page URLs return content instead of a 404.
- [ ] Page titles and search-engine descriptions are reviewed in Shopify.

If a custom template is not available in the page selector while the theme is still a draft, do not create a second template. Verify the uploaded theme first, then assign the existing template during the controlled publication step.

### C. Products and pre-launch order protection

The repository contains display support for these six Foundations products:

1. Signature Heavyweight T-Shirt
2. Signature Longsleeve
3. Signature Crewneck Sweater
4. Signature Heavyweight Hoodie
5. Nylon 5-Panel Cap
6. Premium Crew Socks

For every product that should appear publicly, complete:

- [ ] Final public title and product description
- [ ] Product photography in the intended order, with useful alt text
- [ ] Price only if approved for public display
- [ ] Color and size variants using consistent naming
- [ ] Unique SKU per variant; barcode only when confirmed
- [ ] Weight and customs data before commerce launch
- [ ] Product category, vendor, tags, and search-engine listing
- [ ] Correct Online Store publication status

#### Critical pre-launch inventory rules

The theme currently removes the normal add-to-cart control and cart checkout button. This is a **storefront interface guard, not a Shopify platform lock**. Apply these rules to every visible variant before a public pre-launch:

- [ ] Turn on inventory tracking / **Track quantity**.
- [ ] Set available inventory to `0` at every active location.
- [ ] Turn **Continue selling when out of stock** off.
- [ ] Do not enable pre-orders, subscriptions, accelerated purchase buttons, external Buy Buttons, or sales apps that can bypass the theme.
- [ ] Review publication on Shop, social, marketplace, POS, and other sales channels; keep a product off any channel that should not expose it.
- [ ] Use an incognito session to prove that a direct add-to-cart attempt for every variant is rejected.
- [ ] Confirm no payment can be completed from an old cart, direct cart permalink, Shop channel, or other active channel.

Use **Draft** product status for anything that should not be discoverable. Use **Active + Online Store + zero tracked inventory + no overselling** only when the product should be visible but impossible to order.

### D. Collection behavior

Current header, home, footer, empty states, and 404 links use Shopify's all-products route, normally `/collections/all`.

- [ ] Decide whether `/collections/all` is the intended public Foundations catalog for pre-launch.
- [ ] If yes, verify that only the intended visible CHAVÉR products appear there and in the required order.
- [ ] If a dedicated `foundations` collection is required, treat changing the built-in links as a code change before publication; creating the collection alone will not redirect the current links.
- [ ] Verify the collection title, product order, product cards, media crops, and empty state.

### E. Theme editor settings

Open the imported draft in **Customize** and save the intended values.

| Setting | Current behavior |
| --- | --- |
| Background color | Connected to the storefront. |
| Text color | Connected to the storefront. |
| Accent color | Connected to solid buttons. |
| Announcement-bar text | Connected and editable in the Announcement bar section. |
| Muted text and border colors | Present in the schema but currently not connected to the CSS variables. |
| Brand name, launch label, and brand statement | Present in the schema but storefront copy is currently hard-coded. |
| Instagram and TikTok URLs | Present in the schema but no social links currently render. |

- [ ] Set and visually verify the three connected colors.
- [ ] Confirm the announcement reads `FOUNDATIONS COLLECTION — ARRIVING Q1 2027`, or replace it with the approved message.
- [ ] Do not assume an unwired setting changed the storefront; verify every change in Preview.
- [ ] Confirm the text-only CHAVÉR logo is acceptable for this pre-launch version.

### F. Newsletter and contact delivery

The newsletter popup submits a Shopify customer form with the `newsletter` tag. The contact page submits Shopify's native contact form.

- [ ] Activate Shopify Messaging/Email or the chosen email-marketing integration.
- [ ] Confirm how marketing consent and, if desired, double opt-in are handled for the intended regions.
- [ ] Publish an accurate privacy policy before collecting public newsletter signups.
- [ ] Submit a new email address and confirm a customer record is created with the expected tag and consent state.
- [ ] Confirm the success message and invalid-email error are visible.
- [ ] Confirm the chosen welcome email or automation is triggered exactly once.
- [ ] Set the store sender email in **Settings > Notifications**.
- [ ] Submit the contact form and confirm delivery to that sender inbox, including the correct reply-to address.
- [ ] Test required fields, invalid input, success state, spam handling, and a server-side error state.

### G. Policies, privacy, and legal content

In **Settings > Policies**, complete and publish:

- [ ] Refund / Returns policy
- [ ] Privacy policy
- [ ] Terms of service
- [ ] Shipping policy
- [ ] Contact information and any other policy required for the enabled markets

The footer already targets Shopify's standard URLs:

- `/policies/shipping-policy`
- `/policies/refund-policy`
- `/policies/privacy-policy`
- `/policies/terms-of-service`

Before approval, replace every generated placeholder and verify the legal business identity, contact details, return address, sales regions, delivery estimates, cancellation/return process, refund window, payment timing, taxes/duties, and consumer-law wording. Obtain appropriate legal review for the countries where CHAVÉR will operate.

In **Settings > Customer privacy**:

- [ ] Configure the cookie banner and consent regions.
- [ ] Review data-sharing, marketing, analytics, and installed-app permissions.
- [ ] Verify the privacy-policy link from the banner and footer.
- [ ] Confirm newsletter data collection matches the published privacy explanation.

### H. Domain, email, and access

- [ ] Connect the final CHAVÉR domain and make it primary only after DNS is verified.
- [ ] Confirm the Shopify SSL certificate is active and HTTPS redirects correctly.
- [ ] Configure the customer-facing sender address on the CHAVÉR domain.
- [ ] Authenticate the sender domain with all records Shopify requests, including DKIM/SPF-related CNAME records and a valid DMARC record.
- [ ] Test delivery to at least Gmail and Outlook and check the spam folder.
- [ ] Keep storefront password protection enabled while setup is private. Remove it only for the approved public pre-launch.
- [ ] Enable strong account security and two-step authentication for every Shopify administrator.

### I. SEO, social preview, analytics, and backup

- [ ] Set the home-page title and meta description in Shopify preferences.
- [ ] Review every page, product, and collection search-engine listing.
- [ ] Add descriptive image alt text and confirm there is one clear page heading per template.
- [ ] Confirm the canonical domain after the custom domain is primary.
- [ ] Decide whether analytics and advertising pixels are needed during pre-launch; configure consent before activating them.
- [ ] Verify the native sitemap and that unwanted draft content is not publicly discoverable.
- [ ] Duplicate the configured draft theme before publication and keep the tested ZIP as a rollback copy.

The current layout does not include dedicated Open Graph/Twitter image tags or a favicon setting. Treat branded social sharing and a custom favicon as a separate code enhancement if required for pre-launch.

## 6. Known code constraints to verify before publication

These findings do not prevent ZIP preparation, but they must be accepted or resolved before the public pre-launch decision.

| Priority | Finding | Expected action |
| --- | --- | --- |
| Blocker | Removing buy/checkout buttons does not disable Shopify ordering at platform level. | Apply zero tracked inventory, disable overselling and other sales channels, then pass direct-order negative tests. |
| High | Product/cart `Join for early access` links target the popup by anchor. After a visitor closes the popup, JavaScript stores that state and does not explicitly reopen it from those links. | Test in-browser after closing the popup; fix before publication if the CTA remains hidden. |
| Medium | The desktop footer contains four content groups, while its base grid currently defines three columns. | Verify whether the Legal group wraps unexpectedly; adjust the grid if the four-column layout is intended. |
| Medium | Contact-form server errors are not explicitly rendered in the section. | Force an error case; add a visible error state if Shopify returns one. |
| Medium | The newsletter dialog has basic labeling, but no focus trap, Escape-key close behavior, or focus return. | Complete keyboard and screen-reader QA; improve before publication if dialog navigation is confusing. |
| Operational | Navigation labels, page handles, most copy, Q1 2027 messaging, and the `/collections/all` destination are hard-coded. | Preserve exact handles and record every code change required when the launch plan changes. |
| Operational | Several global theme settings are present but not wired to rendered content or CSS. | Configure only the connected settings or complete the wiring in a later code pass. |

## 7. Draft-theme QA checklist

Test on the Shopify draft preview with realistic product data. Record evidence for failures and retest after every fix.

### Import and rendering

- [x] **IMP-01:** ZIP uploads without a Shopify import error. *(Confirmed by the user on 8 September 2026: the theme is present in Shopify as a draft.)*
- [ ] **IMP-02:** Home, collection, product, standard page, search, cart, and 404 templates render without a Liquid error.
- [ ] **IMP-03:** Both CSS files and JavaScript load successfully; browser console shows no theme error.
- [ ] **IMP-04:** Theme Customize opens and connected settings save and persist.
- [ ] **IMP-05:** No draft-theme preview link or password is exposed publicly before approval.

### Navigation and content

- [ ] **NAV-01:** Every desktop header link reaches the intended destination.
- [ ] **NAV-02:** Mobile menu opens, closes, updates `aria-expanded`, and closes after selecting a link.
- [ ] **NAV-03:** Every footer page and policy link works; no accidental 404 remains.
- [ ] **NAV-04:** Home and collection calls to action consistently reach the intended catalog.
- [ ] **CNT-01:** Founder Story, Contact, FAQ, Size Guide, and Customer Care use the correct custom template.
- [ ] **CNT-02:** Q1 2027 and pre-launch wording is consistent across announcement, footer, collection, search, product, and cart.
- [ ] **CNT-03:** Size tables match the latest approved sample/tech-pack measurements and remain clearly marked as development measurements until final approval.
- [ ] **CNT-04:** Product titles, specifications, prices, colors, sizes, care wording, and photography contain no unapproved claims.

### Products and order blocking

- [ ] **ORD-01:** A normal product page contains no add-to-cart, buy-now, accelerated-checkout, or subscription control.
- [ ] **ORD-02:** Every visible variant has zero tracked inventory and overselling disabled.
- [ ] **ORD-03:** Direct add-to-cart requests and cart permalinks cannot add any visible variant.
- [ ] **ORD-04:** `/cart` contains no checkout button and an old cart cannot progress to a payable order.
- [ ] **ORD-05:** Products cannot be purchased through Shop, social channels, Buy Button, POS, an app, or another published channel.
- [ ] **ORD-06:** No real order, authorization, or payment is created during pre-launch tests.

### Forms and popup

- [ ] **FRM-01:** Newsletter popup appears on a first visit at desktop and mobile sizes.
- [ ] **FRM-02:** Popup close persists on a new page and after refresh.
- [ ] **FRM-03:** Product/cart early-access CTA remains usable after the popup was previously closed.
- [ ] **FRM-04:** Valid newsletter signup creates the correct Shopify customer/tag/consent state and shows success.
- [ ] **FRM-05:** Invalid newsletter input shows an understandable error without losing layout.
- [ ] **FRM-06:** Contact submission arrives in the intended inbox and allows a reply to the visitor.
- [ ] **FRM-07:** Contact success and failure states are visible and understandable.

### Responsive, browser, and accessibility

- [ ] **UI-01:** Review at approximately 390 px phone, 768 px tablet, 1024 px laptop, and 1440 px desktop widths.
- [ ] **UI-02:** Test current Safari on iPhone and current Chrome, Safari, and Firefox on desktop where available.
- [ ] **UI-03:** No overlap, horizontal page overflow, clipped text, broken media crop, or unreadable contrast occurs.
- [ ] **UI-04:** Footer shows all four groups in an intentional layout.
- [ ] **A11Y-01:** Complete the full journey with keyboard only; focus is always visible.
- [ ] **A11Y-02:** Skip link, menus, dialog controls, forms, FAQ details, and buttons have understandable names and focus order.
- [ ] **A11Y-03:** Product images have meaningful alt text and decorative images do not create noise.
- [ ] **A11Y-04:** Zoom to 200% without losing content or functionality.

### Policies, privacy, domain, and communications

- [ ] **OPS-01:** All published policy URLs contain approved final text and no placeholders.
- [ ] **OPS-02:** Cookie/privacy controls behave correctly for an incognito visitor in the Netherlands and every enabled market.
- [ ] **OPS-03:** Primary domain, HTTPS, canonical URLs, and redirects are correct.
- [ ] **OPS-04:** Newsletter, contact, and store emails authenticate and arrive from the intended sender.
- [ ] **OPS-05:** Store email links, reply-to addresses, and customer-facing business details are correct.
- [ ] **OPS-06:** A rollback copy of the previous live theme and the tested CHAVÉR ZIP exists.

## 8. Pre-launch go/no-go gates

The public pre-launch is **GO** only when all gates below are checked:

- [ ] **PRE-01:** Shopify accepts the theme and core templates render without errors.
- [ ] **PRE-02:** All five required pages, exact handles, and template assignments are complete.
- [ ] **PRE-03:** Only approved products and provisional claims are publicly visible.
- [ ] **PRE-04:** All six order-blocking tests ORD-01 through ORD-06 pass.
- [ ] **PRE-05:** Newsletter and contact delivery pass, including consent and error states.
- [ ] **PRE-06:** Policies and customer-privacy configuration are approved and public.
- [ ] **PRE-07:** Domain, HTTPS, and authenticated sender email are verified.
- [ ] **PRE-08:** No blocker/high-priority code finding remains unresolved.
- [ ] **PRE-09:** Mobile, desktop, keyboard, and rollback checks pass.

If any gate is open, keep the theme as a draft or keep the store password-protected.

## 9. Later commerce-launch handoff

Do not reuse the pre-launch approval as permission to accept orders. Before commerce launch, complete a separate release pass:

- Replace every hard-coded `Q1 2027`, `Coming soon`, and ordering-closed message.
- Add an accessible product form, real variant selection, quantity behavior, sold-out states, add-to-cart feedback, and cart checkout button.
- Replace development measurements, generic product details, and provisional care wording with approved production data.
- Load final inventory, locations, SKUs, weights, customs data, shipping profiles, markets, duties, and tax settings.
- Activate and verify payment methods only when CHAVÉR is ready to accept money.
- Finalize fulfillment, returns, support, order notifications, fraud handling, and customer-service procedures.
- Place Shopify test orders covering successful payment, declined payment, discount, shipping, tax, inventory reduction, cancellation, refund, and notification flows.
- Repeat responsive, accessibility, policy, privacy, performance, analytics, and rollback QA.

## 10. Completion record

| Field | Value |
| --- | --- |
| Repository baseline | `3b113115c3d0e35c744e141eff2ec096fd8905e4` |
| ZIP filename |  |
| Shopify store URL |  |
| Draft theme name |  |
| Draft preview URL |  |
| Imported by / date |  |
| QA completed by / date |  |
| Open defects |  |
| Pre-launch decision | `GO / NO-GO` |
| Approved by / date |  |
| Rollback theme or ZIP |  |

## Official Shopify references

- [Adding, previewing, and uploading themes](https://help.shopify.com/en/manual/online-store/themes/adding-themes)
- [Creating and editing pages](https://help.shopify.com/en/manual/online-store/add-edit-pages)
- [Applying theme templates](https://help.shopify.com/en/manual/online-store/themes/theme-structure/templates)
- [Adding store policies](https://help.shopify.com/en/manual/checkout-settings/refund-privacy-tos)
- [Managing customer privacy settings](https://help.shopify.com/en/manual/privacy-and-security/privacy/customer-privacy-settings)
- [Setting up inventory tracking](https://help.shopify.com/en/manual/products/inventory/setup/set-up-inventory-tracking)
- [Preparing a Shopify store for launch and placing test orders](https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/setup-prepare-for-launch)
- [Setting up and authenticating store email](https://help.shopify.com/en/manual/intro-to-shopify/initial-setup/setup-your-email)
- [Connecting a third-party domain](https://help.shopify.com/en/manual/domains/add-a-domain/connecting-domains/connect-domain-manual)
- [Restricting access with storefront password protection](https://help.shopify.com/en/manual/online-store/themes/password-page)

---

CHAVÉR — Timeless essentials made with patience and purpose.
