import type{AvatarConfig}from"@/content/avatar";
export type Reward={id:string;name:string;description:string;icon:string;stars:number|null;category:"hair"|"eyewear"|"bag"|"clothing"|"pet"|"pet_accessory"|"item";equip?:Partial<AvatarConfig>};
export const REWARDS:Reward[]=[
{id:"pink-bow",name:"Pink bow",description:"A bright pink hair bow.",icon:"🎀",stars:10,category:"hair",equip:{hairAccessory:"bow",hairAccessoryColour:"pink"}},
{id:"blue-clip",name:"Blue hair clip",description:"A blue clip for your hair.",icon:"🔹",stars:20,category:"hair",equip:{hairAccessory:"hairclip",hairAccessoryColour:"blue"}},
{id:"cat",name:"Cat",description:"A little cat companion.",icon:"🐱",stars:30,category:"pet",equip:{pet:"cat"}},
{id:"skateboard",name:"Skateboard",description:"Carry your skateboard ready for a skate.",icon:"🛹",stars:35,category:"item",equip:{activityItem:"skateboard"}},
{id:"red-bow",name:"Red bow",description:"A red hair bow.",icon:"🎀",stars:45,category:"hair",equip:{hairAccessory:"bow",hairAccessoryColour:"red"}},
{id:"backpack",name:"Adventure backpack",description:"A backpack for exploring.",icon:"🎒",stars:50,category:"bag",equip:{bag:"backpack"}},
{id:"dog",name:"Dog",description:"A friendly dog companion.",icon:"🐶",stars:60,category:"pet",equip:{pet:"dog"}},
{id:"football",name:"Football",description:"Carry a football with your avatar.",icon:"⚽",stars:70,category:"item",equip:{activityItem:"football"}},
{id:"gold-clip",name:"Gold hair clip",description:"A shiny gold hair clip.",icon:"✨",stars:75,category:"hair",equip:{hairAccessory:"hairclip",hairAccessoryColour:"gold"}},
{id:"book",name:"Favourite book",description:"Carry a favourite book.",icon:"📚",stars:85,category:"item",equip:{activityItem:"book"}},
{id:"pet-bow",name:"Pet bow",description:"A bow that sits between your pet's ears.",icon:"🎀",stars:90,category:"pet_accessory",equip:{petHeadAccessory:"bow"}},
{id:"jumper",name:"Comfy jumper",description:"A comfy jumper for your avatar.",icon:"🧥",stars:105,category:"clothing",equip:{top:"jumper"}},
{id:"headphones",name:"Headphones",description:"Wear headphones with your avatar.",icon:"🎧",stars:115,category:"item",equip:{activityItem:"headphones"}},
{id:"blue-collar",name:"Blue collar",description:"A blue collar for your pet.",icon:"🔵",stars:120,category:"pet_accessory",equip:{petNeckAccessory:"collar"}},
{id:"glasses",name:"Glasses",description:"A pair of smart-looking glasses.",icon:"👓",stars:130,category:"eyewear",equip:{eyewear:"glasses"}},
{id:"handbag",name:"Handbag",description:"A handbag to carry with your outfit.",icon:"👜",stars:135,category:"bag",equip:{bag:"handbag"}},
{id:"art-set",name:"Art set",description:"Carry an artist palette and brush.",icon:"🎨",stars:145,category:"item",equip:{activityItem:"art-set"}},
{id:"pink-skirt",name:"Pink skirt",description:"A skirt for your full-body look.",icon:"👗",stars:150,category:"clothing",equip:{bottom:"skirt"}},
{id:"trousers",name:"Adventure trousers",description:"Practical trousers for your avatar.",icon:"👖",stars:160,category:"clothing",equip:{bottom:"trousers"}},
{id:"boots",name:"Boots",description:"A pair of adventure boots.",icon:"🥾",stars:170,category:"clothing",equip:{shoes:"boots"}},
{id:"telescope",name:"Telescope",description:"Carry a telescope for exploring the sky.",icon:"🔭",stars:190,category:"item",equip:{activityItem:"telescope"}},
{id:"scooter",name:"Scooter",description:"Stand beside a scooter ready to ride.",icon:"🛴",stars:215,category:"item",equip:{activityItem:"scooter"}},
{id:"sunglasses",name:"Bonus sunglasses",description:"Earn these by taking on a learning topic you've been skipping.",icon:"🕶️",stars:null,category:"eyewear",equip:{eyewear:"sunglasses"}}
];
export function earnedStars(p:{stage:number;xp:number}[]){return p.reduce((s,x)=>s+(Math.max(1,x.stage)-1)*30+x.xp,0)}
export function isEquipped(c:AvatarConfig,r:Reward){if(!r.equip)return false;return Object.entries(r.equip).every(([k,v])=>c[k as keyof AvatarConfig]===v)}
