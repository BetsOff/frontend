import { Text, useColor, View } from '@/components/Themed';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { storageGetItem } from '@/util/Storage';
import { useRouter } from 'expo-router';
import { useSelector } from 'react-redux';
import { RootState } from '@/state/store';
import apiRoutes from '@/routes/apiRoutes';
import { useInvalidateLeagues, useLeagues, useSelectedLeague } from '@/api/leagueQueries';

export default function InvitesScreen() {
	const color = useColor();
	const router = useRouter();
	const [invites, setInvites] = useState<Invite[]>([]);
	const isLoggedIn = useSelector((state: RootState) => state.auth.isLoggedIn);
	const invalidateLeagues = useInvalidateLeagues();
	const { refetch: refetchLeagues } = useLeagues();

	const fetchInvites = async () => {
		const user_id = storageGetItem('user_id')
		if (user_id == undefined) {
			return;
		}
		try {
			const response = await axios.get(apiRoutes.league.getInvites, {
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
			const response = await axios.put(apiRoutes.league.acceptInvite + `?league_id=${league_id}`, {

			}, {
				headers: {
					'Content-Type': 'application/json',
					'X-Authorization': `Token ${storageGetItem('token')}`,
				}
			});

			if (response.status == 200) {
				fetchInvites();
				invalidateLeagues();
				refetchLeagues();
				router.replace('/(tabs)/standings')
			}
		} catch (error) {
			console.error('Error accepting invite: ', error);
		}
	}

	const handleDecline = async (league_id: number) => {
		try {
			const response = await axios.delete(apiRoutes.league.leave + `?league_id=${league_id}`, {
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
				<View key={index} style={[styles.invite, { backgroundColor: index % 2 == 0 ? color.background_1 : color.background_2 }]}>
					<Text style={styles.leagueText}>{invite.league_name}</Text>
					<View style={styles.buttons}>
						<TouchableOpacity style={[styles.button, { backgroundColor: color.won }]} onPress={() => handleAccept(invite.league)}>
							<Text style={styles.buttonText}>Accept</Text>
						</TouchableOpacity>
						<TouchableOpacity style={[styles.button, { backgroundColor: color.loss }]} onPress={() => handleDecline(invite.league)}>
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

function dispatch(arg0: { payload: League[]; type: "league/setLeagues"; }) {
	throw new Error('Function not implemented.');
}
