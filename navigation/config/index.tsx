import {StyleSheet, Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NativeStackNavigationOptions} from '@react-navigation/native-stack';
import {Ionicons, AntDesign} from '@expo/vector-icons';
import {useTranslation} from 'react-i18next';
import {theme} from '../../styles';
import {IconButton} from '../../ui';
import {ConfigScreen, LanguagesScreen, CurrencyScreen} from '../../screens';
import ExpenseCenterNavigator from '../expense-center';
import CategoryNavigator from '../category';
import PaymentMethodNavigator from '../payment-method';
import PlaceNavigator from '../place';
import type {ConfigParamList} from '../../types/navigation';

const Stack = createNativeStackNavigator<ConfigParamList>();

const stackOptions: NativeStackNavigationOptions = {
	headerStyle: {
		backgroundColor: theme.color.primary
	},
	headerTitleStyle: {
		color: theme.color.secondary
	},
	headerTitleAlign: 'center',
	headerShadowVisible: false
};

const ConfigNavigator: React.FC = () => {
	const {t} = useTranslation('global');

	return (
		<Stack.Navigator initialRouteName="Config" screenOptions={stackOptions}>
			<Stack.Screen
				name="Config"
				component={ConfigScreen}
				options={({navigation}) => ({
					headerStyle: {
						backgroundColor: theme.color.primary
					},
					headerTitle: () => (
						<Text style={styles.headerTitle}>{t("config.header")}</Text>
					),
					headerLeft: () => (
						<IconButton
							onPress={navigation.openDrawer}
							icon={
								<Ionicons
									name={'menu'}
									size={26}
									color={theme.color.secondary}
								/>
							}
						/>
					)
				})}
			/>
			<Stack.Screen
				name="ExpenseCenterNav"
				component={ExpenseCenterNavigator}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="CategoryNav"
				component={CategoryNavigator}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="PaymentMethodNav"
				component={PaymentMethodNavigator}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="PlaceNav"
				component={PlaceNavigator}
				options={{headerShown: false}}
			/>
			<Stack.Screen
				name="Languages"
				component={LanguagesScreen}
				options={({navigation}) => ({
					headerTitle: () => <Text style={styles.headerTitle}>{t("languages.header")}</Text>,
					headerBackVisible: false,
					headerLeft: () => (
						<IconButton
							onPress={navigation.goBack}
							icon={<AntDesign name="arrowleft" size={24} color="white" />}
						/>
					)
				})}
			/>
			<Stack.Screen
				name="Currencies"
				component={CurrencyScreen}
				options={({navigation}) => ({
					headerTitle: () => <Text style={styles.headerTitle}>{t("currencies.header")}</Text>,
					headerBackVisible: false,
					headerLeft: () => (
						<IconButton
							onPress={navigation.goBack}
							icon={<AntDesign name="arrowleft" size={24} color="white" />}
						/>
					)
				})}
			/>
		</Stack.Navigator>
	);
};

export default ConfigNavigator;

const styles = StyleSheet.create({
	headerTitle: {
		color: theme.color.secondary,
		fontSize: theme.fontSize.xl,
		fontWeight: '500'
	},
	drawerLabel: {
		fontWeight: '600',
		fontSize: theme.fontSize.md
	}
});
