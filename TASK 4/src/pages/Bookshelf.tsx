import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Plus, Trash2, Library, ArrowLeft, Bookmark, BookMarked, CheckCircle, ListTodo, type LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { useBookshelf } from "@/contexts/BookshelfContext";
import BookCard from "@/components/BookCard";

const iconMap: Record<string, LucideIcon> = {
  bookmark: Bookmark,
  "book-open": BookMarked,
  "check-circle": CheckCircle,
  "list-todo": ListTodo,
};

function ListIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = iconMap[icon] || ListTodo;
  return <Icon className={className} />;
}

const Bookshelf = () => {
  const { lists, createList, deleteList, removeBookFromList } = useBookshelf();
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [newListName, setNewListName] = useState("");
  const [showNewForm, setShowNewForm] = useState(false);

  const activeList = lists.find((l) => l.id === activeListId);

  const handleCreate = () => {
    if (newListName.trim()) {
      createList(newListName.trim());
      setNewListName("");
      setShowNewForm(false);
    }
  };

  const totalBooks = lists.reduce((sum, l) => sum + l.books.length, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex items-center gap-4">
          <Link
            to="/"
            className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
          </Link>
          <div className="flex items-center gap-3">
            <Library className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-display font-bold text-foreground">My Bookshelf</h1>
          </div>
          <span className="text-sm text-muted-foreground ml-auto">
            {totalBooks} book{totalBooks !== 1 && "s"} saved
          </span>
        </div>
      </div>

      <div className="container mx-auto px-6 py-10">
        {/* List overview */}
        {!activeList && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {lists.map((list) => (
                <motion.button
                  key={list.id}
                  onClick={() => setActiveListId(list.id)}
                  className="group relative p-6 rounded-xl bg-card border border-border hover:border-primary/30 transition-all text-left shadow-card"
                  whileHover={{ y: -4, boxShadow: "0 0 50px -15px hsl(43 74% 49% / 0.3)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-12 h-12 rounded-lg bg-secondary flex items-center justify-center">
                      <ListIcon icon={list.icon} className="h-6 w-6 text-primary" />
                    </div>
                    {!["want-to-read", "reading", "finished"].includes(list.id) && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteList(list.id);
                        }}
                        className="p-2 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-all"
                        aria-label="Delete list"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-foreground mb-1">{list.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {list.books.length} book{list.books.length !== 1 && "s"}
                  </p>
                  
                  {/* Mini cover preview */}
                  {list.books.length > 0 && (
                    <div className="flex -space-x-3 mt-6">
                      {list.books.slice(0, 4).map((b) => (
                        <div
                          key={b.key}
                          className="w-10 h-14 rounded overflow-hidden border-2 border-card bg-secondary"
                        >
                          {b.coverId ? (
                            <img
                              src={`https://covers.openlibrary.org/b/id/${b.coverId}-S.jpg`}
                              alt=""
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <BookOpen className="h-3 w-3 text-muted-foreground" />
                            </div>
                          )}
                        </div>
                      ))}
                      {list.books.length > 4 && (
                        <div className="w-10 h-14 rounded bg-secondary border-2 border-card flex items-center justify-center">
                          <span className="text-xs text-muted-foreground font-medium">+{list.books.length - 4}</span>
                        </div>
                      )}
                    </div>
                  )}
                </motion.button>
              ))}

              {/* New list card */}
              {!showNewForm ? (
                <motion.button
                  onClick={() => setShowNewForm(true)}
                  className="p-6 rounded-xl border-2 border-dashed border-border hover:border-primary/30 transition-colors flex flex-col items-center justify-center gap-3 min-h-[200px]"
                  whileHover={{ y: -4 }}
                >
                  <div className="w-12 h-12 rounded-lg bg-secondary/50 flex items-center justify-center">
                    <Plus className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <span className="text-sm text-muted-foreground font-medium">Create New List</span>
                </motion.button>
              ) : (
                <div className="p-6 rounded-xl border border-border bg-card flex flex-col gap-4">
                  <input
                    type="text"
                    placeholder="List name..."
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleCreate()}
                    autoFocus
                    className="w-full px-4 py-3 rounded-lg bg-secondary/50 text-foreground text-sm border border-transparent focus:border-primary/30 focus:outline-none"
                  />
                  <div className="flex gap-3">
                    <button
                      onClick={handleCreate}
                      className="flex-1 px-4 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:shadow-glow transition-shadow"
                    >
                      Create
                    </button>
                    <button
                      onClick={() => { setShowNewForm(false); setNewListName(""); }}
                      className="px-4 py-2.5 rounded-lg border border-border text-muted-foreground text-sm hover:text-foreground transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>

            {totalBooks === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-secondary/50 flex items-center justify-center">
                  <BookOpen className="h-8 w-8 text-muted-foreground" />
                </div>
                <h2 className="font-display text-2xl font-semibold text-foreground mb-3">Start your collection</h2>
                <p className="text-muted-foreground mb-6 max-w-sm mx-auto">Discover books and add them to your personal shelves.</p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:shadow-glow transition-shadow"
                >
                  <BookOpen className="h-4 w-4" />
                  Discover Books
                </Link>
              </div>
            )}
          </motion.div>
        )}

        {/* Active list view */}
        {activeList && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => setActiveListId(null)}
                className="p-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:border-primary/30 transition-colors"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div className="w-10 h-10 rounded-lg bg-secondary flex items-center justify-center">
                <ListIcon icon={activeList.icon} className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="font-display text-xl font-semibold text-foreground">{activeList.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {activeList.books.length} book{activeList.books.length !== 1 && "s"}
                </p>
              </div>
            </div>

            {activeList.books.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">This list is empty.</p>
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:shadow-glow transition-shadow"
                >
                  Discover Books
                </Link>
              </div>
            ) : (
              <AnimatePresence mode="popLayout">
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {activeList.books.map((book, i) => (
                    <div key={book.key} className="relative group/remove">
                      <BookCard
                        book={book}
                        isLiked={false}
                        onToggleLike={() => {}}
                        index={i}
                        hideActions
                      />
                      <button
                        onClick={() => removeBookFromList(activeList.id, book.key)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover/remove:opacity-100 transition-all hover:scale-110"
                        aria-label="Remove from list"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </AnimatePresence>
            )}
          </motion.div>
        )}
      </div>

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

export default Bookshelf;
