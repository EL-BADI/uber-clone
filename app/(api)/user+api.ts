import { sleep } from "@/lib/utils";

export async function GET(request: Request) {
  await sleep(3000);
  return Response.json({ hello: "world" });
}
