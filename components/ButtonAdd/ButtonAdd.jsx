import { Text, TouchableOpacity } from "react-native";
import { s } from "./ButtonAdd.style";

export function ButtonAdd({ onPress }) {
  return (
    <TouchableOpacity style={s.btn} onPress={onPress}>
      <Text style={s.txt}>+ New todo</Text>
    </TouchableOpacity>
  );
}
