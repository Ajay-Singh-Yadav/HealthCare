import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { SafeAreaView } from 'react-native-safe-area-context';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Feather name="menu" size={moderateScale(24)} color="#000" />
        </TouchableOpacity>
        <Image
          source={{
            uri: 'https://cdn-icons-png.flaticon.com/512/2966/2966327.png',
          }}
          style={styles.logo}
        />
        <TouchableOpacity>
          <Ionicons name="mic-outline" size={moderateScale(24)} color="#000" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Buttons Row */}
        <View style={styles.row}>
          <TouchableOpacity style={styles.card}>
            <Ionicons
              name="help-circle-outline"
              size={moderateScale(20)}
              color="#000"
            />
            <Text style={styles.cardText}>Questions</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Feather name="calendar" size={moderateScale(20)} color="#000" />
            <Text style={styles.cardText}>Reminders</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity style={styles.card}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={moderateScale(20)}
              color="#000"
            />
            <Text style={styles.cardText}>Messages</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.card}>
            <Ionicons
              name="calendar-outline"
              size={moderateScale(20)}
              color="#000"
            />
            <Text style={styles.cardText}>Calendar</Text>
          </TouchableOpacity>
        </View>

        {/* Upload Prescription */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>UPLOAD PRESCRIPTION</Text>
          <Text style={styles.sectionSub}>
            Upload a Prescription and Tell Us What you Need. We do the Rest. !
          </Text>
          <Text style={styles.offerText}>Flat 25% OFF ON MEDICINES</Text>
          <TouchableOpacity style={styles.orderBtn}>
            <Text style={styles.orderBtnText}>ORDER NOW</Text>
          </TouchableOpacity>
        </View>

        {/* Medical Service */}
        <View style={[styles.infoBox, { backgroundColor: '#CFF8D6' }]}>
          <Text style={styles.infoTitle}>
            Get the Best{'\n'}Medical Service
          </Text>
          <Text style={styles.infoDesc}>
            Rem illum facere quo corporis Quis in saepe itaque ut quos pariatur.
            Qui numquam rerum hic repudiandae rerum id amet tempore nam
            molestias omnis qui earum voluptatem!
          </Text>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
            }}
            style={styles.infoImage}
          />
        </View>

        {/* Discount Offer */}
        <View style={[styles.infoBox, { backgroundColor: '#E6D8FF' }]}>
          <Text style={styles.bigOffer}>UPTO{'\n'}80 %</Text>
          <Text style={styles.offerDesc}>offer{'\n'}On Health Products</Text>
          <TouchableOpacity style={styles.shopBtn}>
            <Text style={styles.shopBtnText}>SHOP NOW</Text>
          </TouchableOpacity>
          <Image
            source={{
              uri: 'https://cdn-icons-png.flaticon.com/512/3480/3480520.png',
            }}
            style={styles.productImage}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: moderateScale(12),
  },
  logo: {
    width: scale(40),
    height: scale(40),
    resizeMode: 'contain',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: moderateScale(12),
    marginBottom: verticalScale(12),
  },
  card: {
    flex: 1,
    backgroundColor: '#F7F7F7',
    borderRadius: moderateScale(12),
    padding: moderateScale(15),
    alignItems: 'center',
    marginHorizontal: scale(5),
  },
  cardText: {
    marginTop: verticalScale(5),
    fontSize: moderateScale(12),
    fontWeight: '500',
  },
  section: {
    paddingHorizontal: moderateScale(15),
    marginVertical: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    marginBottom: verticalScale(5),
  },
  sectionSub: {
    fontSize: moderateScale(12),
    color: '#555',
    marginBottom: verticalScale(5),
  },
  offerText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    marginBottom: verticalScale(8),
  },
  orderBtn: {
    backgroundColor: '#4A90E2',
    paddingVertical: verticalScale(8),
    paddingHorizontal: scale(15),
    borderRadius: moderateScale(8),
    alignSelf: 'flex-start',
  },
  orderBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(12),
  },
  infoBox: {
    marginHorizontal: moderateScale(15),
    borderRadius: moderateScale(12),
    padding: moderateScale(12),
    marginBottom: verticalScale(15),
    position: 'relative',
  },
  infoTitle: {
    fontSize: moderateScale(14),
    fontWeight: '700',
    marginBottom: verticalScale(5),
  },
  infoDesc: {
    fontSize: moderateScale(11),
    color: '#333',
    marginBottom: verticalScale(8),
  },
  infoImage: {
    width: scale(60),
    height: scale(60),
    resizeMode: 'contain',
    position: 'absolute',
    right: scale(10),
    bottom: scale(10),
  },
  bigOffer: { fontSize: moderateScale(20), fontWeight: '800', color: '#000' },
  offerDesc: { fontSize: moderateScale(12), marginVertical: verticalScale(4) },
  shopBtn: {
    backgroundColor: '#4A90E2',
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(8),
    alignSelf: 'flex-start',
  },
  shopBtnText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: moderateScale(12),
  },
  productImage: {
    width: scale(70),
    height: scale(70),
    resizeMode: 'contain',
    position: 'absolute',
    right: scale(10),
    bottom: scale(10),
  },
});
