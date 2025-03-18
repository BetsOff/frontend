import PageRow from '@/components/More/PageRow';
import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet } from 'react-native';

import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

import { Href } from 'expo-router';

export default function MoreScreen() {
    const color = useColor();
    const pages = [
        {
            title: "Profile",
            icon: (<MaterialCommunityIcons name="account" size={28} color={color.active_text} />),
            link: '/profile' as Href<string>
        },
        {
            title: "My Leagues",
            icon: (<FontAwesome name="group" size={24} color={color.active_text} />),
            link: '/leagues' as Href<string>
        },
        {
            title: "Invites",
            icon: (<MaterialIcons name="mail" size={24} color={color.active_text} />),
            link: '/invites' as Href<string>
        }
    ]
    return (
        <View style={styles.container}>
            <Text style={styles.text}>More</Text>
            {pages.map((page, index) => (
                <PageRow 
                    title={page.title}
                    icon={page.icon}
                    link={page.link}
                    row={index}
                    key={index}
                />
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 50,
        flex: 1,
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'flex-start'
    },
    text: {
        fontSize: 32,
        fontWeight: 500,
        padding: 15,
    }
  });