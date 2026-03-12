import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Sparkles, Heart, Search, Loader2, ChevronLeft, ChevronRight, Library } from "lucide-react";
import { Link } from "react-router-dom";
import { searchBooks, browseBooks, getRecommendations, SUBJECTS, type Book } from "@/data/books";
import BookCard from "@/components/BookCard";
import heroBg from "@/assets/hero-bg.png";

const Index = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [likedKeys, setLikedKeys] = useState<string[]>(() => {
    try { return JSON.parse(localStorage.getItem("shelfpick-liked-keys") || "[]"); } catch { return []; }
  });
  const [likedBooks, setLikedBooks] = useState<Book[]>(() => {
    try { return JSON.parse(localStorage.getItem("shelfpick-liked-books") || "[]"); } catch { return []; }
  });
  const [selectedSubject, setSelectedSubject] = useState<string | null>("Fiction");
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);
  const [searchTimeout, setSearchTimeout] = useState<ReturnType<typeof setTimeout> | null>(null);

  const fetchBooks = useCallback(async (q: string, subject: string | null, pg: number) => {
    setLoading(true);
    try {
      const result = q
        ? await searchBooks(q, pg, 60)
        : await browseBooks(subject || "Fiction", pg, 60);
      setBooks(result.books);
      setTotal(result.total);
    } catch {
      setBooks([]);
      setTotal(0);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!showRecommendations) {
      fetchBooks(query, selectedSubject, page);
    }
  }, [selectedSubject, page, showRecommendations, fetchBooks]);

  useEffect(() => {
    if (showRecommendations) return;
    if (searchTimeout) clearTimeout(searchTimeout);
    const t = setTimeout(() => {
      setPage(1);
      fetchBooks(query, selectedSubject, 1);
    }, 400);
    setSearchTimeout(t);
    return () => clearTimeout(t);
  }, [query]);

  const toggleLike = (key: string) => {
    setLikedKeys((prev) => {
      const isRemoving = prev.includes(key);
      const next = isRemoving ? prev.filter((k) => k !== key) : [...prev, key];
      localStorage.setItem("shelfpick-liked-keys", JSON.stringify(next));
      if (!isRemoving) {
        const book = books.find((b) => b.key === key);
        if (book) setLikedBooks((lb) => {
          const updated = [...lb.filter((b) => b.key !== key), book];
          localStorage.setItem("shelfpick-liked-books", JSON.stringify(updated));
          return updated;
        });
      } else {
        setLikedBooks((lb) => {
          const updated = lb.filter((b) => b.key !== key);
          localStorage.setItem("shelfpick-liked-books", JSON.stringify(updated));
          return updated;
        });
      }
      return next;
    });
  };

  const recommendations = getRecommendations(likedBooks, books);
  const displayBooks = showRecommendations ? recommendations : books;
  const displayTotal = showRecommendations ? recommendations.length : total;
  const totalPages = showRecommendations ? 1 : Math.ceil(total / 60);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [page]);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero */}
      <div className="relative h-[50vh] min-h-[400px] overflow-hidden">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-background/70 to-background" />
        
        {/* Gold accent line */}
        <div className="absolute bottom-0 left-0 right-0 gold-line" />
        
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-display font-bold text-foreground mb-4 tracking-tight">
              Shelf<span className="text-gradient">Pick</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-md mx-auto font-light">
              Curated recommendations for the discerning reader
            </p>
          </motion.div>
        </div>
      </div>

      {/* Navigation bar */}
      <div className="sticky top-0 z-30 bg-background/80 backdrop-blur-xl border-b border-border">
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Mode toggle */}
            <div className="flex gap-1 p-1 rounded-lg bg-secondary/50">
              <button
                onClick={() => setShowRecommendations(false)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  !showRecommendations
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <BookOpen className="h-4 w-4" />
                Discover
              </button>
              <button
                onClick={() => setShowRecommendations(true)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  showRecommendations
                    ? "bg-primary text-primary-foreground shadow-glow"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <Sparkles className="h-4 w-4" />
                For You
                {likedKeys.length > 0 && (
                  <span className="ml-1 px-1.5 py-0.5 rounded-full bg-background/20 text-[10px]">
                    {likedKeys.length}
                  </span>
                )}
              </button>
            </div>

            {/* Search */}
            {!showRecommendations && (
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search titles, authors..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-lg bg-secondary/50 text-foreground text-sm placeholder:text-muted-foreground border border-transparent focus:border-primary/30 focus:outline-none transition-colors"
                />
              </div>
            )}

            <div className="flex items-center gap-4 lg:ml-auto">
              {likedKeys.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 text-sm"
                >
                  <Heart className="h-4 w-4 fill-primary text-primary" />
                  <span className="text-muted-foreground">{likedKeys.length} liked</span>
                </motion.div>
              )}

              <Link
                to="/bookshelf"
                className="flex items-center gap-2 px-4 py-2 rounded-lg border border-primary/30 text-primary hover:bg-primary/10 text-sm font-medium transition-all"
              >
                <Library className="h-4 w-4" />
                My Shelf
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Subject filter */}
      {!showRecommendations && (
        <div className="border-b border-border/50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {(SUBJECTS as readonly string[]).map((subject) => (
                <button
                  key={subject}
                  onClick={() => {
                    setSelectedSubject(subject);
                    setQuery("");
                    setPage(1);
                  }}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    selectedSubject === subject
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/30 text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {subject}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24">
            <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
            <p className="text-sm text-muted-foreground">Curating your selection...</p>
          </div>
        )}

        {/* Empty recommendations */}
        {showRecommendations && likedKeys.length === 0 && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24"
          >
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
              <Heart className="h-8 w-8 text-muted-foreground" />
            </div>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-3">
              Your taste, your picks
            </h2>
            <p className="text-muted-foreground max-w-sm mx-auto">
              Like books while browsing and we'll craft personalized recommendations just for you.
            </p>
          </motion.div>
        )}

        {/* Book Grid */}
        {!loading && displayBooks.length > 0 && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">
                  {showRecommendations ? "Recommended for You" : selectedSubject}
                </h2>
                <p className="text-sm text-muted-foreground mt-1">
                  {displayTotal.toLocaleString()} title{displayTotal !== 1 && "s"}
                </p>
              </div>
              {totalPages > 1 && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    disabled={page === 1}
                    className="p-2 rounded-lg border border-border text-muted-foreground disabled:opacity-30 hover:text-foreground hover:border-primary/30 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <span className="text-sm text-muted-foreground min-w-[60px] text-center">
                    {page} / {totalPages}
                  </span>
                  <button
                    onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                    disabled={page === totalPages}
                    className="p-2 rounded-lg border border-border text-muted-foreground disabled:opacity-30 hover:text-foreground hover:border-primary/30 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={`${showRecommendations}-${selectedSubject}-${query}-${page}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4"
              >
                {displayBooks.map((book, i) => (
                  <BookCard
                    key={book.key}
                    book={book}
                    isLiked={likedKeys.includes(book.key)}
                    onToggleLike={toggleLike}
                    index={i}
                  />
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Bottom pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-10">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground disabled:opacity-30 hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 rounded-lg border border-border text-sm text-muted-foreground disabled:opacity-30 hover:text-foreground hover:border-primary/30 transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}

        {!loading && displayBooks.length === 0 && !showRecommendations && (
          <div className="text-center py-24">
            <p className="text-muted-foreground">No books found. Try a different search.</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              <span className="font-display text-lg font-semibold">ShelfPick</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Powered by Open Library · Crafted for book lovers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
