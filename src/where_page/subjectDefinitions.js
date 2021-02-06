const subjectDefinitions = [
  {
    name: "streifensatz",
    displayName: "Streifensatz",
    icon: "?",
    initialContainer: "rucksackUnten",
    tasks: [
      {
        displayName: "Blutzucker messen",
        required: ["bz", "cutasept"],
      }
    ],
    containers: {
      rucksackUnten: {
        image: "/where/rucksack-unten.png",
        areas: [
          { id: "bz", coords: [515, 297, 572, 524], displayName: "Blutzuckermessgerät", count: 1 },
          { id: "cutasept", coords: [610, 480, 640, 580], displayName: "Cuta-Sept", count: 1, },
          { id: "coolpack", coords: [107, 392, 236, 717], displayName: "Kältesofortkompresse", count: 3, },
          { id: "rucksackOben", coords: [0, 0, 782, 100] },
        ],
      },
      rucksackOben: {
        image: "/where/rucksack-oben.png",
        areas: [
          { id: "rucksackUnten", coords: [0, 701, 639, 801] },
          { id: "absauge", coords: [60, 60, 348, 380], displayName: "Absauge", count: 1 },
        ],
      },
    }
  }
];

export default subjectDefinitions;
