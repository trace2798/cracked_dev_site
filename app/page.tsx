import { Marquee } from "@devnomic/marquee";
import "@devnomic/marquee/dist/index.css";

export default function Home() {
  return (
    <>
      <div>
        <h1 className="font-semibold text-8xl">
          Join the best companies on the internet,{" "}
          <span className="text-transparent font-switzerBold bg-clip-text bg-gradient-to-r from-purple-500 to-yellow-300 animate-text">
            remotely
          </span>
        </h1>
        <div className="w-1/2">
          <div className="mt-5">
            <h2 className="text-5xl font-light dark:text-slate-400">
              Making remote coding jobs made easy: connect, apply, and work from
              anywhere
            </h2>
          </div>
          <div>
            <h2 className="text-4xl font-thin mt-10 mb-5">
              Trusted by the best teams
            </h2>
            <Marquee pauseOnHover={true} fade={true}>
              <Logo src="https://www.vectorlogo.zone/logos/google/google-ar21.svg" />
              <Logo src="https://www.vectorlogo.zone/logos/microsoft/microsoft-ar21.svg" />
              <Logo src="https://www.vectorlogo.zone/logos/apple/apple-ar21.svg" />
              <Logo src="https://www.vectorlogo.zone/logos/oracle/oracle-ar21.svg" />
              <Logo src="https://www.vectorlogo.zone/logos/reactjs/reactjs-ar21.svg" />
            </Marquee>
          </div>
        </div>
      </div>
    </>
  );
}

function Logo({ src }: { src: string }) {
  return <img src={src} className="h-16 inline-block" />;
}
