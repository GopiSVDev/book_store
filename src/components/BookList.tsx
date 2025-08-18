import { Center, Loader } from "@mantine/core";
import type { Book } from "../App";
import BookItem from "./BookItem";

const BookList = ({ books }: { books: Book[] }) => {
  if (!books || books.length === 0) {
    return (
      <Center style={{ height: "200px", backgroundColor: "#242121" }}>
        <Loader size="lg" color="blue" />
      </Center>
    );
  }

  return (
    <div className="book-grid">
      {books &&
        books.map((book, i) => (
          <BookItem key={`${book.key}-${i}`} book={book} />
        ))}
    </div>
  );
};

export default BookList;
