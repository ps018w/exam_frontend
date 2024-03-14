import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Pagination({categoryId}) {
  console.log(categoryId)
  const [totalQuestions, setTotalQuestions] = useState([]);

  const allQuestions = () => {
    axios
      .get(`http://educomet.com.au/api/questions`)
      .then((res) => {
        // console.log('total questions==>>', res.data.data);
        setTotalQuestions(res.data.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  };

  useEffect(() => {
    allQuestions();
  }, []);

  const handlePagination = (id) => {
    axios
      .get(`http://educomet.com.au/api/question/${categoryId}?page=${id}`)
      .then((nextResponse) => {
        console.log('question==>>', nextResponse.data.results);
        setQuestionsData(nextResponse.data.results);
      })
      .catch((nextError) => {
        console.error(nextError);
      });
  };

  return (
    <>
      {totalQuestions && (
        <div id="leftSection" className="col-span-3 bg-cyan-50">
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">
              <div className="border-b grid grid-cols-12 items-center gap-y-4 gap-x-2 px-3 py-4 text-[13px]">
                <div className="flex gap-2 items-center col-span-6">
                  <div className="bg-green-500 h-[22px] leading-[2] rounded-tl-full rounded-tr-full text-center text-white text-xs w-[35px]">
                    1
                  </div>

                  <span className="text-nowrap">Answered</span>
                </div>
                <div className="flex gap-2 col-span-6">
                  <span className="border border-gray-600 p-1 text-xs bg-white">
                    29
                  </span>
                  <span className="text-nowrap">Not Visited</span>
                </div>
                <div className="flex gap-2 items-center col-span-6">
                  <span className="bg-red-500 flex  items-center px-2 rounded-full text-white text-xs h-6">
                    0
                  </span>
                  <span className="text-nowrap">Answered for revisit</span>
                </div>
                <div className="flex gap-2 items-center col-span-6"></div>
              </div>
              <div className="bg-sky-300 flex gap-2 px-4 py-2 mb-4">
                <span className="font-semibold">SECTION :</span>
                <span>{totalQuestions[0]?.category}</span>
              </div>
              <div className="px-4 flex flex-col gap-4">
                <div className="gap-4 grid grid-cols-12">
                  {totalQuestions?.map((data, index) => (
                    <div
                      key={data}
                      className="text-center bg-white border border-gray-300 p-1 px-3 py-2 rounded text-xs col-span-2 cursor-pointer"
                      onClick={() => handlePagination(data.id)}
                    >
                      {data.id}
                    </div>
                  ))}
                </div>
                <div></div>
              </div>
            </div>
            <div className="border sticky bottom-0 p-4">
              <button className="bg-cyan-500 text-white px-3 py-1 rounded w-full">
                Final Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Pagination;
