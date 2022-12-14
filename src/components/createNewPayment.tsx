import { useState } from "react";
import { trpc } from "../utils/trpc";
import { Loader } from "./loader";

export const CreateNewPayment = () => {
  const DEFAULT_AMOUNT = 100;
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(DEFAULT_AMOUNT);
  const [isExpense, setIsExpense] = useState(true);

  const { refetch } = trpc.payments.getAll.useQuery();

  const { mutate: saveNewTransaction, isLoading: isSavingNewTransaction } =
    trpc.payments.add.useMutation({
      onSuccess: () => {
        refetch();
        setDescription("");
        setAmount(DEFAULT_AMOUNT);
        setIsExpense(true);
      },
    });

  return (
    <form className="flex w-full flex-col items-center justify-center space-y-2 bg-slate-700 p-12 lg:rounded">
      <div className="text-xl font-bold lg:text-3xl">
        Capture a new transaction
      </div>

      <div className="w-full">
        <div className="flex flex-col">
          <label
            htmlFor="amount"
            className="mt-4 mb-2 text-xs uppercase text-slate-500 lg:text-sm"
          >
            Amount (USD)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.currentTarget.value))}
            className="bg-zinc-900 p-4 text-xl text-slate-400 lg:text-2xl"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mt-8 mb-2 text-xs uppercase text-slate-500 lg:text-sm"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            className="min-h-[120px] bg-zinc-900 p-4 text-slate-400"
            rows={6}
          />
          <div className="mt-4 flex items-center space-x-2">
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="expense"
                  name="transaction_type"
                  className="accent-red-600"
                  checked={isExpense}
                  onChange={() => setIsExpense(!isExpense)}
                />
                <label htmlFor="expense">Expense</label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="gain"
                  name="transaction_type"
                  className="accent-green-600"
                  checked={!isExpense}
                  onChange={() => setIsExpense(!isExpense)}
                />
                <label htmlFor="gain">Profit/Gain</label>
              </div>
            </div>
          </div>
        </div>

        <div
          onClick={async () =>
            await saveNewTransaction({
              amount: isExpense ? -1 * amount : amount,
              description,
            })
          }
          className="mt-6 flex w-full cursor-pointer items-center justify-center space-x-2 rounded bg-green-600 p-4 text-lg font-bold hover:bg-green-500 hover:text-white lg:text-xl"
        >
          <Loader isLoading={isSavingNewTransaction} />
          <div>Save</div>
        </div>
      </div>
    </form>
  );
};
