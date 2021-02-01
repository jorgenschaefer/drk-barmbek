const ChallengeDefinitions = [
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
    items: {
      bz: {
        displayName: "Blutzuckermessgerät",
        maxCount: 1,
      },
      coolpack: {
        displayName: "Kältesofortkompresse",
        maxCount: 3,
      },
      absauge: {
        displayName: "Absauge",
        maxCount: 1,
      },
      cutasept: {
        displayName: "Cuta-Sept",
        maxCount: 1,
      }
    },
    containers: {
      rucksackUnten: {
        image: "/where/rucksack-unten.png",
        imageWidth: 783,
        areas: [
          { id: "bz", shape: "rect", coords: [515, 297, 572, 524] },
          { id: "cutasept", shape: "rect", coords: [610, 480, 640, 580] },
          { id: "coolpack", shape: "rect", coords: [107, 392, 236, 717] },
          { id: "rucksackOben", shape: "rect", coords: [0, 0, 782, 100] },
        ],
      },
      rucksackOben: {
        image: "/where/rucksack-oben.png",
        imageWidth: 639,
        areas: [
          { id: "rucksackUnten", shape: "rect", coords: [0, 701, 639, 801] },
          { id: "absauge", shape: "rect", coords: [60, 60, 348, 380] },
        ],
      },
    }
  }
];

export default ChallengeDefinitions;
