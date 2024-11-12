import { ActivityIndicator, View } from "react-native";

export function FooterList() {
  return (
    <View style={{ padding: 16, alignItems: 'center', justifyContent: 'center' }}>
      <ActivityIndicator size="small" color="#0000ff" />
    </View>
  );
}