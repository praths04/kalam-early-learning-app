# Kalam (कलम): Kitchen Learning for Low-Literacy Parents in India

**Live demo:** https://hamarasaathi.netlify.app (best on a phone; use "Add to Home Screen" to install)

Kalam is an early-childhood learning app prototype for parents in low-income Indian households. A parent taps the household items they have, and Kalam returns one curriculum-matched activity for their 3-4 year old, with Hindi and English text, a read-aloud option, and no reading required.

> **Status:** active, self-directed prototype. Not a shipped product and not yet tested with real families.

## The problem

Research shows play-based learning outperforms rote learning over the long term. Schools tried to extend play-based activities into the home, but many parents have limited formal education and inflexible jobs, so they lacked the time and background to design activities themselves, even with printed guidance. I saw this firsthand while volunteering in an early-education program with the Youngistaan Foundation.

Competitive research (Buddy.ai, Kutuki, FunDad, Playbox, ABC Finder, and others) showed no product that ties home activities to a child's actual school curriculum, is designed for low-literacy parents, and uses zero-cost household materials instead of purchased kits or subscriptions. These apps also tend to take parents out of the learning process, with the app or a screen teaching the child directly. Kalam is built to include parents, so the parent leads each activity with their child, and that is what sets it apart.

## How it works

1. **Pick the month.** The curriculum runs across 10 months (June to March).
2. **Tap what you have.** Photo cards (Hindi in bold, English beneath) show common kitchen items such as pulses, utensils and vegetables.
3. **Get one activity.** The app shows a single best-matched activity with materials, steps, a fallback demonstration if the child doesn't understand an instruction, and a one-line note on how it helps learning.
4. **Check in with taps.** After the activity, the parent answers 2-3 questions with a visual smiley scale, with no typing.
5. **Watch the companion grow.** A pencil character grows with each completed activity, based on activity count, not on scores.

## Key design decisions

- **Curriculum grounding.** A 10-month framework mapped to India's NEP 2020 Foundational Literacy and Numeracy mission and the Anganwadi/ICDS early-childhood framework, with a vetted bank of 30 activities.
- **Measurement grounding.** Skills are tagged against Save the Children's IDELA framework instead of ad hoc categories.
- **Low-literacy interaction design.** Voice plus visual cards, tap-only feedback, and no reading or writing required, informed by published HCI research and precedents such as ARMMAN's mMitra voice program.
- **Tested the camera, then cut it.** I first built a camera-based object detector (TensorFlow.js with COCO-SSD). Testing in a real kitchen showed it reliably detected only bowls and cups, so I removed it and made the tap-menu the whole product. The tap-based flow covered 100% of activity matching without it.
- **Zero cost, offline, private.** There is no backend and no accounts. Progress is stored in the browser on the device, and a service worker lets the app open offline after the first visit.


## Not built yet (deliberately deferred)

- Adaptive difficulty logic (the easier and harder variants are drafted, but the rule logic is not built).
- Teacher or school reporting, which would require data to leave the device and raises privacy and legal questions that I want to resolve first.
- Testing with real families.

## Tech

Single-file progressive web app (HTML, CSS and JavaScript), a service worker for offline use, localStorage for on-device progress, and Google Fonts (loaded on the first online visit). Hosted on Netlify.

## Repository contents

| File | Purpose |
|---|---|
| `index.html` | The app |
| `manifest.json` | PWA manifest (name, theme) |
| `sw.js` | Service worker for offline use |

## Author

Prathiba Reddy, MS Business Analytics & AI, Johns Hopkins Carey Business School.
