export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  thumbnail: string;
  color: string;
  brief: string;
}

export const projects: Project[] = [
  {
    slug: "project-one",
    title: "Project One",
    subtitle: "Reimagining the experience",
    category: "Product Design",
    year: "2025",
    thumbnail: "/projects/01.jpg",
    color: "#E63946",
    brief:
      "A deep dive into rethinking how users interact with complex systems through elegant, intuitive design.",
  },
  {
    slug: "project-two",
    title: "Project Two",
    subtitle: "Designing for clarity",
    category: "UX Research & Design",
    year: "2025",
    thumbnail: "/projects/02.jpg",
    color: "#457B9D",
    brief:
      "Research-driven redesign that reduced user friction by 40% and set a new standard for the platform.",
  },
  {
    slug: "project-three",
    title: "Project Three",
    subtitle: "From zero to one",
    category: "Brand & Product",
    year: "2024",
    thumbnail: "/projects/03.jpg",
    color: "#2A9D8F",
    brief:
      "End-to-end design for a new product — from brand identity through to a polished, shipped experience.",
  },
];
