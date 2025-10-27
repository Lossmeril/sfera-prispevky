// app/generators/page.tsx (or wherever this page lives)
import {
  generatablePosters,
  generatablePosts,
  generatableScreens,
} from "@/datasets/generatableImages";

import GeneratorGrid from "@/components/homeGrid";

const GeneratorsHomePage = () => {
  return (
    <div className="w-screen h-auto mt-8 flex flex-col justify-center px-[10%]">
      <h1 className="above-heading mt-10 mb-14 text-xl md:text-2xl xl:text-3xl">
        Generátor sférických příspěvků 2.0
      </h1>

      <GeneratorGrid title="Příspěvky" items={generatablePosts} />
      <GeneratorGrid title="Digitální obrazovky" items={generatableScreens} />
      <GeneratorGrid title="Plakáty" items={generatablePosters} />
    </div>
  );
};

export default GeneratorsHomePage;
