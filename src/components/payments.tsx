import { trpc } from "../utils/trpc";
import { PaymentEntry } from "./paymentEntry";

export const Payments = () => {
  const { data, isLoading } = trpc.payments.getAll.useQuery();

  const getTotalBalance = () => {
    if (!data || data.length == 0) return 0;

    return data.map((d) => d.amount).reduce((a, b) => a + b, 0);
  };

  return (
    <div>
      <div className="flex items-start justify-between space-x-2">
        <div className="text-xl font-bold lg:text-3xl">Transaction History</div>

        {data != null && data.length > 0 && (
          <div className="flex flex-col items-end">
            <div className="text-xs uppercase text-slate-500 lg:text-sm">
              Total Balance
            </div>
            <div className="text-xl lg:text-3xl">
              {getTotalBalance() < 0 ? "- $" : "$"}
              {Math.abs(getTotalBalance())}
            </div>
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="mt-12 text-xl text-slate-500">Loading data...</div>
      ) : (
        <>
          {data == null || data.length === 0 ? (
            <div className="mt-4 text-sm text-slate-500 lg:mt-12 lg:text-xl">
              No transactions were captured, yet.
            </div>
          ) : (
            <div className="mt-4 flex flex-col space-y-4 divide-y-2 divide-gray-600">
              {data.map((d) => (
                <PaymentEntry key={d.id} data={d} />
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};
