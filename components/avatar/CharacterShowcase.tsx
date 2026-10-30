import type { AvatarConfig, RewardColour } from "@/content/avatar";

const SKIN = {light:"#f7d7bd",warm:"#efc29d",tan:"#d69a6b",brown:"#9b6547",deep:"#68412f"};
const HAIR = {brown:"#5a3828",black:"#29252a",blonde:"#d6aa55",red:"#9c4d2f"};
const EYES = {brown:"#5c3824",blue:"#3e77a8",green:"#4f7b58",dark:"#29252a"};
const COL:Record<RewardColour,string> = {
  pink:"#f16d98",blue:"#6397df",red:"#d85b61",green:"#5ca66b",yellow:"#e6bf3c",
  black:"#34313b",white:"#f7f5f0",purple:"#8a76dd",orange:"#df8846",teal:"#4ea6a2",gold:"#e2b63f"
};

type HeldPose = "neutral"|"cradle"|"book"|"side"|"scooter";

function heldPose(item:AvatarConfig["activityItem"]):HeldPose {
  if(item==="australian-football"||item==="soccer-ball"||item==="netball") return "cradle";
  if(item==="book"||item==="art-set") return "book";
  if(item==="scooter") return "scooter";
  if(item==="skateboard"||item==="surfboard"||item==="telescope") return "side";
  return "neutral";
}

function Pattern({kind,x,y,w,h}:{kind:AvatarConfig["bottomPattern"];x:number;y:number;w:number;h:number}) {
  if(kind==="plain") return null;
  if(kind==="stripes") return <>
    {[0,1,2,3].map(i=><path key={i} d={"M"+(x+i*w/4)+" "+y+" l"+(w/5)+" "+h} stroke="#fff" strokeOpacity=".42" strokeWidth="3"/>)}
  </>;
  if(kind==="spots") return <>
    {[[.2,.25],[.65,.2],[.42,.62],[.8,.72]].map(([a,b],i)=><circle key={i} cx={x+w*a} cy={y+h*b} r="4" fill="#fff" fillOpacity=".58"/>)}
  </>;
  return <>
    {[[.25,.3],[.68,.25],[.48,.68]].map(([a,b],i)=><text key={i} x={x+w*a} y={y+h*b} fontSize="13" fill="#fff" textAnchor="middle">★</text>)}
  </>;
}

function HairBack({config}:{config:AvatarConfig}) {
  const hair=HAIR[config.hairColour];
  if(config.hair==="long") return <path d="M56 67 Q56 16 102 16 Q150 16 150 69 L145 157 Q128 139 124 105 H80 Q74 139 59 157Z" fill={hair}/>;
  if(config.hair==="bob") return <path d="M55 78 Q55 18 102 18 Q150 18 150 79 L142 112 Q134 59 102 47 Q70 58 62 112Z" fill={hair}/>;
  return null;
}

function Head({config}:{config:AvatarConfig}) {
  const skin=SKIN[config.skin], hair=HAIR[config.hairColour], accent=COL[config.hairAccessoryColour];
  return <>
    <ellipse cx="102" cy="70" rx={config.face==="round"?45:41} ry={config.face==="round"?47:50} fill={skin}/>
    {config.hair==="short"?<path d="M59 59 Q66 20 102 21 Q141 22 146 59 Q126 41 102 43 Q78 40 59 59Z" fill={hair}/>:null}
    {config.hair==="bob"?<path d="M63 54 Q74 27 102 28 Q132 27 143 54 Q123 42 102 45 Q82 42 63 54Z" fill={hair}/>:null}
    {config.hair==="long"?<path d="M62 55 Q72 24 102 26 Q134 24 144 55 Q123 41 102 44 Q81 41 62 55Z" fill={hair}/>:null}
    {config.hair==="curls"?<>
      {[68,84,102,120,136].map((x,i)=><circle key={x} cx={x} cy={i%2?30:37} r="16" fill={hair}/>)}
      <circle cx="61" cy="54" r="15" fill={hair}/><circle cx="143" cy="54" r="15" fill={hair}/>
    </>:null}
    {config.hair==="topknot"?<><circle cx="102" cy="13" r="19" fill={hair}/><path d="M61 57 Q70 24 102 27 Q136 24 145 57 Q124 41 102 44 Q80 41 61 57Z" fill={hair}/></>:null}

    {config.headwear==="headband"?<path d="M61 52 Q102 27 145 52" fill="none" stroke={COL[config.headwearColour]} strokeWidth="9" strokeLinecap="round"/>:null}
    {config.headwear==="headscarf"?<path d="M58 52 Q72 20 103 20 Q134 20 147 53 Q126 43 103 44 Q79 42 58 52Z" fill={COL[config.headwearColour]} opacity=".96"/>:null}

    <circle cx="85" cy="70" r="4.5" fill={EYES[config.eyes]}/><circle cx="119" cy="70" r="4.5" fill={EYES[config.eyes]}/>
    <path d="M89 87 Q102 98 115 87" stroke="#a34f54" strokeWidth="4" fill="none" strokeLinecap="round"/>

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
  </>;
}

