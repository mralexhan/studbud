//import "./components/navmenu";

/*javascript for the nav bar to be able to activate. Code from https://codepen.io/robdongas/pen/MWvKMRp*/
const toggler = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

/*
 * Toggles on and off the 'active' class on the menu
 * and the toggler button.
 */
toggler.addEventListener('click', () => {
  toggler.classList.toggle('active');
  menu.classList.toggle('active');
})


/*start of reference list javascript*/

const groupRefForm = document.querySelector(".newGroupRefForm");
const singleRefForm = document.querySelector(".newSingleRefForm");
const singleInGroupForm = document.querySelector(".newSingleRefFormInGroup");

var referenceList = document.querySelector(".referenceList");

/*event listeners for "Add New Group", "Add New Single", and close form buttons*/
document.getElementById("newGroup").addEventListener("click", showGroupRefForm);
document.getElementById("closeGroupRefForm").addEventListener("click", closeGroupRefForm);
document.getElementById("newSingle").addEventListener("click", openSingleRefForm);
document.getElementById("closeSingleRefForm").addEventListener("click", closeSingleRefForm);


/*Functions that make forms appear and disappear*/
function showGroupRefForm(){
  groupRefForm.style.display = "initial";
}

function closeGroupRefForm(){
  groupRefForm.style.display = "none";
}

function openSingleRefForm(){
  singleRefForm.style.display = "initial";
}

function closeSingleRefForm(){
  singleRefForm.style.display = "none";
}

function openSingleRefInGroupForm(){
  singleInGroupForm.style.display = "initial";
}
  
function closeSingleRefInGroupForm(){
  singleInGroupForm.style.display = "none";
}

/*saves info from form when user clicks submit button*/
groupRefForm.addEventListener("submit", function(event){
  event.preventDefault();
  let groupRefName = document.getElementById("groupRefName").value;

  addGroupRef(groupRefName);
})

/*creates groupRef object with info from form*/
function addGroupRef(groupRefName){
  let groupRef = {
    id: Date.now(),
    groupRefName
  }
  renderGroupRef(groupRef);
}

/*renders the group reference on screen with information from groupRef object*/
function renderGroupRef(groupRef){
  /*javascript that creates the group reference*/
  let groupReference = document.createElement("div");
  groupReference.id = groupRef.id;
  groupReference.classList.add("groupReference");

  let groupTitle = document.createElement("div");
  groupTitle.classList.add("groupTitle");

  let referenceFront = document.createElement("div");
  referenceFront.classList.add("referenceFront");

  let groupRefName = document.createElement("h2");
  groupRefName.innerHTML = groupRef.groupRefName;

  let groupLinks = document.createElement("a");
  groupLinks.innerHTML = "open all links";
  groupLinks.href = "#";

  
  referenceFront.appendChild(groupRefName);
  referenceFront.appendChild(groupLinks);

  /*creates the open and opened group reference buttons (allows users to open and close the group reference)*/
  let openGroup = document.createElement("button");
  openGroup.classList.add("openGroup");
  let openGroupIcon = document.createElement("img");
  openGroupIcon.classList.add("icon");
  openGroupIcon.src = "images/OpenedArrow.png";
  openGroupIcon.alt = "Opened Group Reference Icon";
  openGroup.appendChild(openGroupIcon);

  let closeGroup = document.createElement("button");
  closeGroup.classList.add("closeGroup");
  let closeGroupIcon = document.createElement("img");
  closeGroupIcon.classList.add("icon");
  closeGroupIcon.src = "images/OpenArrow.png";
  closeGroupIcon.alt = "Open Group Reference Icon";
  closeGroup.appendChild(closeGroupIcon);

  /*closeGroup button display is set to none by default*/
  closeGroup.style.display = "none";

  groupTitle.appendChild(referenceFront);
  groupTitle.appendChild(openGroup);
  groupTitle.appendChild(closeGroup);
  groupReference.appendChild(groupTitle);

  /*creates add new single reference in group button*/
  let addInGroup = document.createElement("button");
  addInGroup.classList.add("addInGroup");
  let addInGroupIcon = document.createElement("img");
  addInGroupIcon.classList.add("icon");
  addInGroupIcon.src = "images/Add.png";
  addInGroupIcon.alt = "Add New Reference In Group Icon";
  addInGroup.appendChild(addInGroupIcon);
  groupReference.appendChild(addInGroup);

  /*makes it so add In Group button isn't visible at first. Should be flex when it can be seen*/
  addInGroup.style.display = "none";

  referenceList.appendChild(groupReference);

  /*checks for when the user presses the add new single reference in group button*/
  addInGroup.addEventListener("click", openSingleRefInGroupForm);
  document.getElementById("closeSingleRefInGroupForm").addEventListener("click", closeSingleRefInGroupForm)

  /*checks for if user has submitted the openSingleRefInGroupForm*/
  singleInGroupForm.addEventListener("submit", function(event){
    event.preventDefault();
    let singleRefName = document.getElementById("singleRefInGroupName").value;
    let urlName = document.getElementById("urlNameInGroup").value;
  
    /*sets location of single reference to be inside a group*/
    let singleLoc = "group";

    /*sets groupRefId to the id of groupRef. This is the reason this function is in here*/
    let groupRefId = groupRef.id;
    addSingleRef(singleRefName, urlName, singleLoc, groupRefId);
  })

  /*resets the group reference form*/
  groupRefForm.reset();
  groupRefForm.style.display = "none";

  /*code that allows user to expand and close the group reference.*/
  openGroup.addEventListener("click", function(event){
    event.preventDefault();
    openGroup.style.display = "none";
    closeGroup.style.display = "initial";

    /*displays all of the elements within the group*/
    for (let i = 1; i < groupReference.childElementCount; i ++){
      groupReference.children.item(i).style.display = "initial";

      /*makes sure add single reference in group button displays properly*/
      if (i == groupReference.childElementCount - 1){
        groupReference.children.item(i).style.display = "flex";
      }
    }
  })

  closeGroup.addEventListener("click", function(event){
    event.preventDefault();
    openGroup.style.display = "initial";
    closeGroup.style.display = "none";

    /*hides all of the elements within the group*/
    for (let i = 1; i < groupReference.childElementCount; i ++){
      groupReference.children.item(i).style.display = "none";
    }
  })
  
}

