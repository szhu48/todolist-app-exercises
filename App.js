// import { KeyboardAvoidingView, StyleSheet, Text, View } from "react-native";
import { KeyboardAvoidingView, StyleSheet, Text, View, FlatList } from "react-native";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import TodoList from "./components/TodoList"; // Import TodoList
import { Platform } from "react-native";


export default function App() {
  const [items, setItems] = useState([]);

  const handleDeleteTask = async (index) => {
    let updatedTasks = [...items];
    updatedTasks.splice(index, 1); // Remove the task
    setItems(updatedTasks);
  
    try {
      await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving updated tasks to AsyncStorage: ", error);
    }
  };
  const handleTaskPressed = async (index) => {
    console.log("Handle task pressed");
    let updatedTasks = [...items];
    
    // Update completion status
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    
    // Sort tasks: Incomplete tasks first, then completed tasks
    updatedTasks.sort((a, b) => {
      if (a.isCompleted === b.isCompleted) {
        return 0; // Keep original order if both have the same completion status
      }
      return a.isCompleted ? 1 : -1; // Incomplete tasks first
    });
    
    setItems(updatedTasks);
    
    try {
      await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage: ", error);
    }
  };
  
  const onAddTaskPress = async (text) => {
    // Update the tasks
    const updatedTasks = [...items, { text: text, isCompleted: false }]
    setItems(updatedTasks);

    console.log(updatedTasks)
    try {
      await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
    } catch (error) {
      console.error("Error saving tasks to AsyncStorage: ", error);
    }
  };

  useEffect(() => {
    // Load the task list from AsyncStorage
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem("task-list");
        if (storedTasks !== null) {
          setItems(JSON.parse(storedTasks));
        }
      } catch (error) {
        console.error("Error loading tasks from AsyncStorage: ", error);
      }
    };

    loadTasks();
  }, []);

//  // Add this renderItem function
//  const renderItem = ({ item, index }) => (
//   <Task
//     text={item.text}
//     isCompleted={item.isCompleted}
//     onPress={() => handleTaskPressed(index)}
//   />
// );

const renderItem = ({ item, index }) => (
  <Task
    text={item.text}
    isCompleted={item.isCompleted}
    onPress={() => handleTaskPressed(index)}
    onDelete={() => handleDeleteTask(index)}
  />
);

return (
  <View style={styles.container}>
    <View style={styles.tasksWrapper}>
      <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        style={styles.items}
      />
    </View>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.addTaskContainer}
    >
      <AddTask onAddTaskPress={onAddTaskPress} />
    </KeyboardAvoidingView>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1F1",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },
  items: {
    marginTop: 32,
  },
  addTaskContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
});
