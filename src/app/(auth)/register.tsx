import { useState } from 'react';
import { Link, router } from 'expo-router';
import { register } from '@/services/pokemonApi';
import { useAuth } from '@/context/AuthContext';

import { View, StyleSheet, Image, Text } from 'react-native';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import Card from '@/components/card';
import { Alert } from '@/components/alert';

export default function Register() {
    const [name, setName] = useState('');
    const [senha, setSenha] = useState('');
    const [isAlertVisible, setIsAlertVisible] = useState(false);
    const [alertData, setAlertData] = useState({
        title: '',
        message: '',
        type: 'success' as 'success' | 'error' | 'warning' | 'info',
    });

    const { signIn } = useAuth();

    async function handleRegister() {
        if (!name.trim() || !senha.trim()) {
            setAlertData({
                title: 'Campos obrigatórios',
                message: 'Por favor, preencha o nome e a senha.',
                type: 'warning',
            });
            setIsAlertVisible(true);
            return;
        }

        try {
            await register(name, senha);
            const success = await signIn(name, senha); // loga automaticamente após cadastro
            if (success) {
                router.push('/dashboard');
            }
        } catch (error: any) {
            const msg = error?.response?.data?.message ?? 'Não foi possível criar a conta. Tente novamente.';
            setAlertData({
                title: 'Erro no cadastro',
                message: msg,
                type: 'error',
            });
            setIsAlertVisible(true);
        }
    }

    return (
        <View style={styles.container}>
            <Card>
                <Text style={styles.titulo}>
                    Cadastro
                </Text>

                <Image
                    source={require('../../../assets/images/edit.png')}
                    style={{ width: 120, alignSelf: 'center', height: 120 }}
                />

                <Input
                    placeholder="Digite seu usuário"
                    onChangeText={setName}
                />

                <Input
                    placeholder="Digite sua senha"
                    secureTextEntry
                    onChangeText={setSenha}
                />
                <Text style={{ fontSize: 11, color: '#888', marginTop: -8 }}>
                    A senha deve conter maiúscula, número e símbolo. Ex: Teste@123
                </Text>

                <Button
                    title="Cadastrar"
                    onPress={handleRegister}
                    style={{ marginTop: 20 }}
                />

                 <Link href="/" asChild>
    <Text style={styles.destaque}>
        Já tem uma conta? Faça login!
    </Text>
</Link>

            </Card>

            <Alert
                title={alertData.title}
                message={alertData.message}
                type={alertData.type}
                visible={isAlertVisible}
                onClose={() => setIsAlertVisible(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f6f5f7',
        justifyContent: 'center',
        padding: 32,
        gap: 16,
    },
    titulo: {
       
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '700',
    color: '#4b187a',
    letterSpacing: 6,
    textTransform: 'uppercase',
}
    ,
         destaque: {
        textAlign: 'center',
        color: '#5d0f72',
        fontWeight: 'bold',
    },

});
