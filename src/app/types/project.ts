// 共用的 Types 定義 (types/project.ts)
export interface RichTextBlock {
  _key: string;
  _type: "block";
  style?: string;
  children: { text: string }[];
}

export interface SectionItem {
  title?: string;
  description: RichTextBlock[];
}

export interface GalleryImage {
  asset: {
    _id?: string;
    url: string;
  };
}

export interface GalleryColsProps {
  image1?: GalleryImage;
  image2?: GalleryImage;
  backgroundColor?: string;
  className?: string;
}

export interface ProjectImageDetailsProps {
  image1?: GalleryImage;
  image2?: GalleryImage;
  image3?: GalleryImage;
  backgroundColor?: string;
  className?: string;
}

export interface ImageItem {
  _id: string;
  title: string;
  gallery?: {
    asset: { url: string };
  }[];
}

export interface ProjectContent {
  background?: RichTextBlock[];
  painpoint?: SectionItem[];
  strategy?: SectionItem[];
  solution?: { description: RichTextBlock[] }[];
  result?: RichTextBlock[];
  gallery?: { asset: { url: string } }[];
  nextProject?: ProjectMain[];
}

export interface ProjectMain {
  _id: string;
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
  client: string;
  category: { _id: string; title: string }[];
  overview?: string;
  background?: string;
  color?: string;
  hero?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  thumbnail?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  tool?: Array<{
    _id: string;
    name: string;
  }>;
  myRole?: Array<{
    _id: string;
    name: string;
  }>;
  publishDate?: string;
  websiteUrl?: string;
  isFeatured?: boolean;
  nextProject?: Array<{
    _id: string;
    name: string;
  }>;
}

export interface ProjectArchive {
  _id: string;
  slug: {
    _type: "slug";
    current: string;
  };
  title: string;
  client: string;
  category: { _id: string; title: string }[];
  background?: string;
  thumbnail?: {
    asset: {
      _id: string;
      url: string;
    };
  };
  isFeatured?: boolean;
  publishDate?: string;
}
