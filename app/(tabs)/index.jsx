import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Menu, MapPin, Cat, Dog, Cow, Bird, Fish, Rabbit, MessageCircle } from 'lucide-react-native';
import { theme } from '../../constants/theme';
import ScreenWrapper from '../../components/ScreenWrapper';

const categories = [
  { id: 'all', label: 'All', icon: null },
  { id: 'cat', label: 'Cat', icon: Cat },
  { id: 'dog', label: 'Dog', icon: Dog },
  { id: 'cow', label: 'Cow', icon: Cow },
  { id: 'bird', label: 'Bird', icon: Bird },
  { id: 'fish', label: 'Fish', icon: Fish },
  { id: 'rabbit', label: 'Rabbit', icon: Rabbit },
];

// Sample pets data
const myPets = [
  { id: '1', name: 'Luna', age: '2 years', image: require('../../assets/images/pets/pet1.png') },
  { id: '2', name: 'Max', age: '1.5 years', image: require('../../assets/images/pets/pet2.png') },
  { id: '3', name: 'Bella', age: '3 years', image: require('../../assets/images/pets/pet3.png') },
];

// Sample learning content
const learnContent = [
  { id: '1', title: 'Pet Nutrition Basics', image: require('../../assets/images/learn/pet1.png') },
  { id: '2', title: 'Training Tips', image: require('../../assets/images/learn/pet2.png') },
  { id: '3', title: 'Pet Health Guide', image: require('../../assets/images/learn/pet3.png') }
];

console.log('Loading HomeScreen component');

export default function HomeScreen() {
  console.log('Rendering HomeScreen');
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <ScreenWrapper>
      <SafeAreaView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <TouchableOpacity style={styles.menuButton}>
              <Menu size={24} color={theme.colors.text} />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.locationContainer}>
              <MapPin size={20} color={theme.colors.primary} />
              <Text style={styles.locationText}>Nairobi, Kenya</Text>
            </TouchableOpacity>
            
            <View style={styles.menuPlaceholder} />
          </View>

          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>
              Hi, {user?.displayName || 'Pet Lover'}! 👋
            </Text>
            <Text style={styles.subtitle}>
              Let's take care of your pets and animals!
            </Text>
          </View>

          {/* Category Filter */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            style={styles.categoryScroll}
            contentContainerStyle={styles.categoryContainer}
          >
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id)}
              >
                {category.icon && (
                  <category.icon 
                    size={20} 
                    color={selectedCategory === category.id ? '#fff' : theme.colors.text}
                    style={styles.categoryIcon}
                  />
                )}
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category.id && styles.categoryTextActive
                  ]}
                >
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* My Pets Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>My Pets</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.petsContainer}
            >
              {myPets.map((pet) => (
                <TouchableOpacity key={pet.id} style={styles.petCard}>
                  <Image 
                    source={pet.image} 
                    style={styles.petImage}
                    resizeMode="cover"
                  />
                  <View style={styles.petInfoOverlay}>
                    <Text style={styles.petName}>{pet.name}</Text>
                    <Text style={styles.petAge}>{pet.age}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Chatbot Notification */}
          <TouchableOpacity style={styles.chatbotCard}>
            <Image 
              source={require('../../assets/images/chatbot-logo.png')} 
              style={styles.chatbotIcon} 
            />
            <View style={styles.chatbotContent}>
              <Text style={styles.chatbotText}>
                You asked about Charlie's coughing...
              </Text>
              <Text style={styles.chatbotTime}>2m ago</Text>
            </View>
            <MessageCircle size={20} color={theme.colors.primary} />
          </TouchableOpacity>

          {/* Learn Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Learn</Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.learnContainer}
            >
              {learnContent.map((item) => (
                <TouchableOpacity key={item.id} style={styles.learnCard}>
                  <Image 
                    source={item.image} 
                    style={styles.learnImage}
                    resizeMode="cover"
                  />
                  <View style={styles.learnInfoOverlay}>
                    <Text style={styles.learnTitle}>{item.title}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  menuButton: {
    padding: theme.spacing.sm,
  },
  menuPlaceholder: {
    width: 40, // Same width as menuButton for balance
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.xs,
  },
  locationText: {
    fontSize: 16,
    color: theme.colors.text,
    fontWeight: theme.fonts.medium,
  },
  welcomeSection: {
    padding: theme.spacing.lg,
  },
  greeting: {
    fontSize: 24,
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: 16,
    color: theme.colors.textLight,
    fontWeight: theme.fonts.regular,
  },
  categoryScroll: {
    flexGrow: 0,
    marginVertical: theme.spacing.sm,
  },
  categoryContainer: {
    paddingHorizontal: theme.spacing.lg,
    gap: theme.spacing.xs,
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.radius.full,
    backgroundColor: '#F5F5F5',
    marginRight: theme.spacing.sm,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 1,
  },
  categoryButtonActive: {
    backgroundColor: theme.colors.primary,
  },
  categoryIcon: {
    marginRight: theme.spacing.xs,
  },
  categoryText: {
    fontSize: 14,
    fontWeight: theme.fonts.medium,
    color: theme.colors.text,
  },
  categoryTextActive: {
    color: '#fff',
  },
  section: {
    paddingVertical: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  },
  petsContainer: {
    paddingHorizontal: theme.spacing.md,
    flexDirection: 'row',
    paddingVertical: theme.spacing.xs,
  },
  petCard: {
    width: 215.52,
    height: 266.83,
    marginRight: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 5,
    position: 'relative',
  },
  petImage: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.lg,
  },
  petInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: theme.radius.lg,
    borderBottomRightRadius: theme.radius.lg,
    padding: theme.spacing.sm,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingHorizontal: theme.spacing.md,
  },
  petName: {
    fontSize: 16,
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    textAlign: 'left',
  },
  petAge: {
    fontSize: 14,
    color: theme.colors.textLight,
    textAlign: 'left',
    marginTop: 2,
  },
  chatbotCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE5E5',
    margin: theme.spacing.md,
    padding: theme.spacing.md,
    borderRadius: theme.radius.lg,
  },
  chatbotIcon: {
    width: 40,
    height: 40,
    borderRadius: theme.radius.full,
  },
  chatbotContent: {
    flex: 1,
    marginLeft: theme.spacing.md,
  },
  chatbotText: {
    fontSize: 14,
    color: theme.colors.text,
  },
  chatbotTime: {
    fontSize: 12,
    color: theme.colors.textLight,
    marginTop: 2,
  },
  learnContainer: {
    paddingHorizontal: theme.spacing.lg,
    flexDirection: 'row',
    paddingVertical: theme.spacing.xs,
  },
  learnCard: {
    width: 215.52,
    height: 266.83,
    marginRight: theme.spacing.md,
    borderRadius: theme.radius.lg,
    backgroundColor: '#fff',
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
    shadowRadius: 8,
    shadowOpacity: 1,
    elevation: 5,
    position: 'relative',
  },
  learnImage: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.lg,
  },
  learnInfoOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '20%',
    backgroundColor: '#fff',
    borderBottomLeftRadius: theme.radius.lg,
    borderBottomRightRadius: theme.radius.lg,
    padding: theme.spacing.sm,
    shadowColor: 'rgba(0, 0, 0, 0.1)',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowRadius: 4,
    shadowOpacity: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  learnTitle: {
    fontSize: 16,
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    textAlign: 'center',
  },
});

console.log('Exporting HomeScreen'); 