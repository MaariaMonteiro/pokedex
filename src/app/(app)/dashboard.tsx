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
            title: 'Pikachu',
            imageSource: require('../../../assets/images/profile-icon.png'),
            description: 'Um Pokémon elétrico muito energético, capaz de armazenar eletricidade nas bochechas e liberar ataques poderosos',
        },
        {
            id: 2,
            title: 'Bulbasaur',
            imageSource: require('../../../assets/images/settings-icon.png'),
            description: 'Um Pokémon do tipo Planta e Veneno que carrega uma semente nas costas desde o nascimento, a qual cresce junto com ele',
        },
        {
            id: 3,
            title: 'Squirtle',
            imageSource: require('../../../assets/images/notification-icon.png'),
            description: 'Um Pokémon tartaruga do tipo Água. Pequeno, ágil e conhecido por lançar jatos d’água poderosos.',
        },
        {
            id: 4,
            title: 'Raichu',
            imageSource: require('../../../assets/images/raichu.png'),
            description: 'Um Pokémon elétrico rápido e poderoso, capaz de liberar fortes descargas de energia pelos ataques..',
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

                <Button title="Sair" onPress={signOut} />
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