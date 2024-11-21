import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight } from 'lucide-react-native';
import { theme } from '../constants/theme';

// Reusable PaginationDots component
const PaginationDots = ({ total, active }) => (
  <View style={styles.paginationContainer}>
    {[...Array(total)].map((_, index) => (
      <View
        key={index}
        style={[
          styles.paginationDot,
          index === active && styles.paginationDotActive,
        ]}
      />
    ))}
  </View>
);

// Reusable NavigationButton component
const NavigationButton = ({ direction, onPress }) => (
  <TouchableOpacity style={styles.navButton} onPress={onPress}>
    {direction === 'left' ? (
      <ArrowLeft size={24} color="#000" />
    ) : (
      <ArrowRight size={24} color="#000" />
    )}
  </TouchableOpacity>
);

export default function OnboardingScreen() {
  const { width, height } = useWindowDimensions();
  const router = useRouter();

  // Data for onboarding screens
  const onboardingData = [
    {
      image: require('../assets/images/woman-petting-dog.png'),
      heading: 'Helping You to Take Good Care of Your Pets',
      subheading: 'With personalized tips and expert advice, keeping your pets happy and healthy has never been easier.',
    },
    {
      image: require('../assets/images/goat&farmer.png'),
      heading: 'Empowering Livestock Owners with Smart Solutions',
      subheading: "Monitor, manage, and optimize your farm animals' health with expert insights and AI-powered tools tailored for your livestock.",
    },
    {
      image: require('../assets/images/dog-man.png'),
      heading: 'Strengthening the Bond Between You and Your Pet',
      subheading: "Discover a smarter way to connect with your furry friends by understanding your pet’s needs and providing them the care they deserve..",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0); // Track the active onboarding step

  const handleNext = () => {
    if (activeIndex < onboardingData.length - 1) {
      setActiveIndex(activeIndex + 1);
    } else {
      router.push('welcome'); // Navigate to Welcome Page
    }
  };

  const handleBack = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  const handleSkip = () => {
    router.push('welcome'); // Skip directly to Welcome Page
  };

  const { image, heading, subheading } = onboardingData[activeIndex]; // Destructure data for current screen

  return (
    <View style={styles.container}>
      {/* Skip Button */}
      <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
        <Text style={styles.skipButtonText}>Skip</Text>
      </TouchableOpacity>

      {/* Content */}
      <View style={styles.contentContainer}>
        <Image
          source={image}
          style={[styles.image, { width: width * 0.8, height: height * 0.3 }]}
          resizeMode="contain"
        />
        <PaginationDots total={onboardingData.length} active={activeIndex} />
        <Text style={styles.heading}>{heading}</Text>
        <Text style={styles.subheading}>{subheading}</Text>
      </View>

      {/* Navigation Buttons */}
      <View style={styles.navigationContainer}>
        {activeIndex > 0 && (
          <NavigationButton direction="left" onPress={handleBack} />
        )}
        <NavigationButton direction="right" onPress={handleNext} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 20,
  },
  skipButton: {
    alignSelf: 'flex-end',
  },
  skipButtonText: {
    fontSize: 16,
    color: theme.colors.textLight,  // Using theme color for text
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    marginBottom: 30,
  },
  paginationContainer: {
    flexDirection: 'row',
    marginBottom: 30,
  },
  paginationDot: {
    width: 10,
    height: 10,
    borderRadius: theme.radius.xs,  // Using theme radius
    backgroundColor: theme.colors.gray, // Using theme color
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: theme.colors.primary, // Active dot color from theme
  },
  heading: {
    fontSize: 23,
    fontWeight: theme.fonts.bold,  // Using theme font weight
    textAlign: 'center',
    marginBottom: 10,
    paddingHorizontal: 20,
    color: theme.colors.text,  // Heading color from theme
  },
  subheading: {
    fontSize: 16,
    textAlign: 'center',
    color: theme.colors.textLight,  // Subheading color from theme
    paddingHorizontal: 20,
  },
  navigationContainer: {
    position: 'absolute',  // Make the navigation container fixed at the bottom
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  navButton: {
    padding: 10,
  },
})