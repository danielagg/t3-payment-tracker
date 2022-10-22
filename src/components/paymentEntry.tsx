import { PaymentTransaction } from "@prisma/client";
import { trpc } from "../utils/trpc";
import { Loader } from "./loader";

export const PaymentEntry = ({ data }: { data: PaymentTransaction }) => {
  const { refetch } = trpc.payments.getAll.useQuery();

  const { mutate: deleteTransaction, isLoading: isDeletingTransaction } =
    trpc.payments.delete.useMutation({
      onSuccess: () => {
        refetch();
      },
    });

  return (
    <div className="flex justify-between pt-4">
      <div>
        <div
          className={`text-xl font-bold ${
            data.amount < 0 ? "text-red-300" : "text-green-300"
          }`}
        >
          <span>{data.amount < 0 ? "-" : "+"}</span> ${Math.abs(data.amount)}
        </div>
        <div className="mt-2 text-sm text-slate-500">
          Captured @ {data.createdAt.toLocaleString()}
        </div>
        {data.description && (
          <div className="text-sm text-slate-500">
            <span className="font-bold">Description:</span> {data.description}
          </div>
        )}
      </div>
      <div
        className="cursor-pointer text-red-400 hover:text-red-300"
        onClick={async () => await deleteTransaction({ id: data.id })}
      >
        {isDeletingTransaction ? (
          <Loader isLoading />
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        )}
      </div>
    </div>
  );
};
