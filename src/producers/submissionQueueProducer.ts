import submissionQueue from "../queue/submissionQueue";

export default async function(payload: Record<string, unknown>) {
    await submissionQueue.add("submissionJob", payload);
    console.log("Successfully added a new submission job");
}