import { useEffect, useState } from "react";
import { ActivityIndicator, Modal, Text, View } from "react-native";
import { colors, Icon, s } from "./ui";
import { glass } from "./theme";
import { GlassPanel } from "./glass/GlassPanel";
const stages = [
  "Checking flights…",
  "Checking ferries…",
  "Comparing fares…",
  "Calculating the best routes…",
];
export function SearchProgress({
  visible,
  origin,
  destination,
}: {
  visible: boolean;
  origin: string;
  destination: string;
}) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(0);
    if (!visible) return;
    const timer = setInterval(() => setStep((v) => Math.min(v + 1, 3)), 300);
    return () => clearInterval(timer);
  }, [visible]);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={() => {}}
    >
      <View
        style={{
          flex: 1,
          backgroundColor: glass.scrim,
          padding: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <GlassPanel
          accessibilityLiveRegion="polite"
          style={[
            {
              width: "100%",
              maxWidth: 460,
              padding: 32,
              gap: 22,
              backgroundColor: glass.darkStrong,
            },
          ]}
        >
          <View style={s.between}>
            <Text style={[s.eyebrow, { color: glass.dim }]}>
              FINDING YOUR WAY
            </Text>
            <ActivityIndicator color={colors.aqua} />
          </View>
          <Text style={[s.sectionTitle, { color: glass.text }]}>
            Searching {origin} → {destination}
          </Text>
          {stages.map((stage, i) => (
            <View key={stage} style={s.row}>
              <Icon
                name={
                  i < step
                    ? "checkmark-circle"
                    : i === step
                      ? "ellipse"
                      : "ellipse-outline"
                }
                color={i <= step ? colors.aqua : glass.dim}
                size={18}
              />
              <Text
                style={[s.body, { color: i <= step ? glass.text : glass.dim }]}
              >
                {stage}
              </Text>
            </View>
          ))}
          <Text style={[s.muted, { color: glass.dim }]}>
            Comparing mock provider inventory. No live fares.
          </Text>
        </GlassPanel>
      </View>
    </Modal>
  );
}
