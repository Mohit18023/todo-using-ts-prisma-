interface todosInterface {
  title: string;
  description: string;
  completed: boolean;
}
interface TableProps {
    todos: todosInterface[];
    
}

export default function Table( {todos}: TableProps) {
  return (
    <div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Description
              </th>
              <th scope="col" className="px-6 py-3">
                completed
              </th>
              <th scope="col" className="px-6 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo, index) => (
              <tr key={index} className="bg-white dark:bg-gray-800">
                <td className="px-6 py-4">{todo.title}</td>
                <td className="px-6 py-4">{todo.description}</td>
                <td className="px-6 py-4">{todo.completed ? "Yes" : "No"}</td>
                <td className="px-6 py-4 item-centre">
                  <button className="display-flex justify-center items-center">
                    {""}
                    <svg
                      className="h-5 w-5 text-red-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      {" "}
                      <polyline points="3 6 5 6 21 6" />{" "}
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />{" "}
                      <line x1="10" y1="11" x2="10" y2="17" />{" "}
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
