import type{AvatarConfig,RewardColour}from"@/content/avatar";
const SKIN={light:"#f7d7bd",warm:"#efc29d",tan:"#d69a6b",brown:"#9b6547",deep:"#68412f"};
const HAIR={brown:"#5a3828",black:"#29252a",blonde:"#d6aa55",red:"#9c4d2f"};
const EYES={brown:"#5c3824",blue:"#3e77a8",green:"#4f7b58",dark:"#29252a"};
const COL:Record<RewardColour,string>={pink:"#f16d98",blue:"#6397df",red:"#d85b61",green:"#5ca66b",yellow:"#e6bf3c",black:"#34313b",white:"#f7f5f0",purple:"#8a76dd",orange:"#df8846",teal:"#4ea6a2",gold:"#e2b63f"};
function Marks({kind,x,y,w,h}:{kind:AvatarConfig["bottomPattern"];x:number;y:number;w:number;h:number}){if(kind==="plain")return null;if(kind==="stripes")return <>{[0,1,2,3].map(i=><path key={i} d={`M${x+i*w/4} ${y} l${w/5} ${h}`} stroke="#fff" strokeOpacity=".45" strokeWidth="3"/>)}</>;if(kind==="spots")return <>{[[.2,.25],[.65,.2],[.42,.62],[.8,.72]].map(([a,b],i)=><circle key={i} cx={x+w*a} cy={y+h*b} r="4" fill="#fff" fillOpacity=".6"/>)}</>;return <>{[[.25,.3],[.68,.25],[.48,.68]].map(([a,b],i)=><text key={i} x={x+w*a} y={y+h*b} fontSize="13" fill="#fff" textAnchor="middle">★</text>)}</>}
export function CharacterShowcase({config}:{config:AvatarConfig}){const skin=SKIN[config.skin],hair=HAIR[config.hairColour],accent=COL[config.hairAccessoryColour],item=COL[config.activityColour];return <svg className="characterShowcase" viewBox="0 0 340 350" role="img" aria-label="Full body learner with pet">
<ellipse cx="145" cy="326" rx="102" ry="12" fill="#ebe7f5"/>
<g transform="translate(38 8)">
{config.hair==="long"?<path d="M54 68 Q54 18 102 18 Q151 18 151 68 L145 156 Q128 139 124 105 H80 Q74 139 58 156Z" fill={hair}/>:null}
<ellipse cx="102" cy="70" rx="45" ry="47" fill={skin}/>
{config.hair==="short"?<path d="M59 59 Q66 20 102 21 Q141 22 146 59 Q126 41 102 43 Q78 40 59 59Z" fill={hair}/>:null}
{config.hair==="bob"?<><path d="M54 76 Q54 18 102 18 Q151 18 151 78 L142 111 Q134 59 102 47 Q70 58 62 112Z" fill={hair}/><path d="M63 54 Q74 27 102 28 Q132 27 143 54 Q123 42 102 45 Q82 42 63 54Z" fill={hair}/></>:null}
{config.hair==="long"?<path d="M62 55 Q72 24 102 26 Q134 24 144 55 Q123 41 102 44 Q81 41 62 55Z" fill={hair}/>:null}
{config.hair==="curls"?<>{[68,84,102,120,136].map((x,i)=><circle key={x} cx={x} cy={i%2?30:37} r="16" fill={hair}/>)}<circle cx="61" cy="54" r="15" fill={hair}/><circle cx="143" cy="54" r="15" fill={hair}/></>:null}
{config.hair==="topknot"?<><circle cx="102" cy="13" r="19" fill={hair}/><path d="M61 57 Q70 24 102 27 Q136 24 145 57 Q124 41 102 44 Q80 41 61 57Z" fill={hair}/></>:null}
{config.headwear==="headband"?<path d="M61 52 Q102 27 145 52" fill="none" stroke={COL[config.headwearColour]} strokeWidth="9" strokeLinecap="round"/>:null}
{config.headwear==="headscarf"?<path d="M58 52 Q72 20 103 20 Q134 20 147 53 Q126 43 103 44 Q79 42 58 52Z" fill={COL[config.headwearColour]} opacity=".95"/>:null}
<circle cx="85" cy="70" r="4.5" fill={EYES[config.eyes]}/><circle cx="119" cy="70" r="4.5" fill={EYES[config.eyes]}/><path d="M89 87 Q102 98 115 87" stroke="#a34f54" strokeWidth="4" fill="none" strokeLinecap="round"/>
{config.faceDecoration==="star"?<text x="137" y="92" fontSize="18" fill={COL[config.faceDecorationColour]}>★</text>:null}
{config.faceDecoration==="lightning"?<path d="M135 76 l10 5 -7 6 8 4 -15 12 5-11-7-4Z" fill={COL[config.faceDecorationColour]}/>:null}
{config.faceDecoration==="flower"?<text x="136" y="94" fontSize="18" fill={COL[config.faceDecorationColour]}>✿</text>:null}
{config.faceDecoration==="stripes"?<><path d="M132 82 l14 4" stroke={COL[config.faceDecorationColour]} strokeWidth="3"/><path d="M131 89 l14 4" stroke={COL[config.faceDecorationColour]} strokeWidth="3"/></>:null}
{config.earrings==="studs"?<><circle cx="59" cy="82" r="4" fill={COL[config.earringColour]}/><circle cx="145" cy="82" r="4" fill={COL[config.earringColour]}/></>:null}
{config.earrings==="hoops"?<><circle cx="58" cy="86" r="7" fill="none" stroke={COL[config.earringColour]} strokeWidth="3"/><circle cx="146" cy="86" r="7" fill="none" stroke={COL[config.earringColour]} strokeWidth="3"/></>:null}
{config.earrings==="stars"?<><text x="51" y="92" fontSize="15" fill={COL[config.earringColour]}>★</text><text x="140" y="92" fontSize="15" fill={COL[config.earringColour]}>★</text></>:null}
{config.hairAccessory==="bow"?<><path d="M128 28 Q151 14 151 38 Q150 55 130 46Z" fill={accent}/><path d="M129 29 Q111 16 112 40 Q113 54 130 46Z" fill={accent}/><circle cx="131" cy="37" r="7" fill={accent}/></>:null}
{config.hairAccessory==="hairclip"?<rect x="130" y="38" width="20" height="7" rx="3.5" transform="rotate(18 130 38)" fill={accent}/>:null}
{config.eyewear==="glasses"?<><circle cx="85" cy="70" r="13" fill="none" stroke={COL[config.eyewearColour]} strokeWidth="3"/><circle cx="119" cy="70" r="13" fill="none" stroke={COL[config.eyewearColour]} strokeWidth="3"/><path d="M98 70 H106" stroke={COL[config.eyewearColour]} strokeWidth="3"/></>:null}
{config.eyewear==="sunglasses"?<><rect x="70" y="61" width="29" height="19" rx="7" fill="#292731" stroke={COL[config.eyewearColour]} strokeWidth="4"/><rect x="105" y="61" width="29" height="19" rx="7" fill="#292731" stroke={COL[config.eyewearColour]} strokeWidth="4"/><path d="M99 67 H105" stroke={COL[config.eyewearColour]} strokeWidth="4"/></>:null}
{config.audioAccessory==="headphones"?<><path d="M67 65 Q69 31 102 25 Q136 31 138 65" fill="none" stroke={COL[config.audioColour]} strokeWidth="7" strokeLinecap="round"/><rect x="59" y="58" width="15" height="28" rx="7" fill={COL[config.audioColour]}/><rect x="131" y="58" width="15" height="28" rx="7" fill={COL[config.audioColour]}/></>:null}
<rect x="92" y="111" width="20" height="17" rx="8" fill={skin}/>
{config.outfit==="dress"?<>
  <path d="M73 128 Q102 113 131 128 L130 181 Q102 190 74 181Z" fill={COL[config.outfitColour]} stroke="#5a5669" strokeWidth="2.5"/>
  <path d="M79 128 Q102 142 125 128" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="3"/>
</>:<path d="M73 128 Q102 113 131 128 L126 194 Q102 203 78 194Z" fill={COL[config.topColour]} stroke="#5a5669" strokeWidth="2.5"/>}
<path d="M75 137 Q56 150 50 177" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/><path d="M50 177 Q47 194 55 203" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/><circle cx="56" cy="205" r="9" fill={skin}/>
<path d="M129 137 Q148 150 154 177" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/><path d="M154 177 Q157 194 149 203" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/><circle cx="148" cy="205" r="9" fill={skin}/>
{config.outfit==="dress"?<>
  <path d="M77 174 Q102 182 127 174 L145 239 Q129 251 102 251 Q75 251 59 239Z" fill={COL[config.outfitColour]} stroke="#5a5669" strokeWidth="2.5"/>
  <path d="M77 178 Q102 187 127 178" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2"/>
  <path d="M79 184 L69 237 M94 185 L88 246 M110 185 L116 246 M125 184 L136 237" stroke="#fff" strokeOpacity=".24" strokeWidth="2.5"/>
  <Marks kind={config.outfitPattern} x={67} y={184} w={70} h={50}/>
</>:<>
{config.bottom==="skirt"?<>
  <path d="M77 190 Q102 197 127 190 L138 232 Q122 241 102 241 Q82 241 66 232Z" fill={COL[config.bottomColour]} stroke="#5a5669" strokeWidth="2.5"/>
  <path d="M82 194 L76 228 M95 195 L92 235 M109 195 L112 235 M122 194 L128 228" stroke="#fff" strokeOpacity=".22" strokeWidth="2"/>
  <Marks kind={config.bottomPattern} x={70} y={196} w={64} h={32}/>
</>:null}
{config.bottom==="shorts"?<>
  <path d="M74 190 H130 L127 229 Q117 233 107 229 L102 209 L97 229 Q87 233 77 229Z" fill={COL[config.bottomColour]} stroke="#5a5669" strokeWidth="2.5"/>
  <Marks kind={config.bottomPattern} x={79} y={195} w={46} h={28}/>
</>:null}
{config.bottom==="trousers"?<>
  <path d="M76 190 H128 L123 279 H106 L102 218 L98 279 H81Z" fill={COL[config.bottomColour]} stroke="#5a5669" strokeWidth="2.5"/>
  <path d="M102 198 V219" stroke="#fff" strokeOpacity=".25" strokeWidth="2"/>
  <Marks kind={config.bottomPattern} x={82} y={196} w={40} h={72}/>
</>:null}</>}
{config.bottom!=="trousers"||config.outfit==="dress"?<><path d="M83 231 Q82 257 80 282" stroke={skin} strokeWidth="17" fill="none" strokeLinecap="round"/><path d="M121 231 Q122 257 124 282" stroke={skin} strokeWidth="17" fill="none" strokeLinecap="round"/></>:null}
{config.shoes==="long-boots"?<>
  <path d="M66 247 Q78 243 90 249 L91 289 Q80 296 57 292 Q53 286 59 280 L64 268Z" fill={COL[config.shoesColour]} stroke="#4d4957" strokeWidth="3"/>
  <path d="M114 247 Q126 243 138 249 L145 289 Q134 296 111 292 Q107 286 113 280 L112 268Z" fill={COL[config.shoesColour]} stroke="#4d4957" strokeWidth="3"/>
  <path d="M60 285 Q75 290 91 285 M112 285 Q128 290 144 285" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="3"/>
</>:config.shoes==="ankle-boots"?<>
  <path d="M63 269 Q77 265 90 272 L92 290 Q82 297 56 292 Q52 286 58 280Z" fill={COL[config.shoesColour]} stroke="#4d4957" strokeWidth="3"/>
  <path d="M114 269 Q128 265 141 272 L147 290 Q137 297 111 292 Q107 286 113 280Z" fill={COL[config.shoesColour]} stroke="#4d4957" strokeWidth="3"/>
  <path d="M62 279 H89 M114 279 H142" stroke="#fff" strokeOpacity=".35" strokeWidth="2.5"/>
</>:<>
  <g>
    <path d="M57 281 Q66 273 79 274 Q89 275 96 283 L94 291 Q83 297 56 294 Q51 289 57 281Z" fill={COL[config.shoesColour]} stroke="#4d4957" strokeWidth="3"/>
    <path d="M111 281 Q120 273 133 274 Q143 275 150 283 L148 291 Q137 297 110 294 Q105 289 111 281Z" fill={COL[config.shoesColour]} stroke="#4d4957" strokeWidth="3"/>
    <path d="M56 289 Q75 294 94 289 M110 289 Q129 294 148 289" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
    <path d="M66 281 L84 285 M121 281 L139 285" stroke={config.shoesColour==="white"?"#8d8993":"#fff"} strokeOpacity=".85" strokeWidth="2"/>
    {config.shoes==="skate-shoes"?<><path d="M61 276 Q75 270 90 278" fill="none" stroke="#34313b" strokeWidth="3"/><path d="M116 276 Q130 270 145 278" fill="none" stroke="#34313b" strokeWidth="3"/></>:null}
  </g>
</>}
{config.bag==="handbag"?<><path d="M145 154 Q166 135 177 157" fill="none" stroke={COL[config.bagColour]} strokeWidth="5"/><rect x="148" y="155" width="35" height="32" rx="8" fill={COL[config.bagColour]}/></>:null}
{config.bag==="backpack"?<rect x="56" y="129" width="27" height="58" rx="12" fill={COL[config.bagColour]}/>:null}
{config.activityItem==="skateboard"?<g transform="rotate(-4 171 242)">
  <path d="M163 186 Q168 180 176 184 Q182 188 181 198 L183 279 Q184 289 176 296 Q168 301 160 296 Q154 291 155 281 L153 199 Q152 191 163 186Z" fill={item} stroke="#4d4957" strokeWidth="3"/>
  <path d="M160 194 Q168 190 176 194 M160 286 Q169 291 179 285" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="2.5"/>
  <rect x="151" y="213" width="32" height="5" rx="2.5" fill="#77727d"/>
  <rect x="154" y="267" width="32" height="5" rx="2.5" fill="#77727d"/>
  <circle cx="154" cy="220" r="5.5" fill="#34313b"/><circle cx="181" cy="220" r="5.5" fill="#34313b"/>
  <circle cx="157" cy="275" r="5.5" fill="#34313b"/><circle cx="184" cy="275" r="5.5" fill="#34313b"/>
  <path d="M153 207 Q158 200 166 204" fill="none" stroke={skin} strokeWidth="11" strokeLinecap="round"/>
</g>:null}
{config.activityItem==="australian-football"?<g transform="rotate(-18 166 214)"><ellipse cx="166" cy="214" rx="23" ry="14" fill={item} stroke="#5c4540" strokeWidth="3"/><path d="M155 214 H177 M164 208 V220 M168 208 V220" stroke="#f7f2e9" strokeWidth="2"/></g>:null}
{config.activityItem==="soccer-ball"?<g><circle cx="166" cy="214" r="20" fill="#f7f5f0" stroke="#4a4852" strokeWidth="3"/><path d="M158 206 l8-6 9 7-3 10-11 1-6-8Z" fill={config.activityColour==="white"?"#34313b":item}/></g>:null}
{config.activityItem==="netball"?<g><circle cx="166" cy="214" r="20" fill={item} stroke="#63606a" strokeWidth="3"/><path d="M148 210 Q166 200 184 210 M151 222 Q166 213 181 222 M166 194 V234" fill="none" stroke="#8d8993" strokeWidth="2"/></g>:null}
{config.activityItem==="surfboard"?<g transform="rotate(-8 170 236)"><ellipse cx="170" cy="236" rx="14" ry="67" fill={item} stroke="#514d59" strokeWidth="3"/><path d="M170 174 V298" stroke="#fff" strokeOpacity=".55" strokeWidth="3"/></g>:null}
{config.activityItem==="book"?<g transform="rotate(-8 165 214)"><rect x="148" y="194" width="35" height="43" rx="4" fill={item} stroke="#62556a" strokeWidth="3"/><path d="M165 196 V235" stroke="#fff" strokeWidth="2"/></g>:null}
{config.activityItem==="art-set"?<g><ellipse cx="165" cy="215" rx="24" ry="19" fill={item} stroke="#66554a" strokeWidth="3"/><circle cx="155" cy="207" r="4" fill="#e25d5d"/><circle cx="166" cy="204" r="4" fill="#5d8ed7"/><circle cx="176" cy="211" r="4" fill="#e3bd4e"/><path d="M143 231 L184 181" stroke="#79543a" strokeWidth="4"/></g>:null}
{config.activityItem==="telescope"?<g transform="rotate(-33 162 207)"><rect x="145" y="198" width="62" height="15" rx="7" fill={item} stroke="#3f4a61" strokeWidth="3"/><rect x="199" y="195" width="15" height="21" rx="5" fill="#d7b35a"/></g>:null}
{config.activityItem==="scooter"?<g><path d="M17 291 H88" stroke={item} strokeWidth="9" strokeLinecap="round"/><circle cx="28" cy="307" r="10" fill="#353845"/><circle cx="82" cy="307" r="10" fill="#353845"/><path d="M78 291 L78 213 Q78 202 90 202 H102" fill="none" stroke={item} strokeWidth="7" strokeLinecap="round"/></g>:null}
</g>
{config.pet!=="none"?<Pet type={config.pet} head={config.petHeadAccessory} headColour={config.petHeadColour} neck={config.petNeckAccessory} neckColour={config.petNeckColour}/>:null}
</svg>}
function Pet({type,head,headColour,neck,neckColour}:{type:"cat"|"dog";head:"none"|"bow";headColour:RewardColour;neck:"none"|"collar";neckColour:RewardColour}){
 const fur=type==="cat"?"#d9a06d":"#b9875f",dark=type==="cat"?"#8f6243":"#7a523e",cream="#f4d3ad";
 return <g transform="translate(225 224)">
  <ellipse cx="48" cy="91" rx="39" ry="9" fill="#ded8ea" opacity=".65"/>
  {type==="cat"?<>
    <path d="M17 78 Q6 66 13 49 Q18 38 29 42" fill="none" stroke={dark} strokeWidth="7" strokeLinecap="round"/>
    <ellipse cx="47" cy="69" rx="32" ry="28" fill={fur} stroke={dark} strokeWidth="3"/>
    <circle cx="47" cy="34" r="26" fill={fur} stroke={dark} strokeWidth="3"/>
    <path d="M27 18 L31 -5 L43 12Z M67 18 L63 -5 L51 12Z" fill={fur} stroke={dark} strokeWidth="3" strokeLinejoin="round"/>
    <path d="M31 7 L33 -1 L39 11 M63 7 L61 -1 L55 11" fill="#efa5a5" opacity=".75"/>
    <ellipse cx="47" cy="44" rx="12" ry="9" fill={cream}/>
    <circle cx="38" cy="32" r="3.5" fill="#2f2b2b"/><circle cx="56" cy="32" r="3.5" fill="#2f2b2b"/>
    <path d="M43 41 Q47 45 51 41 Q47 48 43 41Z" fill="#7b4949"/>
    <path d="M31 43 H18 M32 48 L19 52 M63 43 H76 M62 48 L75 52" stroke={dark} strokeWidth="1.8" strokeLinecap="round"/>
    <path d="M25 81 Q29 91 36 89 M58 89 Q65 91 69 81" fill="none" stroke={dark} strokeWidth="3" strokeLinecap="round"/>
  </>:<>
    <ellipse cx="47" cy="70" rx="34" ry="29" fill={fur} stroke={dark} strokeWidth="3"/>
    <circle cx="47" cy="34" r="27" fill={fur} stroke={dark} strokeWidth="3"/>
    <ellipse cx="22" cy="31" rx="10" ry="21" fill={dark}/><ellipse cx="72" cy="31" rx="10" ry="21" fill={dark}/>
    <ellipse cx="47" cy="45" rx="14" ry="11" fill={cream}/>
    <circle cx="38" cy="31" r="3.5" fill="#2f2b2b"/><circle cx="56" cy="31" r="3.5" fill="#2f2b2b"/>
    <circle cx="47" cy="42" r="4.5" fill="#2f2b2b"/><path d="M43 49 Q47 54 51 49" fill="none" stroke="#7b4949" strokeWidth="2"/>
    <path d="M17 76 Q4 70 6 58" fill="none" stroke={dark} strokeWidth="7" strokeLinecap="round"/>
    <path d="M25 84 Q29 92 36 89 M58 89 Q65 92 69 84" fill="none" stroke={dark} strokeWidth="3" strokeLinecap="round"/>
  </>}
  {neck==="collar"?<><path d="M23 54 Q47 62 71 54" fill="none" stroke={COL[neckColour]} strokeWidth="7"/><circle cx="47" cy="59" r="4" fill="#e2b63f"/></>:null}
  {head==="bow"?<g transform="translate(47 11)"><path d="M0 2 Q-18 -9 -18 7 Q-16 18 0 10Z" fill={COL[headColour]}/><path d="M0 2 Q18 -9 18 7 Q16 18 0 10Z" fill={COL[headColour]}/><circle cx="0" cy="7" r="6" fill={COL[headColour]}/></g>:null}
 </g>
}
