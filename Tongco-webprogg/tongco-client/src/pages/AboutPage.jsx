import lbj from "../assets/lbj.jpg";

const AboutPage = () => {
  return (
    <div className="px-10 py-8 space-y-6 text-gray-700">
      <h1 className="text-2xl font-bold">About Page</h1>

      <img
        src={lbj}alt="LeBron James"
        className="rounded-lg block mx-auto w-64 h-auto"
      />

      <p className="text-gray-600">
       LeBron James is more than just a basketball player; he is a global icon whose impact spans over two decades of unprecedented excellence. From his high school days as "The Chosen One" to becoming the NBA’s all-time leading scorer, LeBron has redefined the limits of longevity, athleticism, and basketball intelligence. Known for his elite playmaking and championship pedigree across three different franchises—the Cavaliers, Heat, and Lakers—he has solidified his place in the "GOAT" conversation. Beyond the court, his legacy is defined by his commitment to education through the "I PROMISE" School and his influence as a businessman and advocate, proving that his vision for greatness extends far beyond the four quarters of a game.
      </p>
      
    </div>
  );
};

export default AboutPage;