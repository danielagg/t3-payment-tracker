import { trpc } from "../utils/trpc";

export const Payments = () => {
  const { data, isLoading, refetch } = trpc.payments.getAll.useQuery();

  const { mutate: deleteTransaction } = trpc.payments.delete.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

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
      {isLoading && (
        <div className="mt-12 text-xl text-slate-500">Loading data...</div>
      )}

      {isLoading || data == null || data.length === 0 ? (
        <div className="mt-4 text-sm text-slate-500 lg:mt-12 lg:text-xl">
          No transactions were captured, yet.
        </div>
      ) : (
        <div className="mt-4 flex flex-col space-y-4 divide-y-2 divide-gray-600">
          {data.map((d) => {
            return (
              <div key={d.id} className="flex justify-between pt-4">
                <div>
                  <div
                    className={`text-xl font-bold ${
                      d.amount < 0 ? "text-red-300" : "text-green-300"
                    }`}
                  >
                    <span>{d.amount < 0 ? "-" : "+"}</span> $
                    {Math.abs(d.amount)}
                  </div>
                  <div className="mt-2 text-sm text-slate-500">
                    Captured @ {d.createdAt.toLocaleString()}
                  </div>
                  {d.description && (
                    <div className="text-sm text-slate-500">
                      <span className="font-bold">Description:</span>{" "}
                      {d.description}
                    </div>
                  )}
                </div>
                <div
                  className="cursor-pointer text-red-400 hover:text-red-300"
                  onClick={async () => await deleteTransaction({ id: d.id })}
                >
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
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
