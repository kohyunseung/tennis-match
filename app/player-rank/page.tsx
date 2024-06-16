"use client";

import React, { ChangeEvent, useState } from "react";
import { useRouter } from "next/navigation";

import { postPlayersRank } from "@/services/rank";

function InputWithButton({
  addPlayer,
  onSubmit,
}: {
  addPlayer: (player: any) => void;
  onSubmit: () => void;
}) {
  const onChange = ({ target }: { target: any }) => addPlayer(target.value);

  const onKeyDown = (e: any) => {
    if (e.isComposing || e.keyCode === 229) return;
    if (e.key === "Enter") {
      onSubmit();
    }
  };

  return (
    <div className="relative flex w-full max-w-[24rem] mt-10">
      <div className="relative h-10 w-full min-w-[200px]">
        <input
          type="text"
          className="peer h-full w-full rounded-[7px] border border-blue-gray-200  bg-transparent px-3 py-2.5 pr-20 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-gray-900 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
          placeholder=""
          onChange={onChange}
          onKeyDown={onKeyDown}
        />
        <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight text-gray-500 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-white-100 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:!border-gray-900 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:!border-gray-900 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
          선수를 랭킹별로 ,로붙여서 공백없이 넣어주세요.
        </label>
      </div>
      <button
        className="!absolute right-1 top-1 select-none rounded bg-blue-gray-500 py-2 px-4 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
        type="button"
      >
        입력
      </button>
    </div>
  );
}

const MatchGeneratePage = () => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [players, setPlayers] = useState<string[]>([]);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const { data, result } = await postPlayersRank({ players });
      if (!result) throw new Error(data.message);

      alert("생성이 완료되었습니다.");
      router.push("/");
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen max-w-96 flex-col mx-auto items-center justify-center">
      <div className="w-full min-h-screen">
        <h2>선수를 랭킹별로 ,로붙여서 공백없이 넣어주세요.</h2>
        <p>매칭 만들때 사용하는 이름과 같아야 정확하게 랭킹매칭됩니다.</p>
        <p>정확하지 않을시 하위권 선수로 분류됩니다.</p>
        <p>e.g) 김철수,신짱구,맹구,등등</p>
        <InputWithButton addPlayer={setPlayers} onSubmit={handleSubmit} />

        <div className="flex mt-2 items-center justify-center">
          <button
            className="rounded bg-tennis py-2 px-4 text-center align-middle font-sans text-l font-bold uppercase text-black shadow-md shadow-blue-gray-500/20 transition-all hover:shadow-lg hover:shadow-blue-gray-500/40 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            랭킹 등록하기
          </button>
        </div>
      </div>
    </main>
  );
};

export default MatchGeneratePage;
