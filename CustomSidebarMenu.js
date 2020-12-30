// Custom Navigation Drawer / Sidebar with Image and Icon in Menu Options
// https://aboutreact.com/custom-navigation-drawer-sidebar-with-image-and-icon-in-menu-options/

import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

const CustomSidebarMenu = (props) => {
  const BASE_PATH =
    'https://coronavirus.utah.gov/wp-content/uploads/';
  const proileImage = 'SchoolWebImage_3.png';

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/*Top Large Image */}
      <Image
        source={{ uri: BASE_PATH + proileImage }}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text style={{ fontSize: 10, textAlign: 'center', color: 'grey', marginBottom: '10%' }}>
        Developed by M. Bakhtiar Zuberi (SP18-BCS-086)
      </Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'center',
    marginTop: 20,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    alignSelf: 'center',
  }
});

export default CustomSidebarMenu;
