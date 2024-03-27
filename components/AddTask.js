// import React, { useState } from "react";
// import { View, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard } from "react-native";

// const AddTask = (props) => {
//   const [task, setTask] = useState("");
//   const { onAddTaskPress } = props;

//   const handleAddTask = () => {
//     onAddTaskPress(task);
//     Keyboard.dismiss();
//     setTask("");
//   };

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.textInput}
//         placeholder="Write a task"
//         value={task}
//         onChangeText={setTask}
//       />
//       <TouchableOpacity style={styles.button} onPress={handleAddTask}>
//         <Text style={styles.text}>Add</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: "#F5F1F1",
//     padding: 16,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   textInput: {
//     flex: 1,
//     paddingHorizontal: 16,
//     paddingVertical: 10,
//     backgroundColor: "#FFF",
//     borderRadius: 8,
//     fontSize: 17,
//   },
//   button: {
//     marginLeft: 10,
//     backgroundColor: "#558CF6",
//     borderRadius: 8,
//     padding: 10,
//   },
//   text: {
//     color: "#FFF",
//     fontWeight: "bold",
//     fontSize: 17,
//   },
// });

// export default AddTask;

import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard, Alert } from "react-native";

const AddTask = (props) => {
  const [task, setTask] = useState("");
  const { onAddTaskPress } = props;

  const handleAddTask = () => {
    // Check if the task is not empty and does not consist only of whitespaces
    if (task.trim().length > 0) {
      onAddTaskPress(task.trim());
      Keyboard.dismiss();
      setTask("");
    } else {
      // Optionally show an alert if the task is empty
      Alert.alert("Invalid Task", "Please enter a task before adding.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Write a task"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.text}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F1F1",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    fontSize: 17,
  },
  button: {
    marginLeft: 10,
    backgroundColor: "#558CF6",
    borderRadius: 8,
    padding: 10,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default AddTask;
