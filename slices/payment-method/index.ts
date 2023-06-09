import {createSlice} from '@reduxjs/toolkit';
import {OnPressType} from '../../enums';
import type {PayloadAction} from '@reduxjs/toolkit';
import type {AppDispatch} from '../../store';
import type {PaymentMethodState} from '../../types/slices';
import type {PaymentMethodProps} from '../../types/components';

const initialState: PaymentMethodState = {
	selectMode: false,
	deleteList: [],
	paymentMethods: []
};

export const paymentMethodSlice = createSlice({
	name: 'paymentMethod',
	initialState,
	reducers: {
		addToDeleteList: (state, action: PayloadAction<number>) => {
			if (!state.selectMode && state.deleteList.length === 0)
				state.selectMode = true;
			if (!state.deleteList.includes(action.payload))
				state.deleteList.push(action.payload);
		},
		deleteFromDeleteList: (state, action: PayloadAction<number>) => {
			state.deleteList = state.deleteList.filter((id) => id !== action.payload);
			if (state.selectMode && state.deleteList.length === 0)
				state.selectMode = false;
		},
		cleanDeleteList: (state) => {
			state.deleteList = [];
			if (state.selectMode) state.selectMode = false;
		},
		setPaymentMethods: (state, action: PayloadAction<PaymentMethodProps[]>) => {
			state.paymentMethods = action.payload;
		},
		addPaymentMethod: (state, action: PayloadAction<PaymentMethodProps>) => {
			state.paymentMethods.push(action.payload);
		},
		updatePaymentMethod: (state, action: PayloadAction<PaymentMethodProps>) => {
			state.paymentMethods = state.paymentMethods.map((paymentMethod) =>
				paymentMethod.id === action.payload.id ? action.payload : paymentMethod
			);
		},
		deletePaymentMethods: (state) => {
			state.paymentMethods = state.paymentMethods.filter(
				(paymentMethod) => !state.deleteList.includes(paymentMethod.id)
			);
			if (state.selectMode) state.selectMode = false;
			state.deleteList = [];
		}
	}
});

export const {
	addToDeleteList,
	deleteFromDeleteList,
	cleanDeleteList,
	setPaymentMethods,
	addPaymentMethod,
	updatePaymentMethod,
	deletePaymentMethods
} = paymentMethodSlice.actions;

export const onPressPaymentMethodRow =
	(
		selectMode: boolean,
		onList: boolean,
		id: number,
		type: OnPressType,
		goPaymentMethodDetail?: () => void
	) =>
	(dispatch: AppDispatch) => {
		if (selectMode) {
			if (onList) dispatch(deleteFromDeleteList(id));
			else dispatch(addToDeleteList(id));
		} else {
			if (type === OnPressType.Long) dispatch(addToDeleteList(id));
			else if (type === OnPressType.Normal) {
				goPaymentMethodDetail && goPaymentMethodDetail();
			}
		}
	};

export default paymentMethodSlice.reducer;
