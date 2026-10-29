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
        {id:"orbit",text:"To orbit means to travel around another object in space."},
        {id:"eight",text:"Eight planets orbit the Sun."},
        {id:"earth",text:"Earth is the third planet from the Sun and is where we live."},
        {id:"pluto",text:"Pluto is a dwarf planet, not one of the eight planets."},
      ],
      questions:[
        {factId:"sun",prompt:"What is at the centre of our Solar System?",reviewPrompt:"What star does every planet in our Solar System travel around?",answer:"The Sun",distractors:["Earth","The Moon","Jupiter"]},
        {factId:"orbit",prompt:"What does orbit mean?",reviewPrompt:"Which description matches what a planet does around the Sun?",answer:"Travel around another object in space",distractors:["Stop moving","Shine like a star","Stay in one place"]},
        {factId:"eight",prompt:"How many planets orbit the Sun?",reviewPrompt:"How many planets make up the main planetary family of our Solar System?",answer:"Eight",distractors:["Seven","Nine","Ten"]},
        {factId:"earth",prompt:"Which planet do we live on?",reviewPrompt:"Which planet is third from the Sun and is our home?",answer:"Earth",distractors:["Mars","Venus","Mercury"]},
        {factId:"pluto",prompt:"What is Pluto classified as today?",reviewPrompt:"Scientists do not count Pluto among the eight planets. What is it?",answer:"A dwarf planet",distractors:["A star","A moon","A comet"]},
      ],
    },
    {
      id:"solar-2-structure", skillId:"solar", stage:2, title:"How the Solar System is organised", scene:"solar",
      intro:"The planets form groups, with an asteroid belt separating the inner rocky planets from the giant outer planets.",
      facts:[
        {id:"inner",text:"Mercury, Venus, Earth and Mars are the four inner rocky planets."},
        {id:"belt",text:"The main asteroid belt lies between Mars and Jupiter."},
        {id:"outer",text:"Jupiter, Saturn, Uranus and Neptune are the four outer giant planets."},
        {id:"gasice",text:"Jupiter and Saturn are gas giants, while Uranus and Neptune are ice giants."},
        {id:"rings",text:"All four giant planets have rings, although Saturn's are the easiest to see."},
      ],
      questions:[
        {factId:"inner",prompt:"Which planets are the inner rocky planets?",reviewPrompt:"Which group is made of the four small rocky planets nearest the Sun?",answer:"Mercury, Venus, Earth and Mars",distractors:["Jupiter, Saturn, Uranus and Neptune","Earth, Mars, Jupiter and Saturn","Venus, Earth, Uranus and Neptune"]},
        {factId:"belt",prompt:"Where is the main asteroid belt?",reviewPrompt:"What lies between the orbit of Mars and the orbit of Jupiter?",answer:"Between Mars and Jupiter",distractors:["Between Earth and Mars","Beyond Neptune only","Between Mercury and Venus"]},
        {factId:"outer",prompt:"Which are the four outer giant planets?",reviewPrompt:"Which four planets make up the giant outer group?",answer:"Jupiter, Saturn, Uranus and Neptune",distractors:["Mercury, Venus, Earth and Mars","Mars, Jupiter, Saturn and Earth","Venus, Saturn, Uranus and Mars"]},
        {factId:"gasice",prompt:"Which planets are the ice giants?",reviewPrompt:"Uranus and Neptune belong to which type of giant planet?",answer:"Uranus and Neptune",distractors:["Jupiter and Saturn","Earth and Mars","Mercury and Venus"]},
        {factId:"rings",prompt:"Which giant planet has the most obvious rings?",reviewPrompt:"All four giant planets have rings. Which planet's rings are easiest to see?",answer:"Saturn",distractors:["Jupiter","Uranus","Neptune"]},
      ],
    },
    {
      id:"solar-3-earth-motion", skillId:"solar", stage:3, title:"Earth in motion", scene:"solar",
      intro:"Earth spins every day and travels around the Sun every year. Its tilted axis gives us the seasons.",
      facts:[
        {id:"rotation",text:"Earth rotates once in about 24 hours."},
        {id:"daynight",text:"Earth's rotation causes day and night."},
        {id:"year",text:"Earth takes about 365 days to orbit the Sun once."},
        {id:"tilt",text:"Earth's axis is tilted as Earth travels around the Sun."},
        {id:"seasons",text:"The seasons are mainly caused by Earth's tilt, not by Earth being nearer to or farther from the Sun."},
      ],
      questions:[
        {factId:"rotation",prompt:"About how long does Earth take to rotate once?",reviewPrompt:"One complete spin of Earth takes about how long?",answer:"24 hours",distractors:["One month","One year","12 hours"]},
        {factId:"daynight",prompt:"What causes day and night?",reviewPrompt:"Why does your part of Earth move into sunlight and then darkness?",answer:"Earth's rotation",distractors:["The Moon's phases","Clouds moving","The Sun switching off"]},
        {factId:"year",prompt:"About how long does Earth take to orbit the Sun?",reviewPrompt:"One complete trip around the Sun gives Earth what length of time?",answer:"365 days",distractors:["24 hours","28 days","10 years"]},
        {factId:"tilt",prompt:"What is special about Earth's axis?",reviewPrompt:"As Earth travels around the Sun, what stays tilted?",answer:"It is tilted",distractors:["It disappears","It points at the Sun all year","It changes into an orbit"]},
        {factId:"seasons",prompt:"What mainly causes Earth's seasons?",reviewPrompt:"Why do summer and winter happen at different times of year?",answer:"Earth's tilted axis",distractors:["Earth moving much closer to the Sun","The Moon blocking sunlight","Changes in the Sun's size"]},
      ],
    },
    {
      id:"solar-4-moon", skillId:"solar", stage:4, title:"The Moon and its phases", scene:"solar",
      intro:"The Moon orbits Earth, and the changing part of its sunlit half that we can see creates the Moon's phases.",
      facts:[
        {id:"moonorbit",text:"The Moon orbits Earth about once every month."},
        {id:"light",text:"The Moon does not make its own visible light; it reflects sunlight."},
        {id:"phases",text:"Moon phases happen because we see different amounts of the Moon's sunlit half as it orbits Earth."},
        {id:"fullnew",text:"A full moon looks fully lit, while a new moon is difficult to see from Earth."},
        {id:"shadow",text:"Normal Moon phases are not caused by Earth's shadow; Earth's shadow causes a lunar eclipse."},
      ],
      questions:[
        {factId:"moonorbit",prompt:"What does the Moon orbit?",reviewPrompt:"About once each month, the Moon completes a trip around what?",answer:"Earth",distractors:["The Sun directly","Mars","Jupiter"]},
        {factId:"light",prompt:"Why can we see the Moon?",reviewPrompt:"Where does the Moon's visible light come from?",answer:"It reflects sunlight",distractors:["It makes its own light like a star","City lights on the Moon","Lightning"]},
        {factId:"phases",prompt:"Why does the Moon appear to change shape?",reviewPrompt:"What creates the changing phases we see from Earth?",answer:"We see different amounts of its sunlit half",distractors:["The Moon physically changes shape","Clouds carve pieces away","Earth's shadow covers it every night"]},
        {factId:"fullnew",prompt:"Which phase looks fully lit from Earth?",reviewPrompt:"Which Moon phase appears as a bright complete circle?",answer:"Full moon",distractors:["New moon","Crescent moon","Quarter moon"]},
        {factId:"shadow",prompt:"Are normal Moon phases caused by Earth's shadow?",reviewPrompt:"Earth's shadow can cause an eclipse. Does it cause the regular monthly phases?",answer:"No",distractors:["Yes, every night","Only at full moon","Only in summer"]},
      ],
    },
    {
      id:"solar-5-mercury", skillId:"solar", stage:5, title:"Mercury", scene:"solar",
      intro:"Mercury is the smallest planet and the closest planet to the Sun.",
      facts:[
        {id:"mercury-position",text:"Mercury is the first and closest planet to the Sun."},
        {id:"mercury-size",text:"Mercury is the smallest of the eight planets."},
        {id:"mercury-spin",text:"Mercury rotates once in about 59 Earth days."},
        {id:"mercury-year",text:"Mercury orbits the Sun in only 88 Earth days, giving it the shortest year."},
        {id:"mercury-features",text:"Mercury has a heavily cratered rocky surface, huge temperature swings and no moons."},
      ],
      questions:[
        {factId:"mercury-position",prompt:"Which planet is closest to the Sun?",reviewPrompt:"Which planet is first in order from the Sun?",answer:"Mercury",distractors:["Venus","Earth","Mars"]},
        {factId:"mercury-size",prompt:"How does Mercury compare in size with the other planets?",reviewPrompt:"Which planet is the smallest of all eight?",answer:"It is the smallest planet",distractors:["It is the largest planet","It is the same size as Jupiter","It is larger than Earth"]},
        {factId:"mercury-spin",prompt:"About how long does Mercury take to rotate once?",reviewPrompt:"Mercury spins very slowly. About how many Earth days is one rotation?",answer:"59 Earth days",distractors:["1 Earth day","10 Earth days","365 Earth days"]},
        {factId:"mercury-year",prompt:"About how long is a year on Mercury?",reviewPrompt:"Mercury has the shortest planetary year. How long is it?",answer:"88 Earth days",distractors:["24 hours","365 Earth days","12 Earth years"]},
        {factId:"mercury-features",prompt:"How many moons does Mercury have?",reviewPrompt:"Which statement about Mercury is true?",answer:"No moons",distractors:["One moon","Two moons","Many moons"]},
      ],
    },
    {
      id:"solar-6-venus", skillId:"solar", stage:6, title:"Venus", scene:"solar",
      intro:"Venus is Earth's near neighbour, but its thick atmosphere makes its surface hotter than any other planet.",
      facts:[
        {id:"venus-position",text:"Venus is the second planet from the Sun and is close to Earth in size."},
        {id:"venus-hot",text:"Venus is the hottest planet because its thick carbon-dioxide atmosphere traps heat."},
        {id:"venus-spin",text:"Venus rotates very slowly, once in about 243 Earth days, and spins in the opposite direction to most planets."},
        {id:"venus-year",text:"Venus takes about 225 Earth days to orbit the Sun."},
        {id:"venus-moons",text:"Venus has no moons and no rings."},
      ],
      questions:[
        {factId:"venus-position",prompt:"Where is Venus in order from the Sun?",reviewPrompt:"Which planet comes after Mercury and before Earth?",answer:"Second",distractors:["First","Third","Fifth"]},
        {factId:"venus-hot",prompt:"Why is Venus the hottest planet?",reviewPrompt:"What traps so much heat at Venus?",answer:"Its thick carbon-dioxide atmosphere",distractors:["It is the largest planet","Its moons make heat","It has no atmosphere"]},
        {factId:"venus-spin",prompt:"About how long does Venus take to rotate once?",reviewPrompt:"Venus spins extremely slowly. About how many Earth days is one rotation?",answer:"243 Earth days",distractors:["1 Earth day","24 Earth days","12 Earth hours"]},
        {factId:"venus-year",prompt:"About how long is a year on Venus?",reviewPrompt:"How long does Venus take to orbit the Sun?",answer:"225 Earth days",distractors:["24 hours","88 Earth days","12 Earth years"]},
        {factId:"venus-moons",prompt:"How many moons does Venus have?",reviewPrompt:"Which statement about Venus's moons is true?",answer:"No moons",distractors:["One moon","Two moons","Many moons"]},
      ],
    },
    {
      id:"solar-7-earth", skillId:"solar", stage:7, title:"Earth", scene:"solar",
      intro:"Earth is our rocky home, with liquid oceans, a protective atmosphere and one Moon.",
      facts:[
        {id:"earth-position",text:"Earth is the third planet from the Sun."},
        {id:"earth-size",text:"Earth is the largest of the four inner rocky planets."},
        {id:"earth-spin",text:"Earth rotates once in about 24 hours and orbits the Sun in about 365 days."},
        {id:"earth-water",text:"Earth has large amounts of liquid water on its surface and is the only world known to support life."},
        {id:"earth-moon",text:"Earth has one natural moon, usually called the Moon."},
      ],
      questions:[
        {factId:"earth-position",prompt:"Where is Earth in order from the Sun?",reviewPrompt:"Which planet is third from the Sun?",answer:"Third",distractors:["First","Second","Fourth"]},
        {factId:"earth-size",prompt:"How does Earth compare with the other inner rocky planets?",reviewPrompt:"Which is the largest of Mercury, Venus, Earth and Mars?",answer:"It is the largest inner rocky planet",distractors:["It is the smallest planet","It is larger than Jupiter","It is an ice giant"]},
        {factId:"earth-spin",prompt:"About how long is one Earth rotation?",reviewPrompt:"How long is one normal Earth day?",answer:"24 hours",distractors:["59 days","243 days","12 years"]},
        {factId:"earth-water",prompt:"What covers much of Earth's surface?",reviewPrompt:"Which feature is especially abundant on Earth's surface?",answer:"Liquid water",distractors:["Liquid metal","Dry ice only","Lava oceans"]},
        {factId:"earth-moon",prompt:"How many natural moons does Earth have?",reviewPrompt:"How many moons orbit our planet?",answer:"One",distractors:["None","Two","Many dozens"]},
      ],
    },
    {
      id:"solar-8-mars", skillId:"solar", stage:8, title:"Mars", scene:"solar",
      intro:"Mars is a cold rocky world with a rusty-red surface, giant volcanoes and two small moons.",
      facts:[
        {id:"mars-position",text:"Mars is the fourth planet from the Sun and is about half Earth's diameter."},
        {id:"mars-spin",text:"A day on Mars is about 24.6 Earth hours, quite similar to an Earth day."},
        {id:"mars-year",text:"Mars takes about 1.9 Earth years to orbit the Sun."},
        {id:"mars-features",text:"Mars has Olympus Mons, the largest known volcano in the Solar System, and evidence that liquid water flowed there long ago."},
        {id:"mars-moons",text:"Mars has two small moons, Phobos and Deimos."},
      ],
      questions:[
        {factId:"mars-position",prompt:"Where is Mars in order from the Sun?",reviewPrompt:"Which planet comes just after Earth?",answer:"Fourth",distractors:["Second","Third","Fifth"]},
        {factId:"mars-spin",prompt:"How long is a day on Mars compared with Earth?",reviewPrompt:"Mars rotates once in about how long?",answer:"About 24.6 Earth hours",distractors:["About 59 Earth days","About 10 Earth hours","About 243 Earth days"]},
        {factId:"mars-year",prompt:"About how long is a year on Mars?",reviewPrompt:"Mars takes roughly how many Earth years to orbit the Sun?",answer:"1.9 Earth years",distractors:["88 Earth days","1 Earth day","84 Earth years"]},
        {factId:"mars-features",prompt:"What is Olympus Mons?",reviewPrompt:"Mars is home to the Solar System's largest known what?",answer:"A giant volcano",distractors:["An ocean","A ring system","A moon"]},
        {factId:"mars-moons",prompt:"What are Mars's two moons called?",reviewPrompt:"Which pair of moons belongs to Mars?",answer:"Phobos and Deimos",distractors:["Europa and Io","Titan and Enceladus","Titania and Oberon"]},
      ],
    },
    {
      id:"solar-9-jupiter", skillId:"solar", stage:9, title:"Jupiter", scene:"solar",
      intro:"Jupiter is the largest planet, a fast-spinning gas giant with powerful storms and many moons.",
      facts:[
        {id:"jupiter-position",text:"Jupiter is the fifth planet from the Sun and the first planet beyond the main asteroid belt."},
        {id:"jupiter-size",text:"Jupiter is the largest planet in the Solar System."},
        {id:"jupiter-spin",text:"Jupiter rotates in about 10 Earth hours, giving it the shortest day of any planet."},
        {id:"jupiter-year",text:"Jupiter takes about 12 Earth years to orbit the Sun."},
        {id:"jupiter-features",text:"Jupiter has the Great Red Spot, faint rings and many moons; Io, Europa, Ganymede and Callisto are four famous large moons."},
      ],
      questions:[
        {factId:"jupiter-position",prompt:"Where is Jupiter in order from the Sun?",reviewPrompt:"Which planet is just beyond the main asteroid belt?",answer:"Fifth",distractors:["Fourth","Sixth","Eighth"]},
        {factId:"jupiter-size",prompt:"Which is the largest planet?",reviewPrompt:"Which planet could fit all the other planets inside it by volume with room to spare?",answer:"Jupiter",distractors:["Earth","Mars","Mercury"]},
        {factId:"jupiter-spin",prompt:"About how long is a day on Jupiter?",reviewPrompt:"Jupiter has the shortest planetary day. Roughly how long is it?",answer:"10 Earth hours",distractors:["24 Earth hours","59 Earth days","243 Earth days"]},
        {factId:"jupiter-year",prompt:"About how long is a year on Jupiter?",reviewPrompt:"How long does Jupiter take to travel around the Sun?",answer:"12 Earth years",distractors:["88 Earth days","1 Earth year","165 Earth years"]},
        {factId:"jupiter-features",prompt:"What is Jupiter's Great Red Spot?",reviewPrompt:"The Great Red Spot is a famous feature on Jupiter. What is it?",answer:"A giant storm",distractors:["A moon","A mountain","A ring"]},
      ],
    },
    {
      id:"solar-10-saturn", skillId:"solar", stage:10, title:"Saturn", scene:"solar",
      intro:"Saturn is a huge gas giant best known for its spectacular rings.",
      facts:[
        {id:"saturn-position",text:"Saturn is the sixth planet from the Sun and the second-largest planet."},
        {id:"saturn-spin",text:"Saturn rotates in about 10.7 Earth hours."},
        {id:"saturn-year",text:"Saturn takes about 29.5 Earth years to orbit the Sun."},
        {id:"saturn-rings",text:"Saturn's bright rings are made mostly of countless pieces of ice and rock."},
        {id:"saturn-moons",text:"Saturn has many moons; Titan has a thick atmosphere and Enceladus sprays icy material from beneath its surface."},
      ],
      questions:[
        {factId:"saturn-position",prompt:"Where is Saturn in order from the Sun?",reviewPrompt:"Which planet comes after Jupiter?",answer:"Sixth",distractors:["Fifth","Seventh","Eighth"]},
        {factId:"saturn-spin",prompt:"About how long is a day on Saturn?",reviewPrompt:"Saturn spins quickly. Roughly how long is one rotation?",answer:"10.7 Earth hours",distractors:["24 Earth hours","29.5 Earth days","243 Earth days"]},
        {factId:"saturn-year",prompt:"About how long is a year on Saturn?",reviewPrompt:"How many Earth years does Saturn take to orbit the Sun?",answer:"29.5 Earth years",distractors:["1 Earth year","12 Earth years","165 Earth years"]},
        {factId:"saturn-rings",prompt:"What are Saturn's rings mostly made of?",reviewPrompt:"What makes up the countless pieces in Saturn's bright rings?",answer:"Ice and rock",distractors:["Solid gold","Clouds only","Liquid water"]},
        {factId:"saturn-moons",prompt:"Which large Saturn moon has a thick atmosphere?",reviewPrompt:"Which famous moon of Saturn has a dense atmosphere?",answer:"Titan",distractors:["Phobos","Europa","Triton"]},
      ],
    },
    {
      id:"solar-11-uranus", skillId:"solar", stage:11, title:"Uranus", scene:"solar",
      intro:"Uranus is a pale blue ice giant that spins almost on its side.",
      facts:[
        {id:"uranus-position",text:"Uranus is the seventh planet from the Sun."},
        {id:"uranus-type",text:"Uranus is an ice giant, similar in size to Neptune and much larger than Earth."},
        {id:"uranus-spin",text:"Uranus rotates in about 17 Earth hours and its axis is tilted about 98 degrees, so it spins almost on its side."},
        {id:"uranus-year",text:"Uranus takes about 84 Earth years to orbit the Sun."},
        {id:"uranus-features",text:"Uranus has faint rings and many moons, including Titania, Oberon and Miranda."},
      ],
      questions:[
        {factId:"uranus-position",prompt:"Where is Uranus in order from the Sun?",reviewPrompt:"Which planet comes after Saturn and before Neptune?",answer:"Seventh",distractors:["Fifth","Sixth","Eighth"]},
        {factId:"uranus-type",prompt:"What type of planet is Uranus?",reviewPrompt:"Uranus and Neptune belong to which giant-planet group?",answer:"An ice giant",distractors:["A rocky planet","A dwarf planet","A star"]},
        {factId:"uranus-spin",prompt:"What is unusual about the way Uranus spins?",reviewPrompt:"Why is Uranus sometimes described as rolling around the Sun?",answer:"It spins almost on its side",distractors:["It does not rotate","It spins once every hour","It always points straight upright"]},
        {factId:"uranus-year",prompt:"About how long is a year on Uranus?",reviewPrompt:"How long does Uranus take to orbit the Sun?",answer:"84 Earth years",distractors:["1 Earth year","12 Earth years","165 Earth years"]},
        {factId:"uranus-features",prompt:"Which is a moon of Uranus?",reviewPrompt:"Titania, Oberon and Miranda orbit which planet?",answer:"Titania",distractors:["Phobos","Titan","Triton"]},
      ],
    },
    {
      id:"solar-12-neptune", skillId:"solar", stage:12, title:"Neptune", scene:"solar",
      intro:"Neptune is the farthest planet from the Sun, a cold blue ice giant with extremely fast winds.",
      facts:[
        {id:"neptune-position",text:"Neptune is the eighth and farthest planet from the Sun."},
        {id:"neptune-type",text:"Neptune is an ice giant and is similar in size to Uranus."},
        {id:"neptune-spin",text:"Neptune rotates in about 16 Earth hours."},
        {id:"neptune-year",text:"Neptune takes about 165 Earth years to orbit the Sun."},
        {id:"neptune-features",text:"Neptune has faint rings, extremely fast winds and many moons; Triton is its largest moon and orbits backwards compared with most large moons."},
      ],
      questions:[
        {factId:"neptune-position",prompt:"Which planet is farthest from the Sun?",reviewPrompt:"Which planet is eighth in order from the Sun?",answer:"Neptune",distractors:["Uranus","Saturn","Jupiter"]},
        {factId:"neptune-type",prompt:"What type of planet is Neptune?",reviewPrompt:"Neptune belongs to which giant-planet group?",answer:"An ice giant",distractors:["A rocky planet","A dwarf planet","A star"]},
        {factId:"neptune-spin",prompt:"About how long is a day on Neptune?",reviewPrompt:"Neptune rotates once in roughly how long?",answer:"16 Earth hours",distractors:["24 Earth days","59 Earth days","165 Earth years"]},
        {factId:"neptune-year",prompt:"About how long is a year on Neptune?",reviewPrompt:"How long does the farthest planet take to orbit the Sun?",answer:"165 Earth years",distractors:["1 Earth year","12 Earth years","84 Earth days"]},
        {factId:"neptune-features",prompt:"What is Neptune's largest moon?",reviewPrompt:"Which unusual large moon orbits Neptune?",answer:"Triton",distractors:["Titan","Europa","Phobos"]},
      ],
    },
    {
      id:"solar-13-compare", skillId:"solar", stage:13, title:"Compare the planets", scene:"solar",
      intro:"Now put the whole Solar System together by comparing planet size, position, days, years, rings and moons.",
      facts:[
        {id:"compare-order",text:"The planets in order are Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus and Neptune."},
        {id:"compare-size",text:"Jupiter is the largest planet and Mercury is the smallest."},
        {id:"compare-days",text:"Jupiter has the shortest day, while Venus takes the longest time to rotate once."},
        {id:"compare-years",text:"Mercury has the shortest year and Neptune has the longest year."},
        {id:"compare-groups",text:"The four inner planets are rocky; Jupiter and Saturn are gas giants; Uranus and Neptune are ice giants."},
      ],
      questions:[
        {factId:"compare-order",prompt:"Which order begins correctly from the Sun?",reviewPrompt:"What are the first four planets in order from the Sun?",answer:"Mercury, Venus, Earth, Mars",distractors:["Venus, Mercury, Mars, Earth","Earth, Venus, Mercury, Mars","Mars, Earth, Venus, Mercury"]},
        {factId:"compare-size",prompt:"Which pair correctly names the largest and smallest planets?",reviewPrompt:"Which planet-size comparison is correct?",answer:"Jupiter largest; Mercury smallest",distractors:["Earth largest; Mars smallest","Saturn largest; Venus smallest","Neptune largest; Earth smallest"]},
        {factId:"compare-days",prompt:"Which planet has the shortest day?",reviewPrompt:"Which planet spins fastest, completing a rotation in about 10 hours?",answer:"Jupiter",distractors:["Venus","Earth","Mercury"]},
        {factId:"compare-years",prompt:"Which planet has the longest year?",reviewPrompt:"Which planet takes about 165 Earth years to orbit the Sun?",answer:"Neptune",distractors:["Mercury","Earth","Jupiter"]},
        {factId:"compare-groups",prompt:"Which planets are the ice giants?",reviewPrompt:"Which pair belongs together as ice giants?",answer:"Uranus and Neptune",distractors:["Jupiter and Saturn","Earth and Mars","Mercury and Venus"]},
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

export function getScienceLesson(skillId:string, lessonIndex:number):ScienceLesson|null {
  const lessons=LESSONS[skillId];
  if(!lessons?.length) return null;
  const index=((lessonIndex%lessons.length)+lessons.length)%lessons.length;
  return lessons[index] ?? lessons[0];
}

export function getScienceLessonCount(skillId:string){
  return LESSONS[skillId]?.length ?? 0;
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
    contentVersion:"science-lesson-4",
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
