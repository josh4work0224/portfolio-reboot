import { sanityClient } from "../lib/sanity.client";

// 統一的項目查詢 - 支援獲取所有項目或單一項目
const projectQuery = (slug?: string) => {
  const baseFields = `
    _id,
    title,
    slug,
    client,
    clientLogo{
      asset->{
        _id,
        url
      }
    },
    publishDate,
    overview,
    background,
    thumbnail{
      asset->{
        _id,
        url
      }
    },
    hero{
      asset->{
        _id,
        url
      }
    },
    category[]->{
      _id,
      title
    },
    tool[]->{
      _id,
      name
    },
    myRole[]->{
      _id,
      name
    },
    painpoint[]{
      title,
      description[]{
        ...,
      }
    },
    strategy[]{
      title,
      description[]{
        ...,
      }
    },
    solution[]{
      description[]{
        ...,
      }
    },
    result[]{
      ...,
    },
    gallery[]{
      asset->{
        _id,
        url
      }
    },
    color,
    isFeatured,
    websiteUrl,
    nextProject[]->{
      _id,
      title,
      slug,
      client,
      category[]->{
        _id,
        title
      },
      thumbnail{
        asset->{
          _id,
          url
        }
      },
      color
    }
  `;

  if (slug) {
    // 獲取單一項目
    return `*[_type == "project" && slug.current == $slug][0]{${baseFields}}`;
  } else {
    // 獲取所有項目，按創建時間排序
    return `*[_type == "project"] | order(publishDate desc){${baseFields}}`;
  }
};

// 統一的項目數據獲取函數
export async function projectData(slug?: string) {
  const query = projectQuery(slug);
  const params = slug ? { slug } : {};

  return await sanityClient.fetch(query, params);
}
