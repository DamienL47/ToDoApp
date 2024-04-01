import { Image, Text, TouchableOpacity } from "react-native";
import check from "../../assets/check.png";
import { s } from "./CardToDo.style";

export function CardToDo({ todo }) {
  return (
    <TouchableOpacity style={s.container}>
      <Text
        style={[
          s.title,
          todo.isCompleted && { textDecorationLine: "line-through" },
        ]}
      >
        {todo.title}
      </Text>
      {todo.isCompleted && <Image style={s.check} source={check} />}
    </TouchableOpacity>
  );
}
