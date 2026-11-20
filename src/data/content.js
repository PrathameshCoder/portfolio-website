// All copy on the site lives here, taken from the CV (Prathamesh_CV.pdf).
// Update this file when the CV changes.

export const profile = {
  name: 'Prathamesh Gongle',
  role: 'Working student in AI, digitalisation and software',
  location: 'Nuremberg, Germany',
  email: 'prathameshgongle.j@gmail.com',
  intro:
    'I Learn it. I Build it. I ask Why.',
  availability: 'Available as a working student through September 2027',
  about: [
    "I'm a Master's student in International Information Systems (Wirtschaftsinformatik) at FAU Erlangen-Nürnberg, focused on digital business and digital transformation.",
    'On the technical side I build AI prototypes end to end: a RAG assistant written without a framework, an AI agent that reports to me on Telegram, and a local model running on my own hardware. On the project side I have led two student teams through requirements gathering, documentation and delivery, one of them with Siemens as industry partner.',
  ],
  facts: [
    { term: 'Based in', detail: 'Nuremberg, Germany' },
    { term: 'Studying', detail: 'M.Sc. International Information Systems, FAU' },
    { term: 'Focus', detail: 'Digital business and digital transformation' },
    { term: 'Available', detail: 'Working student, through September 2027' },
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/PrathameshCoder' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/in/prathamesh-gongle' },
    { label: 'Behance', href: 'https://www.behance.net/prathamgongle' },
    { label: 'Music', href: 'https://beacons.ai/rhythmicchaos' },
  ],
}

// Skills that appear as labelled points in the 3D space, grouped the way the CV groups them.
export const skillGroups = [
  {
    id: 'ai',
    title: 'AI and automation',
    centre: [-2.5, 1.1, 0.3],
    skills: ['RAG', 'Embeddings', 'Prompt design', 'AI agents', 'Local models', 'ChatGPT', 'Claude', 'Cursor', 'Antigravity'],
  },
  {
    id: 'code',
    title: 'Programming',
    centre: [2.5, 1.0, -0.5],
    skills: ['Python', 'TypeScript', 'JavaScript', 'Next.js', 'React', 'REST APIs', 'MongoDB', 'Git and GitHub'],
  },
  {
    id: 'work',
    title: 'Tools and project work',
    centre: [0.2, -1.9, 0.7],
    skills: ['Jira', 'Confluence', 'Power BI', 'Excel', 'PowerPoint', 'Requirements analysis', 'Agile practices', 'Structured documentation'],
  },
]

export const languages = [
  { name: 'English', level: 'C1 (IELTS)' },
  { name: 'German', level: 'B1, improving' },
  { name: 'Hindi', level: 'Native' },
  { name: 'Marathi', level: 'Native' },
]

export const certification = { name: 'Google AI Essentials', date: 'June 2024' }

