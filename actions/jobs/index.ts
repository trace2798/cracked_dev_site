"use server";

export async function getJobs(

) {

  try {
    // Use the id variable
    const request = await fetch(
      `https://api.crackeddevs.com/api/get-jobs?limit=20`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.CRACKED_DEV_API_KEY || "",
        },
      }
    );
    console.log("2");
    const jobs = await request.json();
    console.log(jobs);
    return jobs;
  } catch (e) {
    console.error(e);
    return { message: "Failed to query" };
  }
}
