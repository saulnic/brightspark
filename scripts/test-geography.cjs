const fs=require("node:fs");
const assert=require("node:assert/strict");
const source=fs.readFileSync("content/geography-curriculum.ts","utf8");
const units=JSON.parse(source.slice(source.indexOf("=[")+1).replace(/;\s*$/,""));
assert.equal(units.length,32,"Expected 32 additional units");
const ids=new Set();
for(const unit of units){
 assert(!ids.has(unit.id),"Duplicate unit "+unit.id);ids.add(unit.id);
 assert(unit.title&&unit.chapter&&unit.icon,"Missing metadata: "+unit.id);
 assert(unit.facts.length>=5,"Too few teaching facts: "+unit.id);
 assert(unit.pairs.length>=4,"Too few quiz questions: "+unit.id);
 const answers=[...new Set(unit.pairs.map(p=>p.answer))];
 assert(answers.length>=3,"Insufficient distractors: "+unit.id);
 for(const pair of unit.pairs)assert(pair.answer&&pair.clue,"Incomplete question: "+unit.id);
}
console.log("Geography curriculum checks passed:",units.length,"units,",units.reduce((n,u)=>n+u.pairs.length,0),"questions");
