import dotenv from 'dotenv'
dotenv.config()



let startTime = Date.now();
let lastPercent = 0;
let scrollTimeout: ReturnType<typeof setTimeout> | null = null;

// let interactionTrackerData: Array<any> = [];
const InitTracker = async () => {
  console.log("tracker initialized");
  let sessionId = sessionStorage.getItem("sessionId") ?? undefined;
  

  const pageUrl = window.location.href;

  // 1. Track page visit
  sendEvent({ eventType: "pageVisit", pageUrl, sessionId });

  // 2. Track scroll percentage (only once)
  window.addEventListener("scroll", () => {
  if (scrollTimeout) clearTimeout(scrollTimeout);

  scrollTimeout = setTimeout(() => {
    const percent = Math.round(
      (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
    );

    if (percent > lastPercent) {
      lastPercent = percent;

      console.log("Scroll percent:", percent);

      
      sendEvent({
        eventType: "scroll",
        pageUrl,
        scrollPercent: percent,
        sessionId,
      });
    }
  }, 300);
});

  // 3. Track button and link clicks
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT") {
      const input = target as HTMLInputElement;
      if (input.type === "checkbox" || input.type === "radio") {
        const elementId = input.id || input.name || "";

        if (elementId) {
          sendEvent({
            elementTag: target.tagName,
            eventType: "filterClick",
            sessionId,
            pageUrl,
            elementId,
          });
        }
      }
    }

    if (target.tagName === "BUTTON" || target.tagName === "A") {
      console.log(target.innerText);
      sendEvent({
        elementTag: target.tagName,
        eventType: "click",
        pageUrl,
        elementId: target.innerText || target.id || target.className,
        sessionId,
      });
    }
  });

  // 4. Track time spent on page
  window.addEventListener("beforeunload", async () => {
    try {
      const duration = Math.round((Date.now() - startTime) / 1000);
      sendEvent({
        eventType: "timeSpent",
        pageUrl,
        timeSpent: duration,
        sessionId,
      });
      const interactions = sessionStorage.getItem("interactionTrackerData");
      sessionStorage.removeItem("interactionTrackerData");
      const data = JSON.stringify({ sessionId, interactions });
      navigator.sendBeacon(
        `${process.env.NEXT_PUBLIC_API}/track-interaction`,
        new Blob([data ?? ""], { type: "application/json" })
      );
    
    } catch (error) {
      console.log(error);
    }
  });
};


async function sendEvent(data: {
  elementTag?: string,
  eventType?: string;
  sessionId?: string;
  pageUrl?: string;
  elementId?: string;
  scrollPercent?: number;
  timeSpent?: number;
}) {
   
  if(data.eventType === "scroll"){
      // Get existing tracker data
      let interactionTrackerData = JSON.parse(sessionStorage.getItem("interactionTrackerData") || "[]");

      // Check if scroll entry for the current page already exists
      const scrollIndex = interactionTrackerData.findIndex(
        (entry: any) =>
          entry.eventType === "scroll" && entry.pageUrl === window.location.href
      );

      if (scrollIndex !== -1) {
        // Update existing scroll entry
        interactionTrackerData[scrollIndex] = { ...interactionTrackerData[scrollIndex], ...data };
      } else {
        // Add new scroll entry
        interactionTrackerData.push(data);
      }
       sessionStorage.setItem("interactionTrackerData", JSON.stringify(interactionTrackerData));
      console.log(data);
  }
  else{
    let interactionTrackerData = JSON.parse(sessionStorage.getItem("interactionTrackerData") || "[]");
    interactionTrackerData.push(data);
  sessionStorage.setItem("interactionTrackerData", JSON.stringify(interactionTrackerData));

  console.log(data);
  }
  
  
}

export default InitTracker;
