import axios from "axios";

export const fetchBooks = async (query: string, page: number = 1) => {
  try {
    const formattedQuery = query.trim().replace(/\s+/g, "+");
    const response = await axios.get(
      `https://openlibrary.org/search.json?q=${formattedQuery}&page=${page}`
    );

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
