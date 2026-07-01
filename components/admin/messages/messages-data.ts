export type MessageStatus = "Open" | "Replied" | "Resolved";
export type Sender = "patient" | "provider";

export type Message = {
  id: string;
  from: Sender;
  text: string;
  time: string;
};

export type Conversation = {
  id: string;
  patient: string;
  provider: string;
  medication: string;
  status: MessageStatus;
  unread: boolean;
  lastTime: string;
  messages: Message[];
};

export const CONVERSATIONS: Conversation[] = [
  {
    id: "c1",
    patient: "Norma Alvarez",
    provider: "Dr. Sarah Lane",
    medication: "Semaglutide",
    status: "Open",
    unread: true,
    lastTime: "10:24 AM",
    messages: [
      { id: "m1", from: "patient", text: "Hi, I started my second dose but felt a bit nauseous. Is that normal?", time: "10:20 AM" },
      { id: "m2", from: "patient", text: "Should I lower the dose this week?", time: "10:24 AM" },
    ],
  },
  {
    id: "c2",
    patient: "Rachel Kim",
    provider: "Dr. Mia Chen",
    medication: "Tirzepatide",
    status: "Replied",
    unread: false,
    lastTime: "Yesterday",
    messages: [
      { id: "m1", from: "patient", text: "When will my next refill ship?", time: "Yesterday 3:10 PM" },
      { id: "m2", from: "provider", text: "Hi Rachel! Your refill ships within 5-7 business days. You'll get a tracking email.", time: "Yesterday 3:40 PM" },
    ],
  },
  {
    id: "c3",
    patient: "Laura Bennett",
    provider: "Dr. Sarah Lane",
    medication: "GLP-1 + NAD+",
    status: "Open",
    unread: true,
    lastTime: "9:02 AM",
    messages: [
      { id: "m1", from: "patient", text: "Can I take NAD+ in the morning with my other supplements?", time: "9:02 AM" },
    ],
  },
  {
    id: "c4",
    patient: "Tiffany King",
    provider: "Dr. Mia Chen",
    medication: "Sermorelin",
    status: "Resolved",
    unread: false,
    lastTime: "Mon",
    messages: [
      { id: "m1", from: "patient", text: "Thank you for the guidance, feeling much better!", time: "Mon 1:15 PM" },
      { id: "m2", from: "provider", text: "So glad to hear that, Tiffany. Reach out anytime.", time: "Mon 1:30 PM" },
    ],
  },
  {
    id: "c5",
    patient: "Maria Lopez",
    provider: "Dr. Sarah Lane",
    medication: "NAD+",
    status: "Replied",
    unread: false,
    lastTime: "Sun",
    messages: [
      { id: "m1", from: "patient", text: "Is it okay to skip a dose if I travel?", time: "Sun 11:00 AM" },
      { id: "m2", from: "provider", text: "Yes, one missed dose is fine. Resume your normal schedule after.", time: "Sun 11:20 AM" },
    ],
  },
  {
    id: "c6",
    patient: "Ashley Brooks",
    provider: "Dr. Mia Chen",
    medication: "Longevity Stack",
    status: "Open",
    unread: true,
    lastTime: "8:45 AM",
    messages: [
      { id: "m1", from: "patient", text: "How do I add the fitness classes to my plan?", time: "8:45 AM" },
    ],
  },
];

export const STATUS_STYLES: Record<MessageStatus, string> = {
  Open: "bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300",
  Replied: "bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300",
  Resolved: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300",
};
