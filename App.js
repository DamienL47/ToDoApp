import { Alert, ScrollView, View } from "react-native";
// import backgroundImage from "./assets/background.png";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { s } from "./App.style";
import { Header } from "./components/Header/Header";
import { CardToDo } from "./components/CardToDo/CardToDo";
import { useEffect, useState } from "react";
import { TabBottomMenu } from "./components/TabBottomMenu/TabBottomMenu";
import { ButtonAdd } from "./components/ButtonAdd/ButtonAdd";
import Dialog from "react-native-dialog";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isFirstRender = true;
let isLoadUpdate = false;

export default function App() {
  const [todoList, setTodoList] = useState([]);
  const [selectedTabName, setSelectedTabName] = useState("all");
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [update, setUpdate] = useState(false);
  const [idTodo, setIdTodo] = useState("");

  useEffect(() => {
    loadTodoList();
  }, []);
  useEffect(() => {
    if (isLoadUpdate) {
      isLoadUpdate = false;
    } else {
      if (isFirstRender) {
        saveTodoList();
      } else {
        isFirstRender = false;
      }
    }
  }, [todoList]);

  async function loadTodoList() {
    try {
      const stringifiedTodoList = await AsyncStorage.getItem("@todolist");
      if (stringifiedTodoList !== null) {
        const parsedTodoList = JSON.parse(stringifiedTodoList);
        isLoadUpdate = true;
        setTodoList(parsedTodoList);
      }
    } catch (error) {
      alert("Erreur", error);
    }
  }

  async function saveTodoList() {
    try {
      await AsyncStorage.setItem("@todolist", JSON.stringify(todoList));
    } catch (error) {
      alert("Erreur", error);
    }
  }

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

  function updateThisTodo() {
    const updateTodo = {
      ...idTodo,
      title: inputValue,
    };
    const todoListNew = todoList.filter((todo) => todo.id !== updateTodo.id);
    setTodoList([...todoListNew, updateTodo]);
    setIsAddDialogVisible(false);
    setUpdate(false);
  }

  function deleteTodo(todoToDeleteOrUpdate) {
    Alert.alert("Suppression", "Supprimer cette tâche ?", [
      {
        text: "Supprimer",
        style: "destructive",
        onPress: () => {
          setTodoList(
            todoList.filter((todo) => todo.id !== todoToDeleteOrUpdate.id)
          );
        },
      },
      {
        text: "Modifier",
        style: "default",
        onPress: () => {
          setUpdate(true);
          setIdTodo(todoToDeleteOrUpdate);
          setIsAddDialogVisible(true);
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

  function addTodo() {
    const newTodo = {
      id: uuid.v4(),
      title: inputValue,
      isCompleted: false,
    };
    setTodoList([...todoList, newTodo]);
    setIsAddDialogVisible(false);
  }

  function showDialog() {
    setIsAddDialogVisible(true);
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
          <ButtonAdd onPress={showDialog} />
        </SafeAreaView>
      </SafeAreaProvider>

      <TabBottomMenu
        todoList={todoList}
        onPress={setSelectedTabName}
        selectedTabName={selectedTabName}
      />
      {update ? (
        <Dialog.Container
          visible={isAddDialogVisible}
          onBackdropPress={() => setIsAddDialogVisible(false)}
        >
          <Dialog.Title> Modifier une Tâche </Dialog.Title>
          <Dialog.Description>
            Choisi un nouveau nom pour la tâche
          </Dialog.Description>
          <Dialog.Input onChangeText={setInputValue} />
          <Dialog.Button
            label="Modifier"
            onPress={updateThisTodo}
            disabled={inputValue.trim().length === 0}
          />
        </Dialog.Container>
      ) : (
        <Dialog.Container
          visible={isAddDialogVisible}
          onBackdropPress={() => setIsAddDialogVisible(false)}
        >
          <Dialog.Title> Créer une Tâche </Dialog.Title>
          <Dialog.Description>
            Choisi un nom pour la nouvelle tâche
          </Dialog.Description>
          <Dialog.Input onChangeText={setInputValue} />
          <Dialog.Button
            label="Créer"
            onPress={addTodo}
            disabled={inputValue.trim().length === 0}
          />
        </Dialog.Container>
      )}
    </>
  );
}
