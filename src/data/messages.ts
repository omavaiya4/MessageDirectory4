export interface Message {
  id: string;
  sender: string;
  preview: string;
  body: string;
  time: string;
  unread: boolean;
  avatar: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  gradient: [string, string];
  messages: Message[];
}

export const categories: Category[] = [
  {
    id: 'you',
    name: 'You',
    icon: '👤',
    color: '#FF6B6B',
    gradient: ['#FF6B6B', '#EE3B3B'],
    messages: [
      {
        id: 'y1',
        sender: 'Personal Note',
        preview: 'Remember to complete exercise 3 today!',
        body: 'Remember to complete exercise 3 today!\n\nAlso, don\'t forget to push to GitHub before the deadline. The project is worth 30 points — make it count!',
        time: '9:00 AM',
        unread: true,
        avatar: '📝',
      },
      {
        id: 'y2',
        sender: 'Reminder',
        preview: 'Your React Native app is due this week.',
        body: 'Your React Native app is due this week. Make sure the README.pdf includes screenshots and the project structure explanation.',
        time: 'Yesterday',
        unread: true,
        avatar: '⏰',
      },
      {
        id: 'y3',
        sender: 'Goal',
        preview: 'Aim for an A grade — go above and beyond!',
        body: 'Aim for an A grade — go above and beyond! Professional quality work includes smooth navigation, beautiful design, and clean TypeScript code.',
        time: 'Mon',
        unread: false,
        avatar: '🎯',
      },
    ],
  },
  {
    id: 'home',
    name: 'Home',
    icon: '🏠',
    color: '#4ECDC4',
    gradient: ['#4ECDC4', '#2BB5AB'],
    messages: [
      {
        id: 'h1',
        sender: 'Mom',
        preview: 'Dinner is ready, come downstairs!',
        body: 'Dinner is ready, come downstairs! I made your favourite pasta. Hope you\'re not too busy with your projects.',
        time: '6:30 PM',
        unread: true,
        avatar: '👩',
      },
      {
        id: 'h2',
        sender: 'Dad',
        preview: 'Can you take out the trash before bed?',
        body: 'Can you take out the trash before bed? Also, the Wi-Fi router might need a restart — the signal has been weak all day.',
        time: '5:15 PM',
        unread: false,
        avatar: '👨',
      },
      {
        id: 'h3',
        sender: 'Sibling',
        preview: 'Borrowing your charger, be back soon!',
        body: 'Borrowing your charger, be back soon! Also, did you see the game last night? Absolutely insane ending.',
        time: '3:00 PM',
        unread: false,
        avatar: '🧑',
      },
      {
        id: 'h4',
        sender: 'Home Alert',
        preview: 'Front door was opened at 4:45 PM.',
        body: 'Front door was opened at 4:45 PM. This is an automated security notification from your smart home system.',
        time: '4:45 PM',
        unread: true,
        avatar: '🔔',
      },
    ],
  },
  {
    id: 'love',
    name: 'Love',
    icon: '❤️',
    color: '#FF4D8D',
    gradient: ['#FF4D8D', '#D6006B'],
    messages: [
      {
        id: 'l1',
        sender: 'Alex ❤️',
        preview: 'Thinking of you 💕 Hope your day is great!',
        body: 'Thinking of you 💕 Hope your day is great! Can\'t wait to see you this weekend. Let me know when you\'re free!',
        time: '11:00 AM',
        unread: true,
        avatar: '😍',
      },
      {
        id: 'l2',
        sender: 'Alex ❤️',
        preview: 'Did you eat lunch yet? Don\'t skip meals!',
        body: 'Did you eat lunch yet? Don\'t skip meals! I know you get busy with coding, but take care of yourself please 🥺',
        time: '1:30 PM',
        unread: true,
        avatar: '😍',
      },
      {
        id: 'l3',
        sender: 'Alex ❤️',
        preview: 'Sending you good vibes for your assignment!',
        body: 'Sending you good vibes for your assignment! You\'ve got this 💪 I\'ll make us dinner when you\'re done. Love you!',
        time: 'Yesterday',
        unread: false,
        avatar: '😍',
      },
    ],
  },
  {
    id: 'family',
    name: 'Family',
    icon: '👨‍👩‍👧‍👦',
    color: '#9B59B6',
    gradient: ['#9B59B6', '#7D3C98'],
    messages: [
      {
        id: 'f1',
        sender: 'Family Group 👨‍👩‍👧‍👦',
        preview: 'Grandma\'s birthday is this Sunday!',
        body: 'Grandma\'s birthday is this Sunday! Everyone please be at Aunt Clara\'s place by 3 PM. Don\'t forget to bring a card!',
        time: '10:00 AM',
        unread: true,
        avatar: '🎂',
      },
      {
        id: 'f2',
        sender: 'Uncle Bob',
        preview: 'How\'s university going, champ?',
        body: 'How\'s university going, champ? Your dad tells me you\'re doing a mobile programming course. That\'s really impressive! Keep it up.',
        time: 'Yesterday',
        unread: false,
        avatar: '👴',
      },
      {
        id: 'f3',
        sender: 'Cousin Sara',
        preview: 'Are you coming to the reunion next month?',
        body: 'Are you coming to the reunion next month? We\'re planning it for the long weekend. It would be so great to catch up! 🥰',
        time: 'Sun',
        unread: false,
        avatar: '👧',
      },
    ],
  },
  {
    id: 'friends',
    name: 'Friends',
    icon: '🤝',
    color: '#FF8C42',
    gradient: ['#FF8C42', '#E0661A'],
    messages: [
      {
        id: 'fr1',
        sender: 'Jake 🎮',
        preview: 'Bro, game night tonight? We\'re all on at 9!',
        body: 'Bro, game night tonight? We\'re all on at 9! Don\'t bail again lol. Marcus and Devon are in. Just finish that assignment first.',
        time: '2:00 PM',
        unread: true,
        avatar: '🎮',
      },
      {
        id: 'fr2',
        sender: 'Study Group',
        preview: 'CS5450 study session — library room 204',
        body: 'CS5450 study session — library room 204, tomorrow at 2 PM. We\'re going over exercise 3 together. Anyone who wants to join is welcome!',
        time: '12:00 PM',
        unread: true,
        avatar: '📚',
      },
      {
        id: 'fr3',
        sender: 'Maya',
        preview: 'Coffee tomorrow morning? I need to vent 😅',
        body: 'Coffee tomorrow morning? I need to vent 😅 The midterm was brutal. How did you find it? Let\'s meet at Tim Hortons at 9.',
        time: 'Yesterday',
        unread: false,
        avatar: '☕',
      },
      {
        id: 'fr4',
        sender: 'Liam',
        preview: 'Shared my React Native notes with you!',
        body: 'Shared my React Native notes with you! Check Google Drive. Has all the navigation setup and expo config stuff. Should help with exercise 3.',
        time: 'Sat',
        unread: false,
        avatar: '📂',
      },
    ],
  },
  {
    id: 'school',
    name: 'School',
    icon: '🎓',
    color: '#27AE60',
    gradient: ['#27AE60', '#1A8A45'],
    messages: [
      {
        id: 's1',
        sender: 'Dr. Sabah Mohammed',
        preview: 'Exercise 3 is due at end of week. Good luck!',
        body: 'Exercise 3 is due at end of week. Good luck! Remember to include a proper README.pdf with screenshots, and push the full project to GitHub. Any questions, visit office hours.',
        time: '8:00 AM',
        unread: true,
        avatar: '👨‍🏫',
      },
      {
        id: 's2',
        sender: 'CS5450 Announcements',
        preview: 'Class cancelled Thursday — moved to online.',
        body: 'Class cancelled Thursday — moved to online. The Zoom link has been posted on D2L. Please attend as we will be doing live demos of exercise 3.',
        time: '9:30 AM',
        unread: true,
        avatar: '📢',
      },
      {
        id: 's3',
        sender: 'D2L Notification',
        preview: 'Your Exercise 2 grade has been posted.',
        body: 'Your Exercise 2 grade has been posted. Log into D2L to view your score and feedback. Use this to improve for Exercise 3!',
        time: 'Yesterday',
        unread: false,
        avatar: '📊',
      },
      {
        id: 's4',
        sender: 'Library System',
        preview: '2 books due for return — avoid late fees.',
        body: '2 books due for return — avoid late fees. "React Native in Action" and "JavaScript: The Good Parts" are due this Friday. Renew online at library.lakeheadu.ca.',
        time: 'Mon',
        unread: false,
        avatar: '📖',
      },
    ],
  },
];
