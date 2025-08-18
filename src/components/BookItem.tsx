import { Card, Group, Image, Text } from "@mantine/core";
import type { Book } from "../App";

const BookItem = ({ book }: { book: Book }) => {
  const coverUrl = book.cover_i
    ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
    : "https://placehold.co/200x250?text=No+Cover";

  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image src={coverUrl} alt={book.title} fit="cover" />
      </Card.Section>

      <Group mt="md" mb="xs" justify="center">
        <Text fw={600} ta="center">
          {book.title}
        </Text>
      </Group>

      {book.first_publish_year && (
        <Text size="sm" ta="center" mt={4}>
          📅 {book.first_publish_year}
        </Text>
      )}
    </Card>
  );
};

export default BookItem;