function BackEquipment({config}:{config:AvatarConfig}) {
  if(config.bag!=="backpack") return null;
  const c=COL[config.bagColour];
  return <g>
    <path d="M70 137 Q57 144 55 164 L57 208 Q67 218 82 211 L83 147 Q79 138 70 137Z" fill={c} stroke="#4f4b58" strokeWidth="3"/>
    <path d="M60 158 H79 M60 181 H79" stroke="#fff" strokeOpacity=".35" strokeWidth="2.5"/>
    <rect x="62" y="186" width="14" height="17" rx="4" fill="#fff" fillOpacity=".18"/>
  </g>;
}

function TorsoAndLegs({config}:{config:AvatarConfig}) {
  const skin=SKIN[config.skin];
  return <>
    <rect x="92" y="111" width="20" height="17" rx="8" fill={skin}/>
    {config.outfit==="dress"?<>
      <path d="M73 128 Q102 113 131 128 L130 181 Q102 190 74 181Z" fill={COL[config.outfitColour]} stroke="#5a5669" strokeWidth="2.5"/>
      <path d="M79 128 Q102 142 125 128" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="3"/>
      <path d="M77 174 Q102 182 127 174 L145 239 Q129 251 102 251 Q75 251 59 239Z" fill={COL[config.outfitColour]} stroke="#5a5669" strokeWidth="2.5"/>
      <path d="M77 178 Q102 187 127 178" fill="none" stroke="#fff" strokeOpacity=".35" strokeWidth="2"/>
      <path d="M79 184 L69 237 M94 185 L88 246 M110 185 L116 246 M125 184 L136 237" stroke="#fff" strokeOpacity=".24" strokeWidth="2.5"/>
      <Pattern kind={config.outfitPattern} x={67} y={184} w={70} h={50}/>
    </>:<>
      <path d="M73 128 Q102 113 131 128 L126 194 Q102 203 78 194Z" fill={COL[config.topColour]} stroke="#5a5669" strokeWidth="2.5"/>
      {config.top==="jumper"?<><path d="M78 149 H126" stroke="#fff" strokeOpacity=".24" strokeWidth="3"/><path d="M84 166 H120" stroke="#fff" strokeOpacity=".18" strokeWidth="2"/></>:null}
      {config.bottom==="skirt"?<>
        <path d="M77 190 Q102 197 127 190 L138 232 Q122 241 102 241 Q82 241 66 232Z" fill={COL[config.bottomColour]} stroke="#5a5669" strokeWidth="2.5"/>
        <path d="M82 194 L76 228 M95 195 L92 235 M109 195 L112 235 M122 194 L128 228" stroke="#fff" strokeOpacity=".22" strokeWidth="2"/>
        <Pattern kind={config.bottomPattern} x={70} y={196} w={64} h={32}/>
      </>:null}
      {config.bottom==="shorts"?<>
        <path d="M74 190 H130 L127 229 Q117 233 107 229 L102 209 L97 229 Q87 233 77 229Z" fill={COL[config.bottomColour]} stroke="#5a5669" strokeWidth="2.5"/>
        <Pattern kind={config.bottomPattern} x={79} y={195} w={46} h={28}/>
      </>:null}
      {config.bottom==="trousers"?<>
        <path d="M76 190 H128 L123 279 H106 L102 218 L98 279 H81Z" fill={COL[config.bottomColour]} stroke="#5a5669" strokeWidth="2.5"/>
        <path d="M102 198 V219" stroke="#fff" strokeOpacity=".25" strokeWidth="2"/>
        <Pattern kind={config.bottomPattern} x={82} y={196} w={40} h={72}/>
      </>:null}
    </>}
    {config.bottom!=="trousers"||config.outfit==="dress"?<>
      <path d="M83 231 Q82 257 80 282" stroke={skin} strokeWidth="17" fill="none" strokeLinecap="round"/>
      <path d="M121 231 Q122 257 124 282" stroke={skin} strokeWidth="17" fill="none" strokeLinecap="round"/>
    </>:null}
    <Shoes config={config}/>
  </>;
}

