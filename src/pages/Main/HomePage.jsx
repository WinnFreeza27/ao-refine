import { Link } from "react-router-dom";

export default function HomePage() {
  const data = [{
    name: "Refine",
    image: "https://render.albiononline.com/v1/item/T2_CLOTH.png",
    linkTo: "/refine",
  },
  {
    name: "Crafting",
    image: "https://render.albiononline.com/v1/item/T2_BAG.png",
    isNotReady: true,
  }
];

  return (
    <>
        <div className="text-white inline-flex flex-col items-center justify-center w-full mt-4 gap-y-3 px-3 mb-4">
            <h1 className="font-bold text-lg  text-center">Select the tools you want to use</h1>
            <svg className="w-6 rotate-[270deg]" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#fdfdfd" stroke="#fdfdfd"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"></path>
                    <path fill="#ffffff" d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"></path></g>
                    </svg>
        </div>
        <div className="flex flex-wrap justify-center content-center place-content-center gap-4">
      {data.map(({ name, image, linkTo, isNotReady }, index) => (
        <Link
          key={index}
          to={isNotReady ? '' : linkTo}
          className={`bg-bg-transparent border border-bd-grey rounded-lg p-4 shadow-md text-white max-w-40 sm:max-w-48 hover:bg-black ${isNotReady ? 'cursor-not-allowed opacity-60' : ''}`}
        >
          <h3 className="text-lg font-semibold mb-2">{name}</h3>
          <img src={image} alt={name} className="mt-2 w-full object-cover min-w-0" />
          {isNotReady && <span className="text-sm text-salmonize">Under development</span>}
        </Link>
      ))}
    </div>
    </>
  
  );
}

