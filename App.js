import { ScrollView, Text, View } from "react-native";
import backgroundImage from "./assets/background.png";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/Header/Header";
import { CardToDo } from "./components/CardToDo/CardToDo";
import { useState } from "react";

const TODO_LIST = [
  { id: 1, title: "Appeler maman", isCompleted: true },
  { id: 2, title: "Appeler papa", isCompleted: false },
  { id: 3, title: "Appeler mami", isCompleted: false },
  { id: 4, title: "Appeler papi", isCompleted: true },
  { id: 5, title: "Appeler tati", isCompleted: false },
];

export default function App() {
  const [todoList, setTodoList] = useState(TODO_LIST);

  function renderTodoList() {
    return TODO_LIST.map((todo) => (
      <View style={s.cardItem} key={todo.id}>
        <CardToDo todo={todo} />
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
            <ScrollView>{renderTodoList()}</ScrollView>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  );
}
