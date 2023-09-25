import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MatchLists from "../components/MatchLists";
import { MatchListsProvider } from "../contexts/matchListsContext";

function MerryListPage() {
  return (
    <MatchListsProvider>
      <Navbar />
      <main className="w-full bg-main flex justify-center font-nunito">
        <section className="w-[1440px] bg-main flex justify-center">
          <div className="w-[930px] mb-[171px] mt-[80px]">
            <section className="bg-main flex justify-between items-end mb-[80px]">
              <div className="text-purple-500 text-[46px] font-extrabold">
                <p className="text-[14px] text-beige-700 font-medium">
                  MERRY LIST
                </p>
                <h1>Let’s know each other</h1>
                <h1>with Merry!</h1>
              </div>
              <div className="px-[24px]">
                <div className="text-[16px] flex">
                  <p className="text-gray-700 mr-[10px]">Merry limit today</p>
                  <p className="text-red-400">2/20</p>
                </div>
                <p className="text-end text-gray-600 text-[12px]">
                  Reset in 12h...
                </p>
              </div>
            </section>
            <section>
              <MatchLists />
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </MatchListsProvider>
  );
}

export default MerryListPage;
