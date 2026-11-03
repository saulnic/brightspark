"use client";
import {useState} from "react";
import Link from "next/link";

const questions=[
 {q:"Which direction is opposite to north?",a:"South",options:["East","South","West"]},
 {q:"Which direction is opposite to east?",a:"West",options:["North","South","West"]},
 {q:"Which point is at Earth's northern end?",a:"North Pole",options:["Equator","South Pole","North Pole"]},
 {q:"Which point is at Earth's southern end?",a:"South Pole",options:["South Pole","North Pole","Equator"]},
 {q:"What imaginary line goes around Earth's middle?",a:"Equator",options:["North Pole","Equator","East"]},
 {q:"In which direction does the Sun appear to rise?",a:"East",options:["West","South","East"]}
];
const lessons=[
 {title:"North and south",explain:"North and south are directions. On this globe, north points towards the North Pole and south towards the South Pole.",focus:"directions"},
 {title:"East and west",explain:"East and west are opposite directions around Earth. The Sun appears to rise in the east and set in the west.",focus:"directions"},
 {title:"The North Pole",explain:"The North Pole is the point at Earth's far northern end. It is in the Arctic.",focus:"north"},
 {title:"The South Pole",explain:"The South Pole is the point at Earth's far southern end. It is on Antarctica.",focus:"south"},
 {title:"The Equator",explain:"The Equator is an imaginary line all the way around Earth's middle, halfway between the poles. It divides Earth into northern and southern halves.",focus:"equator"}
];
function Globe({focus}:{focus:string}){return <div style={{textAlign:"center"}}>
 <svg viewBox="0 0 340 320" role="img" aria-label="Illustrated globe with North Pole, South Pole and Equator" style={{width:"100%",maxWidth:380}}>
 <defs><clipPath id="globeCircle"><circle cx="170" cy="155" r="116"/></clipPath></defs>
 <circle cx="170" cy="155" r="116" fill="#91d9f4" stroke="#487cb0" strokeWidth="3"/>
 <g clipPath="url(#globeCircle)" fill="#7bbd84" stroke="#549a6b" strokeWidth="1.5">
 <path d="M83 60 L124 48 152 72 139 100 111 113 117 137 98 148 82 120 55 104Z"/>
 <path d="M120 155 L158 168 174 205 151 264 129 238 136 202 111 182Z"/>
 <path d="M185 74 L221 55 276 76 288 117 254 136 236 121 208 143 184 125Z"/>
 <path d="M196 137 L237 151 245 196 217 235 190 201 182 170Z"/>
 <path d="M251 220 L289 213 307 243 274 255Z"/>
 </g>
 <ellipse cx="170" cy="155" rx="116" ry="38" fill="none" stroke="#e77d36" strokeWidth={focus==="equator"?5:3} strokeDasharray="7 4"/>
 <circle cx="170" cy="39" r={focus==="north"?9:6} fill="#6c4ed5"/>
 <circle cx="170" cy="271" r={focus==="south"?9:6} fill="#6c4ed5"/>
 <g fill="#25243a" fontSize="14" fontWeight="800" textAnchor="middle"><text x="170" y="21">North Pole ↑ N</text><text x="170" y="298">South Pole ↓ S</text><text x="170" y="150" fill="#9a431d">Equator</text></g>
 <g fontSize="16" fontWeight="900" fill="#3f3896"><text x="26" y="158">W</text><text x="300" y="158">E</text></g>
 </svg>

 <p className="muted" style={{fontSize:13,marginTop:12}}>This simple globe shows the poles and Equator. The land shapes are illustrations, not a detailed map.</p>
 </div>}
export default function DirectionsLesson(){const [step,setStep]=useState(0),[chosen,setChosen]=useState<string|null>(null),[answers,setAnswers]=useState<boolean[]>([]);const learning=step<lessons.length,quizIndex=step-lessons.length,done=quizIndex>=questions.length,q=questions[quizIndex];function reset(){setStep(0);setChosen(null);setAnswers([])}
return <main className="appShell learningApp" style={{paddingBottom:45}}><header style={{display:"flex",justifyContent:"space-between",gap:12,marginBottom:18}}><Link href="/home" style={{color:"#705bd6",fontWeight:800}}>← Brightspark</Link><span style={{fontWeight:800}}>🌍 Geography · Lesson 1</span></header>
<section className="scienceLessonCard"><div className="scienceLessonBadge">🌍 Chapter 1 · Lesson 1</div><h1>Finding your way around Earth</h1>
{learning?<><p className="muted">Explore {step+1} of {lessons.length}</p><h2>{lessons[step].title}</h2><p className="scienceLessonIntro">{lessons[step].explain}</p><Globe focus={lessons[step].focus}/><button className="primaryButton" style={{width:"100%",marginTop:22}} onClick={()=>setStep(v=>v+1)}>{step===lessons.length-1?"Try the six questions →":"Next discovery →"}</button></>:
done?<div style={{textAlign:"center"}}><div style={{fontSize:52}}>🎉</div><h2>Great exploring!</h2><p>You answered {answers.filter(Boolean).length} out of {questions.length} correctly.</p><p className="muted">Preview lesson: no stars or progress saved yet.</p><div style={{display:"grid",gap:12,marginTop:24}}><button className="secondaryButton" style={{width:"100%"}} onClick={reset}>Play again</button><Link className="primaryButton" style={{display:"block",textAlign:"center",width:"100%"}} href="/geography-preview">Lesson 2: Meet the continents →</Link></div></div>:
<><p style={{fontWeight:800}}>Question {quizIndex+1} of {questions.length}</p><h2>{q.q}</h2><Globe focus="all"/><div style={{display:"grid",gap:10,marginTop:20}}>{q.options.map(o=><button type="button" key={o} disabled={chosen!==null} onClick={()=>setChosen(o)} style={{border:"2px solid "+(chosen!==null&&o===q.a?"#55a76d":chosen===o?"#dd6b6b":"#ddd8ee"),background:chosen!==null&&o===q.a?"#e2f5e6":"white",padding:15,borderRadius:15,fontWeight:800}}>{o}</button>)}</div>{chosen!==null?<><p style={{fontWeight:800}}>{chosen===q.a?"✓ Correct!":`Not quite. The answer is ${q.a}.`}</p><button className="primaryButton" style={{width:"100%"}} onClick={()=>{setAnswers(v=>[...v,chosen===q.a]);setChosen(null);setStep(v=>v+1)}}>{quizIndex===questions.length-1?"Finish →":"Next question →"}</button></>:null}</>}
</section></main>}
