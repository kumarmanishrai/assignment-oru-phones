
const SessionTracker = async ()=> {
  const sessionId = sessionStorage.getItem("sessionId");

  if (!sessionId) {
    try {
      const res = await fetch("http://localhost:5000/track-visitor", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        // credentials:"include",
      });
      console.log(res)
      const data = await res.json();
      console.log(data.sessionId)
      if (data) {
        sessionStorage.setItem("sessionId", data.sessionId);
      }
    } catch (err) {
      console.error("Error tracking visitor:", err);
    }
  }
}
export default SessionTracker;