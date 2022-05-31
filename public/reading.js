import "./components/navmenu.js";
import "./components/musicplayer.js";
import "./components/stopwatch.js";

/*start of reference list javascript*/

const groupRefForm = document.querySelector(".newGroupRefForm");
const singleRefForm = document.querySelector(".newSingleRefForm");
const singleInGroupForm = document.querySelector(".newSingleRefFormInGroup");

var referenceList = document.querySelector(".referenceList");


var refArray = [];
//renders reference lists on screen
if (localStorage.length != 0) {
  //goes through each item in local storage and checks for groupReferences.
  for (let i = 0; i < localStorage.length; i++) {
    let keyName = localStorage.key(i);
    let keyValue = localStorage.getItem(keyName);

    //checks if keyName is groupRefs
    if (keyName == "groupRefs") {
      //renders the columns within local storage
      let groupList = JSON.parse(keyValue)
      let numGroups = groupList.length;
      for (let o = 0; o < numGroups; o++) {
        addGroupRef(groupList[o].groupRefName);
        refArray.push(groupList[o].groupRefName);
      }
    }
  }

  //goes through each item in local storage and checks for individual references. It is in a separate for loop because group references need to be rendered first.
  for (let j = 0; j < localStorage.length; j++){
    let keyName = localStorage.key(j);
    let keyValue = localStorage.getItem(keyName);

    //checks if keyName is singleRefs
    if (keyName == "singleRefs"){
      let singleList = JSON.parse(keyValue);
      let numSingles = singleList.length;
      //goes through each of the single references
      for (let u = 0; u < numSingles; u++){
        addSingleRef(singleList[u].singleRefName, singleList[u].urlName, singleList[u].singleLoc, singleList[u].groupRefName);

        //makes sure the single reference is hidden by default if it is in a group
        if (singleList[u].singleLoc == "group"){
          let singles = document.querySelectorAll(".singleReference");
          for (let n = 0; n < singles.length; n++){
            if (singles[n].firstChild.firstChild.innerHTML == singleList[u].singleRefName){
              singles[n].parentNode.style.display = "none";
            }
          }
        }
      }
    }
  }
}




/*event listeners for "Add New Group", "Add New Single", and close form buttons*/
document.getElementById("newGroup").addEventListener("click", showGroupRefForm);
document.getElementById("closeGroupRefForm").addEventListener("click", closeGroupRefForm);
document.getElementById("newSingle").addEventListener("click", openSingleRefForm);
document.getElementById("closeSingleRefForm").addEventListener("click", closeSingleRefForm);


/*Functions that make forms appear and disappear*/
function showGroupRefForm() {
  groupRefForm.style.display = "initial";
}

function closeGroupRefForm() {
  groupRefForm.style.display = "none";
}

function openSingleRefForm() {
  singleRefForm.style.display = "initial";
}

function closeSingleRefForm() {
  singleRefForm.style.display = "none";
}

function openSingleRefInGroupForm() {
  singleInGroupForm.style.display = "initial";
}

function closeSingleRefInGroupForm() {
  singleInGroupForm.style.display = "none";
}

/*saves info from form when user clicks submit button*/
groupRefForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let groupRefName = document.getElementById("groupRefName").value;

  //checks if name of reference name is too long
  if (groupRefName.length > 27){
    alert("Name of reference is too long! (keep under 27 characters)");
    return false;
  }

  addGroupRef(groupRefName);
})

/*creates groupRef object with info from form*/
function addGroupRef(groupRefName) {
  let groupRef = {
    id: Date.now(),
    groupRefName
  }
  renderGroupRef(groupRef);
}

