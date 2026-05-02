// 1. THE MASTER TAG LIST (Updated with all 30 necessary tags for the backend)
export const MASTER_TAGS = [
  "software", "hardware", "networks", "connectivity", "construction", 
  "politics", "ethics", "physical-design", "management", "memorization", 
  "math", "public-speaking", "debugging", "subjectivity", "conflict-management", 
  "high-stress", "focus", "collaboration", "design", "writing", 
  "clinical", "analytics", "art", "logic", 
  "financial", "mobility", "stability", "social-impact", "leadership", "innovation"
];

// 2. LEVEL 1: THE MYTHS (Warm-up: Gives 0 points but sets the tone)
export const level1Questions = [
  {
    id: 1,
    major: "Computer Science",
    myth: "Viewed as a field for 'brilliant loners' who can solve any technical problem but struggle with collaborative, human-centric design.",
    reality: "Code doesn't exist in a vacuum. You can be the best coder in the world, but if you can't work in an Agile team or understand the human psychology of a UI, your product will fail. High-level CS is about social systems as much as it is about binary.",
    
  },
  {
    id: 2,
    major: "Architecture",
    myth: "Viewed as 'glorified drafting' or pure aesthetic styling—essentially making buildings look 'cool' while engineers do the real math.",
    reality: "Drawing is only a small part of the job. Most of your time is spent solving technical puzzles to make sure a building is safe, stands up against the wind, and follows strict construction laws. You are essentially using math and logic to turn a creative sketch into a real, buildable structure.",
    
  },
  {
    id: 3,
    major: "Networks",
    myth: "Often dismissed as 'it's just plugging in cables,' ignoring the complex mathematical queuing theory and security logic required to keep the world connected.",
    reality: "It's high-level math, not IT support. Keeping a global network up requires a deep understanding of probability, queuing theory, and cryptographic protocols. If it were just 'plugging things in,' the world's financial systems would crash daily.",
    
  },
  {
    id: 5,
    major: "Law",
    myth: "Seen as a profession for those who prioritize cold, pedantic technicalities and 'winning' over the actual pursuit of justice or ethics.",
    reality: "It’s the framework of civilization. Law isn't about being 'argumentative'; it’s about high-level pattern recognition and linguistic precision. Without it, there is no protection for innovation, property, or human rights.",
    
  },
  {
    id: 6,
    major: "Applied Arts",
    myth: "Often trivialized as 'making things look pretty,' disregarding the ergonomics, material science, and industrial utility involved in the design.",
    reality: "Design is a functional requirement. If a surgical tool is 'pretty' but hard to grip, the patient dies. Applied Arts is the rigorous study of how humans interact with the physical world to maximize safety and efficiency.",
    
  },
  {
    id: 7,
    major: "Business",
    myth: "Viewed as a 'default' path for those who lack a specific calling, leading to the perception that the degree is more about acquiring a credential than mastering a difficult or unique skill set.",
    reality: "Business isn't just about making money; it is the difficult job of managing hundreds of unpredictable people and resources at once. While a computer follows code, a business leader has to make smart, high-pressure decisions in a world where things change every hour. It requires deep strategy and logic to keep a large organization running smoothly without everything falling apart.",
    
  }
];

