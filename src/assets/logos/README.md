# Provider logos

Drop an official provider logo here named after the gateway **slug** (the
markdown filename in `src/content/gateways/`), e.g.:

```
src/assets/logos/toyyibpay.svg
src/assets/logos/billplz.svg
```

The `Logo.astro` component picks it up automatically via `import.meta.glob`.
If no SVG exists for a slug, a clean monogram chip is shown instead, so there
are never broken images.

**Notes**
- Prefer **SVG**. Keep the provider's original artwork/colours (don't recolour marks).
- Use logos for identification/comparison only (nominative use).
