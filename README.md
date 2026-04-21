# ReConvert — Reconversia Profesionala a Dulapurilor Disponibilizate

> *"Fiecare dulap merita o a doua cariera."*

Consultanta premium pentru dulapurile care au incheiat primul ciclu de viata.
Evaluare vocationala, planificare de traiectorie, integrare in noul context functional.
Metodologie certificata ISO-adjacent. Discretie absoluta.

---

## Stack tehnic

- **HTML5** semantic (`section`, `article`, `figure`, `details`, `blockquote`)
- **CSS3** pur — custom properties, `clamp()`, Grid, Flexbox, IntersectionObserver-ready
- **JavaScript** vanilla — IIFE, fara dependinte, ~145 linii

Zero framework-uri. Zero build step. Se deschide direct in browser.

---

## Cum rulez local

```bash
cd my-solution
python3 -m http.server 8080
# apoi: http://localhost:8080
```

Sau direct: dublu-click pe `index.html`.

---

## Directie aesthetic

**Editorial Luxury** — ales pentru ca serviciul finge seriozitate corporatista la nivel maxim.
Contrastul dintre limbajul B2B impecabil si obiectul absurd (dulapul) functioneaza
cel mai bine intr-un cadru vizual sobru, rafinat, fara niciun semn de ironie.

| Decizie | Alegere | Motivatie |
|---|---|---|
| Font display | Cormorant Garamond | Serif clasic, italic expresiv, autoritate |
| Font body | Jost | Geometric curat, lizibil la dimensiuni mici |
| Culoare primara | `#F7F2EB` (crem cald) | Hartie premium, registre notariale |
| Accent | `#B84A22` (teracota) | Caldura, sigilii de ceara, branding distinctiv |
| Background dark | `#120D09` (carbon) | Profunzime, seriozitate institutionala |

---

## Pro features

| Feature | Implementat |
|---|---|
| Dark / light mode toggle | Da — buton in nav, respecta `prefers-color-scheme` |
| Scroll reveal fade-in | Da — `IntersectionObserver`, `prefers-reduced-motion` |
| Form waitlist cu validare | Da — nume ≥2 char, email regex, select obligatoriu |
| Easter egg | Da — 5 clickuri pe logo RC sau butonul `·` din footer; Konami code |
| OG tags | Da — `og:title`, `og:description`, `og:image`, `twitter:card` |
| Counter animat | Da — cifrele din Hero cresc de la 0 la valoarea finala |

---

## 3 prompt-uri cheie

1. `"Scrie index.html complet cu serviciul ReConvert — reconversia profesionala a dulapurilor disponibilizate. Sectiuni: Hero, Features (3 etape metodologice), Testimoniale (2), Pricing (3 tier-uri: Esential / Premium / Patrimoniu), FAQ (4 intrebari), Waitlist form, Footer. Copy B2B premium in romana, ton Stripe/Linear, zero emoji, absurdul doar din CE face serviciul."`

2. `"Foloseste skill-ul frontend-design. Scrie styles.css directie Editorial Luxury: Cormorant Garamond + Jost, paleta crem/teracota/carbon, dark mode via [data-theme], scroll reveal .reveal, CSS wardrobe illustration in hero, grain texture SVG inline."`

3. `"Scrie script.js IIFE vanilla: theme toggle cu localStorage, scroll reveal IntersectionObserver, counter animat pentru stats, form validation, easter egg la 5 clickuri pe logo + Konami code, nav shadow on scroll."`

---

## Ce am invatat

- **CSS custom properties + `[data-theme]`** fac dark mode fara un rand de JavaScript in CSS
- **`clamp()`** elimina aproape complet media queries pentru tipografie si spacing
- **IntersectionObserver** e mult mai performant decat scroll listener pentru reveal si counters
- **Contrastul forma-fond** functioneaza cu atat mai bine cu cat designul e mai sobru — ironia nu trebuie explicata niciodata explicit
- **CSS illustration** (dulapul din Hero) adauga personalitate fara niciun fisier extern
