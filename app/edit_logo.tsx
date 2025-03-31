import { Button, StyleSheet, TouchableOpacity } from 'react-native';
import ProfileHeader from '@/components/Profile/ProfileHeader';
import { Text, useColor, View } from '@/components/Themed';
import { RootState } from '@/state/store';
import { storageGetItem } from '@/util/Storage';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import colors from '@/constants/Colors';
import icons from '@/constants/Icons';
import PlayerLogo from '@/components/Logo/PlayerLogo';
import PlayerIcon from '@/components/Logo/PlayerIcon';
import axios from 'axios';
import apiRoutes from '@/routes/apiRoutes';
import { setLogo } from '@/state/profile/SelfSlice';
import { useRouter } from 'expo-router';

export default function EditLogoScreen() {
  const color = useColor();
  const router = useRouter();
  const dispatch = useDispatch();
  const currLogo = useSelector((state: RootState) => state.self.logo);
  const [logo, setTempLogo] = useState<Logo>(currLogo);

  const setPrimaryColor = (color: string) => {
    setTempLogo((prevLogo) => ({
      ...prevLogo,
      color: color,
    }));
  }

  const setSecondaryColor = (color: string) => {
    setTempLogo((prevLogo) => ({
      ...prevLogo,
      bg_color: color,
    }));
  }

  const setIcon = (icon: string) => {
    setTempLogo((prevLogo) => ({
      ...prevLogo,
      icon: icon,
    }));
  }

  const handleUpdate = async () => {
    if (logo == currLogo) return;

    await axios.put(apiRoutes.users.update + storageGetItem('user_id'), {
      logo: logo,
    }, {
      headers: {
        'X-Authorization': `Token ${storageGetItem('token')}`
      }
    })
    .then(response => {
      dispatch(setLogo(logo));
      router.back();
    })
    .catch(error => {
      console.log('Error updating profile:', error);
      return;
    });
  }

  return(
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <ProfileHeader logo={logo} username={storageGetItem('user') || ''}/>
        {/* Update */}
        <TouchableOpacity onPress={handleUpdate}>
          <View style={[styles.button, { backgroundColor: color.brand }]}>
            <Text style={styles.text}>Confirm</Text>
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.fullSelectionContainer}>
        <View style={styles.selectionContainer}>
          {/* Primary */}
          <View style={styles.selectionContainerWithTitle}>
            <Text style={styles.title}>Foreground</Text>
            
            <View style={styles.selections}>
              {Object.keys(colors.logo).map((color, index) => (
                <TouchableOpacity style={styles.option} onPress={() => setPrimaryColor(color)} key={index}>
                  <PlayerLogo diameter={36} logo={
                    {
                      color: '',
                      bg_color: color,
                      icon: '',
                    }
                  } />
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Secondary */}
          <View style={styles.selectionContainerWithTitle}>
            <Text style={styles.title}>Background</Text>
            
            <View style={styles.selections}>
        
              {Object.keys(colors.logo).map((color, index) => (
                <TouchableOpacity style={styles.option} onPress={() => setSecondaryColor(color)} key={index}>
                  <PlayerLogo diameter={36} logo={
                    {
                      color: '',
                      bg_color: color,
                      icon: '',
                    }
                  } />
                </TouchableOpacity>
              ))}
            </View>
          </View>

        </View>
      </View>
      {/* Icon */}
      <View style={styles.selectionContainerWithTitle}>
        <Text style={styles.title}>Icon</Text>
        <View style={[styles.selections, {width: '200%'}]}>
          {Object.keys(icons).map((icon, index) => (
            <TouchableOpacity style={styles.option} onPress={() => setIcon(icon)} key={index}>
              <PlayerIcon color='white' icon={icon} size={36} />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%'
  },
  button: {
    marginHorizontal: 10,
    justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		padding: 10,
    paddingHorizontal: 30
  },
  text: {
    fontSize: 16,
  },
  fullSelectionContainer: {
    flexDirection: 'column',
    width: '100%',
    paddingTop: 10,
  },
  selectionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionContainerWithTitle: {
    flexDirection: 'column',
    width: '45%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  selections: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  option: {
    padding: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: 500,
  }
});
