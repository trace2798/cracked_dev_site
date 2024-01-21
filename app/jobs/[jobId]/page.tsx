import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface JobIdPageProps {
  params: {
    jobId: string;
  };
}

const BoardIdPage = async ({ params }: JobIdPageProps) => {
  const request = await fetch(
    `https://api.crackeddevs.com/api/get-jobs?id=${params.jobId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "api-key": process.env.CRACKED_DEV_API_KEY || "",
      },
    }
  );
  const job = await request.json();
  console.log(job);
  return (
    <>
      <div className="">{job[0].title}</div>
      <div className="prose dark:prose-invert">
        <Markdown remarkPlugins={[[remarkGfm, { singleTilde: false }]]}>
          {job[0].description}
        </Markdown>
      </div>
    </>
  );
};

export default BoardIdPage;
