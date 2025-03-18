import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, useColor, View } from '@/components/Themed';
import { ReactNode } from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
import { Href, useRouter } from 'expo-router';

type PageRowProps = {
    row: number;
    icon: ReactNode;
    title: string;
    link: Href<string>;
}

const PageRow: React.FC<PageRowProps> = ({ row, icon, title, link }) => {
    const color = useColor();
    const router = useRouter();
    const backgroundColor = row % 2 != 0
        ? color.background_1
        : color.background_2

    const rowPressed = () => {
        router.push(link)
    }

    return (
        <TouchableOpacity onPress={rowPressed}>
            <View style={[styles.row, {backgroundColor: backgroundColor}]}>
                {/* Icon */}
                <View style={[styles.iconCell, {backgroundColor: backgroundColor}]}>
                    {icon}
                </View>
            
                {/* Title */}
                <View style={[styles.titleCell, {backgroundColor: backgroundColor}]}>
                    <Text style={styles.text}>{title}</Text>
                </View>
                {/* Arrow */}
                <View style={[styles.arrowCell, {backgroundColor: backgroundColor}]}>
                    <AntDesign name="right" size={24} color={color.active_text} />
                </View>
            </View>
        </TouchableOpacity>
    )
}
const baseStyles = StyleSheet.create({
    cell: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    }
})

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        width: '100%',
    },
    iconCell: {
        ...baseStyles.cell,
        width: '20%',
    },
    titleCell: {
        ...baseStyles.cell,
        alignItems: 'flex-start',
        width: '55%',
    },
    arrowCell: {
        ...baseStyles.cell,
        width: '30%',
    },
    text: {
        fontSize: 18,
    }
})

export default PageRow;