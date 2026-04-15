```markdown
# Design System Document: Smart Stadium AI – Crowd Intelligence System

## 1. Overview & Creative North Star: "The Kinetic Pitch"
The Creative North Star for this design system is **"The Kinetic Pitch."** Much like the pristine, high-tension environment of a world-class cricket stadium, the interface must feel expansive, meticulously maintained, and hyper-intelligent. 

We are moving away from the "SaaS-in-a-box" aesthetic. Instead, we embrace a **High-End Editorial** approach that mimics the precision of hawk-eye technology and the organic energy of the pitch. By utilizing intentional asymmetry, overlapping "glass" layers, and a hierarchy driven by tonal shifts rather than lines, we create a platform that feels like a premium command center for the next generation of sports infrastructure.

---

## 2. Colors: Tonal Depth & The "No-Line" Rule
The palette is rooted in the natural vibrancy of the pitch (Grass Green) and the precision of data (Tech Blue).

### Surface Hierarchy & Nesting
To achieve a premium feel, we prohibit 1px solid borders for sectioning. Boundaries are defined by **Surface Nesting**:
- **Base Layer:** `surface` (#f8faf9) – The expansive stadium floor.
- **Sectioning:** Use `surface_container_low` (#f2f4f3) to block out large content areas.
- **Content Cards:** Use `surface_container_lowest` (#ffffff) to make data "pop" against the sectioning.
- **Interactive Elements:** Use `surface_container_high` (#e6e9e8) for hover states or nested interactive zones.

### The "Glass & Gradient" Rule
Standard flat containers are forbidden for primary data visualizations.
- **Glassmorphism:** Use `surface_container_lowest` at 60% opacity with a `24px` backdrop-blur for floating panels.
- **Signature Glow:** Apply a subtle linear gradient from `primary` (#186a22) to `primary_container` (#358438) for primary CTAs to simulate the lush depth of stadium grass under floodlights.
- **Tech Highlights:** Use `tertiary` (#705d00) sparingly as a "Golden Hour" highlight—mimicking the sunlight hitting the stands or a high-alert intelligence notification.

---

## 3. Typography: Editorial Authority
We utilize a dual-sans-serif system to balance human readability with technical precision.

- **Display & Headlines (Plus Jakarta Sans):** These are our "Scoreboard" fonts. Large, bold, and authoritative. Use `display-lg` for hero metrics (e.g., total crowd count) to create a sense of scale.
- **Body & Labels (Manrope):** Chosen for its modern, geometric clarity. Manrope handles the dense data of stadium logistics without feeling cluttered.
- **Intentional Contrast:** Pair a `headline-lg` title with a `label-md` uppercase subtitle (tracking: 0.1em) to create a sophisticated, editorial "stadium program" look.

---

## 4. Elevation & Depth: The Layering Principle
We reject traditional drop shadows in favor of **Ambient Light Layering.**

- **Tonal Stacking:** Instead of a shadow, place a `surface_container_lowest` card on a `surface_container` background. The shift in hex value provides enough contrast for the eye to perceive depth.
- **Ambient Shadows:** For floating modals or "Top-Down" maps, use a shadow with `40px` blur, 0px offset, and 6% opacity of `on_surface` (#191c1c). It should look like a soft cloud, not a hard edge.
- **The Ghost Border:** If a boundary is required for accessibility, use `outline_variant` at 15% opacity. It should be felt, not seen.
- **Glow Effects:** Critical alerts or "Live" status indicators should use a soft outer glow of `secondary` (#2b5bb5) or `tertiary` (#705d00) to simulate LED stadium signage.

---

## 5. Components: Precision Primitives

### Buttons (The "Action" State)
- **Primary:** Gradient fill (`primary` to `primary_container`), `xl` roundedness, white text. No border.
- **Secondary:** `surface_container_lowest` with a "Ghost Border" of `outline`.
- **Tertiary:** Text-only in `secondary`, used for low-emphasis navigation like "View Heatmap Details."

### Chips (Intelligence Tags)
- Use `full` roundedness. 
- **Status Chips:** Use `secondary_fixed` for neutral data and `primary_fixed` for "Optimized" stadium zones.
- **Interaction:** On hover, chips should "lift" using a subtle `surface_container_highest` background shift.

### Input Fields (Data Entry)
- Forgo the box. Use a "Bottom-Line" only approach or a very soft `surface_container_low` fill with `md` corners.
- **Focus State:** Transition the background to `surface_container_lowest` and add a `2px` glow of `primary` at 20% opacity.

### Smart Stadium Specific Components
- **Crowd Heatmap Cards:** Glassmorphic containers with `xl` corners, housing a dynamic map. Forbid dividers; use 24px-32px of vertical whitespace to separate the map from its legend.
- **Live Stream Pips:** Small, `lg` rounded video containers with a `secondary` "Live" pulse animation in the top corner.
- **Zone Selectors:** Asymmetric tiles that use `surface_container_highest` for "occupied" zones and `surface` for "available" zones.

---

## 6. Do's and Don'ts

### Do:
- **Use Breathing Room:** Apply generous padding (32px+) between major sections to mimic the vastness of the Narendra Modi Stadium.
- **Animate Transitions:** Use "Staggered Entrances" for data cards (bottom-to-top, 300ms, ease-out) to make the intelligence feel "live."
- **Layer Your Glass:** Stack a glassmorphic sidebar over a soft-focus map background for a high-tech "HUD" feel.

### Don't:
- **Don't use 100% Black:** Always use `on_surface` (#191c1c) for text. It preserves the "premium" softness.
- **Don't use Dividers:** Never use a horizontal rule `<hr>` to separate content. Use a background color shift or whitespace.
- **Don't Overuse Yellow:** The `tertiary` (Yellow) is a high-vis highlight. If more than 5% of your screen is yellow, the "Modern Startup" feel is lost.
- **Don't use Default Grids:** Experiment with off-center alignment for hero text to break the "template" look.

---

**Director's Note:**
"Smart Stadium AI" isn't just a dashboard; it’s a high-performance tool. Every pixel should feel as intentional as the placement of a fielder on the boundary. If it feels 'standard,' you haven't used enough white space or tonal layering. Let the grass breathe."```