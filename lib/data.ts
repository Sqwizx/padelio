import type { Program, Plan, Testimonial, Stat, Story, Benefit, CourtType, FooterColumn } from './types';

export const programs: Program[] = [
  {
    slug: 'beginners',
    title: 'For Beginners',
    subtitle: 'Start your padel journey',
    tags: ['Confidence Building', 'Fundamentals', 'Ball Control', 'Court Awareness'],
    desc: 'Perfect for those new to padel. Our structured beginner program covers all the basics — grip, stance, serve, and rally — in a fun, welcoming environment.',
    img: '/images/programs-beginners.jpg',
    imgAlt: 'Beginner padel session',
  },
  {
    slug: 'juniors',
    title: 'For Junior & Kids',
    subtitle: 'Fun-first learning for ages 6–16',
    tags: ['Fun Learning', 'Coordination', 'Team Spirit', 'Motor Skills'],
    desc: 'Designed for young players aged 6–16, this program blends skill development with games that keep kids engaged, active, and coming back for more.',
    img: '/images/programs-juniors.jpg',
    imgAlt: 'Junior padel training',
  },
  {
    slug: 'adults',
    title: 'For Adults',
    subtitle: 'Fitness and technique in balance',
    tags: ['Fitness Focus', 'Technique', 'Strategy', 'Social Play'],
    desc: 'Our adult program combines cardio fitness with tactical padel skills. Suitable for all fitness levels — play at your own pace and improve every session.',
    img: '/images/programs-adults.jpg',
    imgAlt: 'Adult padel class',
  },
  {
    slug: 'professionals',
    title: 'For Professionals',
    subtitle: 'Compete at the next level',
    tags: ['Advanced Tactics', 'Competition Prep', 'Performance', 'Match Play'],
    desc: 'For competitive players looking to sharpen their game. Intensive sessions focus on tournament-level tactics, mental resilience, and physical conditioning.',
    img: '/images/programs-professionals.jpg',
    imgAlt: 'Professional padel training',
  },
  {
    slug: 'elite',
    title: 'Elite 1-on-1',
    subtitle: 'Personalized coaching at its finest',
    tags: ['Personalized Training', 'Mental Game', 'Peak Performance', 'Video Analysis'],
    desc: 'One-on-one sessions with our top coaches. Every drill, every rep is tailored to your specific weaknesses and goals. The fastest way to elevate your game.',
    img: '/images/programs-elite.jpg',
    imgAlt: 'Elite one-on-one coaching',
  },
];

export const plans: Plan[] = [
  {
    name: 'Starter',
    price: '€29',
    period: '/mo',
    features: [
      '2 court bookings per month',
      'Access to group sessions',
      'Locker room access',
      'Member app access',
    ],
    cta: 'Get Started',
  },
  {
    name: 'Pro',
    price: '€79',
    period: '/mo',
    features: [
      '8 court bookings per month',
      'Unlimited group sessions',
      'Priority court booking',
      'Coaching discount 20%',
      'Guest passes x2/month',
    ],
    cta: 'Get Started',
    accent: true,
  },
  {
    name: 'Elite',
    price: '€149',
    period: '/mo',
    features: [
      'Unlimited court bookings',
      'All group sessions included',
      'Monthly 1-on-1 coaching',
      'Coaching discount 40%',
      'Unlimited guest passes',
      'Dedicated locker',
    ],
    cta: 'Get Started',
    dark: true,
  },
];

export const testimonials: Testimonial[] = [
  {
    quote: 'Padelio completely changed how I spend my weekends. The courts are world-class and the coaching staff genuinely cares about your progress.',
    name: 'Sofia Merano',
    role: 'Pro Member',
    avatar: '/images/avatar-1.jpg',
  },
  {
    quote: 'My kids beg to come every week. The junior program is so well structured — they\'ve improved more in 3 months than I expected in a year.',
    name: 'David Keller',
    role: 'Member of Club',
    avatar: '/images/avatar-2.jpg',
  },
  {
    quote: 'Best sports investment I\'ve made. The Elite membership pays for itself with the 1-on-1 sessions alone. Absolutely recommend.',
    name: 'Amara Diallo',
    role: 'Elite Member',
    avatar: '/images/avatar-3.jpg',
  },
];

export const stats: Stat[] = [
  { value: '2018', numericValue: 2018, suffix: '', label: 'Founded' },
  { value: '300+', numericValue: 300, suffix: '+', label: 'Members' },
  { value: '18', numericValue: 18, suffix: '', label: 'Courts' },
  { value: '5★', numericValue: 5, suffix: '★', label: 'Rating' },
  { value: '40+', numericValue: 40, suffix: '+', label: 'Sessions/wk' },
  { value: '12', numericValue: 12, suffix: '', label: 'Pro Coaches' },
];

export const stories: Story[] = [
  { cat: 'Coaching', title: 'How our coaches build champions', img: '/images/story-coaching.jpg', alt: 'Coaching session' },
  { cat: 'Community', title: 'A community that celebrates together', img: '/images/story-community.jpg', alt: 'Community event' },
  { cat: 'Training', title: 'Training methods that deliver results', img: '/images/story-training.jpg', alt: 'Training' },
  { cat: 'Courts', title: 'Our courts — built for performance', img: '/images/story-courts.jpg', alt: 'Padel court' },
];

export const benefits: Benefit[] = [
  { iconName: 'Zap', title: 'Full-Body Workout', desc: 'Padel engages every muscle group. Improve agility, strength, and endurance in every match.' },
  { iconName: 'Users', title: 'Vibrant Community', desc: 'Join a welcoming network of players. Make friends, find partners, and enjoy social events year-round.' },
  { iconName: 'Star', title: 'For All Ages', desc: 'From 6 to 60+, padel is accessible to everyone. Our programs adapt to any fitness level and skill.' },
];

export const courtTypes: CourtType[] = [
  { name: 'Glass-Back Courts', note: 'Indoor climate-controlled' },
  { name: 'Open-Air Courts', note: 'Floodlit for evening play' },
  { name: 'Clay Surface Courts', note: 'Softer on joints' },
  { name: 'Synthetic Turf', note: 'All-weather performance' },
];

export const floatingTags: string[] = [
  'Best Courts', 'Amazing Coaches', 'Great Community', 'Top Equipment',
  'World-Class Facilities', 'Friendly Staff', 'Perfect for Families', 'Competitive Play',
];

export const footerColumns: FooterColumn[] = [
  {
    heading: 'Academy',
    links: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Coaches', href: '/about#coaches' },
      { label: 'Mission', href: '/about#mission' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    heading: 'Programs',
    links: [
      { label: 'Beginners', href: '/programs/beginners' },
      { label: 'Juniors', href: '/programs/juniors' },
      { label: 'Adults', href: '/programs/adults' },
      { label: 'Professionals', href: '/programs/professionals' },
      { label: 'Elite 1-on-1', href: '/programs/elite' },
    ],
  },
  {
    heading: 'Booking',
    links: [
      { label: 'Book a Court', href: '/courts' },
      { label: 'Court Types', href: '/courts#types' },
      { label: 'Membership', href: '/membership' },
      { label: 'Programs', href: '/programs' },
    ],
  },
  {
    heading: 'Connect',
    links: [
      { label: 'Instagram', href: '#' },
      { label: 'Twitter / X', href: '#' },
      { label: 'Facebook', href: '#' },
      { label: 'LinkedIn', href: '#' },
    ],
  },
];