/*saves info from Create Single Reference Form*/
singleRefForm.addEventListener("submit", function(event){
  event.preventDefault();
  let singleRefName = document.getElementById("singleRefName").value;
  let urlName = document.getElementById("urlName").value;
  
  /*sets location of single reference to be on page*/
  let singleLoc = "page";

  /*since single references on page aren't part of a group reference, this is undefined*/
  let groupRefId = "undefined"
  addSingleRef(singleRefName, urlName, singleLoc, groupRefId);
})

/*creates new singleRef object with info from Create Single Reference form*/
function addSingleRef(singleRefName, urlName, singleLoc, groupRefId){
  let singleRef = {
    id: Date.now(),
    singleRefName,
    urlName,
    singleLoc,
    groupRefId
  }
  renderSingleRef(singleRef);
}

/*creates a new single reference on the page with info from renderSingleRef object*/
function renderSingleRef(singleRef){
  let groupReference = document.createElement("div");
  groupReference.classList.add("groupReference");

  let singleReference = document.createElement("div");
  singleReference.classList.add("singleReference");

  let referenceFront = document.createElement("div");
  referenceFront.classList.add("referenceFront");

  let singleRefName = document.createElement("h2");
  singleRefName.innerHTML = singleRef.singleRefName;

  let singleLink = document.createElement("p");
  singleLink.innerHTML = singleRef.urlName;

  referenceFront.appendChild(singleRefName);
  referenceFront.appendChild(singleLink);

  let openLink = document.createElement("a");
  openLink.href = singleRef.urlName;
  openLink.innerHTML = "open";

  singleReference.appendChild(referenceFront);
  singleReference.appendChild(openLink);

  groupReference.appendChild(singleReference);

  /*puts location of single reference on page if singleLoc is set to "page"*/
  if (singleRef.singleLoc == "page"){
    referenceList.appendChild(groupReference);
  }

  if (singleRef.singleLoc == "group"){
    let groupRef = document.getElementById(singleRef.groupRefId);
    singleReference.style.borderTop = "none";
    groupReference.style.margin = 0;
    groupRef.insertBefore(groupReference, groupRef.lastChild);
  }
  

  /*resets the create single reference and single reference in group forms*/
  singleRefForm.reset();
  singleInGroupForm.reset();
  singleRefForm.style.display = "none";
  singleInGroupForm.style.display = "none";
  
  
}