import { FormEvent, useState, useEffect } from "react";
import axios from "axios";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import Table from "../components/Table";

interface todosInterface {
  title: string;
  description: string;
  completed: boolean;
  _id: string;
}

export default function Dashboard() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([] as todosInterface[]);

  async function fetchTodos() {
    const config = {
      method: "get",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/api/v1/todos/todos",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        setTodos(response.data.todos);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    // Add your API call for todos here
    fetchTodos();
  }, []);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent the default form submission behavior
    console.log(title, description);
    // Add your form submission logic here
    const data = {
      title,
      description,
      completed: false,
    };

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:5000/api/v1/todos/add",
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        console.log(JSON.stringify(response.data));
        fetchTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="bg-gray-50 dark:bg-gray-900 " id="main">
      <section className="bg-gray-50 dark:bg-gray-900 h-100%">
        <div className="flex flex-col items-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <Heading />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
                <InputBox
                  name="Todo Title"
                  placeholder="title"
                  type="text"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
                <InputBox
                  name="description"
                  placeholder="Description"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  value={description}
                />

                <Button text="Add todo" type="submit" />
              </form>
            </div>
          </div>
          {todos.length ? (
            <>
              <div className="m-5">
                <SubHeading heading="Todos List" />
              </div>

              <div>
                <Table todos={todos} fetchTodos={fetchTodos} />
              </div>
            </>
          ): ""}
        </div>
      </section>
    </div>
  );
}
