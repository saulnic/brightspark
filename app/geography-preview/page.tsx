"use client";

import { useState } from "react";
import Link from "next/link";

import { continentPaths } from "./continent-paths";

const continents = [
  {name:"North America",color:"#efb66b",x:104,y:89},
  {name:"South America",color:"#e9a17f",x:151,y:179},
  {name:"Europe",color:"#b2a0ec",x:282,y:76},
  {name:"Africa",color:"#f2d477",x:283,y:144},
  {name:"Asia",color:"#94c9b2",x:382,y:82},
  {name:"Australia",color:"#89b7ec",x:432,y:197},
  {name:"Antarctica",color:"#a9dce5",x:267,y:260},
];
const continentFacts:Record<string,string[]> = {
  "North America":["North America includes Canada, the United States and Mexico.","The Pacific Ocean is to its west and the Atlantic Ocean is to its east.","It is home to the Rocky Mountains and the Great Lakes."],
  "South America":["South America lies mostly south of the Equator.","The Amazon Rainforest and Amazon River are here.","The Andes mountains run along its western side."],
  "Europe":["Europe is north of Africa and west of much of Asia.","Europe has many countries, including France, Italy and Spain.","Europe and Asia share one enormous landmass."],
  "Africa":["Africa is the second-largest continent by land area.","The Sahara is the world's largest hot desert.","The Equator crosses the middle of Africa."],
  "Asia":["Asia is the largest continent by land area.","Mount Everest, the highest mountain above sea level, is in Asia.","Asia has many countries, including China, India and Japan."],
  "Australia":["Australia is the smallest continent in the seven-continent model.","Australia is also a country, and Brisbane is one of its cities.","Oceania includes Australia, New Zealand and many Pacific islands."],
  "Antarctica":["Antarctica surrounds the South Pole.","A huge ice sheet covers most of the continent.","Penguins and seals live along its coasts; whales and seabirds visit nearby seas."],
};
const questions = [
  {prompt:"Which continent is covered by a huge ice sheet?",answer:"Antarctica",options:["Africa","Antarctica","Europe","Australia"],hint:"Look for the continent at the bottom of the map."},
  {prompt:"Which continent is home to the Sahara Desert?",answer:"Africa",options:["Asia","South America","Africa","Europe"],hint:"Find the large continent south of Europe."},
  {prompt:"Which continent is directly south of North America?",answer:"South America",options:["Australia","Asia","Europe","South America"],hint:"Follow the land down from North America."},
  {prompt:"Which continent is the largest by land area?",answer:"Asia",options:["Europe","Asia","Africa","Antarctica"],hint:"Look at the huge land area in the northern and eastern part of the map."},
  {prompt:"Which continent includes France and Italy?",answer:"Europe",options:["Africa","North America","Europe","Australia"],hint:"Find the smaller continent just north of Africa."},
  {prompt:"Which continent includes Canada and Mexico?",answer:"North America",options:["North America","South America","Asia","Europe"],hint:"Look to the upper-left of the map."},
  {prompt:"Which continent is also the name of a country?",answer:"Australia",options:["Africa","Europe","Australia","Asia"],hint:"Find the continent southeast of Asia."},
];
function WorldMap({highlight,labels=true,onSelect}:{highlight?:string;labels?:boolean;onSelect?:(name:string)=>void}) {
  return <svg viewBox="0 0 520 286" role="img" aria-label="World map showing seven continents. Tap a continent to learn about it." style={{width:"100%",height:"auto",display:"block",touchAction:"manipulation"}}>
    <rect width="520" height="286" rx="20" fill="#e7f4ff"/>
    {[60,120,180,240].map(y=><line key={y} x1="0" x2="520" y1={y} y2={y} stroke="#c8e0f2" strokeDasharray="4 5"/>) }
    {[100,200,300,400].map(x=><line key={x} y1="0" y2="286" x1={x} x2={x} stroke="#c8e0f2" strokeDasharray="4 5"/>) }
    {continents.map(c=><g key={c.name} onClick={onSelect?()=>onSelect(c.name):undefined} style={{cursor:onSelect?"pointer":"default"}} role={onSelect?"button":undefined} aria-label={onSelect?`Explore ${c.name}`:undefined} tabIndex={onSelect?0:undefined} onKeyDown={onSelect?(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onSelect(c.name)}}:undefined}>
      {continentPaths[c.name]?.map((d,i)=><path key={i} d={d} fill={c.color} stroke={highlight===c.name?"#6b52cf":"#ffffff"} strokeWidth={highlight===c.name?1.8:.45} opacity={highlight&&highlight!==c.name?.45:1}/>)}
      {labels?<g><rect x={c.x-(c.name.length*3.2+8)} y={c.y-12} width={c.name.length*6.4+16} height="24" rx="11" fill={highlight===c.name?"#6b52cf":"#fff"} opacity=".96"/><text x={c.x} y={c.y+4} fontSize="11" fontWeight="800" textAnchor="middle" fill={highlight===c.name?"#fff":"#25243a"}>{c.name}</text></g>:null}
      {onSelect?<circle cx={c.x} cy={c.y} r="20" fill="transparent"/>:null}
    </g>)}
    <text x="508" y="282" textAnchor="end" fontSize="8" fill="#527c9a">Geographic outlines · simplified</text>
  </svg>;
}
export default function GeographyPreview() {
  const [step,setStep]=useState(-1);
  const [chosen,setChosen]=useState<string|null>(null);
  const [answers,setAnswers]=useState<boolean[]>([]);
  const [selected,setSelected]=useState("All");
  const finished=step>=questions.length;
  const q=questions[step];
  function advance(){if(chosen===null)return;setAnswers(a=>[...a,chosen===q.answer]);setChosen(null);setStep(i=>i+1);}
  return <main className="appShell learningApp" style={{paddingBottom:45}}>
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,gap:10}}><Link href="/home" style={{color:"#705bd6",fontWeight:800}}>← Brightspark</Link><span style={{fontWeight:800,color:"#705bd6"}}>🌍 Geography · Lesson 2</span></div>
    {step===-1?<section className="scienceLessonCard">
      <div className="scienceLessonBadge">🌍 Chapter 1 · Lesson 2</div><h1>Meet the continents</h1>
      <p className="scienceLessonIntro">A continent is a very large area of land. We learn seven continents. Europe and Asia share one enormous landmass called Eurasia. Let's explore!</p>
      <p style={{fontWeight:800,marginBottom:10}}>Tap a continent on the map to explore it</p>
      <div style={{background:"#f5f3fb",padding:8,borderRadius:20,margin:"12px 0"}}><WorldMap highlight={selected==="All"?undefined:selected} onSelect={setSelected}/></div>
      <div aria-live="polite" style={{background:"#f5f3fb",padding:16,borderRadius:18,marginBottom:20,minHeight:142}}>
        <h2 style={{fontSize:"1.25rem",marginBottom:10}}>{selected==="All"?"Our seven continents":selected}</h2>
        {selected==="All"?<p style={{margin:0}}>There are seven continents: Asia, Africa, North America, South America, Antarctica, Europe and Australia. Tap any continent to discover more!</p>:<div style={{display:"grid",gap:9}}>{continentFacts[selected]?.map((fact,i)=><p key={i} style={{margin:0,lineHeight:1.4}}>{fact}</p>)}<button onClick={()=>setSelected("All")} style={{justifySelf:"start",border:0,background:"transparent",padding:"5px 0",color:"#705bd6",fontWeight:800}}>← Show all continents</button></div>}
      </div>
      <Link href="/geography-preview/directions" style={{display:"block",marginBottom:12,color:"#705bd6",fontWeight:800}}>← Lesson 1: Finding your way around Earth</Link><button className="primaryButton" style={{width:"100%",marginTop:18}} onClick={()=>setStep(0)}>Start the 7 questions →</button>
    </section>:finished?<section className="scienceLessonCard" style={{textAlign:"center"}}><div style={{fontSize:54}}>🎉</div><h1>Great exploring!</h1><p>You got <strong>{answers.filter(Boolean).length} out of {questions.length}</strong> correct.</p><p className="muted">This is a lesson preview. No stars or progress have been saved yet.</p><button className="primaryButton" onClick={()=>{setStep(-1);setAnswers([]);setChosen(null)}}>Explore again</button></section>:
    <><div style={{display:"flex",justifyContent:"space-between",fontWeight:800,marginBottom:12}}><span>Continents</span><span>{step+1}/{questions.length}</span></div><div style={{height:8,borderRadius:20,background:"#e8e4f2",marginBottom:20}}><div style={{height:"100%",width:`${(step+1)/questions.length*100}%`,borderRadius:20,background:"#705bd6"}}/></div><section className="questionCard" style={{padding:20,borderRadius:25}}><h2 style={{fontSize:"1.4rem",marginBottom:16}}>{q.prompt}</h2><div style={{background:"#f5f3fb",borderRadius:18,padding:8,marginBottom:18}}><WorldMap labels/></div><div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:10}}>{q.options.map(option=><button key={option} disabled={chosen!==null} onClick={()=>setChosen(option)} style={{padding:"17px 8px",minHeight:70,borderRadius:17,border:"2px solid "+(chosen!==null&&option===q.answer?"#55a76d":chosen===option?"#dd6b6b":"#e5e1ed"),background:chosen!==null&&option===q.answer?"#e2f5e6":chosen===option?"#fff0f0":"white",fontWeight:800,color:"#292638"}}>{option}</button>)}</div>{chosen!==null?<><p style={{marginTop:17,fontWeight:800,color:chosen===q.answer?"#287d48":"#a43c45"}}>{chosen===q.answer?"✓ That's right!":`Not quite. The answer is ${q.answer}.`}</p><p className="muted">{q.hint}</p><button className="primaryButton" style={{width:"100%"}} onClick={advance}>{step===questions.length-1?"Finish lesson":"Next question →"}</button></>:null}</section></>}
  </main>;
}
