import { ScrollView, StyleSheet, View } from 'react-native';
import Header from '../components/Header';
import AccountSection from '../components/account-section';
import ActionMenu from '../components/action-menu';
import CardsButton from '../components/cards-button';
import SavingsSection from '../components/savings-section';

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <Header />
      <AccountSection />
      <ActionMenu />
      <CardsButton />
      <SavingsSection />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});