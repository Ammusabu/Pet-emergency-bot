
$(document).ready(function(){
  $('.slider').slick({
    dots: false,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    infinite: true
  });
});

function sendMessage() {
  const userInput = document.getElementById('user-input').value.trim();
  if (!userInput) return;

  // Get elements
  const chatHistory = document.getElementById('chat-history');
  const historyList = document.getElementById('history-list');
  
  // Get bot response
  const botResponse = getBotResponse(userInput);
  
  // Clear chat history and add NEWEST at TOP
  chatHistory.innerHTML = `
    <div class="current-chat">
      <p class="user-message"><strong>You:</strong> ${userInput}</p>
      <p class="bot-message"><strong>Bot:</strong> ${botResponse}</p>
    </div>
    ${chatHistory.innerHTML}
  `;
  
  // Add to history (newest first)
  historyList.innerHTML = `
    <li>
      <strong>Q:</strong> ${userInput}<br>
      <strong>A:</strong> ${botResponse.replace(/<[^>]+>/g, '')}
    </li>
    ${historyList.innerHTML}
  `;

  // Clear input and scroll
  document.getElementById('user-input').value = '';
  chatHistory.scrollTop = 0;
}
function getBotResponse(input) {
  const lowerInput = input.toLowerCase();
  
  const responses = {
    poison: "🚨 <strong>Emergency!</strong> Your pet may have consumed something toxic. Do NOT induce vomiting unless instructed by a veterinarian, as it can sometimes make things worse. Try to identify what was ingested and how much. Call a vet immediately at <strong>954786214585</strong> and follow their advice.",
  
    wound: "🩹 Your pet has a wound. Start by gently cleaning the wound with saline solution or clean water to remove dirt. Apply firm pressure using a clean cloth or bandage to stop bleeding. If the wound is deep, infected, or does not stop bleeding, take your pet to the vet as soon as possible. **Call the vet at 954786214585** for guidance.",
  
    choking: "🚨 Stay calm! If your pet is choking, quickly check their mouth for any visible objects. Do not blindly reach in, as you may push it further. If you cannot see anything, try the **pet Heimlich maneuver**: For small pets, hold them upside down and give back blows. For larger pets, place your hands on their abdomen and apply quick, inward thrusts. If the choking persists, rush to a vet immediately! **Call 954786214585 now!**",
    sick: "🩹 There are many possible reasons that Your pet are sick, please observe your dog and give me the symptoms",
    chocolate: "🍫 **Toxic Alert!** Chocolate is poisonous to pets, especially dark chocolate. Symptoms include vomiting, diarrhea, rapid breathing, and seizures. If your pet has eaten chocolate, try to estimate the amount and type. **DO NOT wait for symptoms!** Contact a vet immediately at <strong>954786214585</strong> and follow their instructions.",
  
    "(car|hit|vehicle)": "💔 Emergency Situation! If your pet has been hit by a vehicle, move them carefully to a safe place. **DO NOT attempt to move them too much** if they appear in pain, as they may have internal injuries or broken bones. Wrap them in a blanket to keep them warm and take them to the vet immediately. **Call 954786214585 for emergency care!**",
  
    "(vomiting|diarrhea)": "🤢 Occasional vomiting or diarrhea can be due to minor issues, but if it persists for **more than 12 hours**, contains **blood**, or is accompanied by **weakness, fever, or dehydration**, it may be serious. Ensure your pet stays hydrated. **Call your vet immediately at 954786214585!**",
  
    seizure: "⚡ Seizure Alert! If your pet is having a seizure, **do not try to hold or restrain them.** Move objects away to prevent injury. Keep track of the seizure duration—if it lasts longer than **5 minutes** or they have multiple seizures in a row, it’s an emergency! **Once the seizure stops, keep them calm and contact the vet at 954786214585!**",
  
    bleeding: "🩸 Serious Bleeding! Apply direct pressure using a clean cloth for 5-10 minutes. If the bleeding does not stop or the wound is deep, wrap it in a bandage and keep your pet as still as possible. **Do not remove any embedded objects!** Get to the vet immediately! **Call 954786214585 for urgent care!**",
     
    "(why my dog is barking)": "They’re practicing for their audition on America’s Got Noisy Talent",
    eating: "🐾 Loss of Appetite Concern! If your pet refuses to eat for more than 24 hours and shows other symptoms like vomiting, diarrhea, lethargy, or dehydration, it could indicate a serious issue. Try offering their favorite food or warm broth. If they still refuse, **call the vet immediately at 954786214585!**",
  
    cpr: `💔 **Performing Pet CPR:**  
  1️⃣ Lay your pet on their right side\n.  
  2️⃣ Check for breathing and heartbeat\n. If none, proceed with CPR.  
  3️⃣ Rescue breaths\n: Close their mouth and gently blow air into their nose every 3 seconds.  
  4️⃣ Chest compressions\n: If there’s no heartbeat, press firmly on their chest 1-2 times per second.  
  5️⃣ Continue while rushing to the vet!\n **Call 954786214585 for emergency instructions!**`,

  "(heatstroke|overheating)": `🔥 Heatstroke Emergency! Move your pet to a **cool, shaded area** immediately. Offer **small amounts of cool water**—do not force them to drink too much at once. Use **cool (not ice-cold) wet towels** on their paws, belly, and neck. If they are panting excessively, weak, or collapsing, rush them to the vet! **Call 954786214585 now!**`
};
  

  for (const [pattern, response] of Object.entries(responses)) {
    if (new RegExp(pattern).test(lowerInput)) {
      return response;
    }
  }
  
  return ""I’m designed to assist with veterinary and pet-related queries. For your request, I recommend contacting the Veterinary Wing directly at +91 95478 6214585 for immediate help. Need something else pet-specific? Ask away! 🐾.";
}
const quotes = [
  {
    text: "The better I get to know men, the more I find myself loving dogs.",
    author: "Charles de Gaulle"
  },
  {
    text: "Dogs' lives are too short. Their only fault, really.",
    author: "Agnes Sligh Turnbull"
  },
  {
    text: "Everything I know I learned from dogs.",
    author: "Nora Roberts"
  }
];

function changeQuote() {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  document.querySelector('.quote').textContent = `"${randomQuote.text}"`;
  document.querySelector('.author').textContent = `- ${randomQuote.author}`;
}

// Change quote every 10 seconds
setInterval(changeQuote, 10000);

// Initial call
changeQuote();
// Handle common question clicks
function askCommon(type) {
  const questions = {
    poison: "My dog ate chocolate, what should I do?",
    bleeding: "My cat is bleeding from a wound",
    choking: "My pet is choking and can't breathe",
    heatstroke: "My dog collapsed in hot weather",
    vomiting: "My pet has been vomiting for hours",
    seizure: "My pet is having a seizure"
  };
  
  document.getElementById('user-input').value = questions[type];
  sendMessage(); // Trigger your existing function
}
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});
function scrollToChat() {
  const chatbotElement = document.getElementById('chatbot');
  
  // Smooth scroll to chatbot
  chatbotElement.scrollIntoView({
    behavior: 'smooth',
    block: 'start'
  });
  
  // Optional: Focus on input field after scroll
  setTimeout(() => {
    const inputField = document.querySelector('#chatbot input[type="text"]');
    if (inputField) {
      inputField.focus();
    }
  }, 800);
}
