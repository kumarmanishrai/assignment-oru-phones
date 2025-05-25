import dotenv from 'dotenv'
dotenv.config()

const SessionTracker = async ()=> {

{
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API}/user/track-visitor`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials:"include",
      });
      console.log(res)
      const data = await res.json();
      console.log(data.sessionId)
      if (res.ok) {
        console.log("sessionId created")
      }
      else{
      console.error("Error tracking visitor");

      }
    } catch (err) {
      console.error("Error tracking visitor:", err);
    }
  }
}
export default SessionTracker;