export const projects = [
  {
    id: 'documind',
    title: 'DocuMind AI',
    kind: 'RAG document Q&A assistant',
    year: '2026',
    stack: ['Python', 'Sentence Transformers', 'Streamlit', 'OpenRouter'],
    href: 'https://github.com/PrathameshCoder/DocuMind-AI-RAG',
    linkLabel: 'View the code on GitHub',
    problem:
      'Answers in company policy handbooks are scattered, and a plain LLM chat answers from general knowledge instead of the actual document.',
    result:
      'Moving from top-1 to top-3 retrieval recovered a fact the best single match missed: the EUR 1,000 training budget. Answers cite their source chunks, and an out-of-scope question correctly returned “not found”. Testing also exposed a wrong citation, which shaped the next version: showing retrieved sources and scores.',
    // A real sequence: the stages a question passes through.
    pipeline: [
      { name: 'Chunk', detail: 'The handbook is split into overlapping chunks with a custom chunker, so a sentence cut at a boundary still appears whole in a neighbour.' },
      { name: 'Embed', detail: 'Each chunk becomes a 384-dimensional vector using a MiniLM sentence-transformer model.' },
      { name: 'Retrieve', detail: 'The question is embedded the same way and the three chunks with the highest cosine similarity are selected.' },
      { name: 'Generate', detail: 'An LLM, called through OpenRouter, answers from a prompt in which every chunk carries its source label.' },
      { name: 'Cite', detail: 'A Streamlit web app shows the answer together with the chunks it was drawn from.' },
    ],
  },
  {
    id: 'agent',
    title: 'AI agent, local model and remote setup',
    kind: 'Self-initiated',
    year: 'June 2026',
    stack: ['Hermes agent', 'Telegram bot', 'Qwen', 'Tailscale'],
    problem: 'Recurring job searches were manual and repetitive.',
    built:
      'I configured a Hermes AI agent connected to a Telegram bot, ran a local AI model (Qwen), and turned an old laptop into a remote machine reached over Tailscale.',
    result:
      'Search results now reach me automatically on Telegram, and I gained hands-on experience with agents, local models and remote setups. I use ChatGPT, Claude, Cursor and Antigravity daily.',
  },
]

export const experience = [
  {
    title: 'Digital Transformation Project',
    role: 'Team lead',
    period: 'April to August 2026',
    org: 'Industry-partnered university project, FAU Erlangen-Nürnberg with Siemens AG',
    problem:
      'Siemens needed a clear view of platform governance, IP management and ecosystem control options for its digital ecosystem development.',
    built:
      'Led the student team, benchmarked digital leaders (Siemens, Bosch, Salesforce), kept status overviews and structured meeting notes, and aligned scope, priorities and expectations with the industry partners.',
    result:
      'Delivered structured presentations that summarised the findings for team and stakeholder formats and supported strategic decisions, within sprint timelines.',
  },
  {
    title: 'Collaborative Information Hub',
    role: 'Team lead',
    period: 'November 2025 to February 2026',
    org: 'Academic project, FAU Erlangen-Nürnberg, “Designing Technology” (grade 1.5)',
    problem:
      'A digital knowledge management solution was needed, based on real stakeholder requirements.',
    built:
      'Interviewed a stakeholder at Bechtle AG, turned the input into functional specifications, workflows and role permission models, and led a six-member team to build a Next.js, TypeScript and MongoDB Atlas prototype, documented in Jira and Confluence.',
    result:
      'A working end-to-end prototype validated the concept, and the final solution was presented to the academic supervisors.',
  },
]

export const education = [
  {
    degree: 'M.Sc. International Information Systems (Wirtschaftsinformatik)',
    school: 'Friedrich-Alexander-Universität Erlangen-Nürnberg (FAU), Germany',
    period: 'October 2024 to September 2027 (expected)',
    detail: 'Digital Change Management, Organizing for Digital Transformation, Service Innovation, Designing Technology.',
  },
  {
    degree: 'B.Sc. Computer Science',
    school: 'Savitribai Phule Pune University, India',
    period: 'August 2020 to June 2023',
  },
]


// ---------------------------------------------------------------------------
// v2 additions
// ---------------------------------------------------------------------------

export const hero = {
  kicker: 'Prathamesh Gongle, Nuremberg',
  title: 'AI prototypes and digital transformation',
  quote:
    'I build working AI tools and lead the teams that turn requirements into something people can use.',
  photoCaption: 'Prague, 2025',
}

// Headline numbers. Each one opens the chapter it comes from.
export const numbers = [
  { value: '5', label: 'ecosystem layers in our Siemens recommendation', target: 'siemens' },
  { value: '6', label: 'people in the team I led to build Cranberry', target: 'cranberry' },
  { value: '1.5', label: 'final grade, Designing Technology', target: 'cranberry' },
  { value: '384', label: 'dimensions per DocuMind embedding', target: 'ai' },
  { value: '3', label: 'chunks retrieved per answer, each one cited', target: 'ai' },
  { value: '3', label: 'access roles enforced on every Cranberry request', target: 'cranberry' },
]

