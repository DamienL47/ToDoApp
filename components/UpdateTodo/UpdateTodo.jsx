import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { s } from "./UpdateTodo.style";

export function UpdateTodo({ todo, onPress, onChange }) {
  return (
    <View style={s.container}>
      <TextInput
        style={s.input}
        // value={todo.title}
        onChange={onChange}
        placeholder="Modifier votre todo"
      />
      <TouchableOpacity onPress={() => onPress(todo)}>
        <Text style={s.send}>Envoyer</Text>
      </TouchableOpacity>
    </View>
  );
}
