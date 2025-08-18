import { TextInput } from "@mantine/core";

const Navbar = ({
  setQuery,
}: {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
}) => {
  return (
    <div className="navbar">
      <h2>Book Store</h2>
      <TextInput
        type="text"
        placeholder="Search"
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>
  );
};

export default Navbar;
