import {useNavigation} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {CategoryForm} from '../../../components';
import {useAppDispatch} from '../../../store';
import {useAddCategory} from '../../../api/category';
import {addCategory} from '../../../slices/category';
import type {ConfigParamList} from '../../../types/navigation';

type NavigationProp = DrawerNavigationProp<ConfigParamList, 'CategoryNav'>;

const AddCategoryScreen: React.FC = () => {
	const navigation = useNavigation<NavigationProp>();
	const dispatch = useAppDispatch();
	const {mutate, isLoading} = useAddCategory({
		onSuccess: (data) => {
			if (data) dispatch(addCategory(data));
			navigation.navigate('CategoryNav', {screen: 'Category'});
		},
		onError: (error) => {
			console.log(error.message);
		}
	});

	return <CategoryForm action={mutate} isLoading={isLoading} />;
};

export default AddCategoryScreen;