// 3. LEVEL 2: THE DEALBREAKERS (Aptitude Check)
export const level2Skillsets = [
  {
    id: 1,
    skill: "Heavy Memorization",
    tag: "memorization",
    tiers: [
      { label: "Minimal", desc: "Open-book environment. No rote memorization required." },
      { label: "Moderate", desc: "Memorizing key formulas and core terminology." },
      { label: "Maximum", desc: "Absorbing hundreds of pages of terminology or legal facts." }
    ]
  },
  {
    id: 2,
    skill: "Complex Math",
    tag: "math",
    tiers: [
      { label: "Minimal", desc: "Basic arithmetic only. Calculators handle the rest." },
      { label: "Moderate", desc: "Applying standard formulas and basic statistics." },
      { label: "Maximum", desc: "Solving abstract equations and statistical probabilities." }
    ]
  },
  {
    id: 3,
    skill: "Public Speaking",
    tag: "public-speaking",
    tiers: [
      { label: "Minimal", desc: "Working behind the scenes. Zero presentations." },
      { label: "Moderate", desc: "Speaking in small team meetings or informal updates." },
      { label: "Maximum", desc: "Presenting projects or pitching ideas to large crowds." }
    ]
  },
  {
    id: 4,
    skill: "Technical Debugging",
    tag: "debugging",
    tiers: [
      { label: "Minimal", desc: "Using tools that just work. IT handles any issues." },
      { label: "Moderate", desc: "Troubleshooting minor software or hardware hiccups." },
      { label: "Maximum", desc: "Staring at screens for hours to fix broken systems." }
    ]
  },
  {
    id: 5,
    skill: "Subjectivity",
    tag: "subjectivity",
    tiers: [
      { label: "Minimal", desc: "Purely objective work. Strict right/wrong answers only." },
      { label: "Moderate", desc: "Following rubrics but with some room for personal flair." },
      { label: "Maximum", desc: "Being graded on creativity or opinions rather than right/wrong answers." }
    ]
  },
  {
    id: 6,
    skill: "Group Conflict",
    tag: "conflict-management",
    tiers: [
      { label: "Minimal", desc: "Solo work. You are only responsible for yourself." },
      { label: "Moderate", desc: "Standard team collaboration with occasional disagreements." },
      { label: "Maximum", desc: "Managing team dynamics and mediating arguments." }
    ]
  },
  {
    id: 7,
    skill: "High Stress",
    tag: "high-stress",
    tiers: [
      { label: "Minimal", desc: "Relaxed pace. Deadlines are flexible and low-stakes." },
      { label: "Moderate", desc: "Standard project deadlines with manageable pressure." },
      { label: "Maximum", desc: "Working under strict deadlines with major consequences." }
    ]
  },
  { 
    id: 8, 
    skill: "Abstract Logic", 
    tag: "logic",
    tiers: [
      { label: "Minimal", desc: "Concrete, visible tasks. What you see is what you get." },
      { label: "Moderate", desc: "Organizing data or planning step-by-step processes." },
      { label: "Maximum", desc: "Staring at complex, invisible systems (like code or data structures) with no physical output." }
    ]
  },
  { 
    id: 9, 
    skill: "Physical Prototyping", 
    tag: "hardware",
    tiers: [
      { label: "Minimal", desc: "100% digital or theoretical work. Nothing physical." },
      { label: "Moderate", desc: "Occasional hands-on interaction with physical models." },
      { label: "Maximum", desc: "Working with your hands to build, wire, or physically assemble models." }
    ]
  },
  { 
    id: 10, 
    skill: "Constant Adaptation", 
    tag: "innovation",
    tiers: [
      { label: "Minimal", desc: "Learning a set of rules that will practically never change." },
      { label: "Moderate", desc: "Keeping up with general industry trends every few years." },
      { label: "Maximum", desc: "Working in a field where knowledge becomes obsolete every 3 years and you must constantly relearn." }
    ]
  },
  { 
    id: 11, 
    skill: "Client Management", 
    tag: "conflict-management",
    tiers: [
      { label: "Minimal", desc: "Zero client interaction. You only report to your boss." },
      { label: "Moderate", desc: "Presenting finished work to clients for minor feedback." },
      { label: "Maximum", desc: "Having your work constantly critiqued, changed, or rejected by non-technical clients." }
    ]
  }
];

// 4. LEVEL 3: ENERGY BUCKETS (Expanded to 18 to capture all missing tags)
export const level3Activities = [
  { id: 1, task: "Long solo study sessions", tag: "focus" },
  { id: 2, task: "Brainstorming with a group", tag: "collaboration" },
  { id: 3, task: "Writing computer code", tag: "software" },
  { id: 4, task: "Speaking to a large crowd", tag: "public-speaking" },
  { id: 5, task: "Memorizing lists of facts", tag: "memorization" },
  { id: 6, task: "Designing visual layouts", tag: "design" },
  { id: 7, task: "Finding and fixing errors", tag: "debugging" },
  { id: 8, task: "Writing long reports", tag: "writing" },
  { id: 9, task: "Hands-on science lab work", tag: "clinical" },
  { id: 10, task: "Managing people and schedules", tag: "management" },
  { id: 11, task: "Finding patterns in numbers", tag: "analytics" },
  { id: 12, task: "Drawing or sketching ideas", tag: "art" },
  { id: 13, task: "Building electronic circuits", tag: "hardware" },
  { id: 14, task: "Setting up Wi-Fi and internet", tag: "networks" }, 
  { id: 15, task: "Designing plans for buildings", tag: "construction" },
  { id: 16, task: "Debating social problems", tag: "politics" },
  { id: 17, task: "Solving moral dilemmas", tag: "ethics" },
  { id: 18, task: "Solving difficult logic puzzles", tag: "logic" }
];

