export const translations = {
  en: {
    greeting_morning: "Good morning",
    greeting_afternoon: "Good afternoon",
    greeting_evening: "Good evening",
    home_title_suffix: "I'm Patryk",
    chatbot_placeholder: "How can I help you today?",
    chatbot_success: "Thanks for your message! I will answer you shortly.",
    error_title: "Oops!",
    error_subtitle: "Something went wrong",
    error_body: "Please try again later. If the problem persists, contact me.",
    error_return: "Return to home",
    logo_alt: "podwor.ski logo",
  },
  pl: {
    greeting_morning: "Dzień dobry",
    greeting_afternoon: "Dzień dobry",
    greeting_evening: "Dobry wieczór",
    home_title_suffix: "jestem Patryk",
    chatbot_placeholder: "W czym mogę Ci dzisiaj pomóc?",
    chatbot_success: "Dzięki za wiadomość! Odpiszę wkrótce.",
    error_title: "Ups!",
    error_subtitle: "Coś poszło nie tak",
    error_body:
      "Spróbuj ponownie później. Jeśli problem się utrzymuje, skontaktuj się ze mną.",
    error_return: "Wróć na stronę główną",
    logo_alt: "logo podwor.ski",
  },
  es: {
    greeting_morning: "Buenos días",
    greeting_afternoon: "Buenas tardes",
    greeting_evening: "Buenas noches",
    home_title_suffix: "Soy Patryk",
    chatbot_placeholder: "¿Cómo puedo ayudarte hoy?",
    chatbot_success: "¡Gracias por tu mensaje! Te responderé en breve.",
    error_title: "¡Vaya!",
    error_subtitle: "Algo salió mal",
    error_body:
      "Inténtalo de nuevo más tarde. Si el problema persiste, contáctame.",
    error_return: "Volver al inicio",
    logo_alt: "logo de podwor.ski",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
