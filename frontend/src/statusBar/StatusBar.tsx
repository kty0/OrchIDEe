import React from 'react';
import { Config } from '../codeEditor/CodeEditor';
import Tab from './Tab';
import { fetchRunResponse } from "../terminal/api";
import { ProjectDescProps } from "../App";

export interface StatusBarProps {
    path: string,
}

const StatusBar: React.FC<Config & { desc: ProjectDescProps;
                                     playFunction: () => void;
                                     setTerminalContent: React.Dispatch<React.SetStateAction<string>> }>
                                     = ({ desc, playFunction, setTerminalContent, ...props }) => {

    const handleChangePage = (index: number) => {
      props.setCurrentPage(index);
      console.log(props.currentPage);
      console.log(props.opened[props.currentPage].content);
    };

    const handleRun = async () => {
      console.log("Running code...");
      playFunction(true);

      try {
        const response = await fetchRunResponse(desc.name, desc.language);
        setTerminalContent(response);
      } catch (error) {
        console.error("Error fetching run response:", error);
        setTerminalContent("Error fetching run response");
      }
    };

    return (
        <div className="flex h-full w-full bg-gray-800 text-gray-100 border-2 border-gray-600 justify-between pr-[50px] pl-[150px]">
            <div className='border-2 border-gray-600 w-[1500px]'>
                <div className="block ">
                    <ul className="flex justify-start overflow-x-scroll no-scrollbar">
                        {props.opened && props.opened.length > 0 ? (
                            props.opened.map((content) => (
                                <li
                                    className=" bg-slate-500 px-10"
                                    key={props.opened.indexOf(content)}
                                    onClick={() =>
                                        handleChangePage(props.opened.indexOf(content))
                                    }
                                >
                                   <Tab path={content.path}/>
                                </li>
                            ))
                        ) : (
                            <li></li>
                        )}
                    </ul>
                </div>
            </div>
            <div className='flex justify-end'>
                <div className='flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]'>
                    <img src="../save.png" className='w-6 h-6' />
                </div>
                <div className='flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]'>
                    <img src="../settings.png" className='w-6 h-6' />
                </div>
                <div className='flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]' onClick={handleRun}>
                    <img src="../play.png" className='w-6 h-6' />
                </div>
                <div className='flex justify-center items-center rounded-none bg-gray-800 hover:opacity-40 hover:border-gray-800 h-[46px] w-[50px]'>
                    <img src="../build.png" className='w-6 h-6' />
                </div>
            </div>
        </div>
    );
}

export default StatusBar;