function Shoes({config}:{config:AvatarConfig}) {
  const c=COL[config.shoesColour];
  if(config.shoes==="long-boots") return <>
    <path d="M66 247 Q78 243 90 249 L91 289 Q80 296 57 292 Q53 286 59 280 L64 268Z" fill={c} stroke="#4d4957" strokeWidth="3"/>
    <path d="M114 247 Q126 243 138 249 L145 289 Q134 296 111 292 Q107 286 113 280 L112 268Z" fill={c} stroke="#4d4957" strokeWidth="3"/>
    <path d="M60 285 Q75 290 91 285 M112 285 Q128 290 144 285" fill="none" stroke="#fff" strokeOpacity=".45" strokeWidth="3"/>
  </>;
  if(config.shoes==="ankle-boots") return <>
    <path d="M63 269 Q77 265 90 272 L92 290 Q82 297 56 292 Q52 286 58 280Z" fill={c} stroke="#4d4957" strokeWidth="3"/>
    <path d="M114 269 Q128 265 141 272 L147 290 Q137 297 111 292 Q107 286 113 280Z" fill={c} stroke="#4d4957" strokeWidth="3"/>
    <path d="M62 279 H89 M114 279 H142" stroke="#fff" strokeOpacity=".35" strokeWidth="2.5"/>
  </>;
  return <g>
    <path d="M57 281 Q66 273 79 274 Q89 275 96 283 L94 291 Q83 297 56 294 Q51 289 57 281Z" fill={c} stroke="#4d4957" strokeWidth="3"/>
    <path d="M111 281 Q120 273 133 274 Q143 275 150 283 L148 291 Q137 297 110 294 Q105 289 111 281Z" fill={c} stroke="#4d4957" strokeWidth="3"/>
    <path d="M56 289 Q75 294 94 289 M110 289 Q129 294 148 289" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round"/>
    <path d="M66 281 L84 285 M121 281 L139 285" stroke={config.shoesColour==="white"?"#8d8993":"#fff"} strokeOpacity=".85" strokeWidth="2"/>
    {config.shoes==="skate-shoes"?<><path d="M61 276 Q75 270 90 278" fill="none" stroke="#34313b" strokeWidth="3"/><path d="M116 276 Q130 270 145 278" fill="none" stroke="#34313b" strokeWidth="3"/></>:null}
  </g>;
}

function PoseArms({config}:{config:AvatarConfig}) {
  const skin=SKIN[config.skin], pose=heldPose(config.activityItem);
  if(pose==="cradle") return <>
    <path d="M77 139 Q61 151 62 174 Q72 188 91 192" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
    <path d="M128 139 Q145 150 141 174 Q132 188 113 193" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
  </>;
  if(pose==="book") return <>
    <path d="M76 140 Q61 153 66 178 Q77 190 93 190" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
    <path d="M129 140 Q144 153 138 181 Q128 195 111 196" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
  </>;
  if(pose==="side") return <>
    <path d="M75 138 Q57 151 51 177 Q48 193 56 202" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
    <path d="M130 139 Q149 151 157 178 Q163 199 160 218" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
  </>;
  if(pose==="scooter") return <>
    <path d="M75 138 Q59 151 55 175 Q58 187 69 191" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
    <path d="M130 139 Q150 149 164 166 Q174 178 177 190" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
  </>;
  return <>
    <path d="M75 137 Q56 150 50 177 Q47 194 55 203" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
    <path d="M129 137 Q148 150 154 177 Q157 194 149 203" stroke={skin} strokeWidth="15" fill="none" strokeLinecap="round"/>
  </>;
}

