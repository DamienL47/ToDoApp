import { Image, Text, View } from "react-native";
import logo from "../../assets/logo.png";
import { s } from "./Header.style";

export function Header() {
  return (
    <>
      <Image style={s.img} source={logo} />
      <Text style={s.subtitle}>Tu as probablement des trucs à faire.</Text>
    </>
  );
}
