import { useRef, useState } from "react";
import { IoOptionsOutline, IoClose } from "react-icons/io5";

import {
  navBar,
  navComponentContainer,
  subNavContainer,
} from "./classnames";
import ContentController from "../apollo/controller";
import { InternalPage } from "../../type";

type Props = {
  list: Array<InternalPage>,
  title: string
}

export default function Nav({ list, title }: Props) {
  const [subVisible, setSubVisible] = useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);
  ContentController().changeContent("Home");

  const changeView = async (current: string) => {
    ContentController().changeContent(current);
    setSubVisible(false);
    document.body.style.overflow = "scroll";
  };

  return (
    <>
      <nav className={navBar} ref={navRef}>
        <div
          className={navComponentContainer}
          role="navComponent0"
          onClick={() => changeView("Home")}
        >
          {title}
        </div>
        {
          window.innerWidth < 1024
            ?
            <>
              <div
                className={`h-auto visible cursor-pointer mt-2 ${navComponentContainer}`}
                onClick={() => setSubVisible(!subVisible)}
              >
                {
                  subVisible
                    ?
                    <svg
                      fill="currentColor"
                      height="25"
                      stroke="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      width="25"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="m289.94 256 95-95A24 24 0 0 0 351 127l-95 95-95-95a24 24 0 0 0-34 34l95 95-95 95a24 24 0 1 0 34 34l95-95 95 95a24 24 0 0 0 34-34z"
                      />
                    </svg>
                    :
                    <svg
                      fill="currentColor"
                      height="25"
                      stroke="currentColor"
                      stroke-width="0"
                      viewBox="0 0 512 512"
                      width="25"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M368 128h80m-384 0h240m64 256h80m-384 0h240m-96-128h240m-384 0h80"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <circle
                        cx="336"
                        cy="128"
                        fill="none"
                        r="32"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <circle
                        cx="176"
                        cy="256"
                        fill="none"
                        r="32"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                      <circle
                        cx="336"
                        cy="384"
                        fill="none"
                        r="32"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="32"
                      />
                    </svg>
                }
              </div>
              {
                subVisible
                &&
                <div className={subNavContainer}>
                  {
                    list.map((content, index) =>
                      <div key={index} onClick={() => changeView(content.name)}>
                        {content.name}
                      </div>
                    )
                  }
                </div>
              }
            </>
            :
            <div className={"flex"}>{
              list.map((content, index) =>
                <div key={index} onClick={() => changeView(content.name)} role={"navComponent"+(index+1)}>
                  {content.name}
                </div>
              )
            }</div>
        }
      </nav>
    </>
  );
}
