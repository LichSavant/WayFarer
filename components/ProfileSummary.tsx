import { Text, View } from "react-native";
import { User } from "../types/user";
import { Barcode, TicketMap } from "./ticket";
export function ProfileSummary({ user }: { user: User }) {
  return (
    <View
      style={{
        backgroundColor: "#E9DFD2",
        borderRadius: 13,
        borderWidth: 1,
        borderColor: "#D8C9B7",
      }}
    >
      <View style={{ padding: 25, gap: 24 }}>
        <TicketMap />
        <Text
          style={{
            fontSize: 8,
            fontWeight: "700",
            letterSpacing: 2.5,
            color: "#8C7762",
          }}
        >
          YOUR WORLD / YOUR WAY
        </Text>
        <View
          style={{
            width: 74,
            height: 74,
            borderRadius: 40,
            backgroundColor: "#CBB69F",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 26, fontWeight: "500", color: "#4D3C2C" }}>
            {user.initials}
          </Text>
        </View>
        <View style={{ gap: 7 }}>
          <Text
            style={{
              fontSize: 27,
              fontWeight: "500",
              letterSpacing: -1,
              color: "#32271D",
            }}
          >
            {user.name}
          </Text>
          <Text style={{ fontSize: 11, color: "#8B7661" }}>
            Always open to a new horizon.
          </Text>
        </View>
      </View>
      <View
        style={{
          padding: 24,
          borderTopWidth: 1,
          borderStyle: "dashed",
          borderColor: "#CBB8A3",
          gap: 10,
        }}
      >
        <Barcode height={35} />
        <Text style={{ fontSize: 8, letterSpacing: 2, color: "#8A7560" }}>
          PASSENGER / {user.initials} / {user.currency}
        </Text>
      </View>
    </View>
  );
}
