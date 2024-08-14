import CountdownTimer from "@/components/CountdownTimer";
import Section1 from "@/components/Section1";
import Section2 from "@/components/Section2";
import Image from "next/image";

export default function Home() {
  return (
    <section className="flex justify-center flex-col items-center gap-y-20 mt-48">
      <Image src={"/DOCLINK.svg"} alt="" height={400} width={400} />
      <CountdownTimer />
    </section>
  );
}
