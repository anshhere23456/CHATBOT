import Bot from "../models/bot.model.js";
import User from "../models/user.model.js";

export const Message=async(req,res)=>{
   try {
  // read user message (adjust depending on how you're receiving it)
  const user = req.body; // or however you get the incoming user object
  const rawText = (user && user.text) ? String(user.text) : "";

  // normalize function: lowercase, trim, remove punctuation
  const normalize = s => s.toLowerCase().trim().replace(/[^\w\s]/g, "");

  // your responses (keep keys in human-friendly form; normalization will handle punctuation)
  const botResponses = {
    "hello": "Hi, How I can help you!!",
    "can we become friend": "Yes",
    "how are you": "I'm just a bot, but I'm doing great! How about you?",
    "what is your name": "I’m ChatBot, your virtual assistant.",
    "who made you": "I was created by developers to help answer your questions.",
    "tell me a joke": "Why don’t skeletons fight each other? They don’t have the guts!",
    "what is the time": "I can’t see a clock, but your device should know.",
    "bye": "Goodbye! Have a great day.",
    "thank you": "You’re welcome!",
    "i love you": "That’s sweet! I’m here to help you anytime.",
    "where are you from": "I live in the cloud — no rent, no bills!",
    "what can you do": "I can chat with you, answer questions, and keep you company.",
    "what is python": "Python is a high-level, interpreted programming language known for simplicity and versatility.\n• Easy to read/write due to clean syntax (similar to English)\n• Dynamically typed and supports multiple paradigms (OOP, functional, procedural)\n• Extensive libraries for AI, data science, web, automation\n• Example: Used in Google, YouTube, Instagram, and machine learning applications",
    "what is java": "Java is a platform-independent, object-oriented programming language.\n• Famous for 'Write Once, Run Anywhere' due to JVM (Java Virtual Machine)\n• Used in enterprise systems, Android development, cloud apps\n• Provides features like garbage collection, strong memory management\n• Example: Banking systems, Android apps, large-scale enterprise applications",
    "what is recursion": "Recursion is when a function calls itself to solve smaller parts of a problem.\n• Useful for problems that can be divided into subproblems (divide-and-conquer)\n• Requires a base condition to stop infinite looping\n• Commonly used in: factorial calculation, Fibonacci sequence, tree/graph traversal",
    "who is prime minister of india": "Narendra Modi is the Prime Minister of India since May 2014.",
    "what is g20": "The G20 (Group of Twenty) is an intergovernmental forum of 19 countries + the European Union.",
    "tell me about yourself": "This is usually the first interview question. Start with a brief intro...",
    "why should we hire you": "HR wants to see your value-add. Emphasize skills that match job requirements...",
    "what is leadership": "Leadership is the ability to inspire and guide others toward achieving goals.",
    "who is virat kohli": "Virat Kohli is one of India’s greatest batsmen and former captain.",
    "what is ipl": "The Indian Premier League (IPL) is a professional T20 cricket league started in 2008."
  };

  // normalize incoming text
  const normalizedText = normalize(rawText);

  // Build a normalized-key map to allow exact matching after normalization
  const normalizedKeyMap = {};
  for (const [k, v] of Object.entries(botResponses)) {
    normalizedKeyMap[normalize(k)] = v;
  }

  // 1) Exact normalized match
  let botResponse = normalizedKeyMap[normalizedText];

  // 2) If not exact, try keyword matches (includes)
  if (!botResponse) {
    // example keyword checks (you can expand this list)
    if (normalizedText.includes("weather")) botResponse = "Weather is great today!";
    else if (normalizedText.includes("food") || normalizedText.includes("pizza")) botResponse = "Pizza is the best!";
    else if (normalizedText.includes("java")) botResponse = "Java is a programming language!";
    else if (normalizedText.includes("python")) botResponse = "Python is great for beginners!";
    else if (normalizedText.includes("joke")) botResponse = "Why don’t programmers like nature? It has too many bugs!";
    else if (normalizedText.includes("sad")) botResponse = "I'm here for you. Want to talk about it?";
    else if (normalizedText.includes("hello") || normalizedText.includes("hi")) botResponse = "Hi there! How can I help you today?";
    else if (normalizedText.includes("weather"))
    botResponse = "Weather is great today!";

else if (normalizedText.includes("food") || normalizedText.includes("pizza"))
    botResponse = "Pizza is the best!";

else if (normalizedText.includes("java"))
    botResponse = "Java is a powerful programming language!";

else if (normalizedText.includes("python"))
    botResponse = "Python is simple and great for beginners!";

else if (normalizedText.includes("joke"))
    botResponse = "Why don’t programmers like nature? Too many bugs!";

else if (normalizedText.includes("sad"))
    botResponse = "I'm here for you. Want to talk about it?";

else if (normalizedText.includes("hello") || normalizedText.includes("hi"))
    botResponse = "Hi there! How can I assist you today?";


// ❤️ Love / Flirty
else if (normalizedText.includes("crush") || normalizedText.includes("love"))
    botResponse = "Aww, someone special on your mind?";
else if (normalizedText.includes("miss you"))
    botResponse = "I’m right here! Not going anywhere 😄";
else if (normalizedText.includes("flirt"))
    botResponse = "I might be a bot, but I can flirt too 😉";


// ⏰ Time & Date
else if (normalizedText.includes("time"))
    botResponse = "It's " + new Date().toLocaleTimeString();
else if (normalizedText.includes("date"))
    botResponse = "Today's date is " + new Date().toLocaleDateString();


// 💪 Motivation
else if (normalizedText.includes("motivate") || normalizedText.includes("motivation"))
    botResponse = "You are stronger than you think. Keep going!";
else if (normalizedText.includes("tired"))
    botResponse = "Take a break. You deserve it!";
else if (normalizedText.includes("stress"))
    botResponse = "Breathe… everything will be okay.";


// 📚 Study / College
else if (normalizedText.includes("study"))
    botResponse = "Study smart, not just hard!";
else if (normalizedText.includes("exam"))
    botResponse = "Good luck for your exam! You've got this 💪";
else if (normalizedText.includes("college"))
    botResponse = "College life is tough but memorable!";


// 💻 Tech / Coding
else if (normalizedText.includes("html"))
    botResponse = "HTML gives structure to a webpage!";
else if (normalizedText.includes("css"))
    botResponse = "CSS makes everything look beautiful!";
else if (normalizedText.includes("javascript") || normalizedText.includes("js"))
    botResponse = "JavaScript brings websites to life!";
else if (normalizedText.includes("node") || normalizedText.includes("express"))
    botResponse = "Node.js + Express = powerful backend!";
else if (normalizedText.includes("mongodb"))
    botResponse = "MongoDB stores data as JSON-like documents!";
else if (normalizedText.includes("sql"))
    botResponse = "SQL is used to manage relational databases!";


// 🩺 Health
else if (normalizedText.includes("fever"))
    botResponse = "Drink water and rest. If it gets worse, see a doctor.";
else if (normalizedText.includes("headache"))
    botResponse = "Try taking rest. Maybe reduce screen time.";
else if (normalizedText.includes("cold"))
    botResponse = "Stay warm and drink hot water!";


// 👋 Greetings
else if (normalizedText.includes("good morning"))
    botResponse = "Good morning! Have a productive day!";
else if (normalizedText.includes("good night"))
    botResponse = "Good night! Sleep well 😴";
else if (normalizedText.includes("bye"))
    botResponse = "Bye! Take care!";


// 🎵 Music
else if (normalizedText.includes("song") || normalizedText.includes("music"))
    botResponse = "Music makes everything better! What's your favorite?";


// 😊 Emotions
else if (normalizedText.includes("happy"))
    botResponse = "Yay! Keep smiling 😊";
else if (normalizedText.includes("angry"))
    botResponse = "Relax… want to talk about what's bothering you?";
else if (normalizedText.includes("bored"))
    botResponse = "Let’s do something fun! Want a joke?";


// 📍 Location / Basic Questions
else if (normalizedText.includes("where are you"))
    botResponse = "I exist in the digital world 😄";
else if (normalizedText.includes("who are you"))
    botResponse = "I'm your friendly chatbot!";
else if (normalizedText.includes("what can you do"))
    botResponse = "I can chat, help, entertain, and give info!";
else if (normalizedText.includes("your name"))
    botResponse = "I'm ChatBot, your virtual assistant.";


// ⚡ Random Fun
else if (normalizedText.includes("bored"))
    botResponse = "Let me entertain you! Want a fun fact?";
else if (normalizedText.includes("fun fact"))
    botResponse = "Honey never spoils. Archaeologists found 3000-year-old honey still edible!";
else if (normalizedText.includes("fact"))
    botResponse = "Did you know? Humans share 50% DNA with bananas!";
else if (normalizedText.includes("game"))
    botResponse = "I can play a quick quiz with you! Say 'start quiz'.";
else if (normalizedText.includes("help"))
    botResponse = "Sure! Tell me what you need help with.";
else
    botResponse = "I didn't get that, but I'm learning every day 😄";

  }

  // 3) fallback
  if (!botResponse) botResponse = "Sorry, I don't understand that!!!";

  // store bot reply in DB (Bot.create assumed to be available)
  const bot = await Bot.create({ text: botResponse });

  return res.status(200).json({
    userMessage: rawText,
    botMessage: bot.text
  });

} catch (error) {
  console.log("Error in Message Controller:", error);
  return res.status(500).json({ error: "Internal Server Error" });
}
}