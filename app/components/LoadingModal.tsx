"use client";

import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ClipLoader from "react-spinners/ClipLoader";

const LoadingModal = () => {
  const [loadingText, setLoadingText] = useState("Loading");
  const [color, setColor] = useState("#0284c7");
  
  // Cycle through loading text with dots
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingText(prevText => {
        if (prevText === "Loading...") return "Loading";
        return prevText + ".";
      });
    }, 500);
    
    // Cycle through colors
    const colorInterval = setInterval(() => {
      const colors = ["#0284c7", "#4f46e5", "#06b6d4", "#10b981", "#8b5cf6"];
      setColor(prevColor => {
        const currentIndex = colors.indexOf(prevColor);
        const nextIndex = (currentIndex + 1) % colors.length;
        return colors[nextIndex];
      });
    }, 2000);
    
    return () => {
      clearInterval(interval);
      clearInterval(colorInterval);
    };
  }, []);

  return (
    <Transition.Root show as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => {}}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-300"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-100 bg-opacity-50 transition-opacity backdrop-blur-sm" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-screen justify-center items-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white p-6 shadow-xl transition-all max-w-sm w-full">
                <div className="flex flex-col items-center">
                  <div className="mb-4">
                    <ClipLoader size={60} color={color} speedMultiplier={1.2} />
                  </div>
                  <p className="text-lg font-medium text-gray-700">{loadingText}</p>
                  <div className="mt-4 flex justify-center space-x-1">
                    {[0, 1, 2].map((i) => (
                      <div 
                        key={i} 
                        className="h-2 w-2 rounded-full"
                        style={{
                          backgroundColor: color,
                          opacity: (i === 0 && loadingText.length >= 8) || 
                                  (i === 1 && loadingText.length >= 9) || 
                                  (i === 2 && loadingText.length >= 10) ? 1 : 0.3
                        }}
                      />
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default LoadingModal;