import React from 'react';

function Timer() {
  const [timer, setTimer] = useState(1800);

    useEffect(() => {
        const timerInterval = setInterval(() => {
          setTimer((prevTimer) => prevTimer - 1);
        }, 1000);
    
        return () => clearInterval(timerInterval);
      }, []);
      
  return (
    <div className="flex gap-4">
      <span>Section Time</span>
      <div className="flex gap-2 items-center">
        <span className="bg-black text-white px-[5px] text-sm">
          {Math.floor(timer / 60)}
        </span>
        :
        <span className="bg-black text-white px-[5px] text-sm">
          {timer % 60}
        </span>
      </div>
    </div>
  );
}

export default Timer;
