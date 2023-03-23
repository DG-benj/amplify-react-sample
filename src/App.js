


import React, { useState, useEffect, createContext} from 'react';
import "./App.css"

import logo from "./logo192.png";
import "@aws-amplify/ui-react/styles.css";
import {
  withAuthenticator,
  Button,
  Flex,
  Text,
  TextField,
  Heading,
  Image,
  View,
  // Card,
} from "@aws-amplify/ui-react"



import { 
  fetchTodos as fetch, 
  createTodo as crate,
  deleteTodo as remove } from "./data/graphql-handler"

import ControlPanel from './ControlPanel';

import { Amplify, API } from 'aws-amplify';
import config from './aws-exports';
Amplify.configure(config);

export const InOutBtnContext = createContext(null);

/*
// const App = ({ signOut }) => {
//   const [notes, setNotes] = useState([]);

//   useEffect(() => {
//     fetchNotes();
//   }, []);

//   async function fetchNotes() {
//     const apiData = await API.graphql({ query: listNotes });
//     const notesFromAPI = apiData.data.listNotes.items;
//     setNotes(notesFromAPI);
//   }

//   async function createNote(event) {
//     event.preventDefault();
//     const form = new FormData(event.target);
//     const data = {
//       name: form.get("name"),
//       description: form.get("description"),
//     };
//     await API.graphql({
//       query: createNoteMutation,
//       variables: { input: data },
//     });
//     fetchNotes();
//     event.target.reset();
//   }

//   async function deleteNote({ id }) {
//     const newNotes = notes.filter((note) => note.id !== id);
//     setNotes(newNotes);
//     await API.graphql({
//       query: deleteNoteMutation,
//       variables: { input: { id } },
//     });
//   }

//   return (
//     <View className="App">
//       <Heading level={1}>My Notes App</Heading>
//       <View as="form" margin="3rem 0" onSubmit={createNote}>
//         <Flex direction="row" justifyContent="center">
//           <TextField
//             name="name"
//             placeholder="Note Name"
//             label="Note Name"
//             labelHidden
//             variation="quiet"
//             required
//           />
//           <TextField
//             name="description"
//             placeholder="Note Description"
//             label="Note Description"
//             labelHidden
//             variation="quiet"
//             required
//           />
//           <Button type="submit" variation="primary">
//             Create Note
//           </Button>
//         </Flex>
//       </View>
//       <Heading level={2}>Current Notes</Heading>
//       <View margin="3rem 0">
//         {notes.map((note) => (
//           <Flex
//             key={note.id || note.name}
//             direction="row"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <Text as="strong" fontWeight={700}>
//               {note.name}
//             </Text>
//             <Text as="span">{note.description}</Text>
//             <Button variation="link" onClick={() => deleteNote(note)}>
//               Delete note
//             </Button>
//           </Flex>
//         ))}
//       </View>
//       <Button onClick={signOut}>Sign Out</Button>
//     </View>
//   );
// };

// export default withAuthenticator(App);

*/

function App({signOut}) {

  return (
  <>
    <Button onClick={signOut}>Sign Out</Button>
    <ControlPanel/>
  </>
  )
}

export default withAuthenticator(App)

  // const [todos, setTodos] = useState([]);

  // useEffect(() => {
  //   fetch(setTodos);
  // }, []);
    
  // }

  // return (
  //   <>
  //     <View className="App">
  //     <Heading level={1}>My Todo App</Heading>
  //     <View as="form" margin="3rem 0" onSubmit={createTodo}>
  //       <View
  //             name='image'
  //             as='input'
  //             type='file'
  //             style={ {alignSelf: 'end'} }
  //       />
  //       <Flex direction="row" justifyContent="center">
  //         <TextField
  //           name="name"
  //           placeholder="Todo Name"
  //           label="Todo Name"
  //           labelHidden
  //           variation="quiet"
  //           required
  //         />
  //         <TextField
  //           name="description"
  //           placeholder="Todo Description"
  //           label="Todo Description"
  //           labelHidden
  //           variation="quiet"
  //           required
  //         />
  //         <Button type="submit" variation="primary">
  //           Create Todo
  //         </Button>
  //       </Flex>
  //     </View>
  //     <Heading level={2}>Current Todos</Heading>
  //     <View margin="3rem 0">
  //       {todos.map((todo) => (
  //         <Flex
  //           key={todo.id || todo.name}
  //           direction="row"
  //           justifyContent="center"
  //           alignItems="center"
  //         >
  //           <Text as="strong" fontWeight={700}>
  //             {todo.name}
  //           </Text>
  //           <Text as="span">{todo.description}</Text>
  //           {todo.image && (
  //             <Image
  //               src={todo.image}
  //               alt={`visual aid for ${todo.name}`}
  //               style={{ width: 400 }}
  //             />
  //           )}
  //           <Button variation="link" onClick={() => deleteTodo(todo)}>
  //             Delete todo
  //           </Button>
  //         </Flex>
  //       ))}
  //     </View>
  //     <Button onClick={signOut}>Sign Out</Button>
  //   </View>
  //   </>
    // <View className="App">
    //   <Card>
    //     <Image src={logo} clasasName="App-logo" alt="logo"/>
    //     <Heading level={1}>We now have Auth!</Heading>
    //   </Card>
    //   <Button onClick={signOut}>Sign Out</Button>
    // </View>
//   )

// }

// export default withAuthenticator(App);