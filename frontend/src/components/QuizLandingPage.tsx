import { MdWatchLater } from 'react-icons/md'

const QuizLandingPage = () => {
  return (
   <div className="">
    <section className="rounded-3xl font-display bg-[#f5f5f5]">
        <h2 className="p-10 text-left text-5xl font-bold text-primary-700 mb-14">
              Retirement Ready Quiz
          </h2>
        </section>
        <p>Not sure you&#39;ve checked all the boxes to retire? Take this quiz as a first step towards your retirement checklist.</p>
        <p>Your answers will help identify government pensions and benefits you could receive. They will also guide you on what to consider to better prepare for retirement.</p>
        <h6 className="font-bold font-display text-xl mb-4">What you&#39;ll need</h6>
        <p>You don&#39;t need any special information to take this quiz. To create the most appropriate retirement checklist, you will need to provide information on the following:</p>
        <ul className="list-disc ml-6">
            <li><span className="font-bold">legal status</span> (such as Canadian citizen, Indian Status, or permanent resident)</li>
            <li><span className="font-bold">residence history</span> (such as Canadian citizen, Indian Status, or permanent resident)</li>
            <li><span className="font-bold">marital status</span></li>
            <li><span className="font-bold">retirement plan</span> (such as Canadian citizen, Indian Status, or permanent resident)</li>
        </ul>
        <h6 className="font-bold font-display text-xl mb-2 mt-4">Time to complete survey</h6>
        <p className="mb-32"><MdWatchLater className="inline text-2xl mr-4" />3 minutes</p>
   </div>
  );
};

export default QuizLandingPage;
