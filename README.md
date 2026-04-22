# InterSilentium S.A. — Slefuirea Tacerilor dintre doua Convorbiri Telefonice Ratate

> *"Slefuim tacerile cu precizie de laborator. Din 1994."*

Solutii certificate de interventie auditiva pasiva pentru intervalele nelocuite dintre apelurile telefonice nepreluate. Metodologie proprie. Discretie contractuala.

---

## Stack tehnic

- HTML5 semantic
- CSS3 (custom properties, clamp(), grid, IntersectionObserver animations)
- Vanilla JS (IIFE, fara dependinte)
- Fonturi: [Syne](https://fonts.google.com/specimen/Syne) + [Courier Prime](https://fonts.google.com/specimen/Courier+Prime) via Google Fonts

## Cum rulez local

```bash
cd my-solution
python3 -m http.server 8080
# deschide http://localhost:8080
```

## Directie aesthetic

**Brutalist × Scientific Instrument Lab** — tipografie monumentala Syne 800, mono Courier Prime pentru corp si etichete tehnice, paleta stricta alb/negru/#F2E62D (galben electric). Border table system pentru grile, zero border-radius, cursor crosshair global. Scan-line overlay pe hero pentru atmosfera de osciloscop.

## Features Pro implementate

- Dark / light mode toggle (respecta `prefers-color-scheme`)
- Scroll reveal cu IntersectionObserver
- Waveform SVG animat in hero (semnal live)
- Ticker live cu interventii simulate
- Sectiune Before / After cu doua osciloscoape
- Counter animat cu blur + flash galben la final
- Waitlist form cu validare (nume, email, select)
- Easter egg: Konami code ↑↑↓↓←→←→BA

## Ce am invatat

- `clamp()` + CSS custom properties rezolva responsive fara media queries excesive
- Border table system (border pe container + border pe celula) e mai curat decat gap + background
- `IntersectionObserver` cu `unobserve` dupa primul trigger e mai eficient decat scroll listener
- Waveform animat in SVG prin `setAttribute('points', ...)` in RAF — usor si fara librarii
- Ticker seamless loop: duplici HTML-ul in JS, animezi la `-50%`
