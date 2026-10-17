# React Bits GlassSurface

The JavaScript component and base CSS in this directory were supplied by the user in the React Bits GlassSurface integration brief. They are vendored here rather than replaced with an approximate CSS effect. `GlassSurface.d.ts` provides the typed integration boundary. WayFarer adds only decorative-only CSS overrides at the end of the stylesheet.

Source attribution: React Bits, GlassSurface, JavaScript + CSS variant (user-provided source). Preserve applicable upstream licensing and attribution when distributing this component.

Application integrations live outside this directory in `components/glass/`. The vendor source supports SVG refraction in Chromium, WebGL with a referenced backdrop image on other browsers, and a CSS frosted fallback. Small controls explicitly use the frosted mode to avoid allocating WebGL contexts for every button. The hero references a local HTML image with cover-fit geometry for WebGL rendering. Native imports resolve to separate fallback modules and do not import this CSS or DOM implementation.
