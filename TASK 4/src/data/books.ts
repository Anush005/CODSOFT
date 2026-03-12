export interface Book {
  key: string; // Open Library work key e.g. "/works/OL123W"
  title: string;
  authors: string[];
  firstPublishYear: number;
  subjects: string[];
  coverId: number | null;
  editionCount: number;
}

export const SUBJECTS = [
  "Fiction", "Fantasy", "Science Fiction", "Mystery", "Romance",
  "Thriller", "Horror", "Historical Fiction", "Biography", "Self-Help",
  "Poetry", "Philosophy", "Psychology", "Children", "Young Adult",
  "Adventure", "Humor", "Classics"
] as const;

const OL_SEARCH = "https://openlibrary.org/search.json";

export function getCoverUrl(coverId: number, size: "S" | "M" | "L" = "M"): string {
  return `https://covers.openlibrary.org/b/id/${coverId}-${size}.jpg`;
}

function mapDoc(doc: any): Book {
  return {
    key: doc.key,
    title: doc.title || "Untitled",
    authors: doc.author_name?.slice(0, 3) || [],
    firstPublishYear: doc.first_publish_year || 0,
    subjects: doc.subject?.slice(0, 10).map((s: string) => s.trim()) || [],
    coverId: doc.cover_i || null,
    editionCount: doc.edition_count || 0,
  };
}

export async function searchBooks(query: string, page = 1, limit = 60): Promise<{ books: Book[]; total: number }> {
  const params = new URLSearchParams({
    q: query,
    page: String(page),
    limit: String(limit),
    fields: "key,title,author_name,first_publish_year,subject,cover_i,edition_count",
    lang: "en",
  });
  const res = await fetch(`${OL_SEARCH}?${params}`);
  const data = await res.json();
  return {
    books: (data.docs || []).map(mapDoc),
    total: data.numFound || 0,
  };
}

export async function browseBooks(subject: string, page = 1, limit = 60): Promise<{ books: Book[]; total: number }> {
  const params = new URLSearchParams({
    q: `subject:${subject}`,
    page: String(page),
    limit: String(limit),
    fields: "key,title,author_name,first_publish_year,subject,cover_i,edition_count",
    sort: "editions",
    lang: "en",
  });
  const res = await fetch(`${OL_SEARCH}?${params}`);
  const data = await res.json();
  return {
    books: (data.docs || []).map(mapDoc),
    total: data.numFound || 0,
  };
}

export function getRecommendations(likedBooks: Book[], allBooks: Book[]): Book[] {
  if (likedBooks.length === 0) return [];

  // Build subject affinity scores from liked books
  const subjectScores: Record<string, number> = {};
  const authorScores: Record<string, number> = {};
  likedBooks.forEach((book) => {
    book.subjects.forEach((s) => {
      subjectScores[s.toLowerCase()] = (subjectScores[s.toLowerCase()] || 0) + 1;
    });
    book.authors.forEach((a) => {
      authorScores[a.toLowerCase()] = (authorScores[a.toLowerCase()] || 0) + 2;
    });
  });

  const likedKeys = new Set(likedBooks.map((b) => b.key));

  return allBooks
    .filter((b) => !likedKeys.has(b.key))
    .map((book) => {
      let score = 0;
      book.subjects.forEach((s) => {
        score += subjectScores[s.toLowerCase()] || 0;
      });
      book.authors.forEach((a) => {
        score += authorScores[a.toLowerCase()] || 0;
      });
      return { book, score };
    })
    .filter((c) => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 50)
    .map((c) => c.book);
}
