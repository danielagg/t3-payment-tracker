import { useState } from "react";
import { trpc } from "../utils/trpc";

export const CreateNewPayment = () => {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [isExpense, setIsExpense] = useState(true);

  const { refetch } = trpc.payments.getAll.useQuery();

  const { mutate: saveNewTransaction, isLoading: isSavingNewTransaction } =
    trpc.payments.add.useMutation({
      onSuccess: () => {
        refetch();
        setDescription("");
        setAmount(0);
        setIsExpense(true);
      },
    });

  return (
    <form className="flex w-full flex-col items-center justify-center space-y-2 rounded bg-slate-700 p-12">
      <div className="text-4xl font-bold">Capture new transaction</div>

      <div className="w-2/3">
        <div className="flex flex-col">
          <label
            htmlFor="amount"
            className="mt-4 mb-2 uppercase text-slate-500"
          >
            Amount (USD)
          </label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.currentTarget.value))}
            className="bg-zinc-900 p-4 text-2xl text-slate-400"
          />
        </div>

        <div className="flex flex-col">
          <label
            htmlFor="description"
            className="mt-8 mb-2 uppercase text-slate-500"
          >
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.currentTarget.value)}
            className="bg-zinc-900 p-4 text-slate-400"
            rows={6}
          />
          <div className="mt-4 flex items-center space-x-2">
            <input
              id="isExpense"
              type="checkbox"
              checked={isExpense}
              onChange={() => setIsExpense(!isExpense)}
              className="h-4 w-4 rounded"
            />
            <label htmlFor="isExpense" className="text-slate-400">
              This is an expense.
            </label>
          </div>
        </div>

        <div
          onClick={async () =>
            await saveNewTransaction({
              amount: isExpense ? -1 * amount : amount,
              description,
            })
          }
          className="mt-6 flex w-full cursor-pointer items-center justify-center space-x-2 rounded bg-green-600 p-4 text-xl font-bold hover:bg-green-500 hover:text-white"
        >
          {isSavingNewTransaction && <div>?</div>}
          <div>Save</div>
        </div>
      </div>
    </form>
  );
};
