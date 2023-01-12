import React, { useState, useEffect } from "react";
import "./App.css";
import "@aws-amplify/ui-react/styles.css";
import { API } from "aws-amplify";
import {
  Button,
  Flex,
  Heading,
  Text,
  TextField,
  View,
  withAuthenticator,
} from "@aws-amplify/ui-react";
import { listNotes } from "./graphql/queries";
import {
  createNote as createNoteMutation,
  deleteNote as deleteNoteMutation,
} from "./graphql/mutations";

const App = ({ signOut }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    const apiData = await API.graphql({ query: listNotes });
    const notesFromAPI = apiData.data.listNotes.items;
    setNotes(notesFromAPI);
  }

  async function createNote(event) {
    event.preventDefault();
    const form = new FormData(event.target);
    const data = {
      name: form.get("name"),
      description: form.get("description"),
    };
    await API.graphql({
      query: createNoteMutation,
      variables: { input: data },
    });
    fetchNotes();
    event.target.reset();
  }

  async function deleteNote({ id }) {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
    await API.graphql({
      query: deleteNoteMutation,
      variables: { input: { id } },
    });
  }

  return (
    <View className="App">
      <Heading level={1}>My Notes App</Heading>
      <View as="form" margin="3rem 0" onSubmit={createNote}>
        <Flex direction="row" justifyContent="center">
          <TextField
            name="name"
            placeholder="Note Name"
            label="Note Name"
            labelHidden
            variation="quiet"
            required
          />
          <TextField
            name="description"
            placeholder="Note Description"
            label="Note Description"
            labelHidden
            variation="quiet"
            required
          />
          <Button type="submit" variation="primary">
            Create Note
          </Button>
        </Flex>
      </View>
      <Heading level={2}>Current Notes</Heading>
      <View margin="3rem 0">
        {notes.map((note) => (
          <Flex
            key={note.id || note.name}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Text as="strong" fontWeight={700}>
              {note.name}
            </Text>
            <Text as="span">{note.description}</Text>
            <Button variation="link" onClick={() => deleteNote(note)}>
              Delete note
            </Button>
          </Flex>
        ))}
      </View>
      <Button onClick={signOut}>Sign Out</Button>
    </View>
  );
};

export default withAuthenticator(App);


//#region main code
// import React, { useState, useEffect, createContext} from 'react';
// import "./App.css"

// import logo from "./logo192.png";
// import "@aws-amplify/ui-react/styles.css";
// import {
//   withAuthenticator,
//   Button,
//   Flex,
//   Text,
//   TextField,
//   Heading,
//   Image,
//   View,
//   // Card,
// } from "@aws-amplify/ui-react"

// import { API, Storage } from "aws-amplify"
// import { listTodos } from "./graphql/queries"
// import {
//   createTodo as createTodoMutation,
//   deleteTodo as deleteTodoMutation,
// } from "./graphql/mutations"










// import ControlPanel from './ControlPanel';

// export const InOutBtnContext = createContext(null);

// function App({signOut}) {

//   const [todos, setTodos] = useState([]);

//   useEffect(() => {
//     fetchTodos();
//   }, []);

//   async function fetchTodos() {
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

//   async function createTodo(event) {
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

//   async function deleteTodo({ id, name }) {
//     const newTodos = todos.filter((todo) => todo.id !== id);
//     setTodos(newTodos);
//     await Storage.remove(name)
//     await API.graphql({
//       query: deleteTodoMutation,
//       variables: {input: { id } }
//     });
//   }


//   return (
//     <>
//       <View className="App">
//       <Heading level={1}>My Todo App</Heading>
//       <View as="form" margin="3rem 0" onSubmit={createTodo}>
//         <View
//               name='image'
//               as='input'
//               type='file'
//               style={ {alignSelf: 'end'} }
//         />
//         <Flex direction="row" justifyContent="center">
//           <TextField
//             name="name"
//             placeholder="Todo Name"
//             label="Todo Name"
//             labelHidden
//             variation="quiet"
//             required
//           />
//           <TextField
//             name="description"
//             placeholder="Todo Description"
//             label="Todo Description"
//             labelHidden
//             variation="quiet"
//             required
//           />
//           <Button type="submit" variation="primary">
//             Create Todo
//           </Button>
//         </Flex>
//       </View>
//       <Heading level={2}>Current Todos</Heading>
//       <View margin="3rem 0">
//         {todos.map((todo) => (
//           <Flex
//             key={todo.id || todo.name}
//             direction="row"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Text as="strong" fontWeight={700}>
//               {todo.name}
//             </Text>
//             <Text as="span">{todo.description}</Text>
//             {todo.image && (
//               <Image
//                 src={todo.image}
//                 alt={`visual aid for ${todo.name}`}
//                 style={{ width: 400 }}
//               />
//             )}
//             <Button variation="link" onClick={() => deleteTodo(todo)}>
//               Delete todo
//             </Button>
//           </Flex>
//         ))}
//       </View>
//       <Button onClick={signOut}>Sign Out</Button>
//     </View>
//     </>
//     // <View className="App">
//     //   <Card>
//     //     <Image src={logo} clasasName="App-logo" alt="logo"/>
//     //     <Heading level={1}>We now have Auth!</Heading>
//     //   </Card>
//     //   <Button onClick={signOut}>Sign Out</Button>
//     // </View>
//   )

// }

// export default withAuthenticator(App);
//#endregion