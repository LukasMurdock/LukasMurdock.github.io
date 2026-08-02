(() => {
  function shuffle(items) {
    const shuffled = [...items];

    for (let index = shuffled.length - 1; index > 0; index -= 1) {
      const randomIndex = Math.floor(Math.random() * (index + 1));
      [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }

    return shuffled;
  }

  function collectQuestions(article) {
    const questionSections = new Set(["Original", "Extra"]);
    const questions = [];

    for (const heading of article.querySelectorAll("h2")) {
      if (!questionSections.has(heading.textContent.trim())) {
        continue;
      }

      let element = heading.nextElementSibling;
      while (element && element.tagName !== "H2") {
        if (element.tagName === "P") {
          const question = element.textContent.trim();
          if (question) {
            questions.push(question);
          }
        }
        element = element.nextElementSibling;
      }
    }

    return [...new Set(questions)];
  }

  function initializeRandomQuestion() {
    const widget = document.querySelector("[data-askhole-random]");
    const article = widget?.closest("article");
    const output = widget?.querySelector("[data-askhole-question]");
    const button = widget?.querySelector("[data-askhole-button]");
    const remaining = widget?.querySelector("[data-askhole-remaining]");

    if (!widget || !article || !output || !button || !remaining) {
      return;
    }

    const questions = collectQuestions(article);
    let queue = [];
    let lastQuestion = "";

    function updateRemaining() {
      const label = queue.length === 1 ? "question" : "questions";
      remaining.textContent = `${queue.length} ${label} remaining`;
    }

    function refillQueue() {
      queue = shuffle(questions);

      if (queue.length > 1 && queue[queue.length - 1] === lastQuestion) {
        [queue[0], queue[queue.length - 1]] = [queue[queue.length - 1], queue[0]];
      }
    }

    if (questions.length === 0) {
      output.textContent = "No questions found.";
      button.disabled = true;
      return;
    }

    refillQueue();
    updateRemaining();

    button.addEventListener("click", () => {
      if (queue.length === 0) {
        refillQueue();
      }

      lastQuestion = queue.pop();
      output.textContent = lastQuestion;
      updateRemaining();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeRandomQuestion, { once: true });
  } else {
    initializeRandomQuestion();
  }
})();
