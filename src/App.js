import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import Header from "./components/Header";
import Search from "./components/Search";
import TodosList from "./components/TodosList";

function App() {
  {
    /*here we are adding three dummy Todos in our useState hooks for Todos*/
  }
  const [notes, setNotes] = useState([
    {
      id: nanoid(),
      text: "This is my first todo",
      date: "03/11/2022",
    },
    {
      id: nanoid(),
      text: "This is my second todo",
      date: "03/11/2022",
    },
    {
      id: nanoid(),
      text: "This is my third todo",
      date: "03/11/2022",
    },
  ]);
  {
    /*this are the states for searching text and toggle mode*/
  }

  const [searchNote, setSearchNote] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  {
    /*to get data from local storage*/
  }

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem("react-notes-app-data"));
    if (savedNotes) setNotes(savedNotes);
  }, []);
  {
    /*this is for saving the app data in local storage*/
  }
  useEffect(() => {
    localStorage.setItem("react-notes-app-data", JSON.stringify(notes));
  }, [notes]);

  {
    /*this function is for adding new note*/
  }

  const addTodo = (text) => {
    const date = new Date();
    const newTodo = {
      id: nanoid(),
      text,
      date: date.toLocaleDateString(),
    };

    const newNotes = [...notes, newTodo];
    newNotes.reverse();
    setNotes(newNotes);
  };

  const deletingAllTodos = () => {
    setNotes([]);
  };

  {
    /*this function is for deleting notes in note app with a id*/
  }

  const deletingTodo = (id) => {
    const newNotes = notes.filter((note) => note.id != id);
    setNotes(newNotes);
  };

  return (
    <div className={`${darkMode && "dark-mode"}`}>
      <div className="container">
        <Header
          handleDeleteAllTodos={deletingAllTodos}
          handleToggleDarkMode={setDarkMode}
        />
        <Search handleSearch={setSearchNote} />
        <TodosList
          notes={notes.filter((note) =>
            note.text.toLowerCase().includes(searchNote)
          )}
          handleAddTodo={addTodo}
          handleDelete={deletingTodo}
        />
      </div>
    </div>
  );
}

export default App;
