// import { API, Storage } from "aws-amplify"
// import { listTodos } from "./../graphql/queries"
// import {
//   createTodo as createTodoMutation,
//   deleteTodo as deleteTodoMutation,
// } from "./../graphql/mutations"

// export async function fetchTodos(setTodos) {
//     const apiData = await API.graphql({query: listTodos});
//     const todosFromAPI = apiData.data.listNotes.items;
//     await Promise.all(
//       todosFromAPI.map(async (note) => {
//         if(note.image) {
//           const url = await Storage.get(note.name);
//           note.image = url
//         }
//         return note;
//       })
//     )
//     setTodos(todosFromAPI);
//   }

//   export async function createTodo(event) {
//     event.preventDefault();
//     const form = new FormData(event.target);
//     const image = form.get("image");
//     const data = {
//       name: form.get("name"),
//       description: form.get("description"),
//       image: image.name,
//     };
//     if(!!data.image) await Storage.put(data.name, image);
//     await API.graphql({
//       query: createTodoMutation,
//       variables: { input: data }
//     });
//     fetchTodos();
//     event.target.reset();
//   }

//   export async function deleteTodo(todos, setTodos, { id, name }) {
//     const newTodos = todos.filter((todo) => todo.id !== id);
//     setTodos(newTodos);
//     await Storage.remove(name)
//     await API.graphql({
//       query: deleteTodoMutation,
//       variables: {input: { id } }
//     });
//   }