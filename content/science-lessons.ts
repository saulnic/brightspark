import type { LearningQuestion, QuestionChoice } from "@/learning/types";

export type ScienceScene = "solar" | "volcano" | "dinosaur" | "habitat";

export type ScienceLesson = {
  id: string;
  skillId: string;
  stage: number;
  title: string;
  intro: string;
  facts: { id: string; text: string }[];
  scene: ScienceScene;
  questions: {
    factId: string;
    prompt: string;
    answer: string;
    distractors: string[];
    reviewPrompt?: string;
    visual?: { kind: "science_scene"; scene: ScienceScene; detail?: string };
  }[];
};

const LESSONS: Record<string, ScienceLesson[]> = {
  solar: [
    {
      id:"solar-1-meet", skillId:"solar", stage:1, title:"Meet our Solar System", scene:"solar",
      intro:"Our Solar System is the Sun and everything that travels around it.",
      facts:[
        {id:"sun",text:"The Sun is the star at the centre of our Solar System."},
        {id:"orbit",text:"To orbit means to travel around another object in space. The planets orbit the Sun, and the Moon orbits Earth."},
        {id:"eight",text:"Eight planets orbit the Sun."},
        {id:"earth",text:"Earth is the third planet from the Sun and is where we live."},
        {id:"mercury",text:"Mercury is the closest planet to the Sun."},
        {id:"pluto",text:"Pluto used to be called the ninth planet, but scientists now classify it as a dwarf planet."},
      ],
      questions:[
        {factId:"sun",prompt:"What is at the centre of our Solar System?",reviewPrompt:"If you drew the Solar System with the most important object in the middle, what would go there?",answer:"The Sun",distractors:["Earth","The Moon","Jupiter"],visual:{kind:"science_scene",scene:"solar",detail:"sun"}},
        {factId:"orbit",prompt:"What does orbit mean?",reviewPrompt:"Which description matches what the Moon does as it orbits Earth?",answer:"To travel around another object in space",distractors:["To stop moving","To shine like a star","To spin in one place"]},
        {factId:"eight",prompt:"How many planets orbit the Sun?",reviewPrompt:"How many planets would you count travelling around the Sun?",answer:"Eight",distractors:["Seven","Nine","Ten"]},
        {factId:"earth",prompt:"Which planet do we live on?",reviewPrompt:"Which planet is our home and is third from the Sun?",answer:"Earth",distractors:["Mars","Venus","Mercury"],visual:{kind:"science_scene",scene:"solar",detail:"earth"}},
        {factId:"mercury",prompt:"Which planet is closest to the Sun?",reviewPrompt:"Which planet has the shortest distance to the Sun?",answer:"Mercury",distractors:["Earth","Mars","Neptune"]},
        {factId:"pluto",prompt:"What is Pluto classified as today?",reviewPrompt:"Scientists no longer count Pluto as one of the eight planets. What do they call it?",answer:"A dwarf planet",distractors:["A star","A moon","A comet"]},
      ],
    },
    {
      id:"solar-2-motion", skillId:"solar", stage:2, title:"Earth, Moon and motion", scene:"solar",
      intro:"Earth and the Moon are always moving through space.",
      facts:[
        {id:"rotate",text:"Earth spins, or rotates, once about every 24 hours."},
        {id:"daynight",text:"Earth's rotation causes day and night."},
        {id:"moonorbit",text:"The Moon orbits Earth."},
        {id:"earthorbit",text:"Earth orbits the Sun."},
        {id:"year",text:"One trip by Earth around the Sun takes about one year."},
      ],
      questions:[
        {factId:"rotate",prompt:"What does Earth do about once every 24 hours?",answer:"It rotates once",distractors:["It stops moving","It orbits the Moon","It becomes a star"]},
        {factId:"daynight",prompt:"What causes day and night?",answer:"Earth's rotation",distractors:["Clouds moving","The Moon glowing","The Sun turning off"]},
        {factId:"moonorbit",prompt:"What does the Moon orbit?",answer:"Earth",distractors:["Mars","Jupiter","Pluto"]},
        {factId:"earthorbit",prompt:"What does Earth orbit?",answer:"The Sun",distractors:["The Moon","Mars","Neptune"]},
        {factId:"year",prompt:"About how long does Earth take to orbit the Sun once?",answer:"One year",distractors:["One day","One week","One hour"]},
      ],
    },
    {
      id:"solar-3-planets", skillId:"solar", stage:3, title:"Meet the planets", scene:"solar",
      intro:"The planets are different sizes and are found at different distances from the Sun.",
      facts:[
        {id:"inner",text:"Mercury, Venus, Earth and Mars are the four inner rocky planets."},
        {id:"mars",text:"Mars is often called the Red Planet."},
        {id:"jupiter",text:"Jupiter is the largest planet in our Solar System."},
        {id:"saturn",text:"Saturn is famous for its large ring system."},
        {id:"neptune",text:"Neptune is the farthest planet from the Sun."},
      ],
      questions:[
        {factId:"inner",prompt:"Which group contains only inner rocky planets?",answer:"Mercury, Venus, Earth and Mars",distractors:["Jupiter, Saturn, Uranus and Neptune","Earth, Jupiter, Saturn and Neptune","Mars, Jupiter, Uranus and Neptune"]},
        {factId:"mars",prompt:"Which planet is called the Red Planet?",answer:"Mars",distractors:["Venus","Saturn","Mercury"]},
        {factId:"jupiter",prompt:"Which is the largest planet?",answer:"Jupiter",distractors:["Earth","Mars","Mercury"]},
        {factId:"saturn",prompt:"Which planet is famous for its rings?",answer:"Saturn",distractors:["Mercury","Earth","Mars"]},
        {factId:"neptune",prompt:"Which planet is farthest from the Sun?",answer:"Neptune",distractors:["Mercury","Earth","Mars"]},
      ],
    },
  ],
  volcanoes: [
    {
      id:"volcano-1-basics", skillId:"volcanoes", stage:1, title:"Inside a volcano", scene:"volcano",
      intro:"Volcanoes are openings in Earth's crust where melted rock, gas and ash can escape.",
      facts:[
        {id:"magma",text:"Melted rock below Earth's surface is called magma."},
        {id:"lava",text:"When magma reaches Earth's surface, it is called lava."},
        {id:"vent",text:"A vent is an opening where magma and gas can escape."},
        {id:"crater",text:"A crater is the bowl-shaped opening near the top of many volcanoes."},
        {id:"eruption",text:"An eruption happens when lava, ash or gas comes out of a volcano."},
      ],
      questions:[
        {factId:"magma",prompt:"What is melted rock called while it is underground?",answer:"Magma",distractors:["Lava","Ash","Steam"],visual:{kind:"science_scene",scene:"volcano",detail:"magma"}},
        {factId:"lava",prompt:"What is magma called after it reaches the surface?",answer:"Lava",distractors:["Soil","Steam","Ash"]},
        {factId:"vent",prompt:"What is a volcanic vent?",answer:"An opening where magma and gas can escape",distractors:["A layer of cloud","A kind of rock","A river"]},
        {factId:"crater",prompt:"What is the bowl-shaped opening near the top of many volcanoes?",answer:"A crater",distractors:["An orbit","A fossil","A glacier"]},
        {factId:"eruption",prompt:"What is it called when lava, ash or gas comes out of a volcano?",answer:"An eruption",distractors:["An eclipse","An orbit","A fossil"]},
      ],
    },
    {
      id:"volcano-2-eruptions", skillId:"volcanoes", stage:2, title:"What comes out?", scene:"volcano",
      intro:"Volcanic eruptions can release more than just lava.",
      facts:[
        {id:"ash",text:"Tiny pieces of rock and glass can form volcanic ash."},
        {id:"gas",text:"Volcanoes can release gases from inside Earth."},
        {id:"cool",text:"Lava cools and can become solid volcanic rock."},
        {id:"danger",text:"Ash, hot gases and lava can all be dangerous near an eruption."},
        {id:"dormant",text:"A dormant volcano is not erupting now but may erupt again."},
      ],
      questions:[
        {factId:"ash",prompt:"What is volcanic ash made from?",answer:"Tiny pieces of rock and glass",distractors:["Only smoke","Snow","Sand from beaches"]},
        {factId:"gas",prompt:"What else can volcanoes release besides lava and ash?",answer:"Gas",distractors:["Moonlight","Tree roots","Icebergs"]},
        {factId:"cool",prompt:"What can lava become when it cools?",answer:"Solid rock",distractors:["Wood","Cloud","Liquid water"]},
        {factId:"danger",prompt:"Which can be dangerous during an eruption?",answer:"Ash, hot gases and lava",distractors:["Only rain","Only moonlight","Only cold air"]},
        {factId:"dormant",prompt:"What does dormant mean for a volcano?",answer:"It is quiet now but may erupt again",distractors:["It can never erupt again","It is underwater","It is made of ice"]},
      ],
    },
    {
      id:"volcano-3-plates", skillId:"volcanoes", stage:3, title:"Why volcanoes form", scene:"volcano",
      intro:"Earth's outer shell is broken into huge moving pieces called tectonic plates.",
      facts:[
        {id:"plates",text:"Tectonic plates are huge pieces of Earth's outer shell."},
        {id:"boundaries",text:"Many volcanoes form near the edges, or boundaries, of tectonic plates."},
        {id:"rise",text:"Magma can rise through cracks in Earth's crust."},
        {id:"pressure",text:"Gas pressure can help drive an eruption."},
        {id:"ring",text:"Many volcanoes around the Pacific Ocean form the Ring of Fire."},
      ],
      questions:[
        {factId:"plates",prompt:"What are tectonic plates?",answer:"Huge pieces of Earth's outer shell",distractors:["Cloud layers","Ocean currents","Kinds of lava"]},
        {factId:"boundaries",prompt:"Where do many volcanoes form?",answer:"Near tectonic plate boundaries",distractors:["Only at the equator","Only on islands","Only in deserts"]},
        {factId:"rise",prompt:"How can magma move toward the surface?",answer:"It can rise through cracks in the crust",distractors:["It falls from clouds","It grows on trees","It freezes into rain"]},
        {factId:"pressure",prompt:"What can help drive a volcanic eruption?",answer:"Gas pressure",distractors:["Moonlight","Ocean tides alone","Cold wind"]},
        {factId:"ring",prompt:"What is the Ring of Fire?",answer:"A region around the Pacific with many volcanoes",distractors:["A ring around Saturn","A type of crater","A layer inside the Sun"]},
      ],
    },
  ],
  dinosaurs: [
    {
      id:"dino-1-basics", skillId:"dinosaurs", stage:1, title:"Dinosaurs and fossils", scene:"dinosaur",
      intro:"Dinosaurs lived millions of years ago. Fossils help us learn about them.",
      facts:[
        {id:"fossil",text:"A fossil is preserved evidence of ancient life, such as bones, teeth or footprints."},
        {id:"herbivore",text:"A herbivore eats plants."},
        {id:"carnivore",text:"A carnivore eats other animals."},
        {id:"scientist",text:"A palaeontologist studies fossils and ancient life."},
        {id:"extinct",text:"An extinct species has no living members today."},
      ],
      questions:[
        {factId:"fossil",prompt:"What is a fossil?",answer:"Preserved evidence of ancient life",distractors:["A living dinosaur","A new plastic toy","A cloud"],visual:{kind:"science_scene",scene:"dinosaur",detail:"fossil"}},
        {factId:"herbivore",prompt:"What does a herbivore eat?",answer:"Plants",distractors:["Only rocks","Other animals","Metal"]},
        {factId:"carnivore",prompt:"What does a carnivore eat?",answer:"Other animals",distractors:["Only plants","Sunlight","Sand"]},
        {factId:"scientist",prompt:"Who studies fossils and ancient life?",answer:"A palaeontologist",distractors:["An astronaut","A meteorologist","A dentist"]},
        {factId:"extinct",prompt:"What does extinct mean?",answer:"No members of that species are alive today",distractors:["It lives only at night","It is very large","It can fly"]},
      ],
    },
    {
      id:"dino-2-clues", skillId:"dinosaurs", stage:2, title:"Clues from the past", scene:"dinosaur",
      intro:"Different fossils can tell scientists different things about ancient animals.",
      facts:[
        {id:"bones",text:"Fossilised bones can show an animal's size and body shape."},
        {id:"teeth",text:"Teeth can give clues about what an animal ate."},
        {id:"footprint",text:"A fossil footprint is a trace fossil."},
        {id:"layers",text:"Deeper undisturbed rock layers are usually older than layers above them."},
        {id:"compare",text:"Scientists compare fossils with living animals to help understand ancient life."},
      ],
      questions:[
        {factId:"bones",prompt:"What can fossil bones help show?",answer:"An animal's size and body shape",distractors:["Tomorrow's weather","The colour of the sky","How hot the Sun is"]},
        {factId:"teeth",prompt:"What can fossil teeth tell us?",answer:"What an animal may have eaten",distractors:["Its favourite colour","The weather that day","How many moons Earth has"]},
        {factId:"footprint",prompt:"What kind of fossil is a preserved footprint?",answer:"A trace fossil",distractors:["A planet","A crystal","A volcano"]},
        {factId:"layers",prompt:"In undisturbed rock, which layers are usually older?",answer:"The deeper layers",distractors:["The top layers","All layers are the same age","Only red layers"]},
        {factId:"compare",prompt:"What can scientists compare fossils with?",answer:"Living animals",distractors:["Only clouds","Only planets","Only volcanoes"]},
      ],
    },
    {
      id:"dino-3-change", skillId:"dinosaurs", stage:3, title:"Dinosaurs, birds and extinction", scene:"dinosaur",
      intro:"Dinosaurs changed over millions of years, and one branch of dinosaurs survives today as birds.",
      facts:[
        {id:"birds",text:"Modern birds evolved from a group of feathered dinosaurs."},
        {id:"asteroid",text:"A large asteroid impact about 66 million years ago is strongly linked to the extinction of non-bird dinosaurs."},
        {id:"survive",text:"Not all life died in that extinction event; many groups survived."},
        {id:"rare",text:"Fossilisation is rare because most remains decay before they are buried and preserved."},
        {id:"time",text:"Dinosaurs lived across a very long span of Earth's history, not all at the same time."},
      ],
      questions:[
        {factId:"birds",prompt:"Which living animals evolved from feathered dinosaurs?",answer:"Birds",distractors:["Frogs","Sharks","Snails"]},
        {factId:"asteroid",prompt:"What event is strongly linked to the extinction of non-bird dinosaurs?",answer:"A large asteroid impact",distractors:["The Moon disappearing","Humans hunting them","A single flood"]},
        {factId:"survive",prompt:"Did all life disappear when non-bird dinosaurs became extinct?",answer:"No, many groups survived",distractors:["Yes, every living thing died","Only plants survived","Only dinosaurs survived"]},
        {factId:"rare",prompt:"Why is fossilisation uncommon?",answer:"Most remains decay before they can be preserved",distractors:["Every bone becomes a fossil","Fossils only form on the Moon","Rocks always destroy bones instantly"]},
        {factId:"time",prompt:"Did all dinosaur species live at the same time?",answer:"No",distractors:["Yes","Only in winter","Only at night"]},
      ],
    },
  ],
  habitats: [
    {
      id:"habitat-1-home", skillId:"habitats", stage:1, title:"Homes for living things", scene:"habitat",
      intro:"Every animal needs a place that provides the things it needs to survive.",
      facts:[
        {id:"habitat",text:"A habitat is the place where an organism lives."},
        {id:"needs",text:"Animals need food, water and shelter in their habitat."},
        {id:"desert",text:"Desert animals are adapted to hot, dry conditions."},
        {id:"ocean",text:"Dolphins live in ocean habitats."},
        {id:"polar",text:"Polar animals need adaptations that help them live in very cold conditions."},
      ],
      questions:[
        {factId:"habitat",prompt:"What is a habitat?",answer:"The place where an organism lives",distractors:["A kind of food","A weather event","A body part"],visual:{kind:"science_scene",scene:"habitat",detail:"habitat"}},
        {factId:"needs",prompt:"What does an animal need from its habitat?",answer:"Food, water and shelter",distractors:["Only sunshine","Only rocks","Only other animals"]},
        {factId:"desert",prompt:"Which habitat is hot and dry?",answer:"A desert",distractors:["A polar ice sheet","An ocean","A rainforest"]},
        {factId:"ocean",prompt:"Which animal lives in an ocean habitat?",answer:"A dolphin",distractors:["A camel","A koala","A kangaroo"]},
        {factId:"polar",prompt:"What kind of conditions do polar animals live in?",answer:"Very cold conditions",distractors:["Hot dry conditions","Only warm oceans","Volcanic lava"]},
      ],
    },
    {
      id:"habitat-2-adapt", skillId:"habitats", stage:2, title:"Amazing adaptations", scene:"habitat",
      intro:"Adaptations are features or behaviours that help living things survive where they live.",
      facts:[
        {id:"adapt",text:"An adaptation is a feature or behaviour that helps an organism survive."},
        {id:"fur",text:"Thick fur can help an animal keep body heat in cold places."},
        {id:"camel",text:"Camels have adaptations that help them survive in deserts."},
        {id:"camouflage",text:"Camouflage helps an animal blend into its surroundings."},
        {id:"webbed",text:"Webbed feet can help some animals move through water."},
      ],
      questions:[
        {factId:"adapt",prompt:"What is an adaptation?",answer:"A feature or behaviour that helps survival",distractors:["A type of weather","A baby animal","A kind of rock"]},
        {factId:"fur",prompt:"How can thick fur help a polar animal?",answer:"It helps keep body heat in",distractors:["It makes the animal fly","It creates food","It melts all the ice"]},
        {factId:"camel",prompt:"What kind of habitat are camels adapted to?",answer:"Deserts",distractors:["Polar ice","Deep ocean","Volcanic craters"]},
        {factId:"camouflage",prompt:"How can camouflage help an animal?",answer:"It makes the animal harder to see",distractors:["It makes it bigger","It changes the weather","It creates water"]},
        {factId:"webbed",prompt:"What can webbed feet help an animal do?",answer:"Move through water",distractors:["Breathe in space","Dig through rock","Make sunlight"]},
      ],
    },
    {
      id:"habitat-3-food", skillId:"habitats", stage:3, title:"Food chains", scene:"habitat",
      intro:"Living things are connected because energy moves through ecosystems in food chains.",
      facts:[
        {id:"producer",text:"Green plants are producers because they make their own food using light."},
        {id:"consumer",text:"Animals are consumers because they get energy by eating plants or other animals."},
        {id:"arrow",text:"Arrows in a food chain show the direction that energy moves."},
        {id:"predator",text:"A predator hunts and eats other animals."},
        {id:"change",text:"If an important food source disappears, animal populations may fall or move elsewhere."},
      ],
      questions:[
        {factId:"producer",prompt:"Why are green plants called producers?",answer:"They make their own food using light",distractors:["They hunt other animals","They make rain","They eat rocks"]},
        {factId:"consumer",prompt:"Why are animals called consumers?",answer:"They get energy by eating other organisms",distractors:["They make all their food from sunlight","They produce rocks","They control the weather"]},
        {factId:"arrow",prompt:"What do arrows in a food chain show?",answer:"The direction energy moves",distractors:["Which animal is fastest","Where north is","How old an animal is"]},
        {factId:"predator",prompt:"What is a predator?",answer:"An animal that hunts other animals",distractors:["A plant that makes food","A kind of rock","A baby animal"]},
        {factId:"change",prompt:"What can happen if an important food source disappears?",answer:"Animal populations may fall or move",distractors:["Nothing can change","Every animal becomes a plant","The habitat becomes a planet"]},
      ],
    },
  ],
};