/*renders the group reference on screen with information from groupRef object*/
function renderGroupRef(groupRef) {
  //array that keeps track of all the links inside the group reference
  let linkArray = [];
  
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

  //allows the open group links button to open all the links within the group link
  groupLinks.addEventListener("click", function(event){
    event.preventDefault();
    updateLinks();
    for (let i = 0; i < linkArray.length; i++){
      window.open(linkArray[i]);
    }
  });

  let removeGroupButton = document.createElement("button");
  removeGroupButton.classList.add("removeLink");
  removeGroupButton.innerHTML = "remove group reference";

  referenceFront.appendChild(groupRefName);
  referenceFront.appendChild(groupLinks);
  referenceFront.appendChild(removeGroupButton);

  /*creates the open and opened group reference buttons (allows users to open and close the group reference)*/
  let openGroup = document.createElement("button");
  openGroup.classList.add("openGroup");
  let openGroupIcon = document.createElement("img");
  openGroupIcon.classList.add("icon");
  openGroupIcon.src = require("./images/OpenedArrow.png");
  openGroupIcon.alt = "Opened Group Reference Icon";
  openGroup.appendChild(openGroupIcon);

  let closeGroup = document.createElement("button");
  closeGroup.classList.add("closeGroup");
  let closeGroupIcon = document.createElement("img");
  closeGroupIcon.classList.add("icon");
  closeGroupIcon.src = require("./images/OpenArrow.png");
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
  addInGroupIcon.src = require("./images/Add.png");
  addInGroupIcon.alt = "Add New Reference In Group Icon";
  addInGroup.appendChild(addInGroupIcon);
  groupReference.appendChild(addInGroup);

  /*makes it so add In Group button isn't visible at first. Should be flex when it can be seen*/
  addInGroup.style.display = "none";

  referenceList.appendChild(groupReference);

  var groupRemoved = false;
  
  //function that updates the links inside the link array
  function updateLinks(){
    //looks for the single references in local storage
    linkArray = [];
    //goes through each item in local storage and checks for single references.
    for (let i = 0; i < localStorage.length; i++) {
      let keyName = localStorage.key(i);
      let keyValue = localStorage.getItem(keyName);
  
      //checks if keyName is singleRefs
      if (keyName == "singleRefs") {
        //renders the columns within local storage
        let singlesList = JSON.parse(keyValue)
        let numSingles = singlesList.length;
        for (let o = 0; o < numSingles; o++) {
          if (singlesList[o].groupRefName == groupRef.groupRefName){
            linkArray.push(singlesList[o].urlName);
          }
        }
      }
    }
    
    
  }

  addGroupToStorage();

  /*checks for when the user presses the add new single reference in group button*/
  addInGroup.addEventListener("click", openSingleRefInGroupForm);
  document.getElementById("closeSingleRefInGroupForm").addEventListener("click", closeSingleRefInGroupForm)

  /*checks for if user has submitted the openSingleRefInGroupForm*/
  singleInGroupForm.addEventListener("submit", function(event) {
    event.preventDefault();
    let singleRefName = document.getElementById("singleRefInGroupName").value;

    //checks if name of single reference is too long
    if (singleRefName.length > 40){
      alert("Name of reference is too long! (keep under 40 characters)");
      return false;
    }
    
    let urlName = document.getElementById("urlNameInGroup").value;

    //checks if user given URL is valid
    let validURL = isValidURL(urlName);
    if (validURL == false){
      alert("Please provide a valid URL");
      return false;
    }

    /*sets location of single reference to be inside a group*/
    let singleLoc = "group";

    /*sets groupRefId to the id of groupRef. This is the reason this function is in here*/
    let groupRefName = groupRef.groupRefName;
    addSingleRef(singleRefName, urlName, singleLoc, groupRefName);
    updateLinks(); //updates linkArray to include the new reference
  })

  /*resets the group reference form*/
  groupRefForm.reset();
  groupRefForm.style.display = "none";


  

  /*code that allows user to expand and close the group reference.*/
  openGroup.addEventListener("click", function(event) {
    event.preventDefault();
    openGroup.style.display = "none";
    closeGroup.style.display = "initial";

    /*displays all of the elements within the group*/
    for (let i = 1; i < groupReference.childElementCount; i++) {
      groupReference.children.item(i).style.display = "initial";

      /*makes sure add single reference in group button doesn't look weird*/
      if (i == groupReference.childElementCount - 1) {
        groupReference.children.item(i).style.display = "flex";
      }
    }
  })
  
  closeGroup.addEventListener("click", function(event) {
    event.preventDefault();
    openGroup.style.display = "initial";
    closeGroup.style.display = "none";

    /*hides all of the elements within the group*/
    for (let i = 1; i < groupReference.childElementCount; i++) {
      groupReference.children.item(i).style.display = "none";
    }
  })

  //removes the group reference from the page and local storage
  removeGroupButton.addEventListener("click", function(event){
    event.preventDefault();
    groupReference.remove();
    groupRemoved = true;
    addGroupToStorage();
    updateLinks();
  })

  //updates the group reference status in local storage
  function addGroupToStorage() {
    //writes task column object to local storage
    let groupRefObject = {
      "id": groupRef.id,
      "groupRefName": groupRef.groupRefName,
    }

    let groupRefs;

    if (localStorage.getItem("groupRefs") == null) {
      groupRefs = [];
    }
    else {
      groupRefs = localStorage.getItem("groupRefs");
      groupRefs = JSON.parse(groupRefs);
    }

    //checks if group reference already exists in local storage

    let existingGroupRef = false;

    let numGroups = groupRefs.length;
    for (let o = 0; o < numGroups; o++) {
      //removes the group reference from local storage if remove group reference button was pressed
      if (groupRefs[o].groupRefName == groupRefObject.groupRefName && groupRemoved == true) {
        existingGroupRef = true;
        groupRefs.splice(o,1);
        let groupRefJSON = JSON.stringify(groupRefs);
        localStorage.setItem("groupRefs", groupRefJSON);
        groupRemoved = false;

        //also removes all the single references under the group reference from local storage
        for (let i = 0; i < localStorage.length; i++) {
          let keyName = localStorage.key(i);
          let keyValue = localStorage.getItem(keyName);
      
          //checks if keyName is singleRefs
          if (keyName == "singleRefs") {
            //renders the columns within local storage
            let singlesList = JSON.parse(keyValue)
            let numSingles = singlesList.length;
            let badIndex = []; //keep track of indexes that should be removed. this needs to be here to avoid the for loop going over the number of available indexes
            for (let j = 0; j < numSingles; j++) {
              if (singlesList[j].urlName == linkArray[j]){
                badIndex.push(j);
              }
            }

            //removes the indexes from local storage
            for (let j = badIndex.length; j > 0; j--){
              singlesList.splice(j-1,1);
              console.log(singlesList);
            }

            //overwrites the current single ref list in localstorage
            let singleRefJSON = JSON.stringify(singlesList);
            localStorage.setItem("singleRefs", singleRefJSON);
          }
        }
        
        break;
      }
      
      //checks if column has same name, and if it does, set existingTaskColumn to true and overwrites the existing one with the new one
      if (groupRefs[o].groupRefName == groupRefObject.groupRefName && groupRemoved == false) {
        existingGroupRef = true;
        groupRefs[o] = groupRefObject;
        let groupRefJSON = JSON.stringify(groupRefs);
        localStorage.setItem("groupRefs", groupRefJSON);
      }

      
    }

    if (existingGroupRef == false) {
      groupRefs.push(groupRefObject);
      let groupRefJSON = JSON.stringify(groupRefs);
      localStorage.setItem("groupRefs", groupRefJSON);
    }

  }

}

