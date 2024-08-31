import { db } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const { name, email, clerkId } = await request.json();

    console.log("from server: ", { name, email, clerkId });

    if (!name || !email || !clerkId)
      return Response.json("Missing data", { status: 400 });

    const user = await db.user.create({ data: { name, email, clerkId } });

    if (!user) throw new Error("Can't create the user: " + name);

    return new Response("user: " + name + " created!", { status: 201 });
  } catch (error) {
    console.log(error);

    return Response.json({ error }, { status: 500 });
  }
}
