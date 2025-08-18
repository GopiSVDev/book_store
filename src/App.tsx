import { Button, MantineProvider, NumberInput } from "@mantine/core";
import "@mantine/core/styles.css";
import Navbar from "./components/Navbar";
import BookList from "./components/BookList";
import { useEffect, useState } from "react";
import { fetchBooks } from "./api/getBooks";

export interface Book {
  key: string;
  title: string;
  first_publish_year?: number;
  author_name?: string[];
  cover_i?: number;
}

const App = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [query, setQuery] = useState("technology");
  const [page, setPage] = useState(1);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>(books);
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    setBooks([]);
    setFilteredBooks([]);
    setPage(1);
  }, [query]);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (query.trim()) {
        fetchBooks(query, page)
          .then((res) => {
            if (res && res.docs) {
              setBooks((prev) => [...prev, ...res.docs]);
              setFilteredBooks((prev) => [...prev, ...res.docs]);
            }
          })
          .catch((err) => console.error(err));
      }
    }, 500);

    return () => clearTimeout(handler);
  }, [query, page]);

  const handleSortByYear = () => {
    setFilteredBooks((prev) =>
      [...prev].sort((a, b) => {
        const yearA = a.first_publish_year || 0;
        const yearB = b.first_publish_year || 0;
        return sortAsc ? yearA - yearB : yearB - yearA;
      })
    );
    setSortAsc(!sortAsc);
  };

  const handleFindByYear = (year: number | string) => {
    if (!year) {
      setFilteredBooks(books);
      return;
    }

    setFilteredBooks(books.filter((a) => a.first_publish_year === year));
  };

  return (
    <MantineProvider>
      <Navbar setQuery={setQuery} />

      <div
        style={{
          paddingInline: "50px",
          display: "flex",
          gap: "20px",
          backgroundColor: "#242121",
        }}
      >
        <Button onClick={handleSortByYear}>Sort by year</Button>
        <NumberInput
          placeholder="Search By Year"
          onChange={(value) => handleFindByYear(value)}
        />
      </div>

      <BookList books={filteredBooks} />
    </MantineProvider>
  );
};

export default App;
