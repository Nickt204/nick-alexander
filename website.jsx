import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const artworks = [
  {
    title: "Stairway to Tomorrow",
    year: "2026",
    medium: "Acrylic on canvas",
    category: "Painting",
    image: "/images/stairway-to-tomorrow.jpg",
    description: "A layered abstract composition exploring sunset light, movement, memory, and the lingering feeling of staying awake until sunrise."
  },
  {
    title: "Signal Drift",
    year: "2025",
    medium: "Digital illustration",
    category: "Digital",
    image: "/images/Chroma%20Crumble.webp",
    description: "A moody digital piece exploring memory, movement, and fragments of light."
  },
  {
    title: "Quiet Room",
    year: "2025",
    medium: "Mixed media",
    category: "Mixed Media",
    image: "/images/Eden%20Collapse.webp",
    description: "Texture-heavy composition inspired by stillness, domestic space, and silence."
  },
  {
    title: "Gold Hour Study",
    year: "2024",
    medium: "Oil pastel",
    category: "Drawing",
    image: "/images/arcadian_shift%20copy.webp",
    description: "Warm tones and loose marks capture the feeling of late afternoon light."
  },
  {
    title: "Blue Figure",
    year: "2024",
    medium: "Ink and wash",
    category: "Drawing",
    image: "/images/carousel.webp",
    description: "A minimal figurative work balancing negative space with expressive line."
  },
  {
    title: "Afterimage",
    year: "2023",
    medium: "Digital collage",
    category: "Digital",
    image: "/images/paradise.webp",
    description: "Layered collage using bold shapes, visual noise, and dreamlike color."
  }
];

const categories = ["All", "Painting", "Digital", "Mixed Media", "Drawing"];

function filterArtworks(items, selectedCategory, query) {
  const normalizedQuery = query.trim().toLowerCase();

  return items.filter((art) => {
    const matchesCategory = selectedCategory === "All" || art.category === selectedCategory;
    const searchableText = `${art.title} ${art.medium} ${art.description} ${art.category} ${art.year}`.toLowerCase();
    const matchesQuery = normalizedQuery === "" || searchableText.includes(normalizedQuery);

    return matchesCategory && matchesQuery;
  });
}

function runFilterTests() {
  const sample = [
    {
      title: "Red Moon",
      year: "2024",
      medium: "Oil paint",
      category: "Painting",
      description: "A dramatic lunar piece."
    },
    {
      title: "Soft Static",
      year: "2025",
      medium: "Digital collage",
      category: "Digital",
      description: "Glowing shapes and signal noise."
    },
    {
      title: "Line Study",
      year: "2023",
      medium: "Ink",
      category: "Drawing",
      description: "A quiet figure study."
    }
  ];

  const tests = [
    {
      name: "returns all artworks when category is All and query is empty",
      actual: filterArtworks(sample, "All", "").length,
      expected: 3
    },
    {
      name: "filters by category",
      actual: filterArtworks(sample, "Digital", "").map((art) => art.title).join(","),
      expected: "Soft Static"
    },
    {
      name: "filters by case-insensitive query",
      actual: filterArtworks(sample, "All", "moon").map((art) => art.title).join(","),
      expected: "Red Moon"
    },
    {
      name: "combines category and query filters",
      actual: filterArtworks(sample, "Digital", "static").map((art) => art.title).join(","),
      expected: "Soft Static"
    },
    {
      name: "returns no matches when query does not exist",
      actual: filterArtworks(sample, "All", "ceramic").length,
      expected: 0
    }
  ];

  tests.forEach((test) => {
    if (test.actual !== test.expected) {
      throw new Error(`${test.name}: expected ${test.expected}, received ${test.actual}`);
    }
  });
}

if (typeof window !== "undefined") {
  runFilterTests();
}

function Icon({ children, className = "", viewBox = "0 0 24 24" }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox={viewBox}
    >
      {children}
    </svg>
  );
}

function SparklesIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M12 3l1.7 4.3L18 9l-4.3 1.7L12 15l-1.7-4.3L6 9l4.3-1.7L12 3z" />
      <path d="M19 14l.9 2.1L22 17l-2.1.9L19 20l-.9-2.1L16 17l2.1-.9L19 14z" />
      <path d="M5 13l.9 2.1L8 16l-2.1.9L5 19l-.9-2.1L2 16l2.1-.9L5 13z" />
    </Icon>
  );
}

function SearchIcon({ className }) {
  return (
    <Icon className={className}>
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </Icon>
  );
}

function MailIcon({ className }) {
  return (
    <Icon className={className}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </Icon>
  );
}

function InstagramIcon({ className }) {
  return (
    <Icon className={className}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <path d="M17.5 6.5h.01" />
    </Icon>
  );
}

function ArrowUpRightIcon({ className }) {
  return (
    <Icon className={className}>
      <path d="M7 17L17 7" />
      <path d="M9 7h8v8" />
    </Icon>
  );
}

