import img11 from "figma:asset/445f6a24d9501f404dc646633852abb2233758fb.png";
import img21 from "figma:asset/2652b64666e93688bd2ff25ef4221ddaf4c0e40a.png";
import img31 from "figma:asset/359bdaa1fbbab2b86b6267414580f1f59ebb296e.png";
import img41 from "figma:asset/0ce364070d945755735cbdbb4b91096d1b7e1599.png";
import img51 from "figma:asset/ce6fee1f9335a53ee45cc5d72e5ab5511e607f0f.png";
import img61 from "figma:asset/0caa8b31d251e69821659a8d6923fa1924c11728.png";
import img71 from "figma:asset/d91863160bb750150077fd3abebfc726f8259ad8.png";
import img81 from "figma:asset/28ee8c73e3c25d267725b7faa556825fe93669ad.png";
import img91 from "figma:asset/50f427bb7c8b19b7f2b8cd7559c6fc6d84d0a77b.png";
import imgImage from "figma:asset/e3b0a84a1634383c3b5e3c74d4479b68ca272c99.png";

export default function Frame() {
  return (
    <div className="bg-white relative size-full" data-name="Frame">
      <div className="absolute h-[1434px] left-[-2277px] top-[-1969.5px] w-[660px]" data-name="1 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img11} />
      </div>
      <div className="absolute h-[1279px] left-[-1577px] top-[-1814.5px] w-[1706px]" data-name="2 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img21} />
      </div>
      <div className="absolute h-[1706px] left-[169px] top-[-2241.5px] w-[1279px]" data-name="3 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img31} />
      </div>
      <div className="absolute h-[1706px] left-[1488px] top-[-2241.5px] w-[1279px]" data-name="4 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img41} />
      </div>
      <div className="absolute h-[720px] left-[-2277px] top-[-495.5px] w-[1280px]" data-name="5 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img51} />
      </div>
      <div className="absolute h-[2086px] left-[-957px] top-[-495.5px] w-[960px]" data-name="6 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img61} />
      </div>
      <div className="absolute h-[1080px] left-[43px] top-[-495.5px] w-[1920px]" data-name="7 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img71} />
      </div>
      <div className="absolute h-[1794px] left-[2003px] top-[-495.5px] w-[1282px]" data-name="8 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img81} />
      </div>
      <div className="absolute h-[1793px] left-[-2277px] top-[1630.5px] w-[1280px]" data-name="9 1">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={img91} />
      </div>
      <div className="absolute h-[1280px] left-[-957px] top-[1630.5px] w-[1920px]" data-name="Image">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage} />
      </div>
    </div>
  );
}