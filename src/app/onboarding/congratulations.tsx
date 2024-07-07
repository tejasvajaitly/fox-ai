import Confetti from "react-confetti";

function Congratulations() {
  return (
    <div>
      <Confetti recycle={false} />
      <h1>Congratulations!</h1>
      <p>You have successfully completed the onboarding process.</p>
    </div>
  );
}

export default Congratulations;
