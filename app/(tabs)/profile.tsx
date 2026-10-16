import { useState } from "react";
import { Modal, Pressable, Switch, Text, View } from "react-native";
import { User } from "../../types/user";
import { Page, s, Icon, colors, Button } from "../../components/ui";
const user: User = { name: "Alex Traveler", initials: "AT", currency: "PHP" };
export default function Profile() {
  const [section, setSection] = useState<string | null>(null);
  const [notifications, setNotifications] = useState(true);
  const [preference, setPreference] = useState("Best value");
  return (
    <Page style={{ maxWidth: 850 }}>
      <Text style={s.eyebrow}>YOUR LITTLE CORNER</Text>
      <Text style={s.title}>Profile</Text>
      <View style={{ alignItems: "center", paddingVertical: 20, gap: 10 }}>
        <View
          style={{
            width: 80,
            height: 80,
            borderRadius: 40,
            backgroundColor: "#E4E9E5",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 27, fontWeight: "600", color: colors.navy }}>
            {user.initials}
          </Text>
        </View>
        <Text style={s.sectionTitle}>{user.name}</Text>
        <Text style={s.muted}>Always up for a new way there.</Text>
      </View>
      <View style={s.card}>
        {[
          "Personal information",
          "Travel preferences",
          "Notifications",
          "Currency",
          "Help",
          "About WayFarer",
        ].map((label, i) => (
          <View key={label}>
            <Pressable
              accessibilityRole="button"
              onPress={() => setSection(label)}
              style={({ pressed }) => [
                s.between,
                { paddingVertical: 10, opacity: pressed ? 0.6 : 1 },
              ]}
            >
              <View style={[s.row, { flex: 1 }]}>
                <Icon
                  name={
                    (
                      [
                        "person-outline",
                        "options-outline",
                        "notifications-outline",
                        "cash-outline",
                        "help-circle-outline",
                        "information-circle-outline",
                      ] as const
                    )[i]
                  }
                  size={20}
                />
                <Text style={s.body}>{label}</Text>
              </View>
              {label === "Currency" && <Text style={s.muted}>PHP ₱ </Text>}
              <Icon name="chevron-forward" size={16} color={colors.muted} />
            </Pressable>
            {i < 5 && <View style={s.line} />}
          </View>
        ))}
      </View>
      <Text style={[s.muted, { textAlign: "center", fontSize: 11 }]}>
        WayFarer · Version 1.0.0{String.fromCharCode(10)}Built for curious souls
        and island detours.
      </Text>
      <Modal
        visible={!!section}
        transparent
        animationType="fade"
        onRequestClose={() => setSection(null)}
      >
        <View
          style={{
            flex: 1,
            padding: 28,
            backgroundColor: "#152C3B66",
            justifyContent: "center",
          }}
        >
          <View style={s.card}>
            <Text style={s.sectionTitle}>{section}</Text>
            {section === "Notifications" ? (
              <View style={s.between}>
                <Text style={s.body}>Trip reminders (demo)</Text>
                <Switch
                  accessibilityLabel="Trip reminders"
                  value={notifications}
                  onValueChange={setNotifications}
                />
              </View>
            ) : section === "Travel preferences" ? (
              <>
                {["Best value", "Cheapest", "Fastest"].map((value) => (
                  <Button
                    key={value}
                    secondary={preference !== value}
                    title={value}
                    onPress={() => setPreference(value)}
                  />
                ))}
                <Text style={s.muted}>
                  Preference is stored for this session. Use the results filters
                  to sort each search.
                </Text>
              </>
            ) : (
              <Text style={s.body}>
                {section === "Personal information"
                  ? `${user.name}\nDemo traveler profile. Account editing will be available when accounts are connected.`
                  : section === "Currency"
                    ? "Philippine Peso (PHP · ₱)\nAll demo fares are shown in PHP."
                    : section === "Help"
                      ? "Enter your cities on Explore, compare routes, and save an itinerary using the heart button. Booking support will be added with provider integration."
                      : "WayFarer brings flights and ferries together, so you can find your own way through the Philippines. This frontend prototype uses illustrative travel data."}
              </Text>
            )}
            <Button title="Done" onPress={() => setSection(null)} />
          </View>
        </View>
      </Modal>
    </Page>
  );
}
