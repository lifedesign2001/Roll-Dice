"use client";

import Image from "next/image";
import React, { useState, useEffect } from 'react';

function DiceItem(props) {
  const dice = props?.dice;
  const diceItemId = 'diceItem'+dice.key

  return (
      <div id={diceItemId} key={dice.key} data-diceval="1" className={dice.className} style={dice.style}>
        <div className="face front"></div>
        <div className="face back"></div>
        <div className="face top"></div>
        <div className="face bottom"></div>
        <div className="face right"></div>
        <div className="face left"></div>
      </div>
  );
}

export default function Home() {

  const defaultRollResultClass = 'mt-2 text-center text-5xl font-semibold transition-opacity duration-300';

  const [diceList, setDiceList] = useState([]);
  const [diceAmount, setDiceAmount] = useState(1);
  const [rollResultVal, setRollResultVal] = useState(0);
  const [rollResultClass, setRollResultClass] = useState(defaultRollResultClass+' opacity-0 delay-0');
  
  const [diceTimeOut, setDiceTimeOut] = useState([]);
  const [timeOutResult, setTimeOutResult] = useState(0);

  function clearDiceTimeOut()
  {
    console.log(diceTimeOut);
    for (var i=0; i<diceTimeOut.length; i++) {
      //console.log('a'+i);
      clearTimeout(diceTimeOut[i]);
    }
    setDiceTimeOut([]);
    clearTimeout(timeOutResult);
  }

  function prepareDice()
  {
    clearDiceTimeOut();
    setDiceList([]);

    let diceListTmp = [];
    for (let i = 0; i < diceAmount; i++) {
      let dice = [];
      dice.key = i;
      dice.className = 'dice val1';
      dice.style = {};
      //console.log(dice);
      diceListTmp.push(<DiceItem key={i} dice={dice} />);
    }
    setDiceList(diceListTmp);
    setRollResultClass(defaultRollResultClass+' opacity-0 delay-0');
    //setRollResultVal(0);
  }

  function handleDiceAmount(e) {
    setDiceAmount(e.target.value);
  }

  function handleRoll()
  {
    clearDiceTimeOut();

    let lastIndex = 0;

    //setDiceList([]);
    setRollResultClass(defaultRollResultClass+' opacity-0 delay-0');
    setTimeOutResult(0);

    let diceRandom = 0;
    let new_rollResultVal = 0;

    for (const [i, diceItem] of diceList.entries()) {

      lastIndex = i;

      diceRandom = Math.floor((Math.random() * 6) + 1);
      //console.log(diceRandom);
      new_rollResultVal += diceRandom;

      let animateRandom = Math.floor((Math.random() * 9) + 1);
      //console.log(diceItem);

      document.getElementById('diceItem'+i).classList.remove('val1','val2','val3','val4','val5','val6');
      document.getElementById('diceItem'+i).style.animation = "rolling"+animateRandom+" 2s linear ."+i+"s";
      document.getElementById('diceItem'+i).dataset.diceval = diceRandom;

      diceTimeOut[i] = setTimeout(() => {
        
        var diceval = document.getElementById('diceItem'+i).dataset.diceval;
        //document.getElementById('diceItem'+i).classList.add('val'+diceval);
        if (diceval == 1) {
          //document.getElementById('diceItem'+i).style = { "transform" : "rotateX(0deg) rotateY(0deg)"};
          document.getElementById('diceItem'+i).style.transform = "rotateX(0deg) rotateY(0deg)";
        } else if  (diceval == 6) {
          //document.getElementById('diceItem'+i).style = { "transform" : "rotateX(180deg) rotateY(0deg)"};
          document.getElementById('diceItem'+i).style.transform = "rotateX(180deg) rotateY(0deg)";
        } else if  (diceval == 2) {
          //document.getElementById('diceItem'+i).style = { "transform" : "rotateX(-91deg) rotateY(1deg)"};
          document.getElementById('diceItem'+i).style.transform = "rotateX(-91deg) rotateY(1deg)";
        } else if  (diceval == 5) {
          //document.getElementById('diceItem'+i).style = { "transform" : "rotateX(91deg) rotateY(1deg)"};
          document.getElementById('diceItem'+i).style.transform = "rotateX(91deg) rotateY(1deg)";
        } else if  (diceval == 3) {
          //document.getElementById('diceItem'+i).style = { "transform" : "rotateX(1deg) rotateY(91deg)"};
          document.getElementById('diceItem'+i).style.transform = "rotateX(1deg) rotateY(91deg)";
        } else if  (diceval == 4) {
          //document.getElementById('diceItem'+i).style = { "transform" : "rotateX(1deg) rotateY(-91deg)"};
          document.getElementById('diceItem'+i).style.transform = "rotateX(1deg) rotateY(-91deg)";
        }

        if (i == (diceList.length - 1)) {
          setRollResultVal(new_rollResultVal);
          setRollResultClass(defaultRollResultClass+' opacity-1 delay-1000');
          clearDiceTimeOut();
        }
        
      }, 2050 + i*100);
    }

    setDiceTimeOut(diceTimeOut);

    //console.log(diceList.length);

    //setDiceList(newDiceList);

    /*var tmpResultTimeout = setTimeout(() => {
      setRollResultVal(new_rollResultVal);
      setRollResultClass(defaultRollResultClass+' opacity-1');
      clearDiceTimeOut();
      setDiceTimeOut([]);
    }, (lastIndex*100) + 3000);

    setTimeOutResult(tmpResultTimeout);*/
  }

  useEffect(() => {
    //console.log(diceAmount);
    prepareDice();
  },[diceAmount]);

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
        .register('/service-worker.js')
        .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

  return (
    <main>
      <div className="max-w-[800px] p-4 mx-auto my-0">
        <div className="pt-12 pb-10 rounded-lg bg-[#f3f3f3] relative">
          <div className="flex items-center justify-center mb-6 text-lg font-semibold">
            <div className="w-[50px] text-right">Roll</div>
            <div className="w-[50px] mx-4">
              <select onChange={handleDiceAmount} className="w-full border-b border-black round-0 text-xl text-black font-bold outline-none appearance-none bg-[url('/icon-select-dark.svg')] bg-[length:14px_auto] bg-transparent bg-right bg-no-repeat">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
              </select>
            </div>
            <div className="w-[50px]">Dice</div>
          </div>
          <div id="diceList" className="flex flex-wrap w-full max-w-[500px] justify-center mx-auto">
            {diceList}
          </div>
          <div className={rollResultClass}>{rollResultVal}</div>
          <div className="text-center mt-2.5">
            <button id="rollBtn" onClick={handleRoll} className="cursor-pointer text-white py-4 px-5 rounded bg-[#0080ff]">Roll</button>
          </div>
        </div>
      </div>
    </main>
  );
}
