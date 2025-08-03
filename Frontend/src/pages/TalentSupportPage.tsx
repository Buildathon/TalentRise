import { useEffect, useState } from "react";
import TalentDonation from "../components/TalentDonation";

interface Talent {
  name: string;
  wallet: string;
}

const TalentSupportPage = () => {
  const [talents, setTalents] = useState<Talent[]>([]);

  useEffect(() => {
    fetch("/talents.json")
      .then((res) => res.json())
      .then(setTalents);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white py-10 px-4">
      <h1 className="text-3xl font-bold text-center mb-8">🌟 Sistema de Apoyo al Talento</h1>
      {talents.map((talent) => (
        <TalentDonation
          key={talent.wallet}
          talentName={talent.name}
          talentAddress={talent.wallet}
        />
      ))}
    </div>
  );
};

export default TalentSupportPage;
