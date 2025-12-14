import React from "react";
import { BookOpenCheck, Brain, RectangleEllipsis } from "lucide-react";
import ExamAppIcon from "@/components/shared/exam-app-icon";

const contentDesc = [
  {
    icon: <Brain />,
    title: "Tailored Diplomas",
    desc: "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
  {
    icon: <BookOpenCheck />,
    title: "Focused Exams",
    desc: "Access topic-specific tests including HTML, CSS, JavaScript, and more.",
  },
  {
    icon: <RectangleEllipsis />,
    title: "Smart Multi-Step Forms",
    desc: "Choose from specialized tracks like Frontend, Backend, and Mobile Development.",
  },
];

export default function ExamcontentCard() {
  return (
    <section className="exam-app md:w-1/2 relative ">
      <div className="absolute inset-0 overflow-hidden " aria-hidden>
        <div className="ellipse bg-blue-400 w-96 h-96 rounded-full absolute -end-12 top-28 blur-3xl "></div>
        <div className="ellipse bg-blue-400 w-96 h-96 rounded-full absolute start-3 -bottom-28 blur-3xl "></div>
      </div>

      <div className="relative bg-blue-50/75 h-full px-5 md:px-10 py-10">
        <article className="exam-app-content md:w-login mx-auto  ">
          <ExamAppIcon />
          <main>
            <h1 className="text-2xl  w-3/4 md:w-full  font-bold mb-14 mt-24">
              Empower your learning journey with our smart exam platform.
            </h1>
            <ul className="mt-14">
              {contentDesc.map((content, index) => (
                <li
                  key={index}
                  className="content-description flex mt-9  items-start font-mono ">
                  <div className="content-icon border-2 p-1 me-5   border-blue-600 flex items-center  justify-center w-9 text-blue-600">
                    {content.icon}
                  </div>
                  <div className="content">
                    <h2 className="text-blue-600 font-semibold text-xl">
                      {content.title}
                    </h2>
                    <p className="mdLmax-w-60">{content.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </main>
        </article>
      </div>
    </section>
  );
}
