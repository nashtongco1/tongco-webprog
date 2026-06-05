import lbj from "../../assets/lbj.jpg";

const AboutPage = () => {
  return (
    <div className="px-10 py-10 max-w-3xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">About</h1>
      <img src={lbj} alt="LeBron James" className="rounded-lg w-full" />
      <p className="text-gray-600 leading-relaxed">
        LeBron James is a global icon known for excellence, leadership, and longevity.
        His legacy extends beyond basketball into education, business, and community impact.
      </p>
    </div>
  );
};

export default AboutPage;