export interface CaseStudyStep {
  num: string;
  title: string;
  description: string;
}

export interface CaseStudyFeature {
  title: string;
  description: string;
}

export interface CaseStudyStat {
  value: string;
  label: string;
}

export interface CaseStudyTech {
  category: string;
  items: string[];
}

export interface CaseStudy {
  slug: string;
  title: string;
  headline: string;
  subtitle: string;
  category: string;
  year: string;
  color: string;
  darkColor: string;
  externalUrl: string;
  githubUrl?: string;
  role: string;
  duration: string;
  tools: string[];
  context: string;
  overview: string;
  problemStatement: string;
  problemPoints: string[];
  solutionIntro: string;
  steps: CaseStudyStep[];
  features: CaseStudyFeature[];
  techStack: CaseStudyTech[];
  stats: CaseStudyStat[];
  conclusion: string;
}

export const caseStudies: Record<string, CaseStudy> = {
  superpong: {
    slug: "superpong",
    title: "SuperPong",
    headline: "Your Camera Is Now the Umpire.",
    subtitle:
      "AI-powered table tennis scoring using real-time vision and voice.",
    category: "AI & Computer Vision",
    year: "2025",
    color: "#C8946A",
    darkColor: "#1A140F",
    externalUrl: "https://superpongai.vercel.app/",
    githubUrl: "https://github.com/emSoumik/SuperPong",
    role: "UX Designer & Frontend Developer",
    duration: "Hackathon Sprint",
    tools: ["Figma", "React", "Vite", "Gemini AI", "YOLO"],
    context: "Built for Vision Hackathon",
    overview:
      "SuperPong transforms any device camera into an intelligent table tennis umpire. Using YOLO for real-time ball tracking and Google's Gemini AI for contextual understanding, it automatically scores rallies and delivers live voice commentary — all completely hands-free. No extra hardware. No manual refereeing. Just point your camera and play.",

    problemStatement:
      "Casual table tennis is one of the most played sports worldwide, yet scoring remains a persistent friction point.",
    problemPoints: [
      "Players lose track of the score mid-rally, leading to disputes and interrupted flow",
      "No affordable referee solution exists for casual or recreational play",
      "Existing scoring apps require manual input, pulling players out of the game",
      "Voice-only interaction is essential — players' hands are occupied holding paddles",
    ],

    solutionIntro:
      "We designed a fully hands-free experience that works in three simple steps — from setup to live scoring in under a minute.",
    steps: [
      {
        num: "01",
        title: "Setup Your Match",
        description:
          "Enter player names, choose your format (11-point, 21-point, or best-of sets), and position your device camera to face the table.",
      },
      {
        num: "02",
        title: "Wake the AI",
        description:
          'Say "SuperPong" to activate. The camera and microphone start simultaneously. The AI begins watching the table and listening for voice commands.',
      },
      {
        num: "03",
        title: "Play — It Handles the Rest",
        description:
          "YOLO tracks the ball at 5 fps. Gemini detects rally outcomes, updates the score automatically, and delivers live commentary like a real umpire.",
      },
    ],

    features: [
      {
        title: "Voice-First Scoring",
        description:
          'Fully hands-free operation. Say "Point to Alex" or "Undo last point" without touching any device. Wake-word activation keeps the mic idle until needed.',
      },
      {
        title: "YOLO Ball Detection",
        description:
          "Computer vision tracks the ping pong ball in real time at 5 fps, detecting rally starts, bounces, and outcomes with precision.",
      },
      {
        title: "Live AI Commentary",
        description:
          "Gemini 2.5 Flash generates contextual, natural-language commentary — reacting to rallies, announcing scores, and adding personality to every point.",
      },
      {
        title: "Smart Match Logic",
        description:
          "Full match intelligence handles deuce rules, set tracking, serving rotation, and post-match analytics automatically.",
      },
      {
        title: "Runs in the Browser",
        description:
          "No app install required. Works on any device with a camera and microphone. WebRTC handles the video stream directly in the browser.",
      },
      {
        title: "Fallback Architecture",
        description:
          "Gracefully degrades from backend mode to browser-only mode. Silent state updates keep scoring accurate even when switching modes.",
      },
    ],

    techStack: [
      {
        category: "Frontend",
        items: [
          "React + Vite",
          "Web Speech API",
          "WebRTC Camera Stream",
          "Framer Motion",
        ],
      },
      {
        category: "AI & Vision",
        items: [
          "Gemini 2.5 Flash",
          "Ultralytics YOLO",
          "Vision Agents SDK",
          "BallTrackingProcessor",
        ],
      },
      {
        category: "Infrastructure",
        items: [
          "Stream WebRTC Transport",
          "Vercel Deployment",
          "Realtime API",
          "Silent State Sync",
        ],
      },
    ],

    stats: [
      { value: "5 fps", label: "Video Processing Speed" },
      { value: "<1s", label: "Score Update Latency" },
      { value: "100%", label: "Hands-Free Capable" },
      { value: "0", label: "Hardware Required" },
    ],

    conclusion:
      "SuperPong proves that AI can eliminate the small frictions that interrupt play. By combining computer vision with voice interaction, we created an experience where technology disappears into the background — letting players focus on what matters: the game.",
  },
};
