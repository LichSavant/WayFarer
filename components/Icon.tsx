import React from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import { colors } from "./theme";
export function Icon({
  name,
  size = 22,
  color = colors.navy,
}: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  size?: number;
  color?: string;
}) {
  return <Ionicons name={name} size={size} color={color} />;
}
