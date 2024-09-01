import { View, Text, Image } from "react-native";
import { Ride } from "@/types/type";
import { icons } from "@/constants";
import { cn, formatDate, formatTime } from "@/lib/utils";

const RideCard = ({
  ride: {
    destination_longitude,
    driver,
    destination_latitude,
    origin_address,
    destination_address,
    created_at,
    ride_time,
    payment_status,
  },
}: {
  ride: Ride;
}) => {
  return (
    <View className=" flex flex-row items-center justify-center bg-white rounded-lg shadow-sm shadow-neutral-300 mb-3">
      <View className=" flex flex-col items-center justify-center p-3">
        <View className=" flex flex-row items-center justify-between">
          <Image
            source={{
              uri: `https://maps.geoapify.com/v1/staticmap?style=osm-bright&width=600&height=400&center=lonlat:${destination_longitude},${destination_latitude}&zoom=14&apiKey=${process.env.EXPO_PUBLIC_GEOAPIFY_KEY}`,
            }}
            className=" w-[80px] h-[90px] rounded-lg"
          />

          <View className=" flex flex-col mx-5 gap-y-5 flex-1">
            <View className=" flex flex-row items-center gap-x-2">
              <Image source={icons.to} className=" w-5 h-5" />
              <Text numberOfLines={1} className=" text-base font-JakartaMedium">
                {origin_address}
              </Text>
            </View>
            <View className=" flex flex-row items-center gap-x-2">
              <Image source={icons.point} className=" w-5 h-5" />
              <Text numberOfLines={1} className=" text-base font-JakartaMedium">
                {destination_address}
              </Text>
            </View>
          </View>
        </View>

        <View className=" flex flex-col w-full mt-5 bg-general-500 rounded-lg p-3 items-start justify-center">
          <View className=" flex flex-row w-full justify-between items-center mb-5">
            <Text className=" text-base font-JakartaMedium text-gray-500">
              Date & Time
            </Text>
            <Text className=" text-base font-JakartaMedium text-gray-500">
              {formatDate(created_at)}, {formatTime(ride_time)}
            </Text>
          </View>
          <View className=" flex flex-row w-full justify-between items-center mb-5">
            <Text className=" text-base font-JakartaMedium text-gray-500">
              Driver
            </Text>
            <Text className=" text-base font-JakartaMedium text-gray-500">
              {driver.first_name} {driver.last_name}
            </Text>
          </View>
          <View className=" flex flex-row w-full justify-between items-center mb-5">
            <Text className=" text-base font-JakartaMedium text-gray-500">
              Driver
            </Text>
            <Text className=" text-base font-JakartaMedium text-gray-500">
              {driver.first_name} {driver.last_name}
            </Text>
          </View>
          <View className=" flex flex-row w-full justify-between items-center mb-5">
            <Text className=" text-base font-JakartaMedium text-gray-500">
              Car seats
            </Text>
            <Text className=" text-base font-JakartaMedium text-gray-500">
              {driver.car_seats}
            </Text>
          </View>
          <View className=" flex flex-row w-full justify-between items-center mb-5">
            <Text className=" text-base font-JakartaMedium text-gray-500">
              Payment Status
            </Text>
            <Text
              className={cn(
                " text-base capitalize font-JakartaMedium text-gray-500",
                payment_status === "paid"
                  ? " text-emerald-500"
                  : " text-rose-500"
              )}
            >
              {payment_status}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default RideCard;