function HeldItem({config}:{config:AvatarConfig}) {
  const item=COL[config.activityColour], skin=SKIN[config.skin];
  if(config.activityItem==="none") return null;
  if(config.activityItem==="australian-football") return <g>
    <g transform="rotate(-11 102 188)"><ellipse cx="102" cy="188" rx="28" ry="17" fill={item} stroke="#5c4540" strokeWidth="3"/><path d="M88 188 H116 M99 181 V195 M105 181 V195" stroke="#f7f2e9" strokeWidth="2.2"/></g>
    <circle cx="82" cy="190" r="8" fill={skin}/><circle cx="121" cy="193" r="8" fill={skin}/>
  </g>;
  if(config.activityItem==="soccer-ball") return <g>
    <circle cx="103" cy="190" r="23" fill="#f7f5f0" stroke="#4a4852" strokeWidth="3"/>
    <path d="M95 181 l8-7 10 8-4 11-12 1-6-9Z" fill={config.activityColour==="white"?"#34313b":item}/>
    <circle cx="81" cy="190" r="8" fill={skin}/><circle cx="124" cy="192" r="8" fill={skin}/>
  </g>;
  if(config.activityItem==="netball") return <g>
    <circle cx="103" cy="190" r="23" fill={item} stroke="#63606a" strokeWidth="3"/>
    <path d="M82 185 Q103 174 124 185 M85 199 Q103 188 121 199 M103 168 V212" fill="none" stroke="#8d8993" strokeWidth="2"/>
    <circle cx="81" cy="190" r="8" fill={skin}/><circle cx="124" cy="192" r="8" fill={skin}/>
  </g>;
  if(config.activityItem==="book") return <g transform="rotate(-5 103 188)">
    <path d="M77 165 Q91 160 103 168 V211 Q91 203 77 207Z" fill={item} stroke="#62556a" strokeWidth="3"/>
    <path d="M103 168 Q116 160 130 165 V207 Q116 203 103 211Z" fill={item} stroke="#62556a" strokeWidth="3"/>
    <path d="M103 169 V210" stroke="#fff" strokeOpacity=".6" strokeWidth="2"/>
    <circle cx="84" cy="198" r="7" fill={skin}/><circle cx="121" cy="198" r="7" fill={skin}/>
  </g>;
  if(config.activityItem==="art-set") return <g>
    <ellipse cx="103" cy="191" rx="28" ry="21" fill={item} stroke="#66554a" strokeWidth="3"/>
    <circle cx="91" cy="183" r="4" fill="#e25d5d"/><circle cx="103" cy="179" r="4" fill="#5d8ed7"/><circle cx="116" cy="186" r="4" fill="#e3bd4e"/>
    <path d="M81 211 L130 158" stroke="#79543a" strokeWidth="4"/>
    <circle cx="85" cy="197" r="7" fill={skin}/><circle cx="119" cy="198" r="7" fill={skin}/>
  </g>;
  if(config.activityItem==="skateboard") return <g transform="rotate(-3 166 239)">
    <path d="M158 184 Q165 178 173 183 Q180 188 179 199 L182 280 Q182 291 174 298 Q166 302 158 296 Q153 291 154 281 L151 200 Q151 191 158 184Z" fill={item} stroke="#4d4957" strokeWidth="3"/>
    <rect x="150" y="213" width="31" height="5" rx="2.5" fill="#77727d"/><rect x="154" y="267" width="31" height="5" rx="2.5" fill="#77727d"/>
    <circle cx="153" cy="220" r="5.5" fill="#34313b"/><circle cx="179" cy="220" r="5.5" fill="#34313b"/><circle cx="157" cy="275" r="5.5" fill="#34313b"/><circle cx="183" cy="275" r="5.5" fill="#34313b"/>
    <circle cx="159" cy="217" r="8" fill={skin}/>
  </g>;
  if(config.activityItem==="surfboard") return <g transform="rotate(-7 171 238)">
    <path d="M171 168 Q187 193 186 239 Q185 283 171 306 Q156 282 156 239 Q156 193 171 168Z" fill={item} stroke="#514d59" strokeWidth="3"/>
    <path d="M171 176 V298" stroke="#fff" strokeOpacity=".55" strokeWidth="3"/>
    <circle cx="160" cy="216" r="8" fill={skin}/>
  </g>;
  if(config.activityItem==="telescope") return <g transform="rotate(-28 167 207)">
    <rect x="143" y="199" width="65" height="16" rx="8" fill={item} stroke="#3f4a61" strokeWidth="3"/>
    <rect x="201" y="196" width="15" height="22" rx="5" fill="#d7b35a"/>
    <circle cx="156" cy="210" r="8" fill={skin}/>
  </g>;
  if(config.activityItem==="scooter") return <g>
    <path d="M17 291 H88" stroke={item} strokeWidth="9" strokeLinecap="round"/><circle cx="28" cy="307" r="10" fill="#353845"/><circle cx="82" cy="307" r="10" fill="#353845"/>
    <path d="M78 291 L78 211 Q78 199 90 199 H108" fill="none" stroke={item} strokeWidth="7" strokeLinecap="round"/>
    <circle cx="91" cy="199" r="8" fill={skin}/>
  </g>;
  return null;
}

