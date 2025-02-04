import Navbar from "./components/Navbar";
import TodoList from "./components/TodoList";
import "bootstrap/dist/css/bootstrap.min.css";


function App() {
  return (
    <div>
      <Navbar/>
    <div className="d-flex justify-content-center align-items-center vh-100">
      <TodoList />
    </div>
    </div>
  );
}

export default App;
