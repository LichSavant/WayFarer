import { Modal, Text, View } from "react-native";
import { Button, colors, Icon, s } from "./ui";
export function BookingModal({
  visible,
  provider,
  onClose,
}: {
  visible: boolean;
  provider: string;
  onClose: () => void;
}) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View
        style={{
          flex: 1,
          padding: 24,
          backgroundColor: "#152C3B66",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={[s.card, { width: "100%", maxWidth: 460, padding: 28 }]}>
          <Icon name="open-outline" size={30} color={colors.blue} />
          <Text style={s.sectionTitle}>
            Your journey continues with {provider}
          </Text>
          <Text style={s.body}>
            You'll complete your booking with the travel provider.
          </Text>
          <Text style={s.muted}>
            WayFarer helps you compare and discover routes. Booking and payment
            happen with the provider. This is a mock preview; no redirect or
            booking is connected yet.
          </Text>
          <Button title="Got it" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
}
