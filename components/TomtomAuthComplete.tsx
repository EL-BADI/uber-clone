import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  Image,
  ImageSourcePropType,
} from "react-native";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faMapMarkerAlt,
  faSearch,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { GoogleInputProps } from "@/types/type";
import { useLocationStore } from "@/store";

interface SuggestionItemProps {
  item: {
    p1: string | null;
    p2: string | null;
    p3: string | null;
    address: string;
    lat: number;
    lon: number;
  };
  onPressItem: (item: SuggestionItemProps["item"]) => void;
}

export function SuggestionListItem({ item, onPressItem }: SuggestionItemProps) {
  return (
    <TouchableOpacity
      onPress={() => onPressItem(item)}
      className=" bg-zinc-100 rounded-lg"
    >
      <View className="flex-row items-center my-2">
        <View className="ml-2 mr-2 mt-2">
          <FontAwesomeIcon icon={faMapMarkerAlt} />
        </View>
        <View>
          <Text className="font-bold">{item.p1}</Text>
          {item.p2 && item.p3 ? (
            <Text>
              {item.p2} {item.p3}
            </Text>
          ) : item.p2 ? (
            <Text>{item.p2}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
}

interface SuggestionsProps {
  placeholder: string;
  showList: boolean;
  suggestionListData: SuggestionItemProps["item"][];
  onPressItem: (item: SuggestionItemProps["item"]) => void;
  handleSearchTextChange: (text: string) => void;
  icon?: string;
}

export function Suggestions({
  placeholder,
  showList,
  suggestionListData,
  onPressItem,
  icon,
  handleSearchTextChange,
}: SuggestionsProps) {
  const searchInputRef = useRef<TextInput | null>(null);
  const [inputText, setInputText] = useState("");

  const handleOnPressItem = (item: SuggestionItemProps["item"]) => {
    searchInputRef.current?.blur();
    onPressItem(item);
  };

  const clearInput = () => {
    setInputText("");
    searchInputRef.current?.blur();
    handleSearchTextChange("");
  };

  return (
    <View className="w-full z-10">
      <View className="flex-row w-full items-center h-10 pl-2 pr-2 border border-gray-300 rounded-full shadow-md bg-white">
        <Image
          source={icon as ImageSourcePropType}
          className="w-6 h-6"
          resizeMode="contain"
        />
        <TextInput
          ref={searchInputRef}
          className="flex-1 ml-3 w-full"
          placeholder={placeholder}
          value={inputText}
          onChangeText={(text) => {
            setInputText(text);
            handleSearchTextChange(text);
          }}
        />
        {inputText.length > 0 && (
          <TouchableOpacity onPress={clearInput} className="mr-2">
            <FontAwesomeIcon icon={faTimes} style={{ color: "gray" }} />
          </TouchableOpacity>
        )}
      </View>
      {showList && (
        <FlatList
          className="absolute top-12 w-full mt-0 bg-white rounded-lg shadow-lg p-3"
          ItemSeparatorComponent={() => <View className="my-1"></View>}
          keyExtractor={(_, index) => index.toString()}
          keyboardShouldPersistTaps="always"
          initialNumToRender={5}
          data={suggestionListData}
          renderItem={({ item }) => (
            <SuggestionListItem onPressItem={handleOnPressItem} item={item} />
          )}
        />
      )}
    </View>
  );
}

const TomtomAuthComplete = ({
  handlePress,
  icon,
  initialLocation,
}: GoogleInputProps) => {
  const tomtomKey = process.env.EXPO_PUBLIC_TOMTOM_KEY;
  const { userLatitude, userLongitude } = useLocationStore();

  const [placeholder, setPlaceholder] = useState(
    initialLocation || "Query e.g. Washington"
  );
  const [showList, setShowList] = useState(false);
  const [suggestionListData, setSuggestionListData] = useState<
    SuggestionItemProps["item"][]
  >([]);

  const handleSearchTextChange = (changedSearchText: string) => {
    if (!changedSearchText || changedSearchText.length < 5) return;

    let baseUrl = `https://api.tomtom.com/search/2/search/${changedSearchText}.json?`;
    let searchUrl = baseUrl + `key=${tomtomKey}`;

    if (location) {
      searchUrl += `&lon=${userLongitude}&lat=${userLatitude}`;
    }

    axios
      .get(searchUrl)
      .then((response) => {
        let addresses = response.data.results.map((v: any) => {
          let parts = v.address.freeformAddress.split(",");
          return {
            p1: parts.length > 0 ? parts[0] : null,
            p2: parts.length > 1 ? parts[1] : null,
            p3: parts.length > 2 ? parts[2] : null,
            address: v.address.freeformAddress,
            lat: v.position.lat,
            lon: v.position.lon,
          };
        });

        setSuggestionListData(addresses);
        setShowList(true);
      })
      .catch((error) => {
        console.error("Error fetching suggestions:", error);
      });
  };

  const onPressItem = (item: SuggestionItemProps["item"]) => {
    const { lat, lon, address } = item;
    handlePress({ latitude: lat, longitude: lon, address });
    setPlaceholder(item.address);
    setShowList(false);
  };

  return (
    <Suggestions
      icon={icon}
      placeholder={placeholder}
      showList={showList}
      suggestionListData={suggestionListData}
      onPressItem={onPressItem}
      handleSearchTextChange={handleSearchTextChange}
    />
  );
};

export default TomtomAuthComplete;
