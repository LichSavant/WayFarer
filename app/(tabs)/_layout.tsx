import { Tabs } from "expo-router";
import { Icon, colors } from "../../components/ui";
import { useResponsive } from "../../hooks/useResponsive";
export default function TabLayout() {
  const { desktop } = useResponsive();
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.blue,
        tabBarInactiveTintColor: colors.muted,
        tabBarStyle: desktop
          ? { display: "none" }
          : { backgroundColor: colors.bg, borderTopColor: colors.line },
        tabBarLabelStyle: { fontSize: 11, fontWeight: "600" },
      }}
    >
      {(["index", "trips", "saved", "profile"] as const).map((name, i) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title: ["Explore", "Trips", "Saved", "Profile"][i],
            tabBarIcon: ({ color }) => (
              <Icon
                name={
                  (
                    [
                      "compass-outline",
                      "ticket-outline",
                      "heart-outline",
                      "person-outline",
                    ] as const
                  )[i]
                }
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
