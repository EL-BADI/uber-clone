import { icons } from "@/constants";
import { cn } from "@/lib/utils";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";
const TabIcon = ({
  focused,
  source,
}: {
  focused: boolean;
  source: ImageSourcePropType;
}) => {
  return (
    <View
      className={cn(
        "flex flex-row justify-center items-center rounded-full",
        focused && "bg-general-300"
      )}
    >
      <View
        className={cn(
          "rounded-full w-12 h-12 items-center justify-center",
          focused && "bg-general-400"
        )}
      >
        <Image
          source={source}
          resizeMode="contain"
          tintColor={"white"}
          className="w-7 h-7"
        />
      </View>
    </View>
  );
};

export default function AuthLayout() {
  return (
    <Tabs
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: "#333333",
          borderRadius: 50,
          paddingBottom: 0,
          overflow: "hidden",
          marginHorizontal: 20,
          marginBottom: 20,
          height: 78,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          position: "absolute",
        },
      }}
    >
      <Tabs.Screen
        name="Home"
        options={{
          headerShown: false,
          title: "Home",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.home} />
          ),
        }}
      />
      <Tabs.Screen
        name="Rides"
        options={{
          headerShown: false,
          title: "Rides",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.list} />
          ),
        }}
      />
      <Tabs.Screen
        name="Chat"
        options={{
          headerShown: false,
          title: "Chat",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.chat} />
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          headerShown: false,
          title: "Profile",
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} source={icons.profile} />
          ),
        }}
      />
    </Tabs>
  );
}
