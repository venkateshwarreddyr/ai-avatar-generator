<div align="center">

# AvatarAI - AI Avatar Generator

### Transform your ideas into stunning AI-generated avatars

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4.1-412991?style=for-the-badge&logo=openai)](https://platform.openai.com/)

<br />

<img src="docs/image.png" alt="AvatarAI Screenshot" width="600" />

<br />
<br />

[**Live Demo**](#) &nbsp;&middot;&nbsp; [**Report Bug**](../../issues) &nbsp;&middot;&nbsp; [**Request Feature**](../../issues)

</div>

---

## About

AvatarAI is a web app that generates beautiful AI avatars from text prompts or uploaded photos. Powered by OpenAI's **GPT-4.1** with the **Responses API image_generation tool**, it supports 8 distinct art styles, 6 background options, and batch generation — all wrapped in a sleek dark-themed UI.

### Built With

| Layer | Tech |
|-------|------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 |
| **AI** | OpenAI GPT-4.1 + Responses API (image_generation tool) |
| **Deployment** | Vercel / any Node.js host |

---

## Features

<table>
<tr>
<td width="50%">

**8 Art Styles**
- Realistic &middot; Cartoon &middot; Anime
- Cyberpunk &middot; Fantasy &middot; Pixar 3D
- Watercolor &middot; Pop Art

</td>
<td width="50%">

**Smart Generation**
- Text-to-avatar from prompts
- Photo-to-avatar from selfies
- 1-4 avatars per request
- 3 image sizes (square/portrait/landscape)

</td>
</tr>
<tr>
<td>

**6 Backgrounds**
- Studio &middot; Modern Office &middot; Nature
- Space &middot; Cityscape &middot; Abstract

</td>
<td>

**User Experience**
- One-click preset prompts
- Drag & drop image upload
- Individual & batch download
- Real-time loading animations

</td>
</tr>
</table>

---

## Quick Start

### Prerequisites

- **Node.js** 18+
- **OpenAI API key** ([get one here](https://platform.openai.com/api-keys))

### Installation

```bash
# Clone the repo
git clone https://github.com/venkateshwarreddyr/ai-avatar-generator.git
cd ai-avatar-generator

# Install dependencies
npm install

# Set up environment
cp .env.example .env.local
```

Add your API key to `.env.local`:

```env
OPENAI_API_KEY=sk-your-key-here
```

### Run

```bash
npm run dev
```

Open **http://localhost:3000** and start creating avatars.

---

## Project Structure

```
src/
├── app/
│   ├── api/generate/route.ts    # OpenAI API endpoint
│   ├── globals.css               # Theme & animations
│   ├── layout.tsx                # SEO & metadata
│   └── page.tsx                  # Main page
├── components/
│   ├── Header.tsx                # Glassmorphism navbar
│   ├── Hero.tsx                  # Animated hero section
│   ├── AvatarGenerator.tsx       # Core generator UI
│   ├── StylePicker.tsx           # 8-style grid selector
│   ├── ImageUpload.tsx           # Drag & drop upload
│   ├── AvatarGallery.tsx         # Results + download
│   ├── LoadingAnimation.tsx      # Animated progress
│   ├── PresetPrompts.tsx         # Quick-start presets
│   ├── StyleShowcase.tsx         # Style cards
│   └── Footer.tsx
└── lib/
    ├── constants.ts              # Styles, backgrounds, presets
    └── openai.ts                 # OpenAI wrapper
```

---

## API Usage

**POST** `/api/generate`

```json
{
  "prompt": "professional software engineer, warm smile",
  "styleId": "realistic",
  "backgroundId": "office",
  "size": "1024x1024",
  "quality": "high",
  "count": 2,
  "userImage": "data:image/png;base64,..."
}
```

**Response:**

```json
{
  "images": ["data:image/png;base64,..."],
  "prompt": "professional software engineer, warm smile",
  "style": "Realistic"
}
```

---

## Cost

| Usage | Estimated Cost |
|-------|---------------|
| 1 avatar | ~$0.04 |
| 100 avatars | ~$4.00 |
| 1,000 avatars | ~$40.00 |

---

## Deploy

### Vercel (Recommended)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/venkateshwarreddyr/ai-avatar-generator&env=OPENAI_API_KEY&envDescription=Your%20OpenAI%20API%20key)

### Docker

```bash
docker build -t avatar-ai .
docker run -p 3000:3000 -e OPENAI_API_KEY=sk-... avatar-ai
```

---

## Contributing

Contributions are welcome! Fork the repo, create a feature branch, and open a PR.

```bash
git checkout -b feature/amazing-feature
git commit -m "Add amazing feature"
git push origin feature/amazing-feature
```

---

## License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">

**[AvatarAI](https://github.com/venkateshwarreddyr/ai-avatar-generator)** &mdash; Built with Next.js, Tailwind CSS & OpenAI

</div>
