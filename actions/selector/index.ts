"use server";

export async function updateSelector(
  limit: number,
  job_types: string,
  degree_required: boolean,
  skill_levels: string[]
) {
  //console.log(limit)
  //console.log(job_types);
  //console.log(degree_required);
  //console.log(skill_levels);
  try {
    // Use the id variable
    const request = await fetch(
      `https://api.crackeddevs.com/api/get-jobs?limit=${limit}&job_types=${job_types}&degree_required=${degree_required}&skill_levels=${skill_levels}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.CRACKED_DEV_API_KEY || "",
        },
      }
    );
    //console.log("2");
    const jobs = await request.json();
    //console.log(jobs);
    return jobs;
  } catch (e) {
    console.error(e);
    return { message: "Failed to query" };
  }
}
