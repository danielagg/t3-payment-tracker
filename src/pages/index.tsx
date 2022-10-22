import type { NextPage } from "next";
import Head from "next/head";
import { CreateNewPayment } from "../components/createNewPayment";
import { Payments } from "../components/payments";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Payment Tracker - T3 Demo</title>
        <meta
          name="description"
          content="Demo app about tracking payments, using the T3 stack"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex min-h-screen justify-center bg-zinc-900 pt-16 text-zinc-200">
        <div className="w-2/3">
          <div className="text-5xl font-bold">Payment Tracker</div>
          <div className="mt-24 flex w-full justify-between space-x-24">
            <div className="w-1/2">
              <Payments />
            </div>
            <div className="w-1/2">
              <CreateNewPayment />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
