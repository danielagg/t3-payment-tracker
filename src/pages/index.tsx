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
      <main className="flex min-h-screen justify-center bg-zinc-900 text-zinc-200 lg:p-16">
        <div className="w-full lg:w-2/3">
          <div className="mt-10 text-center text-4xl font-bold lg:mt-0 lg:text-left lg:text-5xl">
            Payment Tracker
          </div>
          <div className="mt-6 flex w-full flex-col justify-between space-y-12 lg:mt-24 lg:flex-row lg:space-y-0 lg:space-x-24">
            <div className="w-full p-6 lg:w-1/2 lg:p-0">
              <Payments />
            </div>
            <div className="w-full lg:w-1/2">
              <CreateNewPayment />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
