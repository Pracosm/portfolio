export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  thumbnail: string;
  color: string;
  brief: string;
  externalUrl?: string;
}

export const projects: Project[] = [
  {
    slug: "olakh",
    title: "Olakh",
    subtitle: "AI-powered location identifier",
    category: "Product Design",
    year: "2025",
    thumbnail: "/projects/01.jpg",
    color: "#E63946",
    brief:
      "A deep dive into rethinking how users interact with location-based AI systems through elegant, intuitive design.",
  },
  {
    slug: "superpong",
    title: "SuperPong",
    subtitle: "Your camera is now the umpire",
    category: "AI & Computer Vision",
    year: "2025",
    thumbnail: "/projects/02.jpg",
    color: "#C8946A",
    externalUrl: "https://superpongai.vercel.app/",
    brief:
      "AI-powered table tennis umpire using real-time computer vision and voice — no hardware, no referee, no manual scoring.",
  },
  {
    slug: "arcadedoom",
    title: "ArcadeDoom",
    subtitle: "Retro meets modern gaming",
    category: "Brand & Product",
    year: "2024",
    thumbnail: "/projects/03.jpg",
    color: "#2A9D8F",
    brief:
      "End-to-end design for a mobile mini-games platform — from brand identity through to a polished, shipped experience.",
  },
];