export default function ArtworkPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [query, setQuery] = useState("");

  const filteredArtworks = useMemo(() => {
    return filterArtworks(artworks, selectedCategory, query);
  }, [selectedCategory, query]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-50">
      <section className="relative overflow-hidden px-6 py-8 md:px-12 lg:px-20">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_20%_20%,rgba(251,191,36,0.25),transparent_30%),radial-gradient(circle_at_80%_10%,rgba(236,72,153,0.18),transparent_32%),radial-gradient(circle_at_60%_80%,rgba(59,130,246,0.2),transparent_36%)]" />

        <nav className="relative z-10 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm tracking-[0.25em] uppercase text-stone-300">
            <SparklesIcon className="h-4 w-4" />
            Nick Alexander Studio
          </div>
          <div className="hidden gap-6 text-sm text-stone-300 md:flex">
            <a href="#work" className="hover:text-white">Work</a>
            <a href="#about" className="hover:text-white">About</a>
            <a href="#contact" className="hover:text-white">Contact</a>
          </div>
        </nav>

        <div className="relative z-10 grid min-h-[78vh] items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="mb-5 inline-flex rounded-full border border-stone-700 bg-stone-900/70 px-4 py-2 text-sm text-stone-300 backdrop-blur">
              Contemporary artwork, personal experiments, and visual stories
            </p>
            <h1 className="max-w-4xl text-5xl font-semibold leading-tight tracking-tight md:text-7xl lg:text-8xl">
              Artwork with texture, feeling, and a little beautiful chaos.
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-stone-300">
              A curated portfolio of paintings, drawings, digital pieces, and mixed-media work. Replace these sample pieces with your own images and descriptions.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full px-6 py-6 text-base">
                <a href="#work">View the work</a>
              </Button>
              <Button asChild variant="outline" className="rounded-full border-stone-600 bg-transparent px-6 py-6 text-base text-stone-100 hover:bg-stone-900">
                <a href="#contact">Get in touch</a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotate: -2 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative"
          >
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-amber-300/30 via-pink-500/20 to-blue-500/20 blur-2xl" />
            <img
              src="/images/utopia.webp"
              alt="Featured artwork"
              className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-2xl"
            />
            <div className="absolute bottom-5 left-5 right-5 rounded-3xl border border-white/10 bg-black/45 p-5 backdrop-blur-md">
              <p className="text-sm uppercase tracking-[0.25em] text-stone-300">Featured</p>
              <h2 className="mt-1 text-2xl font-medium">Midnight Bloom</h2>
            </div>
          </motion.div>
        </div>
      </section>

      <section id="work" className="px-6 py-20 md:px-12 lg:px-20">
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">Selected Work</p>
            <h2 className="mt-3 text-4xl font-semibold md:text-6xl">Gallery</h2>
          </div>
          <div className="flex w-full max-w-md items-center gap-3 rounded-full border border-stone-800 bg-stone-900 px-4 py-3">
            <SearchIcon className="h-4 w-4 text-stone-500" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search artwork..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-stone-500"
            />
          </div>
        </div>

        <div className="mb-10 flex flex-wrap gap-3">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`rounded-full px-5 py-2 text-sm transition ${
                selectedCategory === category
                  ? "bg-stone-50 text-stone-950"
                  : "border border-stone-800 bg-stone-900 text-stone-300 hover:border-stone-600"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredArtworks.length > 0 ? (
            filteredArtworks.map((art, index) => (
              <motion.article
                key={art.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.05 }}
              >
                <Card className="group overflow-hidden rounded-[2rem] border-stone-800 bg-stone-900/70 text-stone-50 shadow-xl">
                  <CardContent className="p-0">
                    <div className="overflow-hidden">
                      <img
                        src={art.image}
                        alt={art.title}
                        className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-6">
                      <div className="mb-4 flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-2xl font-medium">{art.title}</h3>
                          <p className="mt-1 text-sm text-stone-400">{art.medium} · {art.year}</p>
                        </div>
                        <span className="rounded-full bg-stone-800 px-3 py-1 text-xs text-stone-300">{art.category}</span>
                      </div>
                      <p className="leading-7 text-stone-300">{art.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </motion.article>
            ))
          ) : (
            <div className="col-span-full rounded-[2rem] border border-stone-800 bg-stone-900 p-8 text-stone-300">
              No artwork matched your search. Try a different title, medium, year, or category.
            </div>
          )}
        </div>
      </section>

      <section id="about" className="px-6 py-20 md:px-12 lg:px-20">
        <div className="grid gap-10 rounded-[2rem] border border-stone-800 bg-stone-900 p-8 md:p-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-sm uppercase tracking-[0.3em] text-amber-300">About</p>
            <h2 className="mt-3 text-4xl font-semibold md:text-5xl">The artist behind the work</h2>
          </div>
          <div className="space-y-5 text-lg leading-8 text-stone-300">
            <p>
              I create artwork that blends emotion, texture, and visual storytelling. My practice moves between traditional and digital methods, often exploring atmosphere, identity, memory, and color.
            </p>
            <p>
              This portfolio is built to be easy to personalize: add your own bio, replace the images, update the artwork details, and link your socials or shop.
            </p>
          </div>
        </div>
      </section>

      <section id="contact" className="px-6 pb-24 pt-10 md:px-12 lg:px-20">
        <div className="rounded-[2rem] bg-stone-50 p-8 text-stone-950 md:p-12">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <p className="text-sm uppercase tracking-[0.3em] text-stone-500">Contact</p>
              <h2 className="mt-3 max-w-2xl text-4xl font-semibold md:text-6xl">Interested in commissions, prints, or collaborations?</h2>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild className="rounded-full px-6 py-6 text-base">
                <a href="mailto:your.email@example.com">
                  <MailIcon className="mr-2 h-4 w-4" /> Email me
                </a>
              </Button>
              <Button asChild variant="outline" className="rounded-full px-6 py-6 text-base">
                <a href="https://instagram.com" target="_blank" rel="noreferrer">
                  <InstagramIcon className="mr-2 h-4 w-4" /> Instagram <ArrowUpRightIcon className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
