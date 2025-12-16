// Strapi Response Types
export interface StrapiMeta {
  pagination?: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiCollectionResponse<T> {
  data: T[];
  meta: StrapiMeta;
}

// Media Types
export interface TImage {
  id: number;
  documentId: string;
  alternativeText: string | null;
  url: string;
  width?: number;
  height?: number;
}

// Common Types
export interface TLink {
  id: number;
  href: string;
  label: string;
  isExternal: boolean;
  type: string | null;
}

export interface TCard {
  id: number;
  heading: string;
  text: string;
}

export interface TTag {
  id: number;
  documentId: string;
  title: string;
}

export interface TAuthor {
  id: number;
  documentId: string;
  fullName: string;
  bio?: string;
  image?: TImage;
}

// Block Types
export interface IHero {
  __component: "blocks.hero";
  id: number;
  subHeading?: string;
  heading: string;
  highlightedText?: string;
  text: string;
  links: TLink[];
  image: TImage;
}

export interface ISectionHeading {
  __component: "blocks.section-heading";
  id: number;
  subHeading: string;
  heading: string;
}

export type TCardGridItem = TCard & {
  icon?: TImage;
};

export interface ICardGrid {
  __component: "blocks.card-grid";
  id: number;
  subHeading?: string;
  heading?: string;
  cards: TCardGridItem[];
}

export interface IContentWithImage {
  __component: "blocks.content-with-image";
  id: number;
  reversed: boolean;
  heading: string;
  subHeading?: string;
  content: string;
  link?: TLink;
  image: TImage;
}

export interface IMarkdownText {
  __component: "blocks.markdown";
  id: number;
  content: string;
}

export interface IFaqItem {
  id: number;
  heading: string;
  text: string;
}

export interface IFaqs {
  __component: "blocks.faqs";
  id: number;
  heading?: string;
  subHeading?: string;
  faq: IFaqItem[];
}

export type Block =
  | IHero
  | ISectionHeading
  | ICardGrid
  | IContentWithImage
  | IMarkdownText
  | IFaqs;

// Page Types
export interface LandingPage {
  id: number;
  documentId: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  blocks: Block[];
}

// Article Types
export interface Article {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  featuredImage?: TImage;
  author?: TAuthor;
  contentTags?: TTag[];
}