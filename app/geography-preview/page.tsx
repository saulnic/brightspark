"use client";

import { useState } from "react";
import Link from "next/link";

const continents = [
  {name:"North America",short:"North America",color:"#efb66b",x:108,y:90,shape:"M49 49 L84 31 L134 35 L160 53 L148 74 L121 81 L111 108 L94 119 L83 98 L65 86 Z"},
  {name:"South America",short:"South America",color:"#e9a17f",x:142,y:170,shape:"M120 129 L150 116 L172 137 L165 169 L151 202 L140 231 L126 206 L132 177 L116 151 Z"},
  {name:"Europe",short:"Europe",color:"#b2a0ec",x:275,y:76,shape:"M247 59 L263 45 L286 49 L295 67 L279 78 L260 73 Z"},
  {name:"Africa",short:"Africa",color:"#f2d477",x:282,y:144,shape:"M246 94 L285 86 L316 105 L311 143 L291 185 L272 190 L258 156 L241 122 Z"},
  {name:"Asia",short:"Asia",color:"#94c9b2",x:390,y:86,shape:"M291 47 L326 26 L382 28 L427 39 L472 56 L486 89 L453 108 L433 129 L400 117 L378 91 L346 86 L315 101 L297 79 Z"},
  {name:"Australia",short:"Australia",color:"#89b7ec",x:428,y:189,shape:"M392 169 L419 156 L454 170 L467 193 L448 210 L411 207 L389 190 Z"},
  {name:"Antarctica",short:"Antarctica",color:"#a9dce5",x:270,y:247,shape:"M77 250 L131 238 L194 247 L259 236 L329 244 L396 237 L463 250 L448 266 L104 266 Z"},
];
const questions = [
  {prompt:"Which continent is covered by a huge ice sheet?",answer:"Antarctica",options:["Africa","Antarctica","Europe","Australia"],hint:"Look for the continent at the bottom of the map."},
  {prompt:"Which continent is home to the Sahara Desert?",answer:"Africa",options:["Asia","South America","Africa","Europe"],hint:"Find the large continent south of Europe."},
  {prompt:"Which continent is directly south of North America?",answer:"South America",options:["Australia","Asia","Europe","South America"],hint:"Follow the land down from North America."},
  {prompt:"Which continent is the largest by land area?",answer:"Asia",options:["Europe","Asia","Africa","Antarctica"],hint:"Look at the huge land area in the northern and eastern part of the map."},
  {prompt:"Which continent includes France and Italy?",answer:"Europe",options:["Africa","North America","Europe","Australia"],hint:"Find the smaller continent just north of Africa."},
  {prompt:"Which continent includes Canada and Mexico?",answer:"North America",options:["North America","South America","Asia","Europe"],hint:"Look to the upper-left of the map."},
  {prompt:"Which continent is also the name of a country?",answer:"Australia",options:["Africa","Europe","Australia","Asia"],hint:"Find the continent southeast of Asia."},
];
function WorldMap({highlight,labels=true}:{highlight?:string;labels?:boolean}) {
  return <svg viewBox="0 0 520 286" role="img" aria-label="Simplified world map showing the seven continents" style={{width:"100%",height:"auto",display:"block"}}>
    <rect width="520" height="286" rx="20" fill="#e7f4ff"/>
    {[60,120,180,240].map(y=><line key={y} x1="0" x2="520" y1={y} y2={y} stroke="#c8e0f2" strokeDasharray="4 5"/>)}
    {[100,200,300,400].map(x=><line key={x} y1="0" y2="286" x1={x} x2={x} stroke="#c8e0f2" strokeDasharray="4 5"/>)}
    {continents.map(c=><path key={c.name} d={c.shape} fill={c.color} stroke={highlight===c.name?"#6b52cf":"#ffffff"} strokeWidth={highlight===c.name?5:2.5} opacity={highlight&&highlight!==c.name?.55:1}/>)}
    {labels&&continents.map(c=><g key={c.name}><rect x={c.x-(c.name.length*3.2+8)} y={c.y-11} width={c.name.length*6.4+16} height="22" rx="10" fill="#fff" opacity=".92"/><text x={c.x} y={c.y+4} fontSize="11" fontWeight="800" textAnchor="middle" fill="#25243a">{c.short}</text></g>)}
    <text x="508" y="281" textAnchor="end" fontSize="9" fill="#527c9a">Simplified learning map · not to scale</text>
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
    <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:20,gap:10}}><Link href="/home" style={{color:"#705bd6",fontWeight:800}}>← Brightspark</Link><span style={{fontWeight:800,color:"#705bd6"}}>🌍 Geography · Preview</span></div>
    {step===-1?<section className="scienceLessonCard">
      <div className="scienceLessonBadge">🌍 Chapter 1 · Lesson 1</div><h1>Meet the continents</h1>
      <p className="scienceLessonIntro">Earth has seven continents. A continent is a very large area of land. Let's explore where they are!</p>
      <div style={{background:"#f5f3fb",padding:10,borderRadius:20,margin:"18px 0"}}><WorldMap highlight={selected==="All"?undefined:selected}/></div>
      <p style={{fontWeight:800,marginBottom:9}}>Tap a continent to explore it</p>
      <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>{["All",...continents.map(c=>c.name)].map(name=><button key={name} onClick={()=>setSelected(name)} style={{border:"2px solid "+(selected===name?"#705bd6":"#e6e1f3"),background:selected===name?"#efeafd":"white",padding:"9px 12px",borderRadius:14,fontWeight:700,color:"#302b45"}}>{name}</button>)}</div>
      <div className="scienceFacts">
        <div className="scienceFact"><span>1</span><p><strong>Seven continents:</strong> Asia, Africa, North America, South America, Antarctica, Europe and Australia.</p></div>
        <div className="scienceFact"><span>2</span><p><strong>Asia</strong> is the largest continent. <strong>Australia</strong> is the smallest of the seven.</p></div>
        <div className="scienceFact"><span>3</span><p><strong>North America</strong> is above <strong>South America</strong> on most world maps.</p></div>
        <div className="scienceFact"><span>4</span><p><strong>Europe</strong> lies north of <strong>Africa</strong>. The Sahara Desert is in Africa.</p></div>
        <div className="scienceFact"><span>5</span><p><strong>Antarctica</strong> surrounds the South Pole and is covered by a vast ice sheet.</p></div>
        <div className="scienceFact"><span>6</span><p><strong>Australia</strong> is both a country and a continent. In some geography lessons, the wider region is called Oceania.</p></div>
      </div>
      <button className="primaryButton" style={{width:"100%",marginTop:18}} onClick={()=>setStep(0)}>Start the 7 questions →</button>
    </section>:finished?<section className="scienceLessonCard" style={{textAlign:"center"}}><div style={{fontSize:54}}>🎉</div><h1>Great exploring!</h1><p>You got <strong>{answers.filter(Boolean).length} out of {questions.length}</strong> correct.</p><p className="muted">This is a lesson preview. No stars or progress have been saved yet.</p><button className="primaryButton" onClick={()=>{setStep(-1);setAnswers([]);setChosen(null)}}>Explore again</button></section>:
    <><div style={{display:"flex",justifyContent:"space-between",fontWeight:800,marginBottom:12}}><span>Continents</span><span>{step+1}/{questions.length}</span></div><div style={{height:8,borderRadius:20,background:"#e8e4f2",marginBottom:20}}><div style={{height:"100%",width:`${(step+1)/questions.length*100}%`,borderRadius:20,background:"#705bd6"}}/></div><section className="questionCard" style={{padding:20,borderRadius:25}}><h2 style={{fontSize:"1.4rem",marginBottom:16}}>{q.prompt}</h2><div style={{background:"#f5f3fb",borderRadius:18,padding:8,marginBottom:18}}><WorldMap labels/></div><div style={{display:"grid",gridTemplateColumns:"repeat(2,minmax(0,1fr))",gap:10}}>{q.options.map(option=><button key={option} disabled={chosen!==null} onClick={()=>setChosen(option)} style={{padding:"17px 8px",minHeight:70,borderRadius:17,border:"2px solid "+(chosen!==null&&option===q.answer?"#55a76d":chosen===option?"#dd6b6b":"#e5e1ed"),background:chosen!==null&&option===q.answer?"#e2f5e6":chosen===option?"#fff0f0":"white",fontWeight:800,color:"#292638"}}>{option}</button>)}</div>{chosen!==null?<><p style={{marginTop:17,fontWeight:800,color:chosen===q.answer?"#287d48":"#a43c45"}}>{chosen===q.answer?"✓ That's right!":`Not quite. The answer is ${q.answer}.`}</p><p className="muted">{q.hint}</p><button className="primaryButton" style={{width:"100%"}} onClick={advance}>{step===questions.length-1?"Finish lesson":"Next question →"}</button></>:null}</section></>}
  </main>;
}
