/*
  Exercise 6
  DOM manipulation with vanilla JS
*/

// Task
// What does DOM stand for?

// Task
// Open the file index.html. What does the following code do?
const viz = document.body.querySelector(".viz");

console.log(viz, viz.children);

const addChildToViz = () => {
  const newChild = document.createElement("div");
  newChild.className = "rectangle";
  newChild.style.height = Math.random() * 100 + "px";
  viz.appendChild(newChild);
};

viz.addEventListener("click", addChildToViz);

// Task
// Using the dataset from Exercise 5, modify the code above to visualize the Iris dataset.
// Feel free to add additional CSS properties in index.html, or using JavaScript, as you see fit.
