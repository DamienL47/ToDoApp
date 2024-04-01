import { Text, View } from "react-native";
import backgroundImage from "./assets/background.png";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/Header/Header";
import { CardToDo } from "./components/CardToDo/CardToDo";

const TODO_LIST = [
  { id: 1, title: "Appeler maman", isCompleted: true },
  { id: 2, title: "Appeler papa", isCompleted: false },
  { id: 3, title: "Appeler mami", isCompleted: false },
  { id: 4, title: "Appeler papi", isCompleted: true },
];

export default function App() {
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <View style={s.header}>
            <Header />
          </View>

          <View style={s.body}>
            {TODO_LIST.map((todo) => {
              return <CardToDo todo={todo} />;
            })}
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
      <View style={s.footer}>
        <Text>Footer</Text>
      </View>
    </>
  );
}
