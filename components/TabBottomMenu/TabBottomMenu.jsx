import { Text, TouchableOpacity, View } from "react-native";
import { s } from "./TabBottomMenu.style";

export function TabBottomMenu({ onPress, selectedTabName, todoList }) {
  const countByStatus = todoList.reduce(
    (acc, todo) => {
      todo.isCompleted ? acc.done++ : acc.inProgress++;
      return acc;
    },
    { all: todoList.length, inProgress: 0, done: 0 }
  );
  function getTextStyle(tabName) {
    return {
      fontWeight: "bold",
      color: tabName === selectedTabName ? "#2F76E5" : "black",
    };
  }
  return (
    <View style={s.container}>
      <TouchableOpacity onPress={() => onPress("all")}>
        <Text style={getTextStyle("all")}>({countByStatus.all}) All</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("inProgress")}>
        <Text style={getTextStyle("inProgress")}>
          ({countByStatus.inProgress}) In Progress{" "}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => onPress("done")}>
        <Text style={getTextStyle("done")}>({countByStatus.done}) Done</Text>
      </TouchableOpacity>
    </View>
  );
}
