"use client";

function Page() {
  const getAIRes = () => {
    fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ prompt: "What is the capital of France?" }),
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };
  return (
    <div>
      <h1>Dashboard</h1>
      <p>This is the dashboard.</p>
      <button onClick={getAIRes}>Get AI Response</button>
    </div>
  );
}

export default Page;
