"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import logoImg from "@/app/img/logo.png";

/** WebGL needs the browser, so the 3D scene is loaded client-side only. Shows the flat logo until it's ready. */
const LogoScene = dynamic(() => import("./LogoScene"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center p-10">
      <Image src={logoImg} alt="Genix Academy" className="h-auto w-full rounded-2xl bg-white p-6" />
    </div>
  ),
});

/** Full-bleed 3D logo panel. Parent must set a size and position. */
export default function LogoSceneLoader() {
  return (
    <div className="absolute inset-0" role="img" aria-label="Genix Academy logo in 3D">
      <LogoScene />
    </div>
  );
}
