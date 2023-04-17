import { MdWatchLater } from 'react-icons/md'

interface QuizLandingPageProps {
    landing: {
        p1:string;
        p2: string;
        whatyouneed:string;
        p3:string;
        legal: string;
        legalextra: string;
        residence: string;
        residenceextra: string;
        marital: string;
        retirement: string;
        retirementextra: string;
        timetocomplete: string;
        minutes: string;
    };
  }

const QuizLandingPage = ({ landing }: QuizLandingPageProps) => {
  return (
   <div className="">
        <p>{landing.p1}</p>
        <p>{landing.p2}</p>
        <h6 className="font-bold font-display text-xl mb-4">{landing.whatyouneed}</h6>
        <p>{landing.p3}</p>
        <ul className="list-disc ml-6">
            <li><span className="font-bold">{landing.legal}</span> {landing.legalextra}</li>
            <li><span className="font-bold">{landing.residence}</span> {landing.residenceextra}</li>
            <li><span className="font-bold">{landing.marital}</span></li>
            <li><span className="font-bold">{landing.retirement}</span> {landing.retirementextra}</li>
        </ul>
        <h6 className="font-bold font-display text-xl mb-2 mt-4">{landing.timetocomplete}</h6>
        <p className="mb-32"><MdWatchLater className="inline text-2xl mr-4" />{landing.minutes}</p>
   </div>
  );
};

export default QuizLandingPage;
