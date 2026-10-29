import type{AvatarConfig}from"@/content/avatar";export type Reward={id:string;name:string;description:string;icon:string;stars:number|null;category:"hair"|"eyewear"|"bag"|"clothing"|"pet"|"pet_accessory";equip:Partial<AvatarConfig>};export const REWARDS:Reward[]=[
{id:"pink-bow",name:"Pink bow",description:"A bright pink hair bow.",icon:"🎀",stars:10,category:"hair",equip:{hairAccessory:"bow",hairAccessoryColour:"pink"}},
{id:"blue-clip",name:"Blue hair clip",description:"A blue clip for your hair.",icon:"🔹",stars:20,category:"hair",equip:{hairAccessory:"hairclip",hairAccessoryColour:"blue"}},
{id:"cat",name:"Cat",description:"A little cat companion.",icon:"🐱",stars:30,category:"pet",equip:{pet:"cat"}},
{id:"red-bow",name:"Red bow",description:"A red hair bow.",icon:"🎀",stars:45,category:"hair",equip:{hairAccessory:"bow",hairAccessoryColour:"red"}},
{id:"dog",name:"Dog",description:"A friendly dog companion.",icon:"🐶",stars:60,category:"pet",equip:{pet:"dog"}},
{id:"gold-clip",name:"Gold hair clip",description:"A shiny gold hair clip.",icon:"✨",stars:75,category:"hair",equip:{hairAccessory:"hairclip",hairAccessoryColour:"gold"}},
{id:"pet-bow",name:"Pet bow",description:"A bow that sits between your pet's ears.",icon:"🎀",stars:90,category:"pet_accessory",equip:{petHeadAccessory:"bow"}},
{id:"blue-collar",name:"Blue collar",description:"A blue collar for your pet.",icon:"🔵",stars:120,category:"pet_accessory",equip:{petNeckAccessory:"collar"}},
{id:"handbag",name:"Handbag",description:"A handbag to carry with your outfit.",icon:"👜",stars:135,category:"bag",equip:{bag:"handbag"}},
{id:"pink-skirt",name:"Pink skirt",description:"A skirt for your full-body look.",icon:"👗",stars:150,category:"clothing",equip:{bottom:"skirt"}},
{id:"boots",name:"Boots",description:"A pair of adventure boots.",icon:"🥾",stars:170,category:"clothing",equip:{shoes:"boots"}},
{id:"sunglasses",name:"Bonus sunglasses",description:"Earn these by taking on an avoided learning topic.",icon:"🕶️",stars:null,category:"eyewear",equip:{eyewear:"sunglasses"}}];
export function earnedStars(p:{stage:number;xp:number}[]){return p.reduce((s,x)=>s+(Math.max(1,x.stage)-1)*30+x.xp,0)}export function isEquipped(c:AvatarConfig,r:Reward){return Object.entries(r.equip).every(([k,v])=>c[k as keyof AvatarConfig]===v)}