import { Heart, BookOpen, Plus, Check, Bookmark, BookMarked, CheckCircle, ListTodo, type LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import type { Book } from "@/data/books";
import { getCoverUrl } from "@/data/books";
import { useBookshelf } from "@/contexts/BookshelfContext";

interface BookCardProps {
  book: Book;
  isLiked: boolean;
  onToggleLike: (key: string) => void;
  index?: number;
  hideActions?: boolean;
}

const listIconMap: Record<string, LucideIcon> = {
  bookmark: Bookmark,
  "book-open": BookMarked,
  "check-circle": CheckCircle,
  "list-todo": ListTodo,
};

const BookCard = ({ book, isLiked, onToggleLike, index = 0, hideActions = false }: BookCardProps) => {
  const { lists, addBookToList, getListsForBook } = useBookshelf();
  const [showMenu, setShowMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const bookLists = getListsForBook(book.key);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };
    if (showMenu) document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [showMenu]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: Math.min(index * 0.02, 0.4) }}
      className="group relative"
    >
      {/* Card */}
      <div className="relative aspect-[2/3] rounded-lg overflow-hidden bg-card border border-border/50 shadow-card transition-all duration-300 group-hover:border-primary/20 group-hover:shadow-glow">
        {book.coverId ? (
          <img
            src={getCoverUrl(book.coverId, "M")}
            alt={book.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-secondary to-background flex flex-col items-center justify-center p-4 text-center">
            <BookOpen className="h-8 w-8 text-primary/30 mb-3" />
            <h3 className="font-display text-sm font-semibold text-foreground/70 leading-tight line-clamp-3">
              {book.title}
            </h3>
            {book.authors.length > 0 && (
              <p className="text-xs text-muted-foreground mt-2">{book.authors[0]}</p>
            )}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
          <h3 className="font-display text-sm font-semibold text-white leading-tight">
            {book.title}
          </h3>
          {book.authors.length > 0 && (
            <p className="text-xs text-white/70 mt-1">{book.authors[0]}</p>
          )}
          {book.firstPublishYear > 0 && (
            <p className="text-[10px] text-white/50 mt-1">{book.firstPublishYear}</p>
          )}
        </div>

        {!hideActions && (
          <>
            {/* Like button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleLike(book.key);
              }}
              className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 ${
                isLiked
                  ? "bg-primary text-primary-foreground scale-100"
                  : "bg-black/50 text-white/80 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
              }`}
              aria-label={isLiked ? "Unlike" : "Like"}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
            </button>

            {/* Add to list button */}
            <div className="absolute top-3 left-3" ref={menuRef}>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowMenu(!showMenu);
                }}
                className={`p-2 rounded-full transition-all duration-200 ${
                  bookLists.length > 0
                    ? "bg-primary text-primary-foreground"
                    : "bg-black/50 text-white/80 opacity-0 group-hover:opacity-100 hover:bg-primary hover:text-primary-foreground"
                }`}
                aria-label="Add to list"
              >
                <Plus className="h-4 w-4" />
              </button>

              {showMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: -4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  className="absolute top-full left-0 mt-2 w-48 rounded-lg bg-card border border-border shadow-card overflow-hidden z-30"
                >
                  <div className="py-1">
                    {lists.map((list) => {
                      const inList = bookLists.includes(list.id);
                      const Icon = listIconMap[list.icon] || ListTodo;
                      return (
                        <button
                          key={list.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (!inList) addBookToList(list.id, book);
                            setShowMenu(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-foreground hover:bg-secondary/50 transition-colors text-left"
                        >
                          <Icon className="h-4 w-4 text-muted-foreground" />
                          <span className="flex-1 truncate">{list.name}</span>
                          {inList && <Check className="h-4 w-4 text-primary" />}
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </div>
          </>
        )}
      </div>

      {/* Title below card */}
      <div className="mt-3 px-1">
        <h3 className="font-display text-sm font-medium text-foreground leading-tight line-clamp-1">
          {book.title}
        </h3>
        {book.authors.length > 0 && (
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{book.authors[0]}</p>
        )}
      </div>
    </motion.div>
  );
};

export default BookCard;
