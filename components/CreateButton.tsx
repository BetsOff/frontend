import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useColor, View } from '@/components/Themed';
import { Href, useRouter } from 'expo-router';

type CreateButtonProps = {
    object: string,
    link: string,
}

const CreateButton: React.FC<CreateButtonProps> = ({ object, link }) => {
    const color = useColor();
    const router = useRouter();

    const handleCreate = () => {
        router.push(link as Href<string>);
    }

    return (
        <TouchableOpacity onPress={handleCreate}>
            <View style={[styles.container, {backgroundColor: color.brand}]}>
                <Text style={styles.text}>Start New {object}</Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
    },
    text: {
        fontSize: 16,
    },
})

export default CreateButton