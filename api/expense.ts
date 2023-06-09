import {useMutation, useQuery} from '@tanstack/react-query';
import {supabase} from '../supabase';
import {MutationProps, QueryProps} from '../types/api';
import {ExpenseFormInputs} from '../types/components';

const getExpenses = async (date?: string) => {
	const {data} = await supabase.auth.getUser();

	if (!data.user) throw new Error('Usuario no encontrado');

	const {data: expenses, error} = await supabase
		.from('expense')
		.select(
			'id, amount, date, expense_center (id, name), category (id, name), payment_method (id, name), place (id, name)'
		)
		.eq('date', date)
		.eq('active', true)
		.order('created_at', {ascending: true});

	if (error) throw new Error(error.message); //TODO: parse error

	return expenses;
};

const addExpense = async ({
	amount,
	categoryId,
	expenseCenterId,
	paymentMethodId,
	placeId,
	date
}: ExpenseFormInputs) => {
	const {data: userData} = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const {data: expense, error} = await supabase
		.from('expense')
		.insert([
			{
				amount,
				date,
				category_id: categoryId,
				expense_center_id: expenseCenterId,
				payment_method_id: paymentMethodId,
				place_id: placeId,
				user_id: userData.user.id
			}
		])
		.select(
			'id, amount, date, expense_center (id, name), category (id, name), payment_method (id, name), place (id, name)'
		);

	if (error) throw new Error(error.message);

	return expense[0];
};

const updateExpense = async ({
	id,
	amount,
	categoryId,
	expenseCenterId,
	paymentMethodId,
	placeId,
	date
}: ExpenseFormInputs) => {
	const {data: userData} = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const {data: expense, error} = await supabase
		.from('expense')
		.update({
			amount,
			date,
			category_id: categoryId,
			expense_center_id: expenseCenterId,
			payment_method_id: paymentMethodId,
			place_id: placeId
		})
		.eq('id', id)
		.select(
			'id, amount, date, expense_center (id, name), category (id, name), payment_method (id, name), place (id, name)'
		);

	if (error) throw new Error(error.message);

	return expense[0];
};

const deleteExpenses = async (deleteList: number[]) => {
	const {data: userData} = await supabase.auth.getUser();

	if (!userData.user) throw new Error('Usuario no encontrado');

	const {data: expenses, error} = await supabase
		.from('expense')
		.update({active: false})
		.in('id', deleteList)
		.select('id');

	if (error) throw new Error(error.message);

	return expenses;
};

export const useGetExpenses = ({
	date,
	onSuccess,
	onError,
	select
}: QueryProps) => {
	const getExpensesQuery = useQuery({
		queryKey: ['expense', date],
		queryFn: () => getExpenses(date),
		onSuccess,
		onError,
		select
	});

	return getExpensesQuery;
};

export const useAddExpense = ({
	onSuccess,
	onError
}: MutationProps<ExpenseFormInputs>) => {
	const addExpenseQuery = useMutation({
		mutationKey: ['add_expense'],
		mutationFn: addExpense,
		onSuccess,
		onError
	});

	return addExpenseQuery;
};

export const useUpdateExpense = ({
	onSuccess,
	onError
}: MutationProps<ExpenseFormInputs>) => {
	const updateExpenseQuery = useMutation({
		mutationKey: ['update_expense'],
		mutationFn: updateExpense,
		onSuccess,
		onError
	});

	return updateExpenseQuery;
};

export const useDeleteExpenses = ({
	onSuccess,
	onError
}: MutationProps<number[]>) => {
	const deleteExpensesQuery = useMutation({
		mutationKey: ['delete_expenses'],
		mutationFn: deleteExpenses,
		onSuccess,
		onError
	});

	return deleteExpensesQuery;
};
