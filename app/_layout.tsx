import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TravelProvider } from "../store/TravelContext";
export default function Layout() {
  return (
    <TravelProvider>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="results" />
        <Stack.Screen name="route/[id]" />
      </Stack>
    </TravelProvider>
  );
}
