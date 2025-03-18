import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { fetchLeagues, useLeagueSetContext } from '@/context/useLeagueSetContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import api from '@/api_url.json'
import { storageGetItem } from '@/util/Storage';
import { useRouter } from 'expo-router';
import { useAuthContext } from '@/context/useAuthContext';

export default function InvitesScreen() {
	const color = useColor();
	const router = useRouter();
	const [invites, setInvites] = useState<Invite[]>([]);
	const { isLoggedIn } = useAuthContext();
	const { setLeagueSet } = useLeagueSetContext();

	const fetchInvites = async () => {
		const user_id = storageGetItem('user_id')
		if (user_id == undefined) {
			return;
		}
		try {
			const response = await axios.get(api['url'] + `/leagues/invites/get`, {
				headers: {
					'Content-Type': 'application/json',
					'X-Authorization': `Token ${storageGetItem('token')}`,
				}
			});

			if (response.status == 200) {
				setInvites(response.data);
			}
		} catch (error) {
			console.error('Error fetching invites:', error);
			setInvites([]);
		}
	}

	const handleAccept = async (league_id: number) => {
		try {
			const response = await axios.put(api['url'] + `/leagues/invite/accept/?league_id=${league_id}`, {}, {
				headers: {
					'Content-Type': 'application/json',
					'X-Authorization': `Token ${storageGetItem('token')}`,
				}
			});

			if (response.status == 200) {
				fetchInvites();
				setLeagueSet(await fetchLeagues());
				router.navigate('/(tabs)/standings')
			}
		} catch (error) {
			console.error('Error accepting invite: ', error);
		}
	}

	const handleDecline = async (league_id: number) => {
		try {
			const response = await axios.delete(api['url'] + `/leagues/leave/?league_id=${league_id}`, {
				headers: {
					'Content-Type': 'application/json',
					'X-Authorization': `Token ${storageGetItem('token')}`,
				}
			});

			if (response.status == 204) {
				fetchInvites();
			}
		} catch (error) {
			console.error('Error accepting invite: ', error);
		}
	}

	useEffect(() => {
		fetchInvites();
	}, [isLoggedIn])

	return (
		<View style={styles.container}>
			{invites.map((invite, index) => (
				<View key={index} style={[styles.invite, {backgroundColor: index % 2 == 0 ?  color.background_1 : color.background_2}]}>
					<Text style={styles.leagueText}>{invite.league_name}</Text>
					<View style={styles.buttons}>
						<TouchableOpacity style={[styles.button, {backgroundColor: color.brand}]} onPress={() => handleAccept(invite.league)}>
							<Text style={styles.buttonText}>Accept</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.button, {backgroundColor:  color.red}]} onPress={() => handleDecline(invite.league)}>
							<Text style={styles.buttonText}>Decline</Text>
						</TouchableOpacity>
					</View>
				</View>
			))}
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
			flexDirection: 'column',
			height: '100%',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
	},
	invite: {
			padding: 10,
			paddingHorizontal: 20,
			flexDirection: 'row',
			width: '100%',
			justifyContent: 'space-between',
			alignItems: 'center',
	},
	leagueText: {
			fontSize: 20,
			fontWeight: 500,
	},
	buttons: {
			flexDirection: 'row',
	},
	button: {
			padding: 5,
			borderRadius: 5,
			alignItems: 'center',
			justifyContent: 'center',
			margin: 10,
	},
	buttonText: {
			fontSize: 20,
			fontWeight: 500,
			color: 'white',
	},
})