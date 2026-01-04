"use client";

import { useState } from "react";
import PhotoGallery from "./photo-gallery";

// Note: We use JSX (<>...</>) instead of strings "" so <strong> tags work
const CONTENT = {
  en: {
    greeting: "Hello, I'm Hyun.",
    intro: (
      <>
        I like to think of myself as an optimist, but as I age, I’ve noticed I’m{" "}
        <strong>ossifying into a pragmatist</strong>, a development I find
        deeply unfortunate and am actively fighting against.
      </>
    ),
    work: "This shift likely stems from how I spend my days: typing and deleting text on a keyboard. It is a strange existence where eight hours of work sometimes results in a net output of a single line of code.",
    fear: (
      <>
        {" "}
        I tell myself this meticulousness provides value, that I am inching the
        world toward a better place, but deep down, there is a{" "}
        <strong>lingering fear</strong> that I might leave this world having
        added nothing of substance.
      </>
    ),
    mission:
      "This blog is my attempt to fight that silence. It is a mechanism to grasp at life’s transience, to keep myself accountable, and to document how my thoughts develop (or decay) as I age. Hopefully, you will find some of it interesting, if not useful.",
    loophole: (
      <>
        But don’t worry, it won’t all be existential dread. That wouldn’t be
        very fun. I will also write about whatever currently captures my
        interest, and since those interests change often, I have conveniently
        created a loophole to write about <strong>whatever I wish.</strong>
      </>
    ),
    connect: "Connect",
  },
  ko: {
    greeting: "안녕하세요, 현입니다.",
    intro: (
      <>
        스스로를 낙관주의자라 믿고 싶지만, 나이가 들수록 점점{" "}
        <strong>지독한 현실주의자(Pragmatist)로 굳어가는</strong> 제 모습을
        봅니다. 몹시 유감스러운 일이며, 온몸으로 저항하고 있는 중입니다.
      </>
    ),
    work: "제 하루는 단순합니다. 키보드 위에서 쓰고, 다시 지우는 것의 반복이죠. 8시간을 꼬박 매달린 결과물이 고작 코드 한 줄일 때도 있습니다. 참 기이한 직업입니다.",
    fear: "저는 이 집착이 세상을 조금은 더 낫게 만든다고 최면을 걸어봅니다. 하지만 속내를 들여다보면, 결국 세상에 먼지 한 톨만 한 의미도 남기지 못하고 사라질까 봐 두려운 게 사실입니다.",
    mission:
      "이 블로그는 그 침묵과 허무에 대한 저만의 투쟁 기록입니다. 삶의 덧없음을 붙잡고, 나이 들어가는 제 생각이 어떻게 깊어지는지, 혹은 어떻게 낡아가는지를 기록하려 합니다.",
    loophole: (
      <>
        물론, 온종일 우울한 실존적 고민만 늘어놓진 않을 겁니다. 재미없잖아요. 제
        관심사는 늘 변하기 마련이니, 이를 핑계 삼아{" "}
        <strong>무엇이든 제멋대로 쓸 수 있는</strong> '빠져나갈 구멍'을 미리
        만들어 두려는 속셈입니다.
      </>
    ),
    connect: "연락하기",
  },
};

export default function AboutContent() {
  const [lang, setLang] = useState<"en" | "ko">("en");
  const t = CONTENT[lang];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
      {/* Left Column: Text */}
      <div className="md:col-span-2 space-y-6">
        <div className="flex justify-between items-baseline mb-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">
            {t.greeting}
          </h1>

          {/* LANGUAGE TOGGLE */}
          <div className="flex bg-gray-100 rounded-full p-1 self-center">
            <button
              onClick={() => setLang("en")}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                lang === "en"
                  ? "bg-white shadow text-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLang("ko")}
              className={`px-3 py-1 text-xs font-bold rounded-full transition-all duration-200 ${
                lang === "ko"
                  ? "bg-white shadow text-black"
                  : "text-gray-400 hover:text-gray-600"
              }`}
            >
              KR
            </button>
          </div>
        </div>

        <div className="prose prose-lg prose-gray text-gray-600 leading-relaxed break-keep">
          <p>{t.intro}</p>
          <br />
          <p>{t.work}</p>
          <br />
          <p>{t.fear}</p>
          <br />
          <p>{t.mission}</p>

          <hr className="w-16 border-gray-300 my-8" />

          <p className="italic text-gray-500">{t.loophole}</p>
        </div>
      </div>

      {/* Right Column: Gallery & Connect */}
      <div className="md:col-span-1">
        <PhotoGallery />

        {/* Restored the larger styles here */}
        <div className="mt-10">
          <h3 className="text-xl font-bold text-gray-900 mb-2">Connect</h3>
          <ul className="space-y-2 text-l text-gray-600">
            <li>
              <a
                href="https://www.linkedin.com/in/hyun-kwak-855bba1ba/"
                className="hover:text-black hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href="https://github.com/6879756e"
                className="hover:text-black hover:underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="mailto:6879756e@gmail.com?subject=Hello%20from%20The%20Trepid%20Programmer"
                className="hover:text-black hover:underline"
              >
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
