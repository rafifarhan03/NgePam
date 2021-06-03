import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  FlatList,
} from "react-native";
import { Profile } from ".";

import { icons, images, SIZES, COLORS, FONTS } from "../constants";

const Home = ({ navigation }) => {
  // Dummy Datas

  const initialCurrentLocation = {
    streetName: "Teluk",
    gps: {
      latitude: 1.5496614931250685,
      longitude: 110.36381866919922,
    },
  };

  const categoryData = [
    {
      id: 1,
      name: "Printing",
      icon: icons.DigitalPrinting,
    },
    {
      id: 2,
      name: "Cetakan",
      icon: icons.Offset,
    },
    {
      id: 3,
      name: "Pakaian",
      icon: icons.Clothes,
    },
    {
      id: 4,
      name: "Sablon",
      icon: icons.Sablon,
    },
  ];

  const PercetakanData = [
    {
      id: 1,
      name: "Banner",
      categories: [1],
      photo: images.Banner1,
      menu: [
        {
          menuId: 1,
          name: "Banner",
          photo: images.Banner,
          description:
            "Pilihan alat bantu yang tepat untuk mempromosikan brand anda",
          price: 20000,
        },
        {
          menuId: 2,
          name: "Stiker",
          photo: images.stiker,
          description: "Gunakan stiker untuk memberi tanda brand anda",
          price: 10000,
        },
      ],
    },
    {
      id: 2,
      name: "Offset",
      categories: [2],
      photo: icons.Offset,
      menu: [
        {
          menuId: 3,
          name: "Nota",
          photo: images.nota,
          description: "Mempermudah proses bisnis anda",
          price: 10000,
        },
        {
          menuId: 4,
          name: "Yasin",
          photo: images.Yasin,
          description: "Untuk mengenang orang tercinta",
          price: 35000,
        },
      ],
    },
    {
      id: 3,
      name: "Pakaian",
      categories: [3],
      photo: images.seragam,

      menu: [
        {
          menuId: 5,
          name: "Kaos",
          photo: images.kaos,
          description: "",
          calories: 100,
          price: 20,
        },
      ],
    },
    {
      id: 4,
      name: "Sablon",
      categories: [4],
      photo: images.sablon,
      menu: [
        {
          menuId: 6,
          name: "Nyablon Gan",
          photo: images.sablon,
          description: "",
          price: 10000,
        },
      ],
    },
  ];

  const [categories, setCategories] = React.useState(categoryData);
  const [selectedCategory, setSelectedCategory] = React.useState(null);
  const [Percetakans, setPercetakan] = React.useState(PercetakanData);
  const [currentLocation, setCurrentLocation] = React.useState(
    initialCurrentLocation
  );

  function onSelectCategory(category) {
    //filter Percetakan
    let PercetakanList = PercetakanData.filter((a) =>
      a.categories.includes(category.id)
    );

    setPercetakan(PercetakanList);

    setSelectedCategory(category);
  }

  function getCategoryNameById(id) {
    let category = categories.filter((a) => a.id == id);

    if (category.length > 0) return category[0].name;

    return "";
  }

  function renderHeader() {
    return (
      <View style={{ flexDirection: "row", height: 50 }}>
        <TouchableOpacity
          style={{
            width: 50,
            paddingLeft: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.nearby}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
          />
        </TouchableOpacity>

        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <View
            style={{
              width: "70%",
              height: "100%",
              backgroundColor: COLORS.lightGray3,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: SIZES.radius,
            }}
          >
            <Text style={{ ...FONTS.h3 }}></Text>
          </View>
        </View>

        <TouchableOpacity
          style={{
            width: 50,
            paddingRight: SIZES.padding * 2,
            justifyContent: "center",
          }}
        >
          <Image
            source={icons.basket}
            resizeMode="contain"
            style={{
              width: 30,
              height: 30,
            }}
            onPress={Profile}
          />
        </TouchableOpacity>
      </View>
    );
  }

  function renderMainCategories() {
    const renderItem = ({ item }) => {
      return (
        <TouchableOpacity
          style={{
            padding: SIZES.padding,
            paddingBottom: SIZES.padding * 2,
            backgroundColor:
              selectedCategory?.id == item.id ? COLORS.primary : COLORS.white,
            borderRadius: SIZES.radius,
            alignItems: "center",
            justifyContent: "center",
            marginRight: SIZES.padding,
            ...styles.shadow,
          }}
          onPress={() => onSelectCategory(item)}
        >
          <View
            style={{
              width: 50,
              height: 50,
              borderRadius: 25,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor:
                selectedCategory?.id == item.id
                  ? COLORS.white
                  : COLORS.lightGray,
            }}
          >
            <Image
              source={item.icon}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
              }}
            />
          </View>

          <Text
            style={{
              marginTop: SIZES.padding,
              color:
                selectedCategory?.id == item.id ? COLORS.white : COLORS.black,
              ...FONTS.body5,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      );
    };

    return (
      <View style={{ padding: SIZES.padding * 2 }}>
        <Text style={{ ...FONTS.h1 }}>Warna</Text>
        <Text style={{ ...FONTS.h1 }}>Printing</Text>

        <FlatList
          data={categories}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => `${item.id}`}
          renderItem={renderItem}
          contentContainerStyle={{ paddingVertical: SIZES.padding * 2 }}
        />
      </View>
    );
  }

  function renderPercetakanList() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{ marginBottom: SIZES.padding * 2 }}
        onPress={() =>
          navigation.navigate("Percetakan", {
            item,
            currentLocation,
          })
        }
      >
        {/* Image */}
        <View
          style={{
            marginBottom: SIZES.padding,
          }}
        >
          <Image
            source={item.photo}
            resizeMode="cover"
            style={{
              width: "100%",
              height: 200,
              borderRadius: SIZES.radius,
            }}
          />
        </View>

        {/* Percetakan Info */}
        <Text style={{ ...FONTS.body2 }}>{item.name}</Text>

        <View
          style={{
            marginTop: SIZES.padding,
            flexDirection: "row",
          }}
        >
          {/* Categories */}
          <View
            style={{
              flexDirection: "row",
              marginLeft: 10,
            }}
          >
            {item.categories.map((categoryId) => {
              return (
                <View style={{ flexDirection: "row" }} key={categoryId}>
                  <Text style={{ ...FONTS.body3 }}>
                    {getCategoryNameById(categoryId)}
                  </Text>
                  <Text style={{ ...FONTS.h3, color: COLORS.darkgray }}>
                    {" "}
                    .{" "}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <FlatList
        data={Percetakans}
        keyExtractor={(item) => `${item.id}`}
        renderItem={renderItem}
        contentContainerStyle={{
          paddingHorizontal: SIZES.padding * 2,
          paddingBottom: 30,
        }}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {renderHeader()}
      {renderMainCategories()}
      {renderPercetakanList()}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray4,
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 1,
  },
});

export default Home;