function FrontEquipment({config}:{config:AvatarConfig}) {
  if(config.bag==="handbag") return <>
    <path d="M145 154 Q166 135 177 157" fill="none" stroke={COL[config.bagColour]} strokeWidth="5"/>
    <path d="M149 156 H181 L184 185 Q166 191 148 185Z" fill={COL[config.bagColour]} stroke="#5a5669" strokeWidth="2.5"/>
  </>;
  if(config.bag==="backpack") return <>
    <path d="M78 133 Q93 151 101 177" fill="none" stroke={COL[config.bagColour]} strokeWidth="7" strokeLinecap="round"/>
    <path d="M78 133 Q67 155 66 189" fill="none" stroke="#4f4b58" strokeOpacity=".45" strokeWidth="2"/>
  </>;
  return null;
}

function Pet({config}:{config:AvatarConfig}) {
  if(config.pet==="none") return null;
  const isDog=config.pet==="dog", fur=isDog?"#b9875f":"#d9a06d", dark=isDog?"#7a523e":"#8f6243", cream="#f4d3ad";
  const collar=config.petNeckAccessory==="collar"?COL[config.petNeckColour]:null;
  return <g transform={isDog?"translate(220 248)":"translate(228 224)"}>
    <ellipse cx="49" cy="72" rx={isDog?49:39} ry="8" fill="#ded8ea" opacity=".65"/>
    {isDog?<>
      <path d="M29 39 Q53 25 79 38 Q87 44 91 58 L86 68 H28 Q18 58 20 48Z" fill={fur} stroke={dark} strokeWidth="3"/>
      <circle cx="23" cy="39" r="21" fill={fur} stroke={dark} strokeWidth="3"/>
      <ellipse cx="10" cy="34" rx="8" ry="16" fill={dark}/><ellipse cx="36" cy="34" rx="8" ry="16" fill={dark}/>
      <ellipse cx="19" cy="47" rx="11" ry="8" fill={cream}/><circle cx="18" cy="44" r="4" fill="#2f2b2b"/>
      <circle cx="15" cy="34" r="3" fill="#2f2b2b"/><circle cx="28" cy="34" r="3" fill="#2f2b2b"/>
      <path d="M41 57 L37 77 M58 59 L58 78 M74 57 L79 77 M30 58 L25 77" stroke={dark} strokeWidth="7" strokeLinecap="round"/>
      <path d="M88 47 Q105 37 103 23" fill="none" stroke={dark} strokeWidth="7" strokeLinecap="round"/>
      {collar?<><path d="M8 52 Q22 57 38 51" fill="none" stroke={collar} strokeWidth="6"/><circle cx="25" cy="57" r="4" fill="#e2b63f"/></>:null}
      {config.petHeadAccessory==="bow"?<g transform="translate(23 18)"><path d="M0 2 Q-15 -8 -15 6 Q-14 16 0 9Z" fill={COL[config.petHeadColour]}/><path d="M0 2 Q15 -8 15 6 Q14 16 0 9Z" fill={COL[config.petHeadColour]}/><circle cx="0" cy="7" r="5" fill={COL[config.petHeadColour]}/></g>:null}
    </>:<>
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
      {collar?<><path d="M23 54 Q47 62 71 54" fill="none" stroke={collar} strokeWidth="7"/><circle cx="47" cy="59" r="4" fill="#e2b63f"/></>:null}
      {config.petHeadAccessory==="bow"?<g transform="translate(47 11)"><path d="M0 2 Q-18 -9 -18 7 Q-16 18 0 10Z" fill={COL[config.petHeadColour]}/><path d="M0 2 Q18 -9 18 7 Q16 18 0 10Z" fill={COL[config.petHeadColour]}/><circle cx="0" cy="7" r="6" fill={COL[config.petHeadColour]}/></g>:null}
    </>}
  </g>;
}

export function CharacterShowcase({config}:{config:AvatarConfig}) {
  return <svg className="characterShowcase" viewBox="0 0 340 350" role="img" aria-label="Full body learner with rewards">
    <ellipse cx="145" cy="326" rx="102" ry="12" fill="#ebe7f5"/>
    <g transform="translate(38 8)">
      <BackEquipment config={config}/>
      <HairBack config={config}/>
      <TorsoAndLegs config={config}/>
      <PoseArms config={config}/>
      <HeldItem config={config}/>
      <FrontEquipment config={config}/>
      <Head config={config}/>
    </g>
    <Pet config={config}/>
  </svg>;
}
