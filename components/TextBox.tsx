import React from "react";

import Typewriter from "typewriter-effect";

function TextBox({ text }: { text: string }) {
  return (
    <div
      className="block  w-full h-[450px] overflow-y-scroll  text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Write your thoughts here..."
    >
      <div className="mx-4 my-4 text-lg font-serif font-medium">
        {" "}
        <Typewriter
          options={{
            strings: text,
            autoStart: true,
            delay: 40,
          }}
        />
      </div>
    </div>
  );
}

export default TextBox;
