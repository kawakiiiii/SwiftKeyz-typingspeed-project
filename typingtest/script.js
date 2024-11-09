const typingText = document.querySelector('.typing-test p')
const input = document.querySelector('.wrapper .input-field')

const time = document.querySelector('.time span b')
const mistake = document.querySelector('.mistake span')
const wpm = document.querySelector('.wpm span')
const cpm = document.querySelector('.cpm span')
const btn = document.querySelector('button')

//set value

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let charIndex = 0;
let mistakes = 0;
let isTyping = false;



function loadParagraph(){
    const paragraph = [
        "The sunset cast a warm glow over the lake, reflecting hues of orange and pink on the water's surface. Birds chirped in the distance, adding to the peaceful ambiance. A gentle breeze rustled through the trees, making the leaves dance gracefully. People strolled along the shore, enjoying the serene beauty of nature's evening display.",
    
        "In the heart of the bustling city, skyscrapers towered above, casting shadows over busy streets filled with honking cars and hurried pedestrians. The aroma of street food filled the air, blending with the sounds of laughter and chatter. Despite the chaos, there was a sense of vibrancy, a pulse that brought the city to life each day.",
    
        "Beneath a star-filled sky, the bonfire crackled, its warmth cutting through the chilly night air. Friends gathered around, sharing stories and laughter that echoed into the quiet woods. Sparks floated upwards, briefly illuminating faces and then vanishing. It was a moment of connection, where worries faded, replaced by the comfort of friendship and simple joy.",
    
        "The library was quiet, a sanctuary for those lost in the pages of their favorite books. Sunlight streamed through the large windows, casting patterns on the carpeted floor. The smell of old books lingered in the air, adding to the charm. Every corner held a story, a world waiting to be discovered by curious minds.",
    
        "Raindrops tapped gently on the window, creating a soothing rhythm that filled the room. Outside, the garden looked fresh and alive, with droplets clinging to leaves and petals. The gray sky added a peaceful ambiance, as if nature itself was taking a deep breath, embracing the gentle touch of rain and the quiet it brought.",
    
        "The beach stretched endlessly, waves crashing against the shore with rhythmic precision. Seagulls soared above, their calls blending with the ocean’s roar. Sunbathers relaxed on the warm sand, while children built sandcastles nearby. The salty breeze carried a sense of freedom, a reminder of nature’s vastness and the endless possibilities waiting beyond the horizon.",

    ];

    const randomIndex = Math.floor(Math.random()*paragraph.length);
    
    typingText.innerHTML='';

    for(const char of paragraph[randomIndex]){
        console.log(char);
        typingText.innerHTML+= `<span>${char}</span>`;
    }
    typingText.querySelectorAll('span')[0].classList.add('active');
    document.addEventListener('keydown',()=>input.focus());
    typingText.addEventListener("click",()=>{input.focus()})
}


function initTyping(){
    const char= typingText.querySelectorAll('span');
    const typedChar = input.value.charAt(charIndex);

    if(charIndex < char.length && timeLeft > 0){

        if(!isTyping){
            timer = setInterval(initTime,1000);
            isTyping = true;
        }

       if(char[charIndex].innerText === typedChar){
        char[charIndex].classList.add('correct');
        console.log("correct");
       }

      else{
        mistakes++ ;
        char[charIndex].classList.add('incorrect');
        console.log("incorrect");
      }

      charIndex++;
      char[charIndex].classList.add('active');

      mistake.innerText = mistakes;
      cpm.innerText = charIndex - mistakes; 
    }
    else{
        clearInterval(timer);
        input.value='';
    }

}

function initTime(){
    if(timeLeft>0){
        timeLeft--;
        time.innerText=timeLeft;
        let wpmVal = Math.round(((charIndex-mistakes)/5)/(maxTime - timeLeft)*60);
        wpm.innerText = wpmVal;
    }
    else{
        clearInterval(timer);
    }
}

function reset(){
    loadParagraph();
    clearInterval(timer);
    timeLeft = maxTime;
    time.innerText = timeLeft;
    input.value = '';
    charIndex = 0;
    mistakes = 0;
    isTyping = false;
    wpm.innerText = 0;
    cpm.innerText = 0;
    mistake.innerText = 0;
}

input.addEventListener("input",initTyping);
btn.addEventListener("click",reset);
loadParagraph();


// Wrap every letter in a span
var textWrapper = document.querySelector('.ml1 .letters');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml1 .letter',
    scale: [0.3,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 900,
    delay: (el, i) => 70 * (i+1)
  }).add({
    targets: '.ml1 .line',
    scaleX: [0,1],
    opacity: [0.5,1],
    easing: "easeOutExpo",
    duration: 900,
    offset: '-=875',
    delay: (el, i, l) => 80 * (l - i)
  }).add({
    targets: '.ml1',
    opacity: 0,
    duration: 000,
    easing: "easeOutExpo",
    delay: 3000
  });