// Sections that change the page accent as they scroll into view.
export const chapters = [
  { id: 'top', label: 'Index' },
  { id: 'numbers', label: 'In numbers' },
  { id: 'journey', label: 'Journey' },
  { id: 'siemens', label: 'Siemens' },
  { id: 'cranberry', label: 'Cranberry' },
  { id: 'ai', label: 'AI work' },
  { id: 'more', label: 'More' },
  { id: 'contact', label: 'Contact' },
]

// The timeline, one lane per kind of work. Dates are year-month.
export const timeline = {
  start: '2020-06',
  now: '2026-11',
  end: '2027-10',
  lanes: [
    {
      id: 'education',
      label: 'Education',
      items: [
        { label: 'B.Sc. Computer Science, Pune', from: '2020-08', to: '2023-06' },
        { label: 'M.Sc. Information Systems, FAU', from: '2024-10', to: '2027-09' },
      ],
    },
    {
      id: 'projects',
      label: 'Team projects',
      items: [
        { label: 'Cranberry hub', from: '2025-11', to: '2026-02', target: 'cranberry' },
        { label: 'Siemens DTP', from: '2026-04', to: '2026-08', target: 'siemens', row: 1 },
      ],
    },
    {
      id: 'ai',
      label: 'AI builds',
      items: [
        { label: 'Google AI Essentials', from: '2024-06', to: '2024-07' },
        // the CV gives only the year for DocuMind, so it is drawn as a dashed span across 2026
        { label: 'DocuMind AI', from: '2026-01', to: '2026-12', yearOnly: true, target: 'ai' },
        { label: 'Agent setup', from: '2026-06', to: '2026-07', target: 'ai', row: 1 },
      ],
    },
  ],
}

// Siemens Digital Transformation Project: the layered recommendation from the final presentation.
export const siemens = {
  title: 'Digital Transformation Project with Siemens',
  period: 'April to August 2026',
  role: 'Team lead. I co-wrote the business model transformation and wrote the customer value transformation and the final recommendation.',
  team: 'Six students, FAU Chair of Information Systems with Siemens AG',
  question: 'Should Siemens build its software-defined automation platform as an open or a closed ecosystem?',
  answer: 'Open where value is created. Closed where trust is required.',
  context: [
    'Industrial automation is moving from hardware to software: virtual PLCs, edge AI and platforms. For Siemens the hard part is making that shift without weakening the hardware business that pays for it.',
    'We benchmarked GE Predix, Cisco Fog, Schneider Electric EcoStruxure and Siemens Xcelerator layer by layer, then compared building the platform (Siemens) with allying for it (Rockwell and PTC).',
  ],
  // L5 at the top, L1 at the bottom, as on the slides.
  layers: [
    {
      id: 'L5',
      name: 'Customer data rights',
      stance: 'Customer-controlled',
      openness: 0.85,
      mechanism: 'An industrial data contract that sets out who owns raw production data, analytics outputs and benchmarks.',
      gap: 'Data governance ambiguity, and one-size-fits-all openness',
      impact: 'More customer trust, faster enterprise adoption, new data-based revenue',
      tiers: ['Private data for enterprises', 'Anonymous benchmarking for the mid-market', 'Collaborative sharing for SMEs'],
    },
    {
      id: 'L4',
      name: 'Marketplace and apps',
      stance: 'Curated open',
      openness: 0.75,
      mechanism: 'A curated marketplace with mandatory sandbox testing before listing and a Siemens quality badge.',
      gap: 'Low-quality apps entering the ecosystem',
      impact: 'Higher customer trust and marketplace adoption',
    },
    {
      id: 'L3',
      name: 'Partner ecosystem',
      stance: 'Tiered and certified',
      openness: 0.6,
      mechanism: 'A three-step partner model, from sandbox, to certified, to strategic co-sell partner.',
      gap: 'Partner onboarding friction and limited scalability',
      impact: 'A larger developer ecosystem and more marketplace participation',
      tiers: ['Sandbox', 'Certified', 'Strategic co-sell'],
    },
    {
      id: 'L2',
      name: 'API layer',
      stance: 'Open and governed',
      openness: 0.5,
      mechanism: 'Tiered API access (sandbox and certified), OAuth 2.0 with audit logging, SLA-backed APIs.',
      gap: 'Partner onboarding friction',
      impact: 'Faster ISV growth, lower onboarding cost, more ecosystem innovation',
    },
    {
      id: 'L1',
      name: 'Hardware control and safety',
      stance: 'Closed',
      openness: 0.05,
      mechanism: 'A proprietary firmware release pipeline, certified to IEC 62443 and SIL 2/3.',
      gap: 'Accountability: a third-party change here could stop production or put workers at risk',
      impact: 'Keeps safety certification and premium hardware positioning',
    },
  ],
  // Business model shift (slide 14) and customer value shift (slide 15).
  shift: {
    from: { label: 'Today', line: 'Sell hardware, earn once' },
    to: { label: 'With the platform', line: 'Own the platform, earn continuously' },
    revenue: ['SaaS subscriptions', 'Marketplace commissions', 'API and platform fees', 'Predictive analytics', 'Digital twin services', 'Industrial data products'],
    value: ['Higher uptime', 'Better efficiency', 'Improved quality', 'Energy optimisation', 'Faster innovation', 'Lower integration risk'],
  },
  benchmark: [
    { name: 'GE Predix', note: 'Restricted at every layer above hardware. The failure case.' },
    { name: 'Cisco Fog', note: 'Governed APIs and software, curated marketplace and partners.' },
    { name: 'Schneider EcoStruxure', note: 'Same pattern: closed hardware, governed middle, curated edges.' },
    { name: 'Siemens Xcelerator', note: 'Already practises controlled openness. Our recommendation sharpens it.' },
  ],
}