function rngFromSeed(seed:number) {
  let state=seed>>>0;
  return () => {
    state=(state*1664525+1013904223)>>>0;
    return state/4294967296;
  };
}

function shuffle<T>(items:T[], seed:number) {
  const out=[...items];
  const rng=rngFromSeed(seed);
  for(let i=out.length-1;i>0;i--) {
    const j=Math.floor(rng()*(i+1));
    [out[i],out[j]]=[out[j],out[i]];
  }
  return out;
}

export function getScienceLesson(skillId:string, stage:number):ScienceLesson|null {
  const lessons=LESSONS[skillId];
  if(!lessons?.length) return null;
  const eligible=lessons.filter((lesson)=>lesson.stage<=stage);
  return eligible[eligible.length-1] ?? lessons[0];
}

export function scienceQuestionAt(lesson:ScienceLesson, index:number, seed:number):LearningQuestion {
  const directCount=lesson.questions.length;
  const source=lesson.questions[index % directCount];
  const isReview=index>=directCount;
  const fact=lesson.facts.find((item)=>item.id===source.factId);
  let prompt=source.prompt;
  if(isReview) {
    const reviewLeads=["Think about what you learned: ","Try it another way: ","Quick check: "];
    prompt=source.reviewPrompt ?? `${reviewLeads[index%reviewLeads.length]}${source.prompt}`;
  }
  const values=shuffle([source.answer,...source.distractors],seed+index*97);
  const choices:QuestionChoice[]=values.map((value,i)=>({id:`c${i}`,label:value,value}));
  const correct=choices.find((choice)=>choice.value===source.answer);
  if(!correct) throw new Error("Science lesson produced no correct answer.");
  return {
    id:`${lesson.id}:${source.factId}:${isReview ? "review" : "direct"}`,
    skillId:lesson.skillId,
    objectiveId:source.factId,
    difficulty:lesson.stage,
    questionType:"science_lesson",
    prompt,
    visual:source.visual ?? {kind:"science_scene",scene:lesson.scene},
    choices,
    correctChoiceId:correct.id,
    explanation:lesson.facts.find((fact)=>fact.id===source.factId)?.text,
    seed,
    contentVersion:"science-lesson-3",
  };
}

export function validateScienceLesson(lesson:ScienceLesson) {
  const errors:string[]=[];
  const factIds=new Set(lesson.facts.map((fact)=>fact.id));
  const questionFacts=lesson.questions.map((question)=>question.factId);
  if(lesson.questions.length<5 || lesson.questions.length>7) errors.push(`${lesson.id}: lesson should teach five to seven core facts/questions`);
  if(new Set(questionFacts).size!==questionFacts.length) errors.push(`${lesson.id}: duplicate fact/question in lesson`);
  for(const question of lesson.questions) {
    if(!factIds.has(question.factId)) errors.push(`${lesson.id}: question references untaught fact ${question.factId}`);
    const values=[question.answer,...question.distractors];
    if(new Set(values).size!==values.length) errors.push(`${lesson.id}: duplicate answer choice for ${question.factId}`);
    if(/\b(left|right|centre|center)\b/i.test(question.answer)) errors.push(`${lesson.id}: positional correct answer for ${question.factId}`);
  }
  return errors;
}

for(const lessons of Object.values(LESSONS)) {
  for(const lesson of lessons) {
    const errors=validateScienceLesson(lesson);
    if(errors.length) throw new Error(errors.join(" "));
  }
}
