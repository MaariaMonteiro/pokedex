import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from '@/components/button';
import CardIcon from '@/components/cardIcon';
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
    const { user, signOut } = useAuth();

    // Dados dos cards - TODOS com caminho relativo ../../assets/
    const cardsData = [
        {
            id: 1,
            title: 'Meu Perfil',
            imageSource: require('../../../assets/images/profile-icon.png'),
            description: 'Pikachu',
        },
        {
            id: 2,
            title: 'Configurações',
            imageSource: require('../../../assets/images/settings-icon.png'),
            description: 'Lero lero',
        },
        {
            id: 3,
            title: 'Notificações',
            imageSource: require('../../../assets/images/notification-icon.png'),
            description: 'Liru Liru',
        },
    ];

    const handleCardPress = (title: string) => {
        console.log(`Card ${title} pressionado`);
    };

    return (
        <ScrollView style={styles.scrollView}>
            <View style={styles.container}>
                <Text style={styles.welcomeText}>Bem-vindo, {user}</Text>
                
                <View style={styles.cardsContainer}>
                    {cardsData.map((card) => (
                        <CardIcon
                            key={card.id}
                            title={card.title}
                            imageSource={card.imageSource}
                            description={card.description}
                            onPress={() => handleCardPress(card.title)}
                        />
                    ))}
                </View>

                <Button title="Sair da APP" onPress={signOut} />
            </View>
        </ScrollView>
    );
}

export const styles = StyleSheet.create({
    scrollView: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        padding: 32,
        gap: 16,
    },
    welcomeText: {
        color: '#333',
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    cardsContainer: {
        marginVertical: 16,
        gap: 12,
    },
});