// Cranberry: the collaborative information hub from Designing Technology.
export const cranberry = {
  title: 'Cranberry, a collaborative information hub',
  period: 'November 2025 to February 2026',
  role: 'Team lead of six. Requirements, specifications and the authentication and access layer.',
  stack: ['Next.js 16', 'TypeScript', 'Prisma', 'MongoDB Atlas', 'bcrypt', 'shadcn/ui'],
  href: 'https://github.com/PrathameshCoder/cranberry-dashboard',
  summary:
    'An internal knowledge base for a university or company. Staff sign in with their institutional email, see only what their role allows, and capture what they know as searchable entries with tags and an impact level.',
  origin:
    'It started with a stakeholder interview at Bechtle AG. I turned the findings into functional specifications, workflows and a role permission model, then led the build, tracked in Jira and documented in Confluence.',
  // What happens when someone signs in, in order.
  flow: [
    { name: 'Email check', detail: 'Only institutional addresses (fau.de) get past the login form.' },
    { name: 'Password', detail: 'The password is compared with a bcrypt hash. Disabled accounts are refused.' },
    { name: 'Session', detail: 'A random 32-byte token is stored in the database and set as an HttpOnly cookie.' },
    { name: 'Middleware', detail: 'Every page request is checked for a session before anything renders.' },
    { name: 'First login', detail: 'New accounts are sent to change their password before they can go anywhere else.' },
    { name: 'Dashboard', detail: 'The knowledge base, filtered by what the role is allowed to do.' },
  ],
  roles: ['Employee', 'HR', 'Admin'],
  permissions: [
    { action: 'Read the knowledge base', roles: ['Employee', 'HR', 'Admin'] },
    { action: 'Add knowledge entries', roles: ['Employee', 'HR', 'Admin'] },
    { action: 'Search by title, summary or tag', roles: ['Employee', 'HR', 'Admin'] },
    { action: 'Create user accounts', roles: ['HR', 'Admin'] },
    { action: 'Reset passwords and disable accounts', roles: ['HR', 'Admin'] },
    { action: 'Assign roles', roles: ['HR', 'Admin'] },
  ],
  // Sample entries for the interactive demo (illustrative, not real data).
  entries: [
    { title: 'Onboarding checklist for new hires', summary: 'Accounts, equipment and the first-week schedule in one place.', tags: ['hr', 'onboarding'], impact: 'HIGH', author: 'HR team' },
    { title: 'How we run sprint reviews', summary: 'Agenda, timing and who presents what.', tags: ['agile', 'process'], impact: 'MEDIUM', author: 'Project office' },
    { title: 'VPN setup on university laptops', summary: 'Step by step, including the certificate import.', tags: ['it', 'setup'], impact: 'MEDIUM', author: 'IT support' },
    { title: 'Stakeholder interview template', summary: 'The question set we used with Bechtle AG.', tags: ['requirements', 'research'], impact: 'HIGH', author: 'Prathamesh' },
    { title: 'Room booking rules', summary: 'Who can book which rooms, and for how long.', tags: ['facilities'], impact: 'LOW', author: 'Facilities' },
    { title: 'Confluence page structure', summary: 'Where specs, decisions and meeting notes live.', tags: ['documentation', 'process'], impact: 'MEDIUM', author: 'Project office' },
  ],
}

