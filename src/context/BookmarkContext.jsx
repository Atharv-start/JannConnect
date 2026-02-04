import { createContext, useContext, useState, useEffect } from "react"

const BookmarkContext = createContext()

export function BookmarkProvider({ children }) {
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    const saved = localStorage.getItem("bookmarks")
    if (saved) setBookmarks(JSON.parse(saved))
  }, [])

  function toggleBookmark(id) {
    const updated = bookmarks.includes(id)
      ? bookmarks.filter(b => b !== id)
      : [...bookmarks, id]

    setBookmarks(updated)
    localStorage.setItem("bookmarks", JSON.stringify(updated))
  }

  return (
    <BookmarkContext.Provider value={{ bookmarks, toggleBookmark }}>
      {children}
    </BookmarkContext.Provider>
  )
}

export function useBookmarks() {
  return useContext(BookmarkContext)
}
