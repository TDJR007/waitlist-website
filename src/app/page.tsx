import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Problem from "@/components/Problem";
import Divider from "@/components/Divider";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import Quote from "@/components/Quote";
import Audience from "@/components/Audience";
import Waitlist from "@/components/Waitlist";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Divider />
      <Problem />
      <Divider />
      <HowItWorks />
      <Features />
      <Quote />
      <Audience />
      <Waitlist />
      <Footer />
    </main>
  );
}