export const contacts = [
  { label: 'Email', value: 'prathameshgongle.j@gmail.com', href: 'mailto:prathameshgongle.j@gmail.com' },
  { label: 'LinkedIn', value: 'prathamesh-gongle', href: 'https://www.linkedin.com/in/prathamesh-gongle' },
  { label: 'GitHub', value: 'PrathameshCoder', href: 'https://github.com/PrathameshCoder' },
  { label: 'Behance', value: 'prathamgongle', href: 'https://www.behance.net/prathamgongle' },
]


// ---------------------------------------------------------------------------
// One-minute summaries: what the project was, what I did, what came out of it.
// ---------------------------------------------------------------------------
export const summaries = {
  siemens: {
    brief: 'A university project with Siemens AG: should Siemens build its software-defined automation platform as an open or a closed ecosystem?',
    did: 'Led a team of six. Co-wrote the business model transformation, and wrote the customer value transformation and the final recommendation.',
    outcomes: [
      'Recommended controlled openness: open where value is created, closed where trust is required',
      'Benchmarked GE Predix, Cisco, Schneider Electric and Siemens layer by layer',
      'Identified six new platform revenue streams for Siemens',
    ],
  },
  cranberry: {
    brief: 'An internal knowledge hub for a university or company, built for the Designing Technology course at FAU.',
    did: 'Led a team of six. Interviewed a stakeholder at Bechtle AG, wrote the specifications and the role model, and led the build.',
    outcomes: [
      'A working end-to-end prototype in Next.js, TypeScript and MongoDB',
      'Three roles enforced on every request, with sign-in limited to institutional email',
      'Course grade 1.5',
    ],
  },
  documind: {
    brief: 'A question-answering assistant for policy handbooks that answers only from the document and cites its sources.',
    did: 'Built the whole RAG pipeline in Python without a framework: chunking, embeddings, retrieval, prompting and a Streamlit app.',
    outcomes: [
      'Top-3 retrieval recovered a fact the best single match missed',
      'Questions outside the handbook correctly returned “not found”',
      'A wrong citation found in testing shaped the next version',
    ],
  },
  agent: {
    brief: 'A personal setup that runs my recurring job search and reports back to me.',
    did: 'Configured a Hermes AI agent with a Telegram bot, ran Qwen locally, and turned an old laptop into a remote machine over Tailscale.',
    outcomes: ['Search results arrive on Telegram automatically', 'Hands-on experience with agents, local models and remote setups'],
  },
}
