import Image from "next/image";

export default function Logo() {
  return (
    <div className="h-full w-full bg-black rounded-3xl flex items-center justify-center group">
      <Image
        src="/main/logo.png"
        alt="logo"
        width={100}
        height={100}
        className="rounded-3xl group-hover:scale-125 transition duration-300"
      />
    </div>
  );
}