// 5. LEVEL 4: THE VIBE BUDGET (Expanded to capture Connectivity & Logic)
export const level4Vibes = [
  { id: 1, name: "Prestige & Tradition", cost: 40, icon: "🏛️", desc: "Master classical academic subjects through intensive study and precise factual recall.", tag: "memorization" },
  { id: 2, name: "Project-Based Learning", cost: 35, icon: "🛠️", desc: "Fewer exams, more 'building' and 'doing' in teams.", tag: "physical-design" },
  { id: 3, name: "Research Focus", cost: 30, icon: "🔬", desc: "Investigating new theories and spending time in labs or libraries.", tag: "clinical" },
  { id: 4, name: "Creative Freedom", cost: 25, icon: "🎭", desc: "Flexible assignments where you choose how to express your ideas.", tag: "subjectivity" },
  { id: 5, name: "Data & Logic Driven", cost: 25, icon: "📊", desc: "A focus on objective truths, numbers, and structured proof.", tag: "logic" },
  { id: 6, name: "Discussion-Heavy", cost: 20, icon: "🗣️", desc: "Small classes where participation and debate are mandatory.", tag: "public-speaking" },
  { id: 7, name: "Fast-Paced / Competitive", cost: 30, icon: "🏎️", desc: "An intense environment that pushes you to be the best in your cohort.", tag: "high-stress" },
  { id: 8, name: "Collaborative / Supportive", cost: 20, icon: "🌱", desc: "A culture where students help each other and work is mostly shared.", tag: "collaboration" },
  { id: 9, name: "Digital Infrastructure", cost: 25, icon: "🌐", desc: "Focus on internet infrastructure and worldwide communication.", tag: "connectivity" }
];

// 6. LEVEL 5: THE CAREER PYRAMID
export const level5Tags = [
  {
    id: 101,
    name: "Work-Life Balance",
    tag: "mobility", // Maps to: Flexible, Remote, Life-first
    icon: "🏠",
    desc: "Flexible hours and remote options to prioritize your personal time."
  },
  {
    id: 102,
    name: "Comp & Benefits",
    tag: "financial", // Maps to: High Salary, Bonuses, Perks
    icon: "💳",
    desc: "Competitive salary and perks that reflect your market value."
  },
  {
    id: 103,
    name: "Job Security",
    tag: "stability", // Maps to: Long-term, Low-risk, Commitment
    icon: "🛡️",
    desc: "Confidence in long-term stability and company commitment."
  },
  {
    id: 104,
    name: "Impact & Meaning",
    tag: "social-impact", // Maps to: Valuable work, Positive change
    icon: "🌟",
    desc: "Believing your work is valuable and makes a positive difference."
  },
  {
    id: 105,
    name: "Culture & Vibes",
    tag: "collaboration", // Maps to: Safe environment, Good relationships
    icon: "🤝",
    desc: "A positive, inclusive atmosphere with great colleague relationships."
  },
  {
    id: 106,
    name: "Career Growth",
    tag: "leadership", // Maps to: Promotion, Mentorship, Training
    icon: "🚀",
    desc: "Clear paths for training, mentorship, and rapid promotion."
  },
  {
    id: 107,
    name: "Recognition",
    tag: "writing", // Or create a new tag, maps to: Being valued/rewarded
    icon: "🏆",
    desc: "Feeling seen and rewarded for your specific efforts and wins."
  },
  {
    id: 108,
    name: "Autonomy",
    tag: "innovation", // Maps to: Controlling how work is done
    icon: "🎮",
    desc: "The power to make decisions and control your own workflow."
  }
];