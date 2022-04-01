import axios from 'axios';

const baseURL = 'https://jsonmock.hackerrank.com';
const client = axios.create({ baseURL });

type Article = {
  title: string | null;
  url: string | null;
  author: string;
  num_comments: number | null;
  story_id: null;
  story_title: string | null;
  story_url: string | null;
  parent_id: number;
  created_at: number;
};

type Meta = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
};

type Articles = Meta & {
  data: Article[];
};

type ParsedArticle = {
  title: string;
  comments: number;
};

const getArticles = (page: number) => {
  return client.get<Articles>('/api/articles', { params: { page } });
};

const parseTitle = (article: Article) => {
  return article.title || article.story_title || '';
};

const sort = (a: ParsedArticle, b: ParsedArticle) => {
  if (a.comments === b.comments) {
    if (a.title > b.title) return -1;
    else if (a.title < b.title) return 1;
    return 0;
  }

  if (a.comments > b.comments) return -1;

  return 1;
};

const fetchAllArtices = async (totalPages: number) => {
  let articles: Article[] = [];
  const pages = Array(totalPages).fill(null);

  try {
    await Promise.all(
      pages.map(async (_, i) => {
        const { data } = await getArticles(i + 1);
        data.data.forEach(a => articles.push(a));
      })
    );

    return articles;
  } catch (error) {
    throw error;
  }
};

const topArticles = async (limit: number) => {
  if (limit <= 0) return [];

  try {
    const { data: initialRequest } = await getArticles(1);
    // let articles: Article[] = [];

    // articles = articles.concat(initialRequest.data);
    // // start at 2 since page 1 has already been fetched
    // for (let i = 2; i <= initialRequest.total_pages; i += 1) {
    //   const { data: newRequest } = await getArticles(i);
    //   articles = articles.concat(newRequest.data);
    // }

    const articles = await fetchAllArtices(initialRequest.total_pages);

    const parsedArticles = articles.map<ParsedArticle>(article => ({
      comments: article.num_comments || 0,
      title: parseTitle(article),
    }));
    parsedArticles.sort(sort);
    parsedArticles.splice(limit);

    return parsedArticles.map(article => article.title);
  } catch (error) {
    console.log(error);
  }
};

topArticles(2).then(console.log);
