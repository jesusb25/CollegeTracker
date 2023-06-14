import apiRequest from "./apirequest.js";

class App {
  constructor() {
    this.init();

    let moduleOne = document.querySelector("#module-toggle-1");
    moduleOne.addEventListener("click", () => {
      let moduleOneContent = document.querySelector(".module-1");
      moduleOneContent.classList.toggle("hidden");
    });

    let moduleTwo = document.querySelector("#module-toggle-2");
    moduleTwo.addEventListener("click", () => {
      let moduleTwoContent = document.querySelector(".module-2");
      moduleTwoContent.classList.toggle("hidden");
    });

    let moduleThree = document.querySelector("#module-toggle-3");
    moduleThree.addEventListener("click", () => {
      let moduleThreeContent = document.querySelector(".module-3");
      moduleThreeContent.classList.toggle("hidden");
    });

    this.lessonOne = document.querySelector(".lesson-checkbox-1");
    this.lessonOne.addEventListener("click", async () => {
      console.log("lesson 1");
      if (this.lessonOne.checked) {
        await apiRequest("POST", "/complete", { lesson: "1" });
        await apiRequest("DELETE", "/incomplete", { lesson: "1" });
      } else {
        await apiRequest("POST", "/incomplete", { lesson: "1" });
        await apiRequest("DELETE", "/complete", { lesson: "1" });
      }
    });

    this.lessonTwo = document.querySelector(".lesson-checkbox-2");
    this.lessonTwo.addEventListener("click", async () => {
      console.log("lesson 2");
      if (this.lessonTwo.checked) {
        await apiRequest("POST", "/complete", { lesson: "2" });
        await apiRequest("DELETE", "/incomplete", { lesson: "2" });
      } else {
        await apiRequest("POST", "/incomplete", { lesson: "2" });
        await apiRequest("DELETE", "/complete", { lesson: "2" });
      }
    });

    this.lessonThree = document.querySelector(".lesson-checkbox-3");
    this.lessonThree.addEventListener("click", async () => {
      console.log("lesson 3");
      if (this.lessonThree.checked) {
        await apiRequest("POST", "/complete", { lesson: "3" });
        await apiRequest("DELETE", "/incomplete", { lesson: "3" });
      } else {
        await apiRequest("POST", "/incomplete", { lesson: "3" });
        await apiRequest("DELETE", "/complete", { lesson: "3" });
      }
    });
  }

  async init() {
    this.completeLessons = await apiRequest("GET", "/complete");
    if (this.completeLessons.includes("1")) {
      this.lessonOne.checked = true;
    }
    if (this.completeLessons.includes("2")) {
      this.lessonTwo.checked = true;
    }
    if (this.completeLessons.includes("3")) {
      this.lessonThree.checked = true;
    }
    console.log(this.completeLessons);
  }
}

const main = () => {
  new App();
};

main();
