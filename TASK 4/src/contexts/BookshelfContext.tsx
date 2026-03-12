import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from "react";
import type { Book } from "@/data/books";

export interface BookList {
  id: string;
  name: string;
  icon: string;
  books: Book[];
}

const DEFAULT_LISTS: BookList[] = [
  { id: "want-to-read", name: "Want to Read", icon: "bookmark", books: [] },
  { id: "reading", name: "Currently Reading", icon: "book-open", books: [] },
  { id: "finished", name: "Finished", icon: "check-circle", books: [] },
];

interface BookshelfContextType {
  lists: BookList[];
  addBookToList: (listId: string, book: Book) => void;
  removeBookFromList: (listId: string, bookKey: string) => void;
  createList: (name: string, icon?: string) => void;
  deleteList: (listId: string) => void;
  getListsForBook: (bookKey: string) => string[];
  isBookInAnyList: (bookKey: string) => boolean;
}

const BookshelfContext = createContext<BookshelfContextType | null>(null);

export function useBookshelf() {
  const ctx = useContext(BookshelfContext);
  if (!ctx) throw new Error("useBookshelf must be used within BookshelfProvider");
  return ctx;
}

function loadFromStorage(): BookList[] {
  try {
    const raw = localStorage.getItem("shelfpick-lists");
    if (raw) return JSON.parse(raw);
  } catch {}
  return DEFAULT_LISTS;
}

function saveToStorage(lists: BookList[]) {
  localStorage.setItem("shelfpick-lists", JSON.stringify(lists));
}

export function BookshelfProvider({ children }: { children: ReactNode }) {
  const [lists, setLists] = useState<BookList[]>(loadFromStorage);

  useEffect(() => {
    saveToStorage(lists);
  }, [lists]);

  const addBookToList = useCallback((listId: string, book: Book) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId && !l.books.some((b) => b.key === book.key)
          ? { ...l, books: [...l.books, book] }
          : l
      )
    );
  }, []);

  const removeBookFromList = useCallback((listId: string, bookKey: string) => {
    setLists((prev) =>
      prev.map((l) =>
        l.id === listId ? { ...l, books: l.books.filter((b) => b.key !== bookKey) } : l
      )
    );
  }, []);

  const createList = useCallback((name: string, icon = "list-todo") => {
    const id = name.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();
    setLists((prev) => [...prev, { id, name, icon, books: [] }]);
  }, []);

  const deleteList = useCallback((listId: string) => {
    setLists((prev) => prev.filter((l) => l.id !== listId));
  }, []);

  const getListsForBook = useCallback(
    (bookKey: string) => lists.filter((l) => l.books.some((b) => b.key === bookKey)).map((l) => l.id),
    [lists]
  );

  const isBookInAnyList = useCallback(
    (bookKey: string) => lists.some((l) => l.books.some((b) => b.key === bookKey)),
    [lists]
  );

  return (
    <BookshelfContext.Provider
      value={{ lists, addBookToList, removeBookFromList, createList, deleteList, getListsForBook, isBookInAnyList }}
    >
      {children}
    </BookshelfContext.Provider>
  );
}
