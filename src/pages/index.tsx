import Link from "next/link";

const LandingPage = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="bg-white pt-8 pb-14 sm:pt-16 lg:overflow-hidden lg:pt-24 lg:pb-24">
        <div className="mx-auto max-w-5xl lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            <div className="mx-auto max-w-md px-4 text-center sm:max-w-2xl sm:px-6 lg:flex lg:items-center lg:px-0 lg:text-left">
              <div className="lg:py-24">
                <h1 className="mt-4 text-4xl font-bold tracking-tight text-black sm:mt-5 sm:text-6xl lg:mt-6 xl:text-6xl">
                  <span className="block text-violet-500">대학나와</span>
                  <span className="block text-black mt-3">야, 너도 갈 수 있어</span>
                </h1>
                <p className="mt-3 mb-3 text-base text-gray-400 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">실시간 정시 경쟁률 조회 서비스</p>
                <Link href="/real">
                  <button type="submit" className="block w-4/12 rounded-md bg-violet-500 py-3 px-4 font-medium text-white shadow hover:bg-violet-800 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2 focus:ring-offset-gray-900 sm:m-auto lg:m-0 min-[375px]:m-auto">
                    시작하기
                  </button>
                </Link>
              </div>
            </div>
            <div className="mt-12 hidden lg:block ">
              <img src="/images/cards/page.png" alt="" className="w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
