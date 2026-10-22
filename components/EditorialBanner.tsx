import React from "react";
import { Text, View } from "react-native";
import { useResponsive } from "../hooks/useResponsive";
import { Barcode, TicketMap } from "./ticket";
export function EditorialBanner({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  image?: "islands" | "coast" | "sunset";
  children?: React.ReactNode;
}) {
  const { wide } = useResponsive();
  return (
    <View
      style={{
        flexDirection: wide ? "row" : "column",
        borderBottomWidth: 1,
        borderColor: "#D2C1AF",
        borderStyle: "dashed",
        paddingBottom: 28,
        marginBottom: 4,
      }}
    >
      <View style={{ flex: 1, gap: 16, minWidth: 0 }}>
        <TicketMap />
        <Text
          style={{
            fontSize: 8,
            letterSpacing: 3,
            color: "#8B7967",
            fontWeight: "700",
          }}
        >
          {eyebrow}
        </Text>
        <Text
          style={{
            fontSize: wide ? 42 : 31,
            lineHeight: wide ? 48 : 37,
            letterSpacing: -1.8,
            fontWeight: "500",
            color: "#2A231C",
          }}
        >
          {title}
        </Text>
        <Text style={{ fontSize: 13, lineHeight: 21, color: "#83715F" }}>
          {subtitle}
        </Text>
        {children}
      </View>
      {wide && (
        <View
          style={{
            width: 130,
            paddingLeft: 30,
            borderLeftWidth: 1,
            borderStyle: "dashed",
            borderColor: "#CDBCA9",
            gap: 12,
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 12,
              color: "#5F4C3A",
              letterSpacing: -0.5,
              fontWeight: "600",
            }}
          >
            WayFarer
          </Text>
          <Barcode height={40} />
          <Text style={{ fontSize: 7, letterSpacing: 2, color: "#8A7662" }}>
            TRAVEL FURTHER
          </Text>
        </View>
      )}
    </View>
  );
}
