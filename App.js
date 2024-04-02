import { Alert, ScrollView, Text, TextInput, View } from "react-native";
import backgroundImage from "./assets/background.png";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/Header/Header";
import { CardToDo } from "./components/CardToDo/CardToDo";
import { useState } from "react";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";
import { UpdateTodo } from "./components/UpdateTodo/UpdateTodo";

export default function App() {
  const [todoList, setTodoList] = useState([
    { id: 1, title: "Appeler maman", isCompleted: true },
    { id: 2, title: "Appeler papa", isCompleted: false },
    { id: 3, title: "Appeler mami", isCompleted: false },
    { id: 4, title: "Appeler papi", isCompleted: true },
    { id: 5, title: "Appeler tati", isCompleted: false },
    { id: 6, title: "Appeler tonton", isCompleted: false },
  ]);
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [update, setUpdate] = useState(false);

  function getFilteredList() {
    switch (selectedTabName) {
      case "all":
        return todoList;
      case "inProgress":
        return todoList.filter((todo) => !todo.isCompleted);
      case "done":
        return todoList.filter((todo) => todo.isCompleted);
      default:
        return todoList;
    }
  }

  function updateTodo(todo) {
    const updatedTodo = {
      ...todo,
      isCompleted: !todo.isCompleted,
    };

    const indexToUpdate = todoList.findIndex(
      (todo) => todo.id === updatedTodo.id
    );

    const updatedTodoList = [...todoList];
    updatedTodoList[indexToUpdate] = updatedTodo;
    setTodoList(updatedTodoList);
  }

  function deleteTodo(todoToDelete) {
    Alert.alert("Suppression", "Supprimer cette tâche ?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(todoList.filter((todo) => todo.id !== todoToDelete.id));
        },
      },
      {
        text: "Modifier",
        style: "default",
        onPress: (todo) => {
          setUpdate(true);
          return <UpdateTodo todo={todo} />;
        },
      },
    ]);
  }

  function renderTodoList() {
    return getFilteredList().map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardToDo onLongPress={deleteTodo} onPress={updateTodo} todo={todo} />
      </View>
    ));
  }

  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>

          <View style={s.body}>
            {update && <UpdateTodo />}
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>

      <TabBottomMenu
        todoList={todoList}
        onPress={setSelectedTabName}
        selectedTabName={selectedTabName}
      />
    </>
  );
}
