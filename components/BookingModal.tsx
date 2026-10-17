import { Modal, Text, View } from "react-native";
import { GlassPanel } from "./glass/GlassPanel";
import { GlassButton } from "./glass/GlassButton";
import { colors, glass } from "./theme";
import { Icon } from "./Icon";
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
          backgroundColor: glass.scrim,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GlassPanel
          style={{
            width: "100%",
            maxWidth: 460,
            padding: 28,
            backgroundColor: glass.darkStrong,
            gap: 20,
          }}
        >
          <Icon name="open-outline" size={30} color={colors.aqua} />
          <Text
            style={{
              fontSize: 25,
              lineHeight: 32,
              fontWeight: "500",
              letterSpacing: -0.5,
              color: glass.text,
            }}
          >
            Your journey continues with {provider}
          </Text>
          <Text style={{ fontSize: 15, lineHeight: 24, color: glass.text }}>
            You'll complete your booking with the travel provider.
          </Text>
          <Text style={{ fontSize: 13, lineHeight: 22, color: glass.dim }}>
            WayFarer helps you compare and discover routes. Booking and payment
            happen with the provider. This is a mock preview; no redirect or
            booking is connected yet.
          </Text>
          <GlassButton primary title="Got it" onPress={onClose} />
        </GlassPanel>
      </View>
    </Modal>
  );
}
