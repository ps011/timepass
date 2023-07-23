/// <reference path="assets/js/familytree.d.ts" />

const tree: HTMLElement | null = document.querySelector("#tree");

var family = new FamilyTree(tree as HTMLElement, {
  mouseScrool: FamilyTree.none,
  mode: "dark",
  template: "hugo",
  roots: [3],
  nodeMenu: {
    edit: { text: "Edit" },
    details: { text: "Details" },
  },
  nodeBinding: {
    field_0: "name",
    field_1: "born",
    img_0: "photo",
  },
  editForm: {
    titleBinding: "name",
    photoBinding: "photo",
    addMoreBtn: "Add element",
    addMore: "Add more elements",
    addMoreFieldName: "Element name",
    generateElementsFromFields: false,
    elements: [
      { type: "textbox", label: "Full Name", binding: "name" },
      { type: "textbox", label: "Email Address", binding: "email" },
      [
        { type: "textbox", label: "Phone", binding: "phone" },
        { type: "date", label: "Date Of Birth", binding: "born" },
      ],
      [
        {
          type: "select",
          options: [
            { value: "bg", text: "Bulgaria" },
            { value: "ru", text: "Russia" },
            { value: "gr", text: "Greece" },
          ],
          label: "Country",
          binding: "country",
        },
        { type: "textbox", label: "City", binding: "city" },
      ],
      { type: "textbox", label: "Photo Url", binding: "photo", btn: "Upload" },
    ],
  },
});

family.on("field", function (_sender: any, args: any) {
  if (args.name == "born") {
    var date = new Date(args.value);
    args.value = date.toLocaleDateString();
  }
});

family.load([
  {
    id: 1,
    mid: 3,
    fid: 4,
    pids: [],
    gender: "male",
    photo:
      "https://res.cloudinary.com/designu/image/upload/v1642538472/timepass/family-tree/249178284_6429846620389734_1399308444717196164_n.jpg",
    name: "Prasheel Soni",
    born: "1995-10-07",
  },
  {
    id: 2,
    pids: [5],
    mid: 3,
    fid: 4,
    gender: "male",
    photo:
      "https://res.cloudinary.com/designu/image/upload/v1642538737/timepass/family-tree/P_20201114_153810.jpg",
    name: "Anshul Soni",
    born: "1990-08-31",
  },
  {
    id: 3,
    pids: [4],
    gender: "female",
    photo:
      "https://res.cloudinary.com/designu/image/upload/v1642539124/timepass/family-tree/20190831_174454.jpg",
    name: "Radha Soni",
    born: "1968-10-08",
    email: "laura.shepherd@gmail.com",
    phone: "+44 845 5752 547",
    city: "Moscow",
    country: "ru",
  },
  {
    id: 4,
    pids: [3],
    photo:
      "https://res.cloudinary.com/designu/image/upload/v1642539359/timepass/family-tree/PSX_20170609_111204.jpg",
    name: "Sanjay Soni",
    gender: "male",
  },
  {
    id: 5,
    pids: [2],
    gender: "female",
    photo:
      "https://res.cloudinary.com/designu/image/upload/v1642538878/timepass/family-tree/P_20200130_231150.jpg",
    name: "Neha Soni",
  },
  {
    id: 6,
    mid: 5,
    fid: 2,
    name: "Avyaan Soni",
    photo:
      "https://res.cloudinary.com/designu/image/upload/v1642539564/timepass/family-tree/00100sPORTRAIT_00100_BURST20210813202434529_COVER.jpg",
    gender: "male",
  },
]);
