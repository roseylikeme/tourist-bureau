let categories = ["Adventures", "Arts & Crafts", "Museums", "Wine Tastings", "Other"];

// TODO: If Remsey Asks to Complete, Finish Adding Activitiies
let activities = [
    {
      category: "Adventures",
      id: "A101",
      name: "Valley Hot Air Balloons",
      description: "Enjoy a lovely hot air balloon ride over the valley at sunrise.  Call 800-555-1212 to reserve a date/time after you complete your e-ticket purchase.",
      location: "121 S. Main Street",
      price: 265.00
    },
    {
      category: "Adventures",
      id: "A102",
      name: "Alcatraz Bay Cruise",
      description: "Explore San Francisco efficiently, and take a ferry to Alcatraz Island where you can go inside the Federal Pentitentiary and enjoy an audio guide. Enjoy the views of pier 39's sea lions, the waterfront area, and the city's skyline!",
      location: "Pier 33, San Francisco, CA 94133, USA",
      price: 139.00
    },
  ];

window.onload = function (){
    // Function used to shrink nav bar removing paddings and adding black background
    $(window).scroll(function() {
      if ($(document).scrollTop() > 50) {
          $('.nav').addClass('affix');
      } else {
          $('.nav').removeClass('affix');
      }
    });

  document.getElementById("checkoutForm").style.display = "none";
  document.getElementById("adventureSelect").style.display = "none";
  document.getElementById("activityDescription").style.display = "none";

  let categorySelect = document.getElementById("categorySelect");
  categorySelect.onchange = categorySelectOnchange;

  let adventureSelect = document.getElementById("adventureSelect");
  adventureSelect.onchange = adventureSelectOnChange;

  let purchaseBtn = document.getElementById("purchaseBtn");
  purchaseBtn.onclick = purchaseBtnOnClick;

  let resetBtn = document.getElementById("resetBtn");
  resetBtn.onclick = resetBtnOnClick;

  populateCategorySelect();
}

function populateCategorySelect(){
 
  const categorySelect = document.getElementById("categorySelect");
  
  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Please select a Category!";
  categorySelect.appendChild(defaultOption);
  
  for (let category of categories){
    let newOption = document.createElement("option");
    newOption.value = category;
    newOption.textContent = category;
    categorySelect.appendChild(newOption);
  }
}

function categorySelectOnchange() {

  document.getElementById("adventureSelect").style.display = "none";
  let categorySelect = document.getElementById("categorySelect");

  //? Is there a better way to do this?
  //initialize adventureSelect by clearing it and adding the first option
  adventureSelect.length = 0
  let defaultOption = document.createElement("option");
  defaultOption.value = "";
  defaultOption.textContent = "Select and adventure!";
  adventureSelect.appendChild(defaultOption);


  // figure out selected category and get just those adventures from the array
  let selectedCategory = categorySelect.value;
  let activitiesInSelectedCategory = getActivitiesForCategory(activities, selectedCategory);

  //loop through the filtered adventures and add entries to the dropdown..
  let activitiesInSelectedCategoryLength = activitiesInSelectedCategory.length;

  for(let i = 0; i < activitiesInSelectedCategoryLength; i++ ){
      addAdventureToAdventureSelect(activitiesInSelectedCategory[i]);
    }

    adventureSelect.style.display = "block";

  function addAdventureToAdventureSelect(adventure){
    let newOption = document.createElement("option");
    newOption.value = adventure.id;
    newOption.textContent = adventure.name;
    adventureSelect.appendChild(newOption);
  }
  if (selectedCategory == ""){
    document.getElementById("adventureSelect").style.display = "none";
    document.getElementById("checkoutForm").style.display = "none";
    document.getElementById("adventureDetailParagraph").style.display = "none";
  }
}

function adventureSelectOnChange() {
  console.log('adventure picked...') // just to test if working 
  document.getElementById("checkoutResultParagraph").style.display = "none"
  document.getElementById("activityDescription").style.display = "none";


  let adventureDetailParagraph = document.getElementById("adventureDetailParagraph");
  let adventureSelect = document.getElementById("adventureSelect");
  let checkoutForm = document.getElementById("checkoutForm");
  checkoutForm.style.display = "none";
  adventureDetailParagraph.style.display = "none";

  let selectedAdventureValue = adventureSelect.value;

  if(selectedAdventureValue == undefined || selectedAdventureValue == ""){
          adventureDetailParagraph.innerHTML = ""
          checkoutForm.style.display = "none";
          return;
  }

  // Change BG According to ID

  if (selectedAdventureValue) {
      // Edits the background
      document.getElementById("two").className = selectedAdventureValue;
  }

  console.log(selectedAdventureValue)


  let selectedAdventure = getActivityById(activities, selectedAdventureValue);

    adventureDetailParagraph.innerHTML = "<span style='color: Grey ; '>You selected : </span>" + selectedAdventure.name + "<br />" + "<span style='color: Grey ; '>ID : </span>" + selectedAdventure.id + "<br />" + "<span style='color: Grey ; '>Description : </span>" + selectedAdventure.description + "<br />" + "<span style='color: Grey ; '>Location : </span>" + selectedAdventure.location + "<br />" + "<span style='color: Grey ; '>Price : </span>" + " $ " + selectedAdventure.price;
    document.getElementById("activityDescription").style.display = "block";
    adventureDetailParagraph.style.display = "block"

    if(selectedAdventure.price == 0) {
      checkoutForm.style.display = "none";
    }
    else{
        checkoutForm.style.display = "block";
    }

  return false;

}


function getActivitiesForCategory(activities, category){
 
  let activitieslength = activities.length;
  let result = [];

  for(let i = 0 ; i < activitieslength ; i++){
    if(activities[i].category ==  category){
      result.push(activities[i]);
    }
  }

  return result;
}

function getActivityById(activities, id){
  let length = activities.length;
  for(let i = 0; i < length; i++){
    if(activities[i].id == id){
      return activities[i];
    }
  }
}

//Purchase Button's Onclick function
function purchaseBtnOnClick() {
  let adventureSelect = document.getElementById("adventureSelect");
  let selectedAdventureValue = adventureSelect.value;
  let selectedAdventure = getActivityById(activities, selectedAdventureValue);
  
  // Grab Information from field
  let tickets = document.getElementById("tickets").value;
  let email = document.getElementById("email").value

  // Multiply # of Tickets by the Adventure's Price to grab total cost
  let total = tickets * selectedAdventure.price;
  
  let checkoutResultParagraph = document.getElementById("checkoutResultParagraph");
  checkoutResultParagraph.style.display = "block" // display the hidden paragraph & print thru inner HTML
  checkoutResultParagraph.innerHTML = "Your credit card has been charged $" + total + " for " + tickets + " ticket to " + selectedAdventure.name + `. A confirmation email has been sent to ${email}`;

  //TODO: Next steps would be to validate whether a credit card was inputed, or whether an email was put
}


// Reset Button's Onclick Function
function resetBtnOnClick() {

  // Declare the Variables
  let tickets;
  let checkoutResultParagraph = document.getElementById("checkoutResultParagraph");

  // Clears the checkout paragraph + hides it
  checkoutResultParagraph.innerHTML = ""
  checkoutResultParagraph.style.display = "none"

  // Resets Tickets back to 1
  tickets = document.getElementById("tickets").value = 1;

}
