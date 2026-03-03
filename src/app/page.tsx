import { Metadata } from "next";
import HomeAboutMe from "@/features/home/components/HomeAboutMe";
import HomeBanner from "@/features/home/components/HomeBanner";
import HomeBudgetingGuide from "@/features/home/components/HomeBudgetingGuide";
import HomeFooter from "@/features/home/components/HomeFooter";
import HomeHeader from "@/features/home/components/HomeHeader";

export const metadata: Metadata = {
  title: "Financial Records - Home",
};

export default function Page() {
  return (
    <>
      <div className="w-full min-h-[100vh] bg-bg-color text-text-color">
        <HomeHeader />

        <main className="flex flex-col flex-1 gap-y-12 items-center mb-10 sm:px-[5%] lg:px-[8%] overflow-x-hidden">
          <HomeBanner />
          <HomeAboutMe />
          <HomeBudgetingGuide />
        </main>

        <HomeFooter />
      </div>
    </>
  );
}
