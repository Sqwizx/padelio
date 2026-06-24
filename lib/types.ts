export interface Program {
  slug: string;
  title: string;
  subtitle: string;
  tags: string[];
  desc: string;
  img: string;
  imgAlt: string;
}

export interface Plan {
  name: string;
  price: string;
  period: string;
  features: string[];
  cta: string;
  accent?: boolean;
  dark?: boolean;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  avatar: string;
}

export interface Stat {
  value: string;
  numericValue: number;
  suffix: string;
  label: string;
}

export interface Story {
  cat: string;
  title: string;
  img: string;
  alt: string;
}

export interface Benefit {
  iconName: 'Zap' | 'Users' | 'Star';
  title: string;
  desc: string;
}

export interface CourtType {
  name: string;
  note: string;
}

export interface FooterColumn {
  heading: string;
  links: { label: string; href: string }[];
}