/*saves info from Create Single Reference Form*/
singleRefForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let singleRefName = document.getElementById("singleRefName").value;

  //checks if name of single reference is too long
  if (singleRefName.length > 40){
    alert("Name of reference is too long! (keep under 40 characters)");
    return false;
  }
  
  let urlName = document.getElementById("urlName").value;

  //checks if user given URL is valid
  let validURL = isValidURL(urlName);
  if (validURL == false){
    alert("Please provide a valid URL");
    return false;
  }

  /*sets location of single reference to be on page*/
  let singleLoc = "page";

  /*since single references on page aren't part of a group reference, this is undefined*/
  let groupRefName = null;
  addSingleRef(singleRefName, urlName, singleLoc, groupRefName);
})

/*creates new singleRef object with info from Create Single Reference form*/
function addSingleRef(singleRefName, urlName, singleLoc, groupRefName) {
  let singleRef = {
    id: Date.now(),
    singleRefName,
    urlName,
    singleLoc,
    groupRefName
  }
  renderSingleRef(singleRef);
}

/*creates a new single reference on the page with info from renderSingleRef object*/
function renderSingleRef(singleRef) {
  let groupReference = document.createElement("div");
  groupReference.classList.add("groupReference");

  let singleReference = document.createElement("div");
  singleReference.classList.add("singleReference");

  let referenceFront = document.createElement("div");
  referenceFront.classList.add("referenceFront");

  let singleRefName = document.createElement("h2");
  singleRefName.innerHTML = singleRef.singleRefName;

  let singleLink = document.createElement("p");
  let URL = singleRef.urlName;
  if (URL.length > 50){
    URL = URL.substring(0, 51) + "...";
  }
  singleLink.innerHTML = URL;

  referenceFront.appendChild(singleRefName);
  referenceFront.appendChild(singleLink);

  let removeLinkButton = document.createElement("button");
  removeLinkButton.classList.add("removeLink");
  removeLinkButton.innerHTML = "remove link";

  let openLink = document.createElement("a");
  openLink.href = singleRef.urlName;
  openLink.innerHTML = "open";

  singleReference.appendChild(referenceFront);
  singleReference.append(removeLinkButton);
  singleReference.appendChild(openLink);

  groupReference.appendChild(singleReference);

  /*puts location of single reference on page if singleLoc is set to "page"*/
  if (singleRef.singleLoc == "page") {
    referenceList.appendChild(groupReference);
  }

  if (singleRef.singleLoc == "group") {
    let groupRef;
    let listGroups = document.querySelectorAll(".groupReference");
    for (let i = 0; i < listGroups.length; i++){
      //grabs name of each group reference
      let name = listGroups[i].firstChild.firstChild.firstChild.innerHTML;
      if (singleRef.groupRefName == name){
        groupRef = listGroups[i];
      }
    }
    singleReference.style.borderTop = "none";
    groupReference.style.margin = 0;
    groupRef.insertBefore(groupReference, groupRef.lastChild);
  }

  var singleRemoved = false;
  
  addSingleToStorage();

  //checks if single reference has been removed
  

  /*resets the create single reference and single reference in group forms*/
  singleRefForm.reset();
  singleInGroupForm.reset();
  singleRefForm.style.display = "none";
  singleInGroupForm.style.display = "none";


  removeLinkButton.addEventListener("click", function(event){
    event.preventDefault();
    groupReference.remove();
    singleRemoved = true;
    addSingleToStorage();
  })
    


  function addSingleToStorage() {
    //writes task column object to local storage
    let singleRefObject = {
      "id": singleRef.id,
      "singleRefName": singleRef.singleRefName,
      "urlName": singleRef.urlName,
      "singleLoc": singleRef.singleLoc,
      "groupRefName": singleRef.groupRefName
    }

    let singleRefs;

    if (localStorage.getItem("singleRefs") == null) {
      singleRefs = [];
    }
    else {
      singleRefs = localStorage.getItem("singleRefs");
      singleRefs = JSON.parse(singleRefs);
    }

    //checks if group reference already exists in local storage

    let existingSingleRef = false;

    let numSingles = singleRefs.length;
    for (let o = 0; o < numSingles; o++) {
      //checks if single reference has same name, and if it does, set existingSingleRef to true and overwrites the existing one with the new one
      if (singleRefs[o].singleRefName == singleRefObject.singleRefName && singleRemoved == false) {
        existingSingleRef = true;
        singleRefs[o] = singleRefObject;
        let singleRefJSON = JSON.stringify(singleRefs);
        localStorage.setItem("singleRefs", singleRefJSON);
      }

      //if reference was removed, remove the reference from local storage
      if (singleRefs[o].singleRefName == singleRefObject.singleRefName && singleRemoved == true) {
        existingSingleRef = true;
        singleRefs.splice(o,1);
        let singleRefJSON = JSON.stringify(singleRefs);
        localStorage.setItem("singleRefs", singleRefJSON);
        singleRemoved = false;
        break;
      }
    }

    if (existingSingleRef == false) {
      singleRefs.push(singleRefObject);
      let singleRefJSON = JSON.stringify(singleRefs);
      localStorage.setItem("singleRefs", singleRefJSON);
    }

  }
}


//checks if a given url is a valid url. Code from https://stackoverflow.com/questions/5717093/check-if-a-javascript-string-is-a-url
function isValidURL(urlName){
  let url;
  try{
    url = new URL(urlName);
  } catch(_) {
    return false;
  }
  
  return url.protocol === "http:" || url.protocol === "https:";
}