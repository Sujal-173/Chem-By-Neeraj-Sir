import { getDb } from "@/lib/mongodb";

const PAGE_SIZE = 15;

export async function listContactMessages({
  search = "",
  status = "all",
  page = 1,
}: {
  search?: string;
  status?: "all" | "new" | "responded";
  page?: number;
}) {
  const db = await getDb();
  const filter: Record<string, unknown> = {};

  if (status !== "all") filter.status = status;
  if (search.trim()) {
    const regex = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ name: regex }, { email: regex }, { phone: regex }];
  }

  const db_collection = db.collection("contact_messages");
  const [items, total] = await Promise.all([
    db_collection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .toArray(),
    db_collection.countDocuments(filter),
  ]);

  return {
    items: items.map((doc) => ({ ...doc, _id: String(doc._id) })),
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}

export async function updateContactMessageStatus(id: string, status: "new" | "responded") {
  const { ObjectId } = await import("mongodb");
  const db = await getDb();
  await db
    .collection("contact_messages")
    .updateOne({ _id: new ObjectId(id) }, { $set: { status } });
}

export async function listWaitingList({
  search = "",
  page = 1,
}: {
  search?: string;
  page?: number;
}) {
  const db = await getDb();
  const filter: Record<string, unknown> = {};

  if (search.trim()) {
    const regex = new RegExp(search.trim().replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ name: regex }, { email: regex }, { city: regex }, { school: regex }];
  }

  const collection = db.collection("waiting_list");
  const [items, total] = await Promise.all([
    collection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * PAGE_SIZE)
      .limit(PAGE_SIZE)
      .toArray(),
    collection.countDocuments(filter),
  ]);

  return {
    items: items.map((doc) => ({ ...doc, _id: String(doc._id) })),
    total,
    page,
    pageSize: PAGE_SIZE,
    totalPages: Math.max(1, Math.ceil(total / PAGE_SIZE)),
  };
}
