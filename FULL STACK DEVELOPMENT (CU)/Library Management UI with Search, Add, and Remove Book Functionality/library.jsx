import React, { useState } from "react";

export default function LibraryManagement() {
  // Initial book list
  const [books, setBooks] = useState([
    { title: "Atomic Habits", author: "James Clear" },
    { title: "The Alchemist", author: "Paulo Coelho" },
    { title: "Clean Code", author: "Robert C. Martin" },
  ]);

  const [searchTerm, setSearchTerm] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newAuthor, setNewAuthor] = useState("");

  // Add book function
  const addBook = (e) => {
    e.preventDefault();
    if (newTitle.trim() && newAuthor.trim()) {
      setBooks([...books, { title: newTitle, author: newAuthor }]);
      setNewTitle("");
      setNewAuthor("");
    }
  };

  // Remove book function
  const removeBook = (index) => {
    const updatedBooks = books.filter((_, i) => i !== index);
    setBooks(updatedBooks);
  };

  // Filter books dynamically
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <h1 className="text-2xl font-bold mb-4">📚 Library Management</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title or author..."
        className="border p-2 rounded w-80 mb-4"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Add Book Form */}
      <form
        onSubmit={addBook}
        className="flex gap-2 mb-6 w-full justify-center"
      >
        <input
          type="text"
          placeholder="Book Title"
          className="border p-2 rounded w-56"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Author"
          className="border p-2 rounded w-56"
          value={newAuthor}
          onChange={(e) => setNewAuthor(e.target.value)}
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
        >
          Add
        </button>
      </form>

      {/* Books List */}
      <ul className="w-full max-w-lg">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <li
              key={index}
              className="flex justify-between items-center bg-white shadow p-3 rounded mb-2"
            >
              <div>
                <p className="font-semibold">{book.title}</p>
                <p className="text-gray-600 text-sm">{book.author}</p>
              </div>
              <button
                onClick={() => removeBook(index)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                Remove
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500 text-center">No books found.</p>
        )}
      </ul>
    </div>
  );
}
