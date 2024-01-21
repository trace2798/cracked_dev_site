"use server";

export async function updateSelector(
  limit: number,
  job_types: string,
  degree_required: boolean
) {
  console.log(job_types);
  console.log(degree_required);
  try {
    // Use the id variable
    const request = await fetch(
      `https://api.crackeddevs.com/api/get-jobs?limit=${limit}&job_types=${job_types}&degree_required=${degree_required}`